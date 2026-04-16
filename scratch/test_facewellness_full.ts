import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

async function testScrape(url: string) {
    console.log("--- Full JSON Testing for:", url, "---");
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
                
                console.log("Top level keys:", Object.keys(data));
                // Look for images everywhere
                fs.writeFileSync('scratch/preloaded_state.json', JSON.stringify(data, null, 2));
                console.log("Full JSON saved to scratch/preloaded_state.json");
            }
        }
    } catch (e) {
        console.error("Scrape failed:", e);
    }
}

testScrape("https://www.bokadirekt.se/places/facewellness-sweden-29770");
