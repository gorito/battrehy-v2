import * as cheerio from 'cheerio';
import * as fs from 'fs';

async function main() {
    const url = 'https://www.bokadirekt.se/places/grevgatan-skincare-13369';
    console.log('Fetching', url);
    const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const html = await res.text();
    const $ = cheerio.load(html);

    let scrapedImageUrl = $('meta[property="og:image"]').attr('content') || '';
    console.log('OG Image:', scrapedImageUrl);

    let phoneFromTel = '';
    $('a[href^="tel:"]').each((_, el) => {
        if (!phoneFromTel) phoneFromTel = $(el).text().trim();
    });
    console.log('Phone from tel:', phoneFromTel);

    $('script').each((_, el) => {
        const text = $(el).html();
        if (text && text.includes('window.__PRELOADED_STATE__ = {')) {
            try {
                const jsonStart = text.indexOf('{');
                const jsonEnd = text.lastIndexOf('}') + 1;
                const jsonStr = text.substring(jsonStart, jsonEnd);
                const data = JSON.parse(jsonStr);

                console.log('--- PRELOADED STATE PARSED ---');
                if (data.place) {
                    console.log('place keys:', Object.keys(data.place));
                    if (data.place.contact) {
                         console.log('place.contact:', data.place.contact);
                    } else if (data.place.about) {
                         console.log('place.about:', data.place.about);
                    }
                    if (data.place.images) {
                        console.log('place.images (first 2):', data.place.images.slice(0, 2));
                    }
                    if (data.place.phone) {
                        console.log('place.phone:', data.place.phone);
                    }
                } else if (data.placeQuery) {
                    // sometimes it's placed differently
                    console.log('placeQuery keys:', Object.keys(data.placeQuery));
                }
                
                // Write it to file to inspect manually
                fs.writeFileSync('bokadirekt_preloaded.json', JSON.stringify(data, null, 2));
                console.log('Wrote to bokadirekt_preloaded.json');
            } catch (e) {
                 console.error('Error parsing JSON:', e);
            }
        }
    });
}

main();
