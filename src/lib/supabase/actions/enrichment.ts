'use server';

import * as cheerio from 'cheerio';
import { supabase } from '../client';
import { revalidatePath } from 'next/cache';

// A mapping from raw scraped Bokadirekt treatment names to our 9 Bättrehy categories
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

        $('script').each((_, el) => {
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
                        const betterImages = place.mainImages || place.galleryImages || place.images;
                        if (betterImages && Array.isArray(betterImages) && betterImages.length > 0) {
                            scrapedImageUrl = betterImages[0];
                        }

                            place.services.forEach((category: any) => {
                                if (category.services) {
                                    category.services.forEach((service: any) => {
                                        if (service.name) rawServices.add(service.name as string);
                                    });
                                }
                            });
                            foundData = true;
                        }
                    } catch (e) {
                        console.error("Failed to parse PRELOADED_STATE JSON", e);
                    }
                }
            });

        const extractedServices = Array.from(rawServices);

        if (!foundData) {
            throw new Error('Kunde inte hitta behandlingsdata på sidan.');
        }

        if (rawServices.size === 0) {
            throw new Error('Hittade inga behandlingar på sidan.');
        }

        let scrapedPhone = '';
        $('a[href^="tel:"]').each((_, el) => {
            if (!scrapedPhone) scrapedPhone = $(el).text().trim();
        });

        // 1. Update image and description if they are missing
        const { data: currentClinic } = await supabase.from('clinics').select('primary_image_url, description, phone').eq('id', clinicId).single();

        const updates: any = {};
        let fieldsUpdated = [];

        const genericBokadirektLogo = 'c9e021de-9b06-40d5-9334-1b5fc3425431';
        const hasNoImage = !currentClinic?.primary_image_url;
        const hasGenericImage = currentClinic?.primary_image_url?.includes(genericBokadirektLogo);

        if (currentClinic && (hasNoImage || hasGenericImage) && scrapedImageUrl && !scrapedImageUrl.includes(genericBokadirektLogo)) {
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

        // Map them to our internal slugs
        const matchedCategories = new Set<string>();

        Array.from(rawServices).forEach(serviceName => {
            const mappedSlug = mapTreatmentToCategory(serviceName);
            if (mappedSlug) {
                matchedCategories.add(mappedSlug);
            }
        });

        if (matchedCategories.size === 0) {
            if (Object.keys(updates).length > 0) {
                revalidatePath('/admin/kliniker');
                revalidatePath(`/admin/kliniker/[slug]`, 'page');
                revalidatePath('/');
            }
            return { success: true, message: `Hittade ${rawServices.size} behandlingar på Bokadirekt, men de matchade ingen huvudkategori.${bonusMsg}` };
        }

        // 2. Fetch our global treatments that match these slugs
        const { data: globalTreatments, error: gtErr } = await supabase
            .from('treatments')
            .select('id, slug, name')
            .in('slug', Array.from(matchedCategories));

        if (gtErr || !globalTreatments || globalTreatments.length === 0) {
            if (Object.keys(updates).length > 0) {
                revalidatePath('/admin/kliniker');
                revalidatePath(`/admin/kliniker/[slug]`, 'page');
                revalidatePath('/');
            }
            return { success: true, message: `Matchade kategorier, men kunde inte slå upp dem i vår databas.${bonusMsg}` };
        }

        // 3. Prepare the Junction Table inserts
        const inserts = globalTreatments.map((t: any) => ({
            clinic_id: clinicId,
            treatment_id: t.id
        }));

        // 4. Delete existing links to avoid dupes/errors
        await supabase.from('clinic_treatments').delete().eq('clinic_id', clinicId);

        // 5. Insert new links
        const { error: insertErr } = await supabase.from('clinic_treatments').insert(inserts);

        if (insertErr) {
            throw new Error(`DB Error: Kunde inte spara behandlingarna: ${insertErr.message}`);
        }

        // Revalidate the cache so the edit page checks the boxes automatically
        revalidatePath('/admin/kliniker');
        revalidatePath(`/admin/kliniker/[slug]`, 'page');
        revalidatePath('/');

        return {
            success: true,
            message: `Berikning lyckades! ${globalTreatments.length} Bättrehy-behandlingar matchades från ${rawServices.size} st på Bokadirekt.${bonusMsg}`,
            matched: globalTreatments.map((t: any) => t.name)
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
        
        $('a[href^="tel:"]').each((_, el) => {
            if (!phone) phone = $(el).text().trim();
        });

        // BOKADIREKT SPECIFIC OVERRIDES
        if (targetUrl.includes('bokadirekt.se')) {
            let foundData = false;
            $('script').each((_, el) => {
                if (foundData) return;
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
                            if (place.services) {
                                place.services.forEach((category: any) => {
                                    if (category.services) {
                                        category.services.forEach((service: any) => {
                                            if (service.name) services.push(service.name as string);
                                        });
                                    }
                                });
                            }
                            foundData = true;
                        }
                    } catch (e) {}
                }
            });
            // Clean up Bokadirekt title if it picked up the meta title
            if (name.includes('| Bokadirekt')) {
                name = name.split('|')[0].trim();
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

        if (image && !currentClinic?.primary_image_url) {
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
            revalidatePath('/admin/kliniker');
            revalidatePath(`/admin/kliniker/[slug]`, 'page');
            revalidatePath('/');
            return { success: true, message: `Berikade metadata (${fieldsUpdated.join(', ')}) från hemsidan.` };
        } else {
            return { success: true, message: `Hittade ingen ny information från hemsidan (eller fälten var redan ifyllda).` };
        }

    } catch (error: any) {
        console.error('Website enrichment failed:', error);
        throw new Error(error.message || 'Något gick fel vid berikningen från hemsidan.');
    }
}
