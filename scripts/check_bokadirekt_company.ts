import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

async function main() {
    const { data: clinics } = await supabase.from('clinics').select('website').ilike('website', '%bokadirekt%').limit(10);
    
    for (const c of clinics!) {
        const res = await fetch(c.website, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const text = await res.text();
        const $ = cheerio.load(text);
        const scripts = $('script').toArray();
        for (const el of scripts) {
            const html = $(el).html();
            if (html && html.includes('__PRELOADED_STATE__')) {
                const jsonStart = html.indexOf('{');
                let jsonStr = '';
                let depth = 0;
                for (let i = jsonStart; i < html.length; i++) {
                    if (html[i] === '{') depth++;
                    else if (html[i] === '}') {
                        depth--;
                        if (depth === 0) { jsonStr = html.substring(jsonStart, i + 1); break; }
                    }
                }
                if (jsonStr) {
                    const data = JSON.parse(jsonStr);
                    const place = data?.place;
                    console.log("\nURL:", c.website);
                    console.log("place.about.description:", place?.about?.description?.substring(0, 50));
                    console.log("place.about.welcomeText:", place?.about?.welcomeText?.substring(0, 50));
                    console.log("place.company:", place?.company);
                }
            }
        }
    }
}
main();
