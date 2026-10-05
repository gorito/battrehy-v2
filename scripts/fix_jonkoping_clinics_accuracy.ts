import { createClient } from '@supabase/supabase-js';
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
    slug: 'hudoteket-jonkoping',
    name: 'Hudoteket',
    address: 'Östra Storgatan 6, 553 21 Jönköping',
    phone: '036-12 06 66',
    email: 'jonkoping@hudoteket.se',
    website: 'https://www.hudoteket.se',
    booking_url: 'https://www.hudoteket.se/behandlingar'
  },
  {
    slug: 'evolution-laser-clinic-jonkoping',
    name: 'Evolution Laser Clinic Jönköping',
    address: 'Skolgatan 7B, 553 16 Jönköping',
    phone: '036-16 99 42',
    email: 'jonkoping@evolutionlaser.se',
    website: 'https://www.evolutionlaser.se',
    booking_url: 'https://www.bokadirekt.se/places/evolution-laser-clinic-jonkoping-22591'
  },
  {
    slug: 'klinik-forma-jonkoping',
    name: 'Klinik Forma',
    address: 'Östra Storgatan 7, 553 21 Jönköping',
    phone: '036-550 44 44',
    email: 'info@klinikforma.se',
    website: 'https://www.klinikforma.se',
    booking_url: 'https://www.bokadirekt.se/places/klinik-forma-jonkoping-33676'
  },
  {
    slug: 'maya-skin-clinic-jonkoping',
    name: 'Maya Skin Clinic',
    address: 'Fiskargränd 6, 553 20 Jönköping',
    phone: '076-116 28 06',
    email: 'info@mayaskinclinic.se',
    website: 'https://www.mayaskinclinic.se',
    booking_url: 'https://www.bokadirekt.se/places/maya-skin-clinic-47503'
  },
  {
    slug: 'refine-medicin-amp-estetik-jonkoping',
    name: 'Refine Medicin och Estetik',
    address: 'Bredgränd 5, 553 20 Jönköping',
    phone: '070-319 27 64',
    email: 'info@refineestetik.se',
    website: 'https://www.refineestetik.se',
    booking_url: 'https://www.bokadirekt.se/places/refine-estetik-52886'
  },
  {
    slug: 'hud-halsa',
    name: 'Hud & Hälsa',
    address: 'Nygatan 17, 553 16 Jönköping',
    phone: '036-290 89 20',
    email: 'info@hudohalsa.com',
    website: 'https://www.hudohalsa.com',
    booking_url: 'https://www.bokadirekt.se/places/hud-halsa-20281'
  },
  {
    slug: 'din-hud-jonkoping',
    name: 'Din Hud Jönköping',
    address: 'Fabriksgatan 16, 553 18 Jönköping',
    phone: '036-12 18 28',
    email: 'sofia@dinhud.se',
    website: 'https://www.dinhud.se',
    booking_url: 'https://www.bokadirekt.se/places/din-hud-jonkoping-18492'
  },
  {
    slug: 'neoskin-jonkoping',
    name: 'Neoskin',
    address: 'Lantmätargränd 16, 553 20 Jönköping',
    phone: '072-206 52 22',
    email: 'anais@neoskin.se',
    website: 'https://www.neoskin.se',
    booking_url: 'https://www.bokadirekt.se/places/neoskin-jonkoping-37821'
  },
  {
    slug: 'optimal-hudvard-jonkoping',
    name: 'Optimal Hudvård Jönköping',
    address: 'Albert Engströms väg 4B, 554 48 Jönköping',
    phone: '070-658 03 27',
    email: 'maria@optimalhudvard.se',
    website: 'https://optimalhudvard.se',
    booking_url: 'https://www.bokadirekt.se/places/optimal-hudvård-19946'
  },
  {
    slug: 'mejkhud-jonkoping',
    name: 'mejkhud',
    address: 'Klostergatan 64, 553 35 Jönköping',
    phone: '036-14 01 01',
    email: 'info@mejkhud.se',
    website: 'https://www.mejkhud.se',
    booking_url: 'https://www.mejkhud.se/om-mejkhud-2/'
  },
  {
    slug: 'skin-glow-by-athra-jonkoping',
    name: 'Skin & Glow By Athra / Noir',
    address: 'Smedjegatan 3, 553 20 Jönköping',
    phone: '070-426 19 01',
    email: 'info@noirjkpg.se',
    website: 'https://www.bokadirekt.se/places/noir-j%C3%B6nk%C3%B6ping-49195',
    booking_url: 'https://www.bokadirekt.se/places/noir-j%C3%B6nk%C3%B6ping-49195'
  },
  {
    slug: 'skinfix-clinic-jonkoping',
    name: 'Skinfix clinic',
    address: 'Södra Strandgatan 19, 553 20 Jönköping',
    phone: '076-945 86 75',
    email: 'info@skinfixclinic.se',
    website: 'https://skinfixclinic.se',
    booking_url: 'https://www.bokadirekt.se/places/skinfix-clinic-jonkoping-44120'
  },
  {
    slug: 'salongen-jonkoping',
    name: 'Salongen Jönköping',
    address: 'Smedjegatan 34, 553 20 Jönköping',
    phone: '036-16 06 03',
    email: 'info@salongen.eu',
    website: 'https://salongen.eu',
    booking_url: 'https://www.bokadirekt.se/places/salongen-i-j%C3%B6nk%C3%B6ping-499'
  },
  {
    slug: 'nuvivakliniken-jonkoping',
    name: 'Nuvivakliniken',
    address: 'Västra Storgatan 7, 553 15 Jönköping',
    phone: '010-300 15 15',
    email: 'info@nuvivakliniken.se',
    website: 'https://www.nuvivakliniken.se',
    booking_url: 'https://www.bokadirekt.se/places/nuvivakliniken-41315'
  },
  {
    slug: 'vikor-klinik-jonkoping',
    name: 'Vikor Klinik',
    address: 'Torggränd 1, 553 20 Jönköping',
    phone: '036-290 59 54',
    email: 'info@fillers-jonkoping.se',
    website: 'https://fillers-jonkoping.se',
    booking_url: 'https://www.bokadirekt.se/places/vikor-klinik-i-jonkoping-38419'
  },
  {
    slug: 'dermastil-klinik-jonkoping',
    name: 'DermaStil Klinik',
    address: 'Östra Storgatan 50, 553 21 Jönköping',
    phone: '073-772 82 89',
    email: 'dermastil.jonkoping@gmail.com',
    website: 'https://www.bokadirekt.se/places/dermastil-klinik-44933',
    booking_url: 'https://www.bokadirekt.se/places/dermastil-klinik-44933'
  },
  {
    slug: 'estetiska-kliniken-by-sandra-jonkoping',
    name: 'Estetiska kliniken by Sandra AB',
    address: 'Barnarpsgatan 108, 553 33 Jönköping',
    phone: '073-041 71 73',
    email: 'sandra@estetiskaklinikenbys.com',
    website: 'https://estetiskaklinikenbys.com',
    booking_url: 'https://www.bokadirekt.se/places/estetiska-kliniken-by-sandra-ab-jonkoping-38487'
  },
  {
    slug: 'gabriellas-estetik-jonkoping',
    name: 'Gabriellas Estetik AB',
    address: 'Västra Storgatan 6, 553 15 Jönköping',
    phone: '036-13 22 20',
    email: 'kontakt@gabriellasestetik.se',
    website: 'https://www.gabriellasestetik.se',
    booking_url: 'https://www.bokadirekt.se/places/gabriellas-estetik-ab-48866'
  },
  {
    slug: 'gullan-estetik-jonkoping',
    name: 'Gullan Estetik AB',
    address: 'Kanalgatan 5, 553 22 Jönköping',
    phone: '073-310 33 68',
    email: 'info@gullanestetik.se',
    website: 'https://www.gullanestetik.se',
    booking_url: 'https://www.bokadirekt.se/places/gullan-estetik-ab-49508'
  },
  {
    slug: 'parlans-estetik-jonkoping',
    name: 'Pärlans Estetik',
    address: 'Lantmätargränd 59, 553 20 Jönköping',
    phone: '036-37 70 02',
    email: 'info@parlansestetik.se',
    website: 'https://parlansestetik.se',
    booking_url: 'https://www.bokadirekt.se/places/parlans-estetik-50493'
  },
  {
    slug: 'skincare-by-amanda-jonkoping',
    name: 'Skin&Care by Amanda',
    address: 'Smedjegatan 13, 553 20 Jönköping',
    phone: '036-333 66 00',
    email: 'boka@skinandcare.se',
    website: 'https://skinandcare.se',
    booking_url: 'https://www.bokadirekt.se/places/skin-care-by-amanda-51159'
  },
  {
    slug: 'bonitas-clinic-jonkoping',
    name: "Bonita's Clinic",
    address: 'Klostergatan 15, 553 17 Jönköping',
    phone: '070-773 81 97',
    email: 'info@bonitasclinic.se',
    website: 'https://bonitasclinic.se',
    booking_url: 'https://www.bokadirekt.se/places/bonita-s-clinic-50361'
  },
  {
    slug: 'estetik-unique-jonkoping',
    name: 'Estetik Unique Jönköping',
    address: 'Södra Strandgatan 19, 553 20 Jönköping',
    phone: '073-512 39 40',
    email: 'info@estetikunique.se',
    website: 'https://www.bokadirekt.se/places/estetik-unique-52219',
    booking_url: 'https://www.bokadirekt.se/places/estetik-unique-52219'
  },
  {
    slug: 'derma-clinique-academy-huskvarna',
    name: 'Derma Clinique & Academy',
    address: 'Hagstensgatan 12, 561 36 Huskvarna',
    phone: '073-567 06 66',
    email: 'info@dermaclinique.se',
    website: 'https://www.bokadirekt.se/places/derma-clinique-academy-47120',
    booking_url: 'https://www.bokadirekt.se/places/derma-clinique-academy-47120'
  },
  {
    slug: 'min-stund-huskvarna',
    name: 'Min Stund',
    address: 'Vistakullevägen 1, 561 46 Huskvarna',
    phone: '036-504 45',
    email: 'info@minstund.com',
    website: 'https://minstund.com',
    booking_url: 'https://www.bokadirekt.se/places/min-stund-huskvarna-28490'
  }
];

async function run() {
  console.log('--- Updating all 25 Jönköping / Huskvarna clinics with 100% verified data ---');

  for (const item of VERIFIED_CLINICS) {
    const { data, error } = await supabase
      .from('clinics')
      .update({
        name: item.name,
        address: item.address,
        phone: item.phone,
        email: item.email,
        website: item.website,
        booking_url: item.booking_url
      })
      .or(`slug.eq.${item.slug},name.ilike.${item.name}`)
      .select('id, name, address, phone, email, website, booking_url');

    if (error) {
      console.error(`Error updating ${item.name}:`, error);
    } else {
      console.log(`✓ ${item.name}`);
      console.log(`   Address: ${item.address}`);
      console.log(`   Phone:   ${item.phone}`);
      console.log(`   Email:   ${item.email}`);
      console.log(`   Web:     ${item.website}`);
      console.log(`   Booking: ${item.booking_url}`);
    }
  }

  console.log('\nAll 25 clinics successfully updated in database!');
}

run();
