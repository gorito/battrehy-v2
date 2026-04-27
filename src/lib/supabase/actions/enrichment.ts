'use server';

import * as cheerio from 'cheerio';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { refineClinicDescription } from '@/lib/ai/gemini';
import { importExternalImage } from '../storage';

// A mapping from raw scraped Bokadirekt treatment names to our 9 Bättrehy categories
const GENERIC_BOKADIREKT_LOGO = 'c9e021de-9b06-40d5-9334-1b5fc3425431';

const GENERIC_IMAGE_KEYWORDS = [
    'placeholder', 'generic', 'avatar', 'default', 'social', 'sharing', 'pixel', 'spacer', 'favicon', 'icon-'
];

const SWEDISH_STOP_WORDS = ['och', 'det', 'att', 'i', 'en', 'jag', 'hon', 'som', 'han', 'på', 'den', 'med', 'var', 'sig', 'för', 'så', 'till', 'är', 'men', 'ett', 'om', 'hade', 'de', 'av', 'icke', 'mig', 'du', 'henne', 'då', 'sin', 'nu', 'har', 'inte', 'hans', 'honom', 'skulle', 'hennes', 'där', 'min', 'man', 'ej', 'vid', 'kunde', 'något', 'från', 'ut', 'när', 'efter', 'upp', 'vi', 'dem', 'vara', 'vad', 'över', 'än', 'dig', 'kan', 'sina', 'utav', 'skall', 'andra', 'själv', 'mer', 'dessa', 'någon', 'eller', 'under', 'några', 'nu', 'sedan', 'ju', 'denna', 'själva', 'omkring', 'varit', 'blivit', 'båda', 'mitt', 'vilka', 'bli', 'mina', 'vars', 'blir', 'mina', 'allt', 'vilket', 'eller', 'om', 'oss', 'skulle', 'idag', 'under', 'efter', 'kunnat', 'komma', 'skall', 'borde'];

const CLINIC_KEYWORDS = ['klinik', 'behandling', 'legitimerad', 'estetisk', 'skönhet', 'specialist', 'trygghet', 'erfarenhet', 'hudvård', 'injektion', 'bokadirekt', 'vård', 'patient', 'kvalitet', 'resultat'];

function scoreText(text: string): number {
    if (!text || text.length < 20) return 0;
    const lower = text.toLowerCase();
    
    // Check for common the generic placeholders or AI-generated defaults
    const isGeneric = 
        lower.includes('is a professional beauty and aesthetic clinic') || 
        lower.includes('visit us for high-quality treatments') ||
        lower.includes('här kan du boka tid') ||
        lower.includes('vår klinik erbjuder');
        
    if (isGeneric) return 5; // Very low score for generic placeholders

    let score = 0;
    
    // Length score (up to 40 points)
    score += Math.min(text.length / 50, 40);
    
    // Swedish language score (up to 50 points)
    let swedishHits = 0;
    SWEDISH_STOP_WORDS.forEach(word => {
        if (lower.includes(' ' + word + ' ')) swedishHits++;
    });
    score += Math.min(swedishHits * 5, 50);
    
    // Clinic keyword score (up to 30 points)
    let clinicHits = 0;
    CLINIC_KEYWORDS.forEach(word => {
        if (lower.includes(word)) clinicHits++;
    });
    score += Math.min(clinicHits * 5, 30);

    return score;
}

function extractRichDescription($: cheerio.CheerioAPI): string {
    const candidates: { text: string; score: number }[] = [];
    
    // Skip noisy elements
    $('nav, footer, script, style, header, .menu, .nav, #footer, #header, .sr-only, [aria-hidden="true"], .skip-link, .top-of-page').remove();

    // Look at paragraphs and divs with text
    $('p, h1, h2, h3, h4, div, section').each((_, el) => {
        // IMPROVED: Instead of just .text(), we use a helper to ensure spaces/periods between children
        let text = $(el).contents().map(function() {
            if (this.type === 'text') return $(this).text();
            // If it's a block-like child, add a period if it doesn't have one
            const childText = $(this).text().trim();
            if (!childText) return '';
            return childText + (/[.!?]$/.test(childText) ? ' ' : '. ');
        }).get().join(' ').trim().replace(/\s+/g, ' ');

        // Junk filter for common navigational residue
        if (text.toLowerCase().includes('top of page') || text.toLowerCase().includes('bottom of page')) {
            text = text.replace(/top of page/gi, '').replace(/bottom of page/gi, '').trim();
        }

        if (text.length > 50 && text.length < 2500) {
            candidates.push({ text, score: scoreText(text) });
        }
    });

    if (candidates.length === 0) return '';
    
    // Sort by score descending
    candidates.sort((a, b) => b.score - a.score);
    
    // Return the highest scoring block if it's "good enough"
    if (candidates[0].score > 20) {
        return candidates[0].text;
    }
    
    return '';
}

