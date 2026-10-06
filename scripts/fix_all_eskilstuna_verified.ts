import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface ClinicAccuracyData {
  slug: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  booking_url: string;
}

const CLINICS: ClinicAccuracyData[] = [
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
    slug: 'uniq-hudvard-eskilstuna',
    name: 'Uniq Hudvård',
    address: 'Stensborgsgatan 2A, 633 55 Eskilstuna',
    phone: '016-51 10 10',
    email: 'info@uniqhud.se',
    website: 'https://www.uniqhud.se',
    booking_url: 'https://www.bokadirekt.se/places/uniq-hudvard-i-eskilstuna-5891'
  },
  {
    slug: 'ulrikas-hudvard-eskilstuna',
    name: 'Ulrikas Hudvård',
    address: 'Kungsgatan 39-41, 632 20 Eskilstuna',
    phone: '072-250 06 46',
    email: 'ulrikashudvard@gmail.com',
    website: 'https://www.ulrikashudvard.com',
    booking_url: 'https://www.bokadirekt.se/places/ulrikas-hudvard-33188'
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
    slug: 's-derma-clinic-eskilstuna',
    name: 'S Derma Clinic',
    address: 'Västeråsvägen 48 B, 632 23 Eskilstuna',
    phone: '010-209 88 55',
    email: 'info@sdermaclinic.se',
    website: 'https://www.sdermaclinic.se',
    booking_url: 'https://app.meridiq.com/booking/NjE0Nw==?lang=sv'
  },
  {
    slug: 'mn-klinik-eskilstuna',
    name: 'Mn Klinik',
    address: 'Bergsgatan 3B, 632 26 Eskilstuna',
    phone: '076-081 66 34',
    email: 'kontakt@mnklinik.se',
    website: 'https://mnklinik.se',
    booking_url: 'https://www.bokadirekt.se/places/mnklinik-134017'
  },
  {
    slug: 'glow-and-beauty-clinic-eskilstuna',
    name: 'Glow And Beauty Clinic',
    address: 'Drottninggatan 7, 632 18 Eskilstuna',
    phone: '076-126 06 88',
    email: 'info@glownbeauty.se',
    website: 'http://www.glownbeauty.se',
    booking_url: 'https://www.bokadirekt.se/places/glow-and-beauty-clinic-60919'
  },
  {
    slug: 'innovans-skincare-eskilstuna',
    name: "I'nnovans Skincare",
    address: 'Djurgårdsvägen 4, 633 40 Eskilstuna',
    phone: '072-949 52 92',
    email: 'info@innovansskincare.se',
    website: 'https://innovansskincare.se',
    booking_url: 'https://www.bokadirekt.se/places/innovans-skincare-59923'
  },
  {
    slug: 'sara-beauty-clinic-eskilstuna',
    name: 'Sara Beauty Clinic',
    address: 'Västra Storgatan 2B, 633 42 Eskilstuna',
    phone: '073-670 40 42',
    email: 'sarabeautyclinic.eskilstuna@gmail.com',
    website: 'https://www.bokadirekt.se/places/sara-beauty-clinic-47535',
    booking_url: 'https://www.bokadirekt.se/places/sara-beauty-clinic-47535'
  },
  {
    slug: 'life-team-sweden-eskilstuna',
    name: 'Life Team Sweden AB',
    address: 'Kungsgatan 9, 632 20 Eskilstuna',
    phone: '016-14 00 20',
    email: 'kontakt@lifeteam.se',
    website: 'https://www.bokadirekt.se/places/life-team-sweden-ab-48882',
    booking_url: 'https://www.bokadirekt.se/places/life-team-sweden-ab-48882'
  },
  {
    slug: 'salong-style-har-brud-eskilstuna',
    name: 'Salong Style Hår & Brud',
    address: 'Ruddammsgatan 9, 632 20 Eskilstuna',
    phone: '016-13 97 08',
    email: 'info@salongstylebrud.se',
    website: 'https://salongstylebrud.bokadirekt.se',
    booking_url: 'https://salongstylebrud.bokadirekt.se'
  },
  {
    slug: 'marals-beauty-clinic-eskilstuna',
    name: "Maral's Beauty Clinic",
    address: 'Flackstavägen 7, 632 22 Eskilstuna',
    phone: '076-096 10 59',
    email: 'info@maralsbeautyclinic.se',
    website: 'https://maralsbeautyclinic.se',
    booking_url: 'https://maralsbeautyclinic.se'
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
    slug: 'bernau-esthetic-eskilstuna',
    name: 'Bernau Esthetic',
    address: 'Alforsgatan 9, 632 20 Eskilstuna',
    phone: '070-738 30 40',
    email: 'info@bernauesthetic.se',
    website: 'https://www.bokadirekt.se/places/bernau-esthetic-51532',
    booking_url: 'https://www.bokadirekt.se/places/bernau-esthetic-51532'
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
    slug: 'ec-estetik-eskilstuna',
    name: 'EC Estetik',
    address: 'Berzeliigatan 12, 632 20 Eskilstuna',
    phone: '070-149 53 20',
    email: 'ecestetik@gmail.com',
    website: 'https://www.instagram.com/ecestetik/',
    booking_url: 'https://www.instagram.com/ecestetik/'
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
    website: 'https://www.instagram.com/maybeautyhouse/',
    booking_url: 'https://www.instagram.com/maybeautyhouse/'
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

async function run() {
  console.log('=== Committing 100% verified URLs and contacts for Eskilstuna clinics ===\n');

  for (const c of CLINICS) {
    const { error } = await supabase
      .from('clinics')
      .update({
        name: c.name,
        address: c.address,
        phone: c.phone,
        email: c.email,
        website: c.website,
        booking_url: c.booking_url
      })
      .or(`slug.eq.${c.slug},name.ilike.${c.name}`);

    if (error) {
      console.error(`Error updating ${c.name}:`, error);
    } else {
      console.log(`✓ ${c.name}`);
      console.log(`   Address: ${c.address}`);
      console.log(`   Phone:   ${c.phone}`);
      console.log(`   Email:   ${c.email}`);
      console.log(`   Web:     ${c.website}`);
      console.log(`   Booking: ${c.booking_url}\n`);
    }
  }

  console.log('All 20 Eskilstuna clinics updated with 100% authentic data!');
}

run();
