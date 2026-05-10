import * as cheerio from 'cheerio';

async function main() {
    const targetUrl = 'https://www.bokadirekt.se/places/lifetime-clinic-14902'; // An example clinic
    try {
        const res = await fetch(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const html = await res.text();
        const $ = cheerio.load(html);

        const scripts = $('script').toArray();
        for (const el of scripts) {
            const text = $(el).html();
            if (text && text.includes('__PRELOADED_STATE__')) {
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
                    console.log("Keys in place:", Object.keys(place || {}));
                    if (place?.about) {
                        console.log("\nKeys in place.about:", Object.keys(place.about));
                        console.log("\nplace.about.welcomeText:", place.about.welcomeText?.substring(0, 100));
                        console.log("place.about.description:", place.about.description?.substring(0, 100));
                    }
                    if (place?.company) {
                        console.log("\nKeys in place.company:", Object.keys(place.company));
                        console.log("place.company.description:", place.company.description?.substring(0, 100));
                        console.log("place.company.about:", place.company.about?.substring(0, 100));
                    }
                }
            }
        }
    } catch (e) {
        console.error("Error", e);
    }
}
main();
