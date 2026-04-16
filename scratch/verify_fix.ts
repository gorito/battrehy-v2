import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const GENERIC_BOKADIREKT_LOGO = 'c9e021de-9b06-40d5-9334-1b5fc3425431';

async function testScrape(url: string) {
    console.log("--- Final Verification Scraping for:", url, "---");
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            }
        });

        const html = await res.text();
        const $ = cheerio.load(html);

        let scrapedImageUrl = $('meta[property="og:image"]').attr('content') || '';

        const scripts = $('script').toArray();
        for (const el of scripts) {
            const text = $(el).html();
            if (text && text.includes('window.__PRELOADED_STATE__ = {')) {
                const jsonStart = text.indexOf('{');
                const jsonEnd = text.lastIndexOf('}') + 1;
                const jsonStr = text.substring(jsonStart, jsonEnd);
                const data = JSON.parse(jsonStr);
                const place = data?.place;

                if (place) {
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
                }
            }
        }

        console.log("Resulting Image URL:", scrapedImageUrl);
        if (scrapedImageUrl.includes('59b6e633')) {
            console.log("SUCCESS: Found the high-quality staff photo!");
        } else if (scrapedImageUrl.includes('e49ddb56')) {
            console.log("FAILURE: Still picking up the small logo.");
        } else {
            console.log("UNKNOWN: Found something else:", scrapedImageUrl);
        }
        
    } catch (e) {
        console.error("Scrape test failed:", e);
    }
}

testScrape("https://www.bokadirekt.se/places/facewellness-sweden-29770");
