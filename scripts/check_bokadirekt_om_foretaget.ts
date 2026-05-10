import * as cheerio from 'cheerio';

async function main() {
    const targetUrl = 'https://www.bokadirekt.se/places/lifetime-clinic-14902'; 
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
                    console.log(JSON.stringify(data).substring(0, 500));
                    
                    // Let's search the JSON for any string containing "Om företaget"
                    const searchObj = (obj: any, path: string) => {
                        for (const key in obj) {
                            if (typeof obj[key] === 'string' && obj[key].includes('Om företaget')) {
                                console.log(`Found 'Om företaget' in: ${path}.${key}`);
                            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                                searchObj(obj[key], `${path}.${key}`);
                            }
                        }
                    };
                    searchObj(data, 'data');
                }
            }
        }
    } catch (e) {
        console.error("Error", e);
    }
}
main();
