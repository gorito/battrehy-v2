import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SWEDISH_STOP_WORDS = ['och', 'det', 'att', 'i', 'en', 'jag', 'hon', 'som', 'han', 'på', 'den', 'med', 'var', 'sig', 'för', 'så', 'till', 'är', 'men', 'ett', 'om', 'hade', 'de', 'av', 'icke', 'mig', 'du', 'henne', 'då', 'sin', 'nu', 'har', 'inte', 'hans', 'honom', 'skulle', 'hennes', 'där', 'min', 'man', 'ej', 'vid', 'kunde', 'något', 'från', 'ut', 'när', 'efter', 'upp', 'vi', 'dem', 'vara', 'vad', 'över', 'än', 'dig', 'kan', 'sina', 'utav', 'skall', 'andra', 'själv', 'mer', 'dessa', 'någon', 'eller', 'under', 'några', 'nu', 'sedan', 'ju', 'denna', 'själva', 'omkring', 'varit', 'blivit', 'båda', 'mitt', 'vilka', 'bli', 'mina', 'vars', 'blir', 'mina', 'allt', 'vilket', 'eller', 'om', 'oss', 'skulle', 'idag', 'under', 'efter', 'kunnat', 'komma', 'skall', 'borde'];

function scoreText(text: string): number {
    if (!text || text.length < 50) return 0;
    const lower = text.toLowerCase();
    let score = 0;
    score += Math.min(text.length / 50, 40);
    let swedishHits = 0;
    SWEDISH_STOP_WORDS.forEach(word => { if (lower.includes(' ' + word + ' ')) swedishHits++; });
    score += Math.min(swedishHits * 5, 50);
    return score;
}

function extractRichDescription($: cheerio.CheerioAPI): string {
    const candidates: { text: string; score: number }[] = [];
    const $clone = cheerio.load($.html());
    
    $clone('nav, footer, script, style, header, .menu, .nav, #footer, #header, .sr-only, [aria-hidden="true"], .skip-link, .top-of-page').remove();

    $clone('p, h1, h2, h3, h4, div, section').each((_, el) => {
        let text = $clone(el).contents().map(function() {
            if (this.type === 'text') return $clone(this).text();
            const childText = $clone(this).text().trim();
            if (!childText) return '';
            return childText + (/[.!?]$/.test(childText) ? ' ' : '. ');
        }).get().join(' ').trim().replace(/\s+/g, ' ');

        if (text.toLowerCase().includes('top of page') || text.toLowerCase().includes('bottom of page')) {
            text = text.replace(/top of page/gi, '').replace(/bottom of page/gi, '').trim();
        }

        if (text.length > 50 && text.length < 2500) {
            candidates.push({ text, score: scoreText(text) });
        }
    });

    if (candidates.length === 0) return '';
    candidates.sort((a, b) => b.score - a.score);
    return candidates[0].score > 20 ? candidates[0].text : '';
}

async function fix() {
  const clinicName = 'Gray Clinic';
  const { data: clinic } = await supabase.from('clinics').select('id, website').ilike('name', '%' + clinicName + '%').single();
  
  if (!clinic?.website) {
      console.log('Clinic or website not found');
      return;
  }

  const res = await fetch(clinic.website, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const $ = cheerio.load(html);
  const rawDesc = extractRichDescription($);
  
  console.log('RAW EXTRACTED TEXT:');
  console.log(rawDesc);

  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
  const prompt = `
    Du är en professionell copywriter och SEO-specialist för den exklusiva klinikguiden Bättrehy.se.
    Transformera råtexten nedan till en informativ och inbjudande beskrivning som rankar högt på Google.

    SEO & STRUKTUR:
    1. Första meningen SKA innehålla Kliniknamnet (${clinicName}), staden den ligger i (Stockholm), och dess främsta specialiteter.
    2. Skriv på svenska i tredje person.
    3. Dela upp texten i 2-3 korta stycken.

    KVALITET & SPRAK:
    4. Korrigera strikt alla saknade punkter eller "run-on" meningar från råtexten.
    5. Ta bort säljigt skräp som "BOKA TID" eller "top of page".

    RÅTEXT:
    """
    ${rawDesc}
    """

    Svara ENDAST med den färdiga beskrivningen.
  `;

  const result = await model.generateContent(prompt);
  const refined = result.response.text().trim();
  
  await supabase.from('clinics').update({ description: refined }).eq('id', clinic.id);
  console.log('\n--- REFINED DESCRIPTION FOR GRAY CLINIC ---');
  console.log(refined);
  console.log('-------------------------------------------');
}

fix();
