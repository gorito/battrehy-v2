import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import * as cheerio from 'cheerio';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const SWEDISH_STOP_WORDS = ['och', 'det', 'att', 'i', 'en', 'jag', 'hon', 'som', 'han', 'på', 'den', 'med', 'var', 'sig', 'för', 'så', 'till', 'är', 'men', 'ett', 'om', 'hade', 'de', 'av', 'icke', 'mig', 'du', 'henne', 'då', 'sin', 'nu', 'har', 'inte', 'hans', 'honom', 'skulle', 'hennes', 'där', 'min', 'man', 'ej', 'vid', 'kunde', 'något', 'från', 'ut', 'när', 'efter', 'upp', 'vi', 'dem', 'vara', 'vad', 'över', 'än', 'dig', 'kan', 'sina', 'utav', 'skall', 'andra', 'själv', 'mer', 'dessa', 'någon', 'eller', 'under', 'några', 'nu', 'sedan', 'ju', 'denna', 'själva', 'omkring', 'varit', 'blivit', 'båda', 'mitt', 'vilka', 'bli', 'mina', 'vars', 'blir', 'mina', 'allt', 'vilket', 'eller', 'om', 'oss', 'skulle', 'idag', 'under', 'efter', 'kunnat', 'komma', 'skall', 'borde'];
const CLINIC_KEYWORDS = ['klinik', 'behandling', 'legitimerad', 'estetisk', 'skönhet', 'specialist', 'trygghet', 'erfarenhet', 'hudvård', 'injektion', 'bokadirekt', 'vård', 'patient', 'kvalitet', 'resultat'];

function scoreText(text: string): number {
    if (!text || text.length < 50) return 0;
    const lower = text.toLowerCase();
    let score = 0;
    score += Math.min(text.length / 50, 40);
    let swedishHits = 0;
    SWEDISH_STOP_WORDS.forEach(word => { if (lower.includes(' ' + word + ' ')) swedishHits++; });
    score += Math.min(swedishHits * 5, 50);
    let clinicHits = 0;
    CLINIC_KEYWORDS.forEach(word => { if (lower.includes(word)) clinicHits++; });
    score += Math.min(clinicHits * 5, 30);
    return score;
}

function extractRichDescription($: cheerio.CheerioAPI): string {
    const candidates: { text: string; score: number }[] = [];
    const $clone = cheerio.load($.html());
    $clone('nav, footer, script, style, header, .menu, .nav, #footer, #header').remove();
    $clone('p, div, section').each((_, el) => {
        const text = $clone(el).text().trim().replace(/\s+/g, ' ');
        if (text.length > 50 && text.length < 3000) { candidates.push({ text, score: scoreText(text) }); }
    });
    if (candidates.length === 0) return '';
    candidates.sort((a, b) => b.score - a.score);
    return candidates[0].score > 20 ? candidates[0].text : '';
}

async function fix() {
  const { data: clinic } = await supabase.from('clinics').select('id, website').ilike('name', '%Örebro Laser Center%').single();
  if (!clinic?.website) {
      console.log('Clinic or website not found');
      return;
  }
  const res = await fetch(clinic.website, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const $ = cheerio.load(html);
  const description = extractRichDescription($);
  if (description) {
      await supabase.from('clinics').update({ description }).eq('id', clinic.id);
      console.log('Fixed Örebro Laser Center! New Length:', description.length);
  }
}
fix();
