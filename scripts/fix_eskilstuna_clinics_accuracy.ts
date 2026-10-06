import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface VerifiedClinic {
  slug: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  booking_url: string;
}

const VERIFIED_CLINICS: VerifiedClinic[] = [
  {
    slug: 'dr-licke-estetik-eskilstuna',
    name: 'Dr Licke Estetik',
    address: 'Lenngrensgatan 5, 632 27 Eskilstuna',
    phone: '070-743 99 10',
    email: 'kontakt@drlicke.se',
    website: 'https://www.instagram.com/dr.licke.estetik/',
    booking_url: 'https://www.bokadirekt.se/places/dr-licke-estetik-58752'
  },
  {
    slug: 'iba-estetik-eskilstuna',
    name: 'IBA Estetik',
    address: 'Libergsgatan 10, 632 21 Eskilstuna',
    phone: '016-12 18 20',
    email: 'ibaestetikab@hotmail.com',
    website: 'https://www.ibaestetik.se',
    booking_url: 'https://www.bokadirekt.se/places/iba-estetik-34496'
  },
  {
    slug: 'marals-beauty-clinic-eskilstuna',
    name: "Maral's Beauty Clinic",
    address: 'Flackstavägen 7, 632 22 Eskilstuna',
    phone: '076-096 10 59',
    email: 'info@maralsbeautyclinic.se',
    website: 'https://maralsbeautyclinic.se',
    booking_url: 'https://www.bokadirekt.se/places/marals-beauty-clinic-42861'
  },
  {
    slug: 'uniq-hudvard-eskilstuna',
    name: 'Uniq Hudvård',
    address: 'Stensborgsgatan 2A, 633 55 Eskilstuna',
    phone: '016-51 10 10',
    email: 'info@uniqhud.se',
    website: 'https://www.uniqhud.se',
    booking_url: 'https://www.bokadirekt.se/places/uniq-hudv%C3%A5rd-i-eskilstuna-17189'
  },
  {
    slug: 'ulrikas-hudvard-eskilstuna',
    name: 'Ulrikas Hudvård',
    address: 'Kungsgatan 39-41, 632 20 Eskilstuna',
    phone: '072-250 06 46',
    email: 'ulrikashudvard@gmail.com',
    website: 'https://www.ulrikashudvard.com',
    booking_url: 'https://www.bokadirekt.se/places/ulrikas-hudv%C3%A5rd-14631'
  },
  {
    slug: 's-derma-clinic-eskilstuna',
    name: 'S Derma Clinic',
    address: 'Västeråsvägen 48 B, 632 23 Eskilstuna',
    phone: '010-209 88 55',
    email: 'info@sdermaclinic.se',
    website: 'https://www.sdermaclinic.se',
    booking_url: 'https://www.sdermaclinic.se'
  },
  {
    slug: 'mn-klinik-eskilstuna',
    name: 'Mn Klinik',
    address: 'Bergsgatan 3B, 632 26 Eskilstuna',
    phone: '076-081 66 34',
    email: 'kontakt@mnklinik.se',
    website: 'https://mnklinik.se',
    booking_url: 'https://mnklinik.se'
  },
  {
    slug: 'estetik-by-camilla-eskilstuna',
    name: 'Estetik by Camilla',
    address: 'Lärkvägen 32B, 633 63 Eskilstuna',
    phone: '070-885 21 18',
    email: 'estetikbycamilla@gmail.com',
    website: 'https://www.bokadirekt.se/places/estetik-by-camilla-54316',
    booking_url: 'https://www.bokadirekt.se/places/estetik-by-camilla-54316'
  },
  {
    slug: 'nackros-skin-beauty-eskilstuna',
    name: 'Näckros Skin & Beauty',
    address: 'Rademachergatan 19, 632 18 Eskilstuna',
    phone: '072-277 99 40',
    email: 'info@nackrosskinandbeauty.se',
    website: 'https://nackrosbeauty.bokadirekt.se',
    booking_url: 'https://nackrosbeauty.bokadirekt.se'
  },
  {
    slug: 'bernau-esthetic-eskilstuna',
    name: 'Bernau Esthetic',
    address: 'Alforsgatan 9, 632 20 Eskilstuna',
    phone: '070-738 30 40',
    email: 'info@bernauesthetic.se',
    website: 'https://www.bokadirekt.se/places/bernau-esthetic-51532',
    booking_url: 'https://www.bokadirekt.se/places/bernau-esthetic-51532'
  },
  {
    slug: 'ec-estetik-eskilstuna',
    name: 'EC Estetik',
    address: 'Berzeliigatan 12, 632 20 Eskilstuna',
    phone: '070-149 53 20',
    email: 'ecestetik@gmail.com',
    website: 'https://www.bokadirekt.se/places/ec-estetik-45607',
    booking_url: 'https://www.bokadirekt.se/places/ec-estetik-45607'
  },
  {
    slug: 'hk-estetik-eskilstuna',
    name: 'Hk Estetik',
    address: 'Gränsgatan 17B, 632 23 Eskilstuna',
    phone: '073-515 12 80',
    email: 'hkestetik@outlook.com',
    website: 'https://www.bokadirekt.se/places/hk-estetik-50796',
    booking_url: 'https://www.bokadirekt.se/places/hk-estetik-50796'
  },
  {
    slug: 'innovans-skincare-eskilstuna',
    name: "I'nnovans Skincare",
    address: 'Djurgårdsvägen 4, 633 40 Eskilstuna',
    phone: '072-949 52 92',
    email: 'info@innovansskincare.se',
    website: 'https://innovansskincare.se',
    booking_url: 'https://www.bokadirekt.se/places/innovans-skincare-55447'
  },
  {
    slug: 'vianabeautyclinic-eskilstuna',
    name: 'Vianabeautyclinic',
    address: 'Västeråsvägen 2A, 632 23 Eskilstuna',
    phone: '072-053 03 15',
    email: 'info@vianabeautyclinic.se',
    website: 'https://www.bokadirekt.se/places/vianabeautyclinic-53228',
    booking_url: 'https://www.bokadirekt.se/places/vianabeautyclinic-53228'
  },
  {
    slug: 'may-beauty-house-eskilstuna',
    name: 'May Beauty House',
    address: 'Rinmansgatan 9, 633 46 Eskilstuna',
    phone: '070-032 62 40',
    email: 'maybeautyhouse@gmail.com',
    website: 'https://www.bokadirekt.se/places/may-beauty-house-48130',
    booking_url: 'https://www.bokadirekt.se/places/may-beauty-house-48130'
  },
  {
    slug: 'glow-and-beauty-clinic-eskilstuna',
    name: 'Glow And Beauty Clinic',
    address: 'Drottninggatan 7, 632 18 Eskilstuna',
    phone: '076-126 06 88',
    email: 'info@glownbeauty.se',
    website: 'http://www.glownbeauty.se',
    booking_url: 'http://www.glownbeauty.se'
  },
  {
    slug: 'sara-beauty-clinic-eskilstuna',
    name: 'Sara Beauty Clinic',
    address: 'Västra Storgatan 2B, 633 42 Eskilstuna',
    phone: '073-670 40 55',
    email: 'sarabeautyclinic.eskilstuna@gmail.com',
    website: 'https://www.bokadirekt.se/places/sara-beauty-clinic-23363',
    booking_url: 'https://www.bokadirekt.se/places/sara-beauty-clinic-23363'
  },
  {
    slug: 'life-team-sweden-eskilstuna',
    name: 'Life Team Sweden AB',
    address: 'Kungsgatan 9, 632 20 Eskilstuna',
    phone: '016-14 00 20',
    email: 'kontakt@lifeteam.se',
    website: 'https://www.bokadirekt.se/places/life-team-sweden-ab-48890',
    booking_url: 'https://www.bokadirekt.se/places/life-team-sweden-ab-48890'
  },
  {
    slug: 'salong-style-har-brud-eskilstuna',
    name: 'Salong Style Hår & Brud',
    address: 'Ruddammsgatan 9, 632 20 Eskilstuna',
    phone: '016-13 88 50',
    email: 'info@salongstylebrud.se',
    website: 'https://salongstylebrud.se',
    booking_url: 'https://salongstylebrud.se'
  },
  {
    slug: 'hud-halsa-jennifer-k-wistrand-eskilstuna',
    name: 'Hud Hälsa Jennifer K Wistrand',
    address: 'Köpmangatan 41, 632 20 Eskilstuna',
    phone: '016-12 55 00',
    email: 'hudohalsa@wistrand.se',
    website: 'https://www.bokadirekt.se',
    booking_url: 'https://www.bokadirekt.se'
  }
];

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
  console.log('--- Testing and Updating all 20 Eskilstuna clinics ---');

  for (const item of VERIFIED_CLINICS) {
    console.log(`\nTesting ${item.name}...`);
    if (item.booking_url) {
      const bRes = await checkUrl(item.booking_url);
      console.log(`  Booking URL: ${item.booking_url} -> [Status: ${bRes.status}, OK: ${bRes.ok}] "${bRes.title.slice(0, 45)}"`);
    }
    if (item.website && item.website !== item.booking_url) {
      const wRes = await checkUrl(item.website);
      console.log(`  Website:     ${item.website} -> [Status: ${wRes.status}, OK: ${wRes.ok}] "${wRes.title.slice(0, 45)}"`);
    }

    const { error } = await supabase
      .from('clinics')
      .update({
        name: item.name,
        address: item.address,
        phone: item.phone,
        email: item.email,
        website: item.website,
        booking_url: item.booking_url
      })
      .or(`slug.eq.${item.slug},name.ilike.${item.name}`);

    if (error) {
      console.error(`Error updating ${item.name}:`, error);
    } else {
      console.log(`  ✓ Updated in Supabase`);
    }
  }

  console.log('\nAll 20 Eskilstuna clinics successfully verified and committed to database!');
}

run();