/**
 * Checks if an image URL is likely a generic placeholder or logo.
 */
function isGenericImage(url: string | null | undefined): boolean {
    if (!url) return true;
    const lowerUrl = url.toLowerCase();
    
    // Check for Bokadirekt generic logo
    if (lowerUrl.includes(GENERIC_BOKADIREKT_LOGO)) return true;
    
    // Check for common keywords that usually indicate a non-photo image
    if (GENERIC_IMAGE_KEYWORDS.some(keyword => lowerUrl.includes(keyword))) return true;
    
    // Check for common non-photo file types
    if (lowerUrl.endsWith('.ico') || lowerUrl.endsWith('.svg')) return true;
    
    return false;
}

function mapTreatmentToCategory(rawName: string): string | null {
    const name = rawName.toLowerCase();

    // 1. Dermal fillers
    if (name.includes('filler') || name.includes('läppförstoring') || name.includes('juvederm') || name.includes('restylane') || name.includes('tear trough')) {
        return 'dermal-fillers'; // using slug for matching
    }
    // 2. Botoxbehandling
    if (name.includes('botox') || name.includes('rynkbehandling') || name.includes('kråksparkar') || name.includes('glabella') || name.includes('botulinumtoxin') || name.includes('pannrynkor')) {
        return 'botoxbehandling';
    }
    // 3. Microneedling
    if (name.includes('microneedling') || name.includes('dermapen') || name.includes('skinpen')) {
        return 'microneedling';
    }
    // 4. Laserbehandling
    if (name.includes('laser') || name.includes('hårborttagning') || name.includes('ipl') || name.includes('fraktionerad') || name.includes('tatuering')) {
        return 'laserbehandling';
    }
    // 5. Anti-aging behandling
    if (name.includes('anti-age') || name.includes('profhilo') || name.includes('skinbooster') || name.includes('trådlyft') || name.includes('sculptra') || name.includes('radiesse')) {
        return 'anti-aging-behandling';
    }
    // 6. Ansiktsbehandling
    if (name.includes('ansiktsbehandling') || name.includes('portömning') || name.includes('ansiktsmassage') || name.includes('hydrafacial')) {
        return 'ansiktsbehandling';
    }
    // 7. Hudvård
    if ((name.includes('hudvård') || name.includes('peeling') || name.includes('prx')) && !name.includes('ansiktsbehandling')) {
        return 'hudvard';
    }
    // 8. Estetisk klinik
    if (name.includes('konsultation') || name.includes('läkarbesök')) {
        return 'estetisk-klinik';
    }
    // 9. Skönhetsklinik
    if (name.includes('skönhet') || name.includes('fransar') || name.includes('bryn')) {
        return 'skonhetsklinik';
    }

    return null;
}

/**
 * Shared logic to map raw service strings to Bättrehy categories and update the junction table.
 */
async function saveMappedTreatments(supabase: any, clinicId: string, rawServices: string[]) {
    if (!rawServices || rawServices.length === 0) return { matchedCount: 0, matchedNames: [] };

    const matchedCategories = new Set<string>();
    rawServices.forEach(serviceName => {
        const mappedSlug = mapTreatmentToCategory(serviceName);
        if (mappedSlug) {
            matchedCategories.add(mappedSlug);
        }
    });

    if (matchedCategories.size === 0) return { matchedCount: 0, matchedNames: [] };

    // Fetch our global treatments that match these slugs
    const { data: globalTreatments, error: gtErr } = await supabase
        .from('treatments')
        .select('id, slug, name')
        .in('slug', Array.from(matchedCategories));

    if (gtErr || !globalTreatments || globalTreatments.length === 0) {
        return { matchedCount: 0, matchedNames: [] };
    }

    // Prepare the Junction Table inserts
    const inserts = globalTreatments.map((t: any) => ({
        clinic_id: clinicId,
        treatment_id: t.id
    }));

    // Delete existing links to avoid dupes/errors
    await supabase.from('clinic_treatments').delete().eq('clinic_id', clinicId);

    // Insert new links
    const { error: insertErr } = await supabase.from('clinic_treatments').insert(inserts);

    if (insertErr) {
        throw new Error(`DB Error: Kunde inte spara behandlingarna: ${insertErr.message}`);
    }

    return { 
        matchedCount: globalTreatments.length, 
        matchedNames: globalTreatments.map((t: any) => t.name) 
    };
}

