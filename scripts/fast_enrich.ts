import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

async function main() {
    const { data: clinics, error } = await supabase
        .from('clinics')
        .select('id, name, website, booking_url, description, primary_image_url');

    if (error) {
        console.error('Error fetching clinics:', error);
        return;
    }

    let needsEnrichment = clinics.filter(c => 
        !c.description || 
        c.description.length < 50 || 
        c.description.includes('is a professional beauty and aesthetic clinic located in') ||
        c.description.includes('Discover and connect with verified local businesses worldwide')
    );

    console.log(`Targeting ${needsEnrichment.length} clinics for fast direct extraction...`);

    let successCount = 0;

    for (let i = 0; i < needsEnrichment.length; i++) {
        const clinic = needsEnrichment[i];
        const targetUrl = clinic.website || clinic.booking_url;
        
        if (!targetUrl) continue;

        try {
            const res = await fetch(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
            if (!res.ok) continue;
            const html = await res.text();
            const $ = cheerio.load(html);

            let rawDescription = '';
            let image = '';

            if (targetUrl.includes('bokadirekt.se')) {
                const scripts = $('script').toArray();
                for (const el of scripts) {
                    const text = $(el).html();
                    if (text && text.includes('__PRELOADED_STATE__')) {
                        try {
                            const jsonStart = text.indexOf('{');
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
                            if (jsonStr) {
                                const data = JSON.parse(jsonStr);
                                const place = data?.place;
                                if (place) {
                                    const bdDesc = place.about?.description || '';
                                    const bdWelcome = place.about?.welcomeText || '';
                                    if (bdWelcome && bdWelcome.length > 20 && !bdDesc.includes(bdWelcome.substring(0, 20))) {
                                        rawDescription = `${bdWelcome}\n\n${bdDesc}`.trim();
                                    } else {
                                        rawDescription = bdDesc || bdWelcome;
                                    }
                                    
                                    const possibleImages = [
                                        place.about?.mainImages,
                                        place.about?.galleryImages,
                                        place.mainImages,
                                        place.galleryImages
                                    ];
                                    for (const arr of possibleImages) {
                                        if (arr && Array.isArray(arr)) {
                                            const validImage = arr.find((img: string) => img && typeof img === 'string' && !img.includes('c9e021de'));
                                            if (validImage) {
                                                image = validImage;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        } catch (e) {
                        }
                    }
                }
            } else {
                rawDescription = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
                image = $('meta[property="og:image"]').attr('content') || '';
            }

            if (rawDescription.includes('Discover and connect with verified local businesses')) {
                rawDescription = '';
            }

            const updates: any = {};
            if (rawDescription && rawDescription.length > 50) {
                updates.description = rawDescription.substring(0, 3000);
            }
            if (image && !clinic.primary_image_url) {
                updates.primary_image_url = image;
            }

            if (Object.keys(updates).length > 0) {
                await supabase.from('clinics').update(updates).eq('id', clinic.id);
                successCount++;
            }
        } catch (err) {
        }
    }
    
    console.log(`Enrichment complete. Successfully updated ${successCount} clinics.`);
}
main();
