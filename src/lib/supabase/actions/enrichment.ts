'use server';

import * as cheerio from 'cheerio';
import { supabase } from '../client';
import { revalidatePath } from 'next/cache';

// A mapping from raw scraped Bokadirekt treatment names to our 9 Bättrehy categories
const GENERIC_BOKADIREKT_LOGO = 'c9e021de-9b06-40d5-9334-1b5fc3425431';

const GENERIC_IMAGE_KEYWORDS = [
    'placeholder', 'generic', 'avatar', 'default', 'social', 'sharing', 'pixel', 'spacer', 'favicon', 'icon-'
];

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
async function saveMappedTreatments(clinicId: string, rawServices: string[]) {
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

    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' // Prevent basic bot blocking
            }
        });

        if (!res.ok) {
            throw new Error(`Kunde inte ladda Bokadirekt (Status: ${res.status})`);
        }

        const html = await res.text();
        const $ = cheerio.load(html);

        let rawServices = new Set<string>();
        let foundData = false;
        let scrapedDescription = '';

        // Extract the hero image from meta tags
        let scrapedImageUrl = $('meta[property="og:image"]').attr('content') || '';
        let scrapedPhone = '';

        const scripts = $('script').toArray();
        for (const el of scripts) {
            const text = $(el).html();
            if (text && text.includes('window.__PRELOADED_STATE__ = {')) {
                try {
                    const jsonStart = text.indexOf('{');
                    const jsonEnd = text.lastIndexOf('}') + 1;
                    const jsonStr = text.substring(jsonStart, jsonEnd);
                    const data = JSON.parse(jsonStr);

                    const place = data?.place;
                    if (place) {
                        if (place.about && place.about.description) {
                            scrapedDescription = place.about.description;
                        }
                        
                        if (place.contact && place.contact.phone) {
                            scrapedPhone = place.contact.phone;
                        }

                        // Try to find a real image instead of the generic logo
                        // Research has shown that images are nested inside place.about
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
                        
                        if (scrapedImageUrl) {
                            console.log(`[Enrichment] Selected image: ${scrapedImageUrl}`);
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
                    console.error("Failed to parse PRELOADED_STATE JSON", e);
                }
            }
        }

        const extractedServices = Array.from(rawServices);

        if (!foundData) {
            throw new Error('Kunde inte hitta behandlingsdata på sidan.');
        }

        if (rawServices.size === 0) {
            throw new Error('Hittade inga behandlingar på sidan.');
        }

        const telLinks = $('a[href^="tel:"]').toArray();
        for (const el of telLinks) {
            if (!scrapedPhone) scrapedPhone = $(el).text().trim();
        }

        // 1. Update image and description if they are missing
        const { data: currentClinic } = await supabase.from('clinics').select('primary_image_url, description, phone').eq('id', clinicId).single();

        const updates: any = {};
        let fieldsUpdated = [];

        const hasNoImage = !currentClinic?.primary_image_url;
        const currentIsGeneric = isGenericImage(currentClinic?.primary_image_url);

        if (currentClinic && (hasNoImage || currentIsGeneric) && scrapedImageUrl && !isGenericImage(scrapedImageUrl)) {
            updates.primary_image_url = scrapedImageUrl.replace('http://', 'https://');
            fieldsUpdated.push('bild');
        }

        if (currentClinic && !currentClinic.description && scrapedDescription) {
            updates.description = scrapedDescription.substring(0, 1000);
            fieldsUpdated.push('text');
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
        const mappingResult = await saveMappedTreatments(clinicId, extractedServices);

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
        throw new Error(error.message || 'Något gick fel vid berikningen.');
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
        
        description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
        name = $('meta[property="og:title"]').attr('content') || $('title').text() || '';
        
        const telLinks = $('a[href^="tel:"]').toArray();
        for (const el of telLinks) {
            if (!phone) phone = $(el).text().trim();
        }

        // BOKADIREKT SPECIFIC OVERRIDES
        if (targetUrl.includes('bokadirekt.se')) {
            let foundData = false;
            const bdScripts = $('script').toArray();
            for (const el of bdScripts) {
                if (foundData) break;
                const text = $(el).html();
                if (text && text.includes('window.__PRELOADED_STATE__ = {')) {
                    try {
                        const jsonStart = text.indexOf('{');
                        const jsonEnd = text.lastIndexOf('}') + 1;
                        const jsonStr = text.substring(jsonStart, jsonEnd);
                        const data = JSON.parse(jsonStr);

                        const place = data?.place;
                        if (place) {
                            if (place.name) name = place.name;
                            if (place.about && place.about.description) {
                                description = place.about.description;
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

                            if (image) {
                                console.log(`[Metadata] Selected image: ${image}`);
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
                    } catch (e) {}
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

            // 3. SUBPATH CHECK if nothing found on home page
            if (services.length === 0 && (targetUrl.endsWith('.se') || targetUrl.endsWith('.se/') || targetUrl.endsWith('.com') || targetUrl.endsWith('.com/'))) {
                const subpaths = ['behandlingar', 'tjanster', 'vara-behandlingar', 'våra-behandlingar'];
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
                            const subTreatments = new Set<string>();
                            
                            $sub('a, h2, h3').each((_, el) => {
                                const subText = $sub(el).text().trim();
                                if (subText && subText.length > 3 && subText.length < 50 && mapTreatmentToCategory(subText)) {
                                    subTreatments.add(subText);
                                }
                            });
                            
                            if (subTreatments.size > 0) {
                                services = Array.from(subTreatments);
                                break;
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

        return { 
            success: true, 
            data: {
                name: name.trim(),
                description: description.trim().substring(0, 1000),
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

    try {
        const metadataRes = await fetchClinicMetadataAction(url);
        if (!metadataRes.success || !metadataRes.data) {
            throw new Error(metadataRes.error || 'Kunde inte hämta metadata.');
        }

        const { description, image, phone, services } = metadataRes.data;

        const { data: currentClinic } = await supabase.from('clinics').select('primary_image_url, description, phone').eq('id', clinicId).single();

        const updates: any = {};
        let fieldsUpdated = [];

        const currentIsGeneric = isGenericImage(currentClinic?.primary_image_url);

        if (image && (currentIsGeneric || !currentClinic?.primary_image_url)) {
            updates.primary_image_url = image;
            fieldsUpdated.push('bild');
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
            const mappingResult = await saveMappedTreatments(clinicId, services);
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
