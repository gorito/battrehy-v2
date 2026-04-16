import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testScrape(url: string) {
    console.log("--- Deep Testing Scraping for:", url, "---");
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            }
        });

        const html = await res.text();
        const $ = cheerio.load(html);

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
                    console.log("Place Keys:", Object.keys(place));
                    console.log("mainImages:", place.mainImages);
                    console.log("photos:", place.photos?.length ? "PRESENT" : "MISSING");
                    if (place.photos?.length > 0) {
                        console.log("First Photo:", place.photos[0]);
                    }
                    console.log("logo:", place.logo);
                    console.log("profileImage:", place.profileImage);
                }
            }
        }
    } catch (e) {
        console.error("Deep Scrape failed:", e);
    }
}

testScrape("https://www.bokadirekt.se/places/facewellness-sweden-29770");
