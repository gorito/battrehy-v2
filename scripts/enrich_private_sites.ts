import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log('Fetching clinics from Supabase...');

    // Fetch clinics missing an image that DO have a website
    const { data: clinics, error } = await supabase
        .from('clinics')
        .select('id, name, website, primary_image_url, description, phone')
        .is('primary_image_url', null)
        .not('website', 'is', null)
        .neq('website', '');

    if (error || !clinics) {
        console.error('Error fetching clinics:', error);
        return;
    }

    // Filter out bokadirekt and social media links
    const targetClinics = clinics.filter(c => 
        c.website && 
        !c.website.includes('bokadirekt.se') &&
        !c.website.includes('instagram.com') &&
        !c.website.includes('facebook.com')
    );

    console.log(`Found ${targetClinics.length} clinics with private domains to scrape!`);

    let successCount = 0;

    for (let i = 0; i < targetClinics.length; i++) {
        const clinic = targetClinics[i];
        let urlText = clinic.website as string;
        
        // Ensure valid HTTPS protocol
        if (!urlText.startsWith('http')) {
            urlText = 'https://' + urlText;
        }

        console.log(`\n[${i + 1}/${targetClinics.length}] Scraping: ${clinic.name}`);
        console.log(`   Site: ${urlText}`);

        try {
            // Fetch the website HTML
            const res = await fetch(urlText, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                },
                // 10 second timeout
                signal: AbortSignal.timeout(10000)
            });

            if (!res.ok) {
                console.log(`   -> Failed: HTTP ${res.status}`);
                continue;
            }

            const html = await res.text();
            const $ = cheerio.load(html);

            // Extract Primary Image (OG:Image or first large hero image)
            let image = $('meta[property="og:image"]').attr('content') || 
                        $('meta[name="twitter:image"]').attr('content');
            
            if (image && !image.startsWith('http')) {
                // Handle relative paths
                if (image.startsWith('/')) {
                    try {
                        const urlObj = new URL(urlText);
                        image = `${urlObj.origin}${image}`;
                    } catch (e) {}
                }
            }

            // Extract Description
            let desc = $('meta[property="og:description"]').attr('content') || 
                       $('meta[name="description"]').attr('content');

            // Extract Phone (look for "tel:" links)
            let phone = null;
            $('a[href^="tel:"]').each((_, el) => {
                if (!phone) {
                    phone = $(el).text().trim();
                }
            });

            const updates: any = {};
            let hasUpdates = false;

            if (image && image.startsWith('http')) {
                updates.primary_image_url = image;
                console.log(`   -> Captured Image: Found!`);
                hasUpdates = true;
            } else {
                console.log(`   -> Captured Image: None`);
            }

            if (!clinic.description && desc && desc.length > 20) {
                updates.description = desc.substring(0, 1000);
                console.log(`   -> Captured Desc: Found!`);
                hasUpdates = true;
            }
            
            if (!clinic.phone && phone && phone.length > 5 && phone.length < 20) {
                updates.phone = phone;
                console.log(`   -> Captured Phone: ${phone}`);
                hasUpdates = true;
            }

            if (hasUpdates) {
                const { error: updateError } = await supabase
                    .from('clinics')
                    .update(updates)
                    .eq('id', clinic.id);

                if (updateError) {
                    console.error('   -> DB Error:', updateError);
                } else {
                    console.log('   -> Database Updated Successfully!');
                    successCount++;
                }
            }

        } catch (err: any) {
            console.error(`   -> Error: ${err.name === 'TimeoutError' ? 'Timeout' : err.message}`);
        }
        
        // Small delay so we don't blow up our own CPU
        await new Promise(r => setTimeout(r, 500));
    }

    console.log(`\nEnrichment complete! Successfully updated ${successCount} clinics from their own websites.`);
}

main().catch(console.error);
