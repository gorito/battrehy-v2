'use server';

import { createClient } from '../server';
import { revalidatePath } from 'next/cache';
import { slugifyCity } from '../../utils';

export type CsvClinic = {
    name: string;
    city: string;
};

export type SyncAnalysisResult = {
    exactMatches: { dbId: string; dbName: string; csvName: string; city: string }[];
    fuzzyMatches: { dbId: string; dbName: string; csvName: string; city: string; score: number }[];
    noMatches: CsvClinic[];
};

function normalizeString(str: string): string {
    if (!str) return '';
    return str
        .toLowerCase()
        .replace(/&/g, 'och')
        .replace(/[^a-z0-9åäö]/g, '')
        .trim();
}

// Simple Levenshtein distance
function levenshtein(a: string, b: string): number {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

function calculateSimilarity(a: string, b: string): number {
    const normA = normalizeString(a);
    const normB = normalizeString(b);
    
    if (normA === normB) return 1.0;
    
    // Containment is a strong signal
    if (normA.includes(normB) || normB.includes(normA)) return 0.85;

    const distance = levenshtein(normA, normB);
    const maxLength = Math.max(normA.length, normB.length);
    
    if (maxLength === 0) return 1.0;
    
    return 1 - (distance / maxLength);
}

export async function analyzeShrSyncAction(csvData: CsvClinic[]): Promise<SyncAnalysisResult> {
    const supabase = await createClient();
    
    // Fetch all clinics
    const { data: dbClinics, error } = await supabase
        .from('clinics')
        .select('id, name, city');

    if (error) {
        console.error('Error fetching clinics for SHR sync:', error);
        throw new Error('Kunde inte hämta kliniker från databasen.');
    }

    const result: SyncAnalysisResult = {
        exactMatches: [],
        fuzzyMatches: [],
        noMatches: []
    };

    for (const csvClinic of csvData) {
        const csvNameNorm = normalizeString(csvClinic.name);
        let bestMatch = null;
        let bestScore = 0;

        for (const dbClinic of dbClinics || []) {
            // We only compare if cities match (or are very similar)
            if (normalizeString(dbClinic.city) === normalizeString(csvClinic.city)) {
                const dbNameNorm = normalizeString(dbClinic.name);
                
                if (csvNameNorm === dbNameNorm) {
                    bestMatch = dbClinic;
                    bestScore = 1.0;
                    break; // Exact match found, stop searching for this clinic
                } else {
                    const score = calculateSimilarity(csvClinic.name, dbClinic.name);
                    if (score > bestScore) {
                        bestScore = score;
                        bestMatch = dbClinic;
                    }
                }
            }
        }

        if (bestScore === 1.0 && bestMatch) {
            result.exactMatches.push({
                dbId: bestMatch.id,
                dbName: bestMatch.name,
                csvName: csvClinic.name,
                city: csvClinic.city
            });
        } else if (bestScore >= 0.6 && bestMatch) {
            result.fuzzyMatches.push({
                dbId: bestMatch.id,
                dbName: bestMatch.name,
                csvName: csvClinic.name,
                city: csvClinic.city,
                score: bestScore
            });
        } else {
            result.noMatches.push(csvClinic);
        }
    }

    return result;
}

export async function applyShrSyncAction(clinicIdsToUpdate: string[]): Promise<{ success: boolean; updatedCount: number }> {
    const supabase = await createClient();
    
    if (!clinicIdsToUpdate || clinicIdsToUpdate.length === 0) {
        return { success: true, updatedCount: 0 };
    }

    // Update the database
    // We update is_shr_member to true for all selected IDs
    const { data, error } = await supabase
        .from('clinics')
        .update({ is_shr_member: true })
        .in('id', clinicIdsToUpdate)
        .select('slug, city');

    if (error) {
        console.error('Error updating SHR status:', error);
        throw new Error('Misslyckades att uppdatera databasen.');
    }

    // Revalidate paths
    revalidatePath('/admin/kliniker');
    if (data) {
        for (const clinic of data) {
            revalidatePath(`/kliniker/${slugifyCity(clinic.city)}/${clinic.slug}`);
        }
    }

    return { success: true, updatedCount: data?.length || 0 };
}

export async function autoFetchShrAction(city: string): Promise<CsvClinic[]> {
    const cheerio = await import('cheerio');
    
    // 1. Get form_build_id
    const res = await fetch('https://www.shr.nu/salongsok');
    const html = await res.text();
    const $ = cheerio.load(html);
    const formBuildId = $('input[name="form_build_id"]').last().val() as string;
    
    if (!formBuildId) {
        throw new Error('Kunde inte ansluta till SHR:s system (form_build_id saknas).');
    }

    const salons: CsvClinic[] = [];
    
    let page = 0;
    let hasMore = true;

    while (hasMore) {
        let pageHtml = '';
        if (page === 0) {
            const formData = new URLSearchParams();
            formData.append('searchstring', city);
            formData.append('op', 'SÖK');
            formData.append('form_build_id', formBuildId);
            formData.append('form_id', 'bluepin_salongsok_form');

            const postRes = await fetch('https://www.shr.nu/salongsok', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData.toString()
            });
            pageHtml = await postRes.text();
        } else {
            const getRes = await fetch(`https://www.shr.nu/salongsok?searchstring=${encodeURIComponent(city)}&page=${page}`);
            pageHtml = await getRes.text();
        }

        const $page = cheerio.load(pageHtml);
        const rows = $page('tr.odd, tr.even');
        
        if (rows.length === 0) {
            hasMore = false;
            break;
        }

        rows.each((_, el) => {
            const shopNameAttr = $page(el).attr('shop_name');
            const shopNameNode = $page(el).find('.shop-name').text().trim();
            const name = shopNameNode || shopNameAttr || '';
            
            const addressText = $page(el).find('td').eq(1).text().trim();
            const parts = addressText.split(' ');
            const extractedCity = parts.length > 0 ? parts[parts.length - 1] : city;

            if (name) {
                salons.push({ name, city: extractedCity });
            }
        });

        const nextButton = $page('.pager-next');
        if (nextButton.length === 0) {
            hasMore = false;
        } else {
            page++;
        }
        
        if (page > 30) break; // Hard limit to avoid Vercel timeouts (30 pages max per city is usually safe)
    }

    return salons;
}
