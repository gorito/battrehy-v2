import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUrl(url: string): Promise<{ ok: boolean; status: number; title: string }> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7'
      },
      signal: AbortSignal.timeout(8000)
    });

    const html = await res.text();
    const $ = cheerio.load(html);
    const title = $('title').text().trim();
    const is404 = res.status >= 400 || title.includes('404') || title.includes('Hittade inte sidan') || html.includes('sidan du söker finns inte');

    return {
      ok: res.ok && !is404,
      status: res.status,
      title: title
    };
  } catch (err: any) {
    return {
      ok: false,
      status: 0,
      title: err?.message || 'Error'
    };
  }
}

async function run() {
  const { data: clinics } = await supabase
    .from('clinics')
    .select('id, name, slug, address, phone, email, website, booking_url')
    .ilike('city', 'Eskilstuna');

  console.log(`Checking ${clinics?.length} clinics in Eskilstuna...\n`);

  for (const c of clinics || []) {
    console.log(`-----------------------------------------------`);
    console.log(`Clinic: ${c.name} (${c.slug})`);
    console.log(`Address: ${c.address}`);
    console.log(`Phone: ${c.phone}`);
    console.log(`Email: ${c.email}`);
    
    if (c.website) {
      const webRes = await checkUrl(c.website);
      console.log(`Website: ${c.website} -> [Status: ${webRes.status}, OK: ${webRes.ok}] "${webRes.title.slice(0, 40)}"`);
    } else {
      console.log(`Website: NONE`);
    }

    if (c.booking_url) {
      const bookRes = await checkUrl(c.booking_url);
      console.log(`Booking URL: ${c.booking_url} -> [Status: ${bookRes.status}, OK: ${bookRes.ok}] "${bookRes.title.slice(0, 40)}"`);
    } else {
      console.log(`Booking URL: NONE`);
    }
  }
}

run();