export async function enrichClinicTreatmentsAction(clinicId: string, url: string) {
    if (!url || !url.includes('bokadirekt.se')) {
        throw new Error('Måste vara en giltig Bokadirekt-URL för att berika behandlingar.');
    }

    const supabase = await createClient();

    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' // Prevent basic bot blocking
            },
            signal: AbortSignal.timeout(15000) // Increased timeout for slower profiles
        });

        if (!res.ok) {
            return { 
                success: false, 
                message: `Kunde inte ladda Bokadirekt (Status: ${res.status}). Det kan vara en tillfällig störning eller så är länken ogiltig.` 
            };
        }

        const html = await res.text();
        const $ = cheerio.load(html);

        let rawServices = new Set<string>();
        let foundData = false;
        let scrapedDescription = '';
        let scrapedImageUrl = '';
        let scrapedPhone = '';

        // Check for "unverified" profile links which lack the PRELOADED_STATE JSON
        if (url.includes('/profile-places/')) {
            const title = $('meta[property="og:title"]').attr('content') || $('title').text() || '';
            const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
            
            return {
                success: false,
                message: `Detta är en obekräftad profil på Bokadirekt (${title}). Den saknar tyvärr det tekniska dataformat som krävs för att automatiskt hämta behandlingar och telefonnummer.`
            };
        }

        // Extract the hero image from meta tags
        scrapedImageUrl = $('meta[property="og:image"]').attr('content') || '';

        // BOKADIREKT SPECIFIC EXTRACTION
        if (url.includes('bokadirekt.se')) {
            const scripts = $('script').toArray();
            for (const el of scripts) {
                const text = $(el).html();
                if (text && text.includes('__PRELOADED_STATE__')) {
                    try {
                        const jsonStart = text.indexOf('{');
                        // Use balanced brace matching to extract the JSON object, 
                        // as there might be more JS after the initialization.
                        let jsonStr = '';
                        let depth = 0;
                        for (let i = jsonStart; i < text.length; i++) {
                            if (text[i] === '{') depth++;
                            else if (text[i] === '}') {
                                depth--;
                                if (depth === 0) {
                                    jsonStr = text.substring(jsonStart, i + 1);
                                    break;
                                }
                            }
                        }

                        if (!jsonStr) continue;
                        const data = JSON.parse(jsonStr);

                        const place = data?.place;
                        if (place) {
                            // Merge description and welcomeText for a richer result
                            const bdDesc = place.about?.description || '';
                            const bdWelcome = place.about?.welcomeText || '';
                            
                            // Heuristic: If welcome text is unique and long enough, prepend it
                            if (bdWelcome && bdWelcome.length > 20 && !bdDesc.includes(bdWelcome.substring(0, 20))) {
                                scrapedDescription = `${bdWelcome}\n\n${bdDesc}`.trim();
                            } else {
                                scrapedDescription = bdDesc || bdWelcome;
                            }

                            if (place.contact && place.contact.phone) {
                                scrapedPhone = place.contact.phone;
                            }

                            const possibleImageSources = [
                                place.about?.mainImages,
                                place.about?.photos?.map((p: any) => p.url),
                                place.about?.galleryImages,
                                place.about?.images,
                                place.mainImages,
                                place.galleryImages,
                                place.images,
                                place.photos?.map((p: any) => p.url)
                            ];

                            for (const arr of possibleImageSources) {
                                if (arr && Array.isArray(arr)) {
                                    const validImage = arr.find(img => 
                                        img && typeof img === 'string' && !img.includes(GENERIC_BOKADIREKT_LOGO)
                                    );
                                    if (validImage) {
                                        scrapedImageUrl = validImage;
                                        break;
                                    }
                                }
                            }

                            if (place.services) {
                                for (const category of place.services) {
                                    if (category.services) {
                                        for (const service of category.services) {
                                            if (service.name) rawServices.add(service.name as string);
                                        }
                                    }
                                }
                            }
                            foundData = true;
                        }
                    } catch (e) {
                        console.error("Failed to parse Bokadirekt state", e);
                    }
                }
            }
        }

        if (!foundData || rawServices.size === 0) {
            // Fallback: If we didn't find JSON data, let's at least see if there are any <h3>/<h4> or list items that look like services
            const headings = $('h3, h4, .service-name, .treatment-title').toArray();
            for (const h of headings) {
                const text = $(h).text().trim();
                if (text.length > 3 && text.length < 60) rawServices.add(text);
            }
            
            if (rawServices.size === 0) {
                return { 
                    success: false, 
                    message: 'Kunde inte hitta några behandlingar eller detaljerad information på denna sida. Bokadirekt-sidan kan ha ett format som ännu inte stöds.' 
                };
            }
            foundData = true; // Proceed with scraped headings as raw services
        }

        const extractedServices = Array.from(rawServices);

        const telLinks = $('a[href^="tel:"]').toArray();
        for (const el of telLinks) {
            if (!scrapedPhone) scrapedPhone = $(el).text().trim();
        }

        // 1. Update image and description if they are missing
        const { data: currentClinic } = await supabase.from('clinics').select('primary_image_url, description, phone').eq('id', clinicId).single();

        const updates: any = {};
        let fieldsUpdated = [];

        const isExternal = currentClinic?.primary_image_url && !currentClinic.primary_image_url.includes('supabase.co');
        const hasNoImage = !currentClinic?.primary_image_url;
        const currentIsGeneric = isGenericImage(currentClinic?.primary_image_url);

        if (scrapedImageUrl && !isGenericImage(scrapedImageUrl)) {
            // Only update if: 1. No image, 2. Current is generic, or 3. Current is external (to host it)
            if (hasNoImage || currentIsGeneric || isExternal) {
                const hostedUrl = await importExternalImage(scrapedImageUrl.replace('http://', 'https://'));
                updates.primary_image_url = hostedUrl;
                fieldsUpdated.push('bild');
            }
        }

        const currentDescription = currentClinic?.description || '';
        const currentDescScore = scoreText(currentDescription);
        const newDescScore = scoreText(scrapedDescription);

        // Update description if it's currently very poor OR if the new one is much better
        if (scrapedDescription && (currentDescScore < 20 || newDescScore > currentDescScore * 1.2)) {
            console.log(`[Enrichment] Updating description. Old score: ${currentDescScore}, New score: ${newDescScore}`);
            
            // AI Refinement for better formatting
            let finalDescription = scrapedDescription;
            try {
                const { data: clinicNameData } = await supabase.from('clinics').select('name').eq('id', clinicId).single();
                const clinicName = clinicNameData?.name || 'Kliniken';
                finalDescription = await refineClinicDescription(scrapedDescription, clinicName);
            } catch (e) {
                console.warn("[AI] Refinement failed, using raw description", e);
            }
            
            updates.description = finalDescription.substring(0, 3000);
            fieldsUpdated.push(currentDescription ? 'uppdaterad text' : 'text');
        }

        if (currentClinic && !currentClinic.phone && scrapedPhone) {
            updates.phone = scrapedPhone.substring(0, 20);
            fieldsUpdated.push('telefon');
        }

        if (extractedServices.length > 0) {
            updates.extracted_services = extractedServices;
            fieldsUpdated.push('tjänster');
        }

        if (Object.keys(updates).length > 0) {
            await supabase.from('clinics').update(updates).eq('id', clinicId);
        }

        const bonusMsg = fieldsUpdated.length > 0 ? ` (La även till saknad ${fieldsUpdated.join(' och ')}!)` : '';

        // Map and save treatments using shared logic
        const mappingResult = await saveMappedTreatments(supabase, clinicId, extractedServices);

        if (mappingResult.matchedCount === 0) {
            if (Object.keys(updates).length > 0) {
                revalidatePath('/admin/kliniker');
                revalidatePath(`/admin/kliniker/[slug]`, 'page');
                revalidatePath('/');
            }
            return { success: true, message: `Hittade ${rawServices.size} behandlingar på Bokadirekt, men de matchade ingen huvudkategori.${bonusMsg}` };
        }

        // Revalidate the cache so the edit page checks the boxes automatically
        revalidatePath('/admin/kliniker');
        revalidatePath(`/admin/kliniker/[slug]`, 'page');
        revalidatePath('/');

        return {
            success: true,
            message: `Berikning lyckades! ${mappingResult.matchedCount} Bättrehy-behandlingar matchades från ${rawServices.size} st på Bokadirekt.${bonusMsg}`,
            matched: mappingResult.matchedNames
        };

    } catch (error: any) {
        console.error('Enrichment failed:', error);
        return {
            success: false,
            message: error.message || 'Ett oväntat fel uppstod vid berikningen.'
        };
    }
}

