import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

interface Salon {
    name: string;
    address: string;
    phone: string;
    therapists: string;
}

// Scrape page helper
async function scrapePage(page: number): Promise<Salon[]> {
    const url = `https://www.shr.nu/salongsok?searchstring=%20&page=${page}`;
    const res = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);
    const salons: Salon[] = [];

    $('table.sticky-enabled tbody tr').each((_, el) => {
        const tds = $(el).find('td');
        if (tds.length >= 4) {
            const name = $(tds[0]).text().trim();
            const address = $(tds[1]).text().trim();
            const phone = $(tds[2]).text().trim();
            const therapists = $(tds[3]).text().trim();
            if (name) {
                salons.push({ name, address, phone, therapists });
            }
        }
    });
    return salons;
}

// Extract City name from SHR address string (e.g. "Dalbyvägen 1, 232 34 Arlöv" -> "Arlöv")
function extractCity(address: string): string {
    const parts = address.split(',');
    if (parts.length < 2) return '';
    const lastPart = parts[parts.length - 1].trim();
    // Match ZIP code and city name (e.g. "115 41 Stockholm" or "23234 Arlöv")
    const match = lastPart.match(/(?:\d{3}\s*\d{2}|\d{5})\s+(.+)/);
    if (match) return match[1].trim().toLowerCase();
    return lastPart.replace(/[\d\s]/g, '').trim().toLowerCase();
}

async function main() {
    console.log("1. Scraping current SHR member registry...");
    
    // Check total pages
    const firstPageRes = await fetch('https://www.shr.nu/salongsok?searchstring=%20&page=0');
    const firstPageHtml = await firstPageRes.text();
    const $ = cheerio.load(firstPageHtml);
    const infoText = $('.bp-results-info').text().trim();
    const match = infoText.match(/(\d+)/);
    
    let totalResults = 1110;
    if (match) totalResults = parseInt(match[1], 10);
    const totalPages = Math.ceil(totalResults / 10);
    console.log(`Found ${totalResults} active SHR members (${totalPages} pages).`);

    const scrapedMembers: Salon[] = [];
    for (let p = 0; p < totalPages; p++) {
        try {
            const salons = await scrapePage(p);
            scrapedMembers.push(...salons);
            await delay(50);
        } catch (e: any) {
            console.error(`Error page ${p}: ${e.message}. Retrying...`);
            await delay(1000);
            try {
                const salons = await scrapePage(p);
                scrapedMembers.push(...salons);
            } catch (err: any) {
                console.error(`Skipping page ${p}: ${err.message}`);
            }
        }
    }
    console.log(`Scraped ${scrapedMembers.length} active SHR members.`);

    console.log("\n2. Fetching current clinics from Supabase...");
    const { data: dbClinics, error: fetchErr } = await supabase
        .from('clinics')
        .select('id, name, city, phone, address, is_shr_member');

    if (fetchErr || !dbClinics) {
        console.error("Failed to fetch database clinics:", fetchErr);
        return;
    }
    console.log(`Fetched ${dbClinics.length} clinics from database.`);

    const matchMap = new Map<string, Salon>(); // clinic_id -> scraped matching salon
    
    // We try to match clinics in database to the scraped SHR members
    for (const clinic of dbClinics) {
        const dbNameClean = clinic.name.toLowerCase().replace(/\s+/g, '');
        const dbCityClean = clinic.city.toLowerCase().trim();
        const dbPhoneClean = (clinic.phone || '').replace(/[^0-9]/g, '');

        // Find candidate matches
        const matches = scrapedMembers.filter(member => {
            const memberNameClean = member.name.toLowerCase().replace(/\s+/g, '');
            const memberCityClean = extractCity(member.address);
            const memberPhoneClean = member.phone.replace(/[^0-9]/g, '');

            // Match conditions:
            // A. Direct Phone Match (Strongest)
            if (dbPhoneClean && memberPhoneClean && dbPhoneClean === memberPhoneClean) {
                return true;
            }

            // B. Name and City Match
            if (dbNameClean === memberNameClean && dbCityClean === memberCityClean) {
                return true;
            }

            // C. Partial Name and City Match
            if (dbCityClean === memberCityClean && 
                (dbNameClean.includes(memberNameClean) || memberNameClean.includes(dbNameClean)) && 
                Math.abs(dbNameClean.length - memberNameClean.length) < 8) {
                return true;
            }

            return false;
        });

        if (matches.length > 0) {
            matchMap.set(clinic.id, matches[0]);
        }
    }

    console.log(`\nMatched ${matchMap.size} clinics with active SHR registry.`);

    // 3. Compare with DB status
    const toTagTrue: string[] = [];
    const toTagFalse: string[] = [];

    for (const clinic of dbClinics) {
        const hasMatchingRegistry = matchMap.has(clinic.id);
        
        if (hasMatchingRegistry && !clinic.is_shr_member) {
            toTagTrue.push(clinic.id);
            console.log(`[+] New Member: ${clinic.name} (${clinic.city})`);
        } else if (!hasMatchingRegistry && clinic.is_shr_member) {
            toTagFalse.push(clinic.id);
            console.log(`[-] Membership Removed/Cancelled: ${clinic.name} (${clinic.city})`);
        }
    }

    // 4. Run updates in DB
    if (toTagTrue.length > 0) {
        console.log(`\nTagging ${toTagTrue.length} new SHR members in DB...`);
        const { error } = await supabase
            .from('clinics')
            .update({ is_shr_member: true })
            .in('id', toTagTrue);
        if (error) console.error("Error tagging true:", error.message);
    }

    if (toTagFalse.length > 0) {
        console.log(`Untagging ${toTagFalse.length} cancelled SHR members in DB...`);
        const { error } = await supabase
            .from('clinics')
            .update({ is_shr_member: false })
            .in('id', toTagFalse);
        if (error) console.error("Error tagging false:", error.message);
    }

    console.log("\nSync Complete! 🎉");
}

main().catch(console.error);
