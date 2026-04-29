import { createClient } from '@supabase/supabase-js';
import puppeteer from 'puppeteer';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function main() {
    console.log('Fetching clinics missing images from Supabase...');

    const { data: clinics, error } = await supabase
        .from('clinics')
        .select('id, name, city, website, primary_image_url, description, phone')
        .is('primary_image_url', null)
        .limit(100);

    if (error || !clinics || clinics.length === 0) {
        console.error('No clinics found or error:', error);
        return;
    }

    console.log(`Found ${clinics.length} clinics. Launching visible browser...`);
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

    let successCount = 0;

    for (let i = 0; i < clinics.length; i++) {
        const clinic = clinics[i];
        console.log(`\n[${i + 1}/${clinics.length}] Searching for: ${clinic.name} (${clinic.city})`);

        try {
            // STEP 1: Search BokaDirekt directly
            const searchUrl = `https://www.bokadirekt.se/places/search?query=${encodeURIComponent(`${clinic.name} ${clinic.city}`)}`;
            await page.goto(searchUrl, { waitUntil: 'load', timeout: 30000 });
            await delay(4000); // Wait for React hydration and search results

            // Find the first search result profile link
            let targetUrl = await page.evaluate(() => {
                const links = Array.from(document.querySelectorAll('a[href*="/places/"]'));
                const validLinks = links.map(a => a.getAttribute('href')).filter(l => l && l.split('/').length > 2);
                if (validLinks.length > 0) {
                    return validLinks[0]?.startsWith('http') ? validLinks[0] : `https://www.bokadirekt.se${validLinks[0]}`;
                }
                return null;
            });

            if (!targetUrl) {
                console.log(' - Failed to find a matching BokaDirekt profile in search results.');
                continue;
            }

            console.log(` - Found Profile: ${targetUrl}`);
            await delay(1000);

            // STEP 2: Navigate to Profile and Extract
            await page.goto(targetUrl, { waitUntil: 'load', timeout: 30000 });
            await delay(1500); // Wait for React/images

            const scrapedData = await page.evaluate(() => {
                // Image
                let image = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
                if (!image || image.includes('logomark') || image.includes('default') || image.includes('bokadirekt-logo')) {
                    const imgs = Array.from(document.querySelectorAll('img[src*="http"]'));
                    const possibleHeroImages = imgs
                        .map(img => img.getAttribute('src') || '')
                        .filter(src => src && !src.includes('avatar') && !src.includes('icon') && src.includes('places'));
                    image = possibleHeroImages.length > 0 ? possibleHeroImages[0] : null;
                }

                // Description
                let desc = document.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
                           document.querySelector('meta[name="description"]')?.getAttribute('content');
                
                if (!desc || desc.includes('Boka tid för behandling') || desc.includes('Bokadirekt')) {
                    const textNodes = Array.from(document.querySelectorAll('p, div[class*="description"], span'))
                        .map(el => (el.textContent || '').trim())
                        .filter(text => text.length > 150 && !text.includes('Bokadirekt') && !text.includes('hittelön'));
                    desc = textNodes.length > 0 ? textNodes.reduce((a, b) => a.length > b.length ? a : b) : null;
                }

                // Phone (a[href^="tel:"])
                const phoneTag = document.querySelector('a[href^="tel:"]');
                const phone = phoneTag ? phoneTag.textContent?.trim() : null;

                // Website (a box that has text "Hemsida" or links out not to BokaDirekt)
                const outLinks = Array.from(document.querySelectorAll('a[target="_blank"]'));
                let site = null;
                for (let a of outLinks) {
                    const href = a.getAttribute('href');
                    if (href && !href.includes('bokadirekt') && (href.startsWith('http') || a.textContent?.includes('Hemsida'))) {
                        site = href;
                        break;
                    }
                }

                return { image, desc, phone, website: site };
            });

            console.log('   -> Image:', scrapedData.image ? `Found (${scrapedData.image.substring(0, 30)}...)` : 'Missing');
            console.log('   -> Desc:', scrapedData.desc ? 'Found' : 'Missing');
            console.log('   -> Phone:', scrapedData.phone ? `Found (${scrapedData.phone})` : 'Missing');
            console.log('   -> Site:', scrapedData.website ? `Found (${scrapedData.website})` : 'Missing');

            const updates: any = {};
            let hasUpdates = false;

            if (!clinic.primary_image_url && scrapedData.image) {
                updates.primary_image_url = scrapedData.image;
                hasUpdates = true;
            }
            if (!clinic.description && scrapedData.desc) {
                updates.description = scrapedData.desc.substring(0, 1000);
                hasUpdates = true;
            }
            if (!clinic.phone && scrapedData.phone) {
                updates.phone = scrapedData.phone;
                hasUpdates = true;
            }
            if (!clinic.website && scrapedData.website) {
                updates.website = scrapedData.website;
                hasUpdates = true;
            }

            if (hasUpdates) {
                const { error: updateError } = await supabase
                    .from('clinics')
                    .update(updates)
                    .eq('id', clinic.id);

                if (updateError) {
                    console.error('   -> Failed to save DB:', updateError);
                } else {
                    console.log('   -> DB Updated!');
                    successCount++;
                }
            }

        } catch (err: any) {
            console.error(` - Error:`, err.message);
        }

        // Polite pause
        await delay(3000);
    }

    await browser.close();
    console.log(`\nLocal Enrichment complete! Successfully updated ${successCount} clinics.`);
    process.exit(0);
}

main().catch(console.error);