export async function fetchClinicMetadataAction(url: string) {
    if (!url) throw new Error("URL saknas");

    let targetUrl = url;
    if (!targetUrl.startsWith('http')) {
        targetUrl = 'https://' + targetUrl;
    }

    try {
        const res = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            },
            signal: AbortSignal.timeout(10000)
        });

        if (!res.ok) {
            throw new Error(`Kunde inte ladda webbsidan (Status: ${res.status})`);
        }

        const html = await res.text();
        const $ = cheerio.load(html);

        let name = '';
        let description = '';
        let image = '';
        let phone = '';
        let services: string[] = [];

        // Universal extractors
        image = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content') || '';
        if (image && image.startsWith('/')) {
            try {
                const urlObj = new URL(targetUrl);
                image = `${urlObj.origin}${image}`;
            } catch (e) {}
        }
        
        const telLinks = $('a[href^="tel:"]').toArray();
        for (const el of telLinks) {
            if (!phone) phone = $(el).text().trim();
        }

        // Try to get a rich description from the body first (prioritizing Swedish)
        const richDesc = extractRichDescription($);
        description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
        name = $('meta[property="og:title"]').attr('content') || $('title').text() || '';
        
        // If we found a good body description, use it instead of possibly junk/English meta tags
        if (richDesc && (scoreText(richDesc) > scoreText(description))) {
            description = richDesc;
        }

        // BOKADIREKT SPECIFIC OVERRIDES
        if (targetUrl.includes('bokadirekt.se')) {
            let foundData = false;
            const bdScripts = $('script').toArray();
            for (const el of bdScripts) {
                if (foundData) break;
                const text = $(el).html();
                if (text && text.includes('__PRELOADED_STATE__')) {
                    try {
                        const jsonStart = text.indexOf('{');
                        // Use balanced brace matching to extract the JSON object, 
                        // as there might be more JS after the initialization.
                        let jsonStr = '';
                        let depth = 0;
                        for (let i = jsonStart; i < text.length; i++) {
                            if (text[i] === '{') depth++;
                            else if (text[i] === '}') {
                                depth--;
                                if (depth === 0) {
                                    jsonStr = text.substring(jsonStart, i + 1);
                                    break;
                                }
                            }
                        }

                        if (!jsonStr) continue;
                        const data = JSON.parse(jsonStr);

                        const place = data?.place;
                        if (place) {
                            if (place.name) name = place.name;
                            
                            // Merge description and welcomeText
                            const bdDesc = place.about?.description || '';
                            const bdWelcome = place.about?.welcomeText || '';
                            
                            if (bdWelcome && bdWelcome.length > 20 && !bdDesc.includes(bdWelcome.substring(0, 20))) {
                                description = `${bdWelcome}\n\n${bdDesc}`.trim();
                            } else {
                                description = bdDesc || bdWelcome;
                            }
                            
                            // Try to find a real image instead of the generic logo
                            const possibleImageSources = [
                                place.about?.mainImages,
                                place.about?.photos?.map((p: any) => p.url),
                                place.about?.galleryImages,
                                place.about?.images,
                                place.mainImages,
                                place.galleryImages,
                                place.images,
                                place.photos?.map((p: any) => p.url)
                            ];

                            for (const arr of possibleImageSources) {
                                if (arr && Array.isArray(arr)) {
                                    const validImage = arr.find(img => 
                                        img && typeof img === 'string' && !img.includes(GENERIC_BOKADIREKT_LOGO)
                                    );
                                    if (validImage) {
                                        image = validImage;
                                        break;
                                    }
                                }
                            }

                            if (place.services) {
                                for (const category of place.services) {
                                    if (category.services) {
                                        for (const service of category.services) {
                                            if (service.name) services.push(service.name as string);
                                        }
                                    }
                                }
                            }
                            foundData = true;
                        }
                    } catch (e) {
                        console.error("Failed to parse Bokadirekt metadata", e);
                    }
                }
            }
            // Clean up Bokadirekt title if it picked up the meta title
            if (name.includes('| Bokadirekt')) {
                name = name.split('|')[0].trim();
            }
        } else {
            // GENERIC WEBSITE SCRAPING for services/treatments
            const possibleTreatments = new Set<string>();
            
            // 1. Look for links with "behandling" or "tjanst"
            $('a').each((_, el) => {
                const text = $(el).text().trim();
                const href = $(el).attr('href') || '';
                
                if (text && text.length > 3 && text.length < 50) {
                    if (mapTreatmentToCategory(text) || href.includes('behandling') || href.includes('tjanster')) {
                        // Only add if it's likely a treatment name
                        if (mapTreatmentToCategory(text)) {
                            possibleTreatments.add(text);
                        }
                    }
                }
            });

            // 2. Look for headings that match our categories
            $('h2, h3, h4').each((_, el) => {
                const text = $(el).text().trim();
                if (text && text.length > 3 && text.length < 50) {
                    if (mapTreatmentToCategory(text)) {
                        possibleTreatments.add(text);
                    }
                }
            });

            services = Array.from(possibleTreatments);

            // 3. SUBPATH CHECK if nothing found on home page OR if description is very short
            if ((services.length === 0 || description.length < 100) && (targetUrl.endsWith('.se') || targetUrl.endsWith('.se/') || targetUrl.endsWith('.com') || targetUrl.endsWith('.com/'))) {
                const subpaths = ['om-oss', 'om-kliniken', 'kliniken', 'behandlingar', 'tjanster', 'vara-behandlingar', 'våra-behandlingar'];
                for (const sub of subpaths) {
                    try {
                        const baseUrl = targetUrl.endsWith('/') ? targetUrl : targetUrl + '/';
                        const subUrl = baseUrl + sub;
                        const subRes = await fetch(subUrl, { 
                            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
                            signal: AbortSignal.timeout(5000)
                        });
                        if (subRes.ok) {
                            const subHtml = await subRes.text();
                            const $sub = cheerio.load(subHtml);
                            
                            // Try to get description if current one is weak
                            if (description.length < 200) {
                                const subDesc = extractRichDescription($sub);
                                if (subDesc && scoreText(subDesc) > scoreText(description)) {
                                    description = subDesc;
                                }
                            }

                            const subTreatments = new Set<string>();
                            $sub('a, h2, h3').each((_, el) => {
                                const subText = $sub(el).text().trim();
                                if (subText && subText.length > 3 && subText.length < 50 && mapTreatmentToCategory(subText)) {
                                    subTreatments.add(subText);
                                }
                            });
                            
                            if (subTreatments.size > 0) {
                                services = [...new Set([...services, ...Array.from(subTreatments)])];
                            }
                        }
                    } catch (e) {}
                }
            }
        }

        // 4. HEURISTIC IMAGE SCRAPING if meta tags are missing or generic
        if (!image || isGenericImage(image)) {
            const possibleImages: { url: string; score: number }[] = [];
            
            $('img').each((_, el) => {
                let src = $(el).attr('src') || '';
                const alt = $(el).attr('alt')?.toLowerCase() || '';
                const className = $(el).attr('class')?.toLowerCase() || '';
                const id = $(el).attr('id')?.toLowerCase() || '';
                
                if (!src) return;
                
                // Absolute URL resolution
                if (src.startsWith('/')) {
                    try {
                        const urlObj = new URL(targetUrl);
                        src = `${urlObj.origin}${src}`;
                    } catch (e) {}
                }
                
                if (!src.startsWith('http')) return;
                
                let score = 0;
                
                // Keywords that suggest a good clinic/hero image
                const goodKeywords = ['clinic', 'hero', 'salon', 'about', 'facility', 'premises', 'interior', 'exterior', 'treatment', 'portrait'];
                goodKeywords.forEach(kw => {
                    if (src.toLowerCase().includes(kw) || alt.includes(kw) || className.includes(kw) || id.includes(kw)) score += 20;
                });
                
                // Keywords that suggest a bad image (logo, icons, etc)
                const badKeywords = ['logo', 'icon', 'small', 'thumb', 'avatar', 'generic', 'placeholder', 'social', 'facebook', 'instagram', 'twitter', 'linkedin'];
                badKeywords.forEach(kw => {
                    if (src.toLowerCase().includes(kw) || alt.includes(kw) || className.includes(kw) || id.includes(kw)) score -= 30;
                });
                
                // File extension check
                if (src.match(/\.(jpg|jpeg|png|webp)$/i)) score += 10;
                if (src.match(/\.(svg|ico)$/i)) score -= 50;
                
                if (score > 10) {
                    possibleImages.push({ url: src, score });
                }
            });
            
            if (possibleImages.length > 0) {
                possibleImages.sort((a, b) => b.score - a.score);
                const bestImage = possibleImages[0].url;
                if (!isGenericImage(bestImage)) {
                    image = bestImage;
                }
            }
        }

        // NEW: AI Refinement step
        let finalDescription = description;
        if (description && description.length > 100) {
            console.log(`[AI] Refining description for ${name}...`);
            finalDescription = await refineClinicDescription(description, name);
        }

        return { 
            success: true, 
            data: {
                name: name.trim(),
                description: finalDescription.substring(0, 3000),
                image,
                phone: phone.substring(0, 20),
                website: targetUrl,
                services: [...new Set(services)]
            }
        };

    } catch (error: any) {
        console.error('Metadata fetch failed:', error);
        return { success: false, error: error.message || 'Ett fel uppstod vid hämtning' };
    }
}

