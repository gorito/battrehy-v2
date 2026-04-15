import { createClient } from '@supabase/supabase-js';
import puppeteer from 'puppeteer';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function main() {
    console.log('Fetching clinics to enrich...');

    // Get all clinics where website exists and either description or image is missing
    const { data: clinics, error } = await supabase
        .from('clinics')
        .select('id, name, website, description, primary_image_url')
        .not('website', 'is', null)
        .or('description.is.null,primary_image_url.is.null');

    if (error) {
        console.error('Error fetching clinics:', error);
        return;
    }

    // Filter for boka direkt clinics only
    const targetClinics = (clinics || []).filter(c => c.website.includes('bokadirekt.se'));
    console.log(`Found ${targetClinics.length} Bokadirekt clinics needing enrichment.`);

    if (targetClinics.length === 0) {
        console.log('Nothing to do!');
        return;
    }

    console.log('Launching headless browser...');
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    // Set a realistic user agent
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

    let successCount = 0;

    for (let i = 0; i < targetClinics.length; i++) {
        const clinic = targetClinics[i];
        console.log(`\n[${i + 1}/${targetClinics.length}] Enriching: ${clinic.name}`);
        console.log(`URL: ${clinic.website}`);

        try {
            // Navigate to the Bokadirekt profile
            await page.goto(clinic.website, { waitUntil: 'load', timeout: 30000 });

            // Wait an extra second for any react hydration/image lazy loading
            await delay(1000);

            const scrapedData = await page.evaluate(() => {
                // --- 1. Try to get Image ---
                let image = document.querySelector('meta[property="og:image"]')?.getAttribute('content');

                // If meta OG image is the default BokaDirekt logo or missing, search the DOM
                if (!image || image.includes('logomark') || image.includes('default') || image.includes('bokadirekt-logo')) {
                    // Find large hero images
                    const imgs = Array.from(document.querySelectorAll('img[src*="http"]'));
                    const possibleHeroImages = imgs
                        .map(img => img.getAttribute('src') || '')
                        .filter(src => src && !src.includes('avatar') && !src.includes('icon') && src.includes('places'));

                    if (possibleHeroImages.length > 0) {
                        image = possibleHeroImages[0];
                    } else {
                        image = null; // Still null
                    }
                }

                // --- 2. Try to get Description ---
                let desc = document.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
                    document.querySelector('meta[name="description"]')?.getAttribute('content');

                // BokaDirekt default description is useless: "Boka tid för behandling på..."
                if (!desc || desc.includes('Boka tid för behandling') || desc.includes('Bokadirekt')) {
                    // Let's hunt for text blocks that look like an "About us" section
                    // A good proxy is finding paragraphs with a lot of text
                    const textNodes = Array.from(document.querySelectorAll('p, div[class*="description"], span'))
                        .map(el => (el.textContent || '').trim())
                        .filter(text => text.length > 150 && !text.includes('Bokadirekt') && !text.includes('hittelön'));

                    if (textNodes.length > 0) {
                        // Return the longest meaningful paragraph
                        desc = textNodes.reduce((a, b) => a.length > b.length ? a : b);
                    } else {
                        desc = null;
                    }
                }

                return { image, desc };
            });

            console.log(' - Image:', scrapedData.image || 'Missing');
            console.log(' - Desc:', scrapedData.desc ? `Found (${scrapedData.desc.substring(0, 50)}...)` : 'Missing');

            const updates: any = {};
            let hasUpdates = false;

            if (!clinic.primary_image_url && scrapedData.image) {
                updates.primary_image_url = scrapedData.image;
                hasUpdates = true;
            }

            if (!clinic.description && scrapedData.desc) {
                // Trim if it's super long
                updates.description = scrapedData.desc.substring(0, 1000);
                hasUpdates = true;
            }

            if (hasUpdates) {
                const { error: updateError } = await supabase
                    .from('clinics')
                    .update(updates)
                    .eq('id', clinic.id);

                if (updateError) {
                    console.error('Failed to update Supabase:', updateError);
                } else {
                    console.log('=> Successfully saved data!');
                    successCount++;
                }
            } else {
                console.log('=> No new usable data found.');
            }

        } catch (err: any) {
            console.error(`=> Error processing ${clinic.name}:`, err.message);
        }

        // Be polite to Bokadirekt servers (3 second pause)
        await delay(3000);
    }

    await browser.close();
    console.log(`\nEnrichment complete! Successfully updated ${successCount} clinics.`);
    process.exit(0);
}

main().catch(console.error);
