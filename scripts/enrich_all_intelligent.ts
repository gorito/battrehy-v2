import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const geminiKey = process.env.GEMINI_API_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const genAI = geminiKey ? new GoogleGenerativeAI(geminiKey) : null;

// --- CLI ARGUMENTS ---
const args = process.argv.slice(2);
const IS_DRY_RUN = args.includes('--dry-run');
const LIMIT = args.find(a => a.startsWith('--limit=')) ? parseInt(args.find(a => a.startsWith('--limit='))!.split('=')[1]) : 0;

// --- AI REFINER ---
async function refineDescription(rawText: string, clinicName: string): Promise<string> {
    if (!genAI || !rawText || rawText.length < 50) return rawText;
    if (IS_DRY_RUN) return "[DRY RUN] Refined version of: " + rawText.substring(0, 50) + "...";

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const prompt = `
        Du är en professionell copywriter och SEO-specialist för den exklusiva klinikguiden Bättrehy.se.
        Ditt uppdrag är att transformera den bifogade råtexten från en kliniks hemsida till en välskriven och inbjudande beskrivning som rankar högt på Google.

        SEO & STRUKTUR:
        1. Första meningen SKA innehålla Kliniknamnet (${clinicName}), staden den ligger i, och dess främsta specialitet för maximal SEO-effekt.
        2. Skriv på svenska i tredje person.
        3. Dela upp texten i 2-3 korta stycken. ANVÄND DUBBLA RADBRYTNINGAR MELLAN STYCKEN för maximal läsbarhet.
        4. Inkorporera naturligt nyckelord som "legitimerad personal", "trygghet" och "resultat".

        KVALITET:
        5. Korrigera strikt alla saknade punkter eller "run-on" meningar från råtexten.
        6. Ta bort säljigt skräp som "BOKA TID" eller "Läs mer här".

        KLINIKNAMN: ${clinicName}
        RÅTEXT:
        """
        ${rawText}
        """

        Svara ENDAST med den färdiga beskrivningen.
        `;

        const result = await model.generateContent(prompt);
        return result.response.text().trim() || rawText;
    } catch (e) {
        console.error(" - AI Refinement failed:", e);
        return rawText;
    }
}

// --- SCORING & EXTRACTION LOGIC ---

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
    
    // Skip noisy elements
    $clone('nav, footer, script, style, header, .menu, .nav, #footer, #header, .sr-only, [aria-hidden="true"], .skip-link, .top-of-page').remove();

    // Look at paragraphs and headings with text
    $clone('p, h1, h2, h3, h4, div, section').each((_, el) => {
        // IMPROVED: Ensure spaces/periods between children
        let text = $clone(el).contents().map(function() {
            if (this.type === 'text') return $clone(this).text();
            const childText = $clone(this).text().trim();
            if (!childText) return '';
            return childText + (/[.!?]$/.test(childText) ? ' ' : '. ');
        }).get().join(' ').trim().replace(/\s+/g, ' ');

        // Junk filter
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

async function fetchMetadata(targetUrl: string, clinicName: string) {
    try {
        const res = await fetch(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (!res.ok) return null;
        const html = await res.text();
        const $ = cheerio.load(html);

        let rawDescription = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
        const richDesc = extractRichDescription($);
        if (richDesc && (scoreText(richDesc) > scoreText(rawDescription))) {
            rawDescription = richDesc;
        }

        // AI Refinement
        const refinedDescription = await refineDescription(rawDescription, clinicName);

        let image = $('meta[property="og:image"]').attr('content') || '';
        return { description: refinedDescription.substring(0, 3000), image };
    } catch (e) {
        return null;
    }
}

// --- BATCH PROCESSOR ---

async function main() {
    console.log(`🚀 Starting Universal AI Enrichment${IS_DRY_RUN ? " (DRY RUN MODE)" : ""}...`);

    const { data: clinics, error } = await supabase
        .from('clinics')
        .select('id, name, website, booking_url, description, primary_image_url')
        .or('website.not.is.null,booking_url.not.is.null');

    if (error) {
        console.error('Error fetching clinics:', error);
        return;
    }

    let needsEnrichment = (clinics || []).filter(c => 
        !c.description || 
        c.description.length < 100 || 
        c.description.length === 1000 || 
        c.description.includes('Boka tid') || 
        !c.primary_image_url
    );

    if (LIMIT > 0) {
        needsEnrichment = needsEnrichment.slice(0, LIMIT);
    }

    console.log(`Targeting ${needsEnrichment.length} clinics.`);

    for (let i = 0; i < needsEnrichment.length; i++) {
        const clinic = needsEnrichment[i];
        console.log(`\n[${i + 1}/${needsEnrichment.length}] Processing: ${clinic.name}`);
        
        const targetUrl = clinic.website || clinic.booking_url;
        if (!targetUrl) {
            console.log(' - No URL found to scrape.');
            continue;
        }

        const metadata = await fetchMetadata(targetUrl, clinic.name);
        if (!metadata) {
            console.log(' - Failed to fetch metadata.');
            continue;
        }

        if (IS_DRY_RUN) {
            console.log(` - [DRY RUN] Would update description (${metadata.description.length} chars)`);
            if (metadata.image && !clinic.primary_image_url) console.log(' - [DRY RUN] Would update image');
        } else {
            const updates: any = {};
            if (metadata.description) updates.description = metadata.description;
            if (metadata.image && !clinic.primary_image_url) updates.primary_image_url = metadata.image;

            if (Object.keys(updates).length > 0) {
                const { error: updateErr } = await supabase.from('clinics').update(updates).eq('id', clinic.id);
                if (updateErr) console.error('   ❌ Update failed:', updateErr.message);
                else console.log('   ✅ Successfully updated with AI content!');
            }
        }

        // --- SAFETY LOCK: THRottle to stay in FREE TIER (max 15 RPM) ---
        // 4 seconds between requests = 15 requests per minute.
        console.log('   ⏳ Cooling down (4s) to stay in Free Tier...');
        await new Promise(r => setTimeout(r, 4000));
    }

    console.log('\n✨ All done!');
}

main();