export async function enrichClinicFromWebsiteAction(clinicId: string, url: string) {
    if (!url) throw new Error("URL saknas");

    const supabase = await createClient();

    try {
        const metadataRes = await fetchClinicMetadataAction(url);
        if (!metadataRes.success || !metadataRes.data) {
            throw new Error(metadataRes.error || 'Kunde inte hämta metadata.');
        }

        const { description, image, phone, services } = metadataRes.data;

        const { data: currentClinic } = await supabase.from('clinics').select('primary_image_url, description, phone').eq('id', clinicId).single();

        const updates: any = {};
        let fieldsUpdated = [];

        const isExternal = currentClinic?.primary_image_url && !currentClinic.primary_image_url.includes('supabase.co');
        const currentIsGeneric = isGenericImage(currentClinic?.primary_image_url);

        if (image && !isGenericImage(image)) {
            if (currentIsGeneric || !currentClinic?.primary_image_url || isExternal) {
                updates.primary_image_url = await importExternalImage(image);
                fieldsUpdated.push('bild');
            }
        }

        if (description && !currentClinic?.description) {
            updates.description = description;
            fieldsUpdated.push('beskrivning');
        }

        if (phone && !currentClinic?.phone) {
            updates.phone = phone;
            fieldsUpdated.push('telefon');
        }

        if (services && services.length > 0) {
            updates.extracted_services = services;
            fieldsUpdated.push('tjänster');
        }

        if (Object.keys(updates).length > 0) {
            const { error: updateErr } = await supabase.from('clinics').update(updates).eq('id', clinicId);
            if (updateErr) {
                throw new Error(`Kunde inte spara till databasen: ${updateErr.message}`);
            }
        }

        // Map and save treatments using shared logic
        let mappingMsg = '';
        if (services && services.length > 0) {
            const mappingResult = await saveMappedTreatments(supabase, clinicId, services);
            if (mappingResult.matchedCount > 0) {
                mappingMsg = ` samt matchade ${mappingResult.matchedCount} behandlingar`;
            }
        }

        if (Object.keys(updates).length > 0 || mappingMsg) {
            revalidatePath('/admin/kliniker');
            revalidatePath(`/admin/kliniker/[slug]`, 'page');
            revalidatePath('/');
            return { success: true, message: `Berikade metadata (${fieldsUpdated.join(', ') || 'behandlingar'})${mappingMsg} från hemsidan.` };
        } else {
            return { success: true, message: `Hittade ingen ny information från hemsidan (eller fälten var redan ifyllda).` };
        }

    } catch (error: any) {
        console.error('Website enrichment failed:', error);
        throw new Error(error.message || 'Något gick fel vid berikningen från hemsidan.');
    }
}
