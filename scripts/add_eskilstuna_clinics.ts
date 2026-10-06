import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import { randomUUID } from 'crypto';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface NewClinic {
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  postal_code: string;
  phone: string;
  email: string;
  website: string;
  booking_url: string;
  rating: number;
  review_count: number;
  is_shr_member: boolean;
  is_rfem_member: boolean;
  tier: string;
  is_verified: boolean;
  extracted_services: string[];
  ai_description: string;
  ai_faq: string;
  ai_meta: string;
  treatmentSlugs: string[];
}

const ESKILSTUNA_CLINICS: NewClinic[] = [
  {
    name: 'IBA Estetik',
    slug: 'iba-estetik-eskilstuna',
    description: 'IBA Estetik i Eskilstuna är en väletablerad klinik som erbjuder medicinska och estetiska injektionsbehandlingar, avancerad hudvård samt laserbehandlingar med fokus på trygghet och naturliga resultat.',
    address: 'Libergsgatan 10, 632 21 Eskilstuna',
    city: 'Eskilstuna',
    postal_code: '632 21',
    phone: '016-12 18 20',
    email: 'ibaestetikab@hotmail.com',
    website: 'https://www.ibaestetik.se',
    booking_url: 'https://www.bokadirekt.se/places/iba-estetik-34496',
    rating: 4.8,
    review_count: 85,
    is_shr_member: false,
    is_rfem_member: true,
    tier: 'free',
    is_verified: true,
    extracted_services: ['Botox', 'Fillers', 'Microneedling', 'Hudvård', 'Laser', 'Profhilo', 'Kemisk peeling', 'Läppfiller'],
    ai_description: 'IBA Estetik är en modern skönhetsklinik i centrala Eskilstuna med erfaren legitimerad personal. Kliniken tillhandahåller skräddarsydda estetiska behandlingar med högsta patientsäkerhet.',
    ai_faq: '**Vilka behandlingar utför IBA Estetik?**\nIBA Estetik erbjuder botox, fillers, profhilo, microneedling och kemiska peelingar.\n\n**Är personalen legitimerad?**\nJa, alla injektionsbehandlingar utförs av legitimerad och certifierad vårdpersonal.',
    ai_meta: 'Boka botox, fillers och avancerad hudvård hos IBA Estetik i Eskilstuna. Säker klinik med legitimerad personal.',
    treatmentSlugs: ['botoxbehandling', 'fillerbehandling', 'profhilo', 'microneedling', 'kemisk-peeling', 'lappfiller', 'skonhetsklinik', 'estetisk-klinik']
  },
  {
    name: "Maral's Beauty Clinic",
    slug: 'marals-beauty-clinic-eskilstuna',
    description: "Maral's Beauty Clinic i Eskilstuna drivs av legitimerad sjuksköterska och erbjuder professionella estetiska injektioner, microneedling och skräddarsydda hudvårdsbehandlingar.",
    address: 'Flackstavägen 7, 632 22 Eskilstuna',
    city: 'Eskilstuna',
    postal_code: '632 22',
    phone: '076-096 10 59',
    email: 'info@maralsbeautyclinic.se',
    website: 'https://maralsbeautyclinic.se',
    booking_url: 'https://www.bokadirekt.se/places/marals-beauty-clinic-47209',
    rating: 4.9,
    review_count: 62,
    is_shr_member: false,
    is_rfem_member: true,
    tier: 'free',
    is_verified: true,
    extracted_services: ['Botox', 'Fillers', 'Microneedling', 'Ansiktsbehandling', 'Skin boosters', 'Läppfiller', 'PRP'],
    ai_description: "Maral's Beauty Clinic är en certifierad och säker klinik i Eskilstuna med medicinskt ansvarig läkare. Kliniken fokuserar på naturliga resultat och individanpassade behandlingsplaner.",
    ai_faq: '**Vem utför behandlingarna på Maral\'s Beauty Clinic?**\nBehandlingarna utförs av legitimerad sjuksköterska med medicinskt ansvarig läkare kopplad till verksamheten.\n\n**Krävs konsultation inför injektioner?**\nJa, enligt lag genomförs alltid en konsultation minst 48 timmar innan injektionsbehandling för nya kunder.',
    ai_meta: "Boka estetiska injektioner, botox och fillers hos Maral's Beauty Clinic i Eskilstuna. Legitimerad personal och trygga resultat.",
    treatmentSlugs: ['botoxbehandling', 'fillerbehandling', 'skin-boosters', 'lappfiller', 'microneedling', 'ansiktsbehandling', 'prp', 'estetisk-klinik']
  },
  {
    name: 'Dr Licke Estetik',
    slug: 'dr-licke-estetik-eskilstuna',
    description: 'Dr Licke Estetik i Eskilstuna drivs av legitimerad läkare och är specialiserad på estetiska injektionsbehandlingar såsom fillers, botox, Profhilo och PRX-T33.',
    address: 'Lenngrensgatan 5, 632 27 Eskilstuna',
    city: 'Eskilstuna',
    postal_code: '632 27',
    phone: '070-743 99 10',
    email: 'kontakt@drlicke.se',
    website: 'https://www.instagram.com/dr.licke.estetik/',
    booking_url: 'https://www.bokadirekt.se/places/dr-licke-estetik-56064',
    rating: 4.9,
    review_count: 54,
    is_shr_member: false,
    is_rfem_member: true,
    tier: 'free',
    is_verified: true,
    extracted_services: ['Botox', 'Fillers', 'Profhilo', 'PRX-T33', 'Skin boosters', 'Läppfiller', 'Anti-aging behandling'],
    ai_description: 'Dr Licke Estetik erbjuder professionella och säkra estetiska injektioner under ledning av legitimerad läkare med bred expertis inom ansiktsestetik.',
    ai_faq: '**Vem utför injektionerna hos Dr Licke Estetik?**\nSamtliga injektionsbehandlingar utförs av legitimerad läkare.\n\n**Vilka preparat används?**\nEndast CE-märkta och godkända premiumpreparat av högsta medicinska standard används.',
    ai_meta: 'Dr Licke Estetik i Eskilstuna – Läkarutförda injektionsbehandlingar med botox, fillers och Profhilo.',
    treatmentSlugs: ['botoxbehandling', 'fillerbehandling', 'profhilo', 'skin-boosters', 'lappfiller', 'anti-aging-behandling', 'estetisk-klinik']
  },
  {
    name: 'S Derma Clinic',
    slug: 's-derma-clinic-eskilstuna',
    description: 'S Derma Clinic i Eskilstuna är en modern laserklinik och skönhetsklinik som erbjuder hårborttagning, laserbehandlingar, botox, fillers och avancerad hudvård.',
    address: 'Västeråsvägen 48 B, 632 23 Eskilstuna',
    city: 'Eskilstuna',
    postal_code: '632 23',
    phone: '010-209 88 55',
    email: 'info@sdermaclinic.se',
    website: 'https://www.sdermaclinic.se',
    booking_url: 'https://www.sdermaclinic.se/boka',
    rating: 4.8,
    review_count: 78,
    is_shr_member: false,
    is_rfem_member: true,
    tier: 'free',
    is_verified: true,
    extracted_services: ['Laserbehandling', 'Laser hårborttagning', 'Botoxbehandling', 'Fillerbehandling', 'Hudvård', 'Microneedling'],
    ai_description: 'S Derma Clinic erbjuder modern medicinsk laserteknik för permanent hårborttagning och hudföryngring tillsammans med estetiska injektioner utförda av legitimerad personal.',
    ai_faq: '**Vilken laserutrustning används hos S Derma Clinic?**\nKliniken använder marknadsledande medicinsk laser anpassad för alla hudtyper.\n\n**Erbjuder ni konsultation?**\nJa, kostnadsfri konsultation erbjuds inför laser och injektionsbehandlingar.',
    ai_meta: 'Boka laserhårborttagning, botox och fillers hos S Derma Clinic i Eskilstuna. Toppmodern laserteknik.',
    treatmentSlugs: ['laserbehandling', 'laser-harborttagning', 'botoxbehandling', 'fillerbehandling', 'microneedling', 'hudvard', 'skonhetsklinik']
  },
  {
    name: 'Mn Klinik',
    slug: 'mn-klinik-eskilstuna',
    description: 'Mn Klinik i Eskilstuna erbjuder ett heltäckande utbud av estetiska behandlingar inklusive botox, fillers, Profhilo, microneedling samt laserbehandlingar.',
    address: 'Bergsgatan 3B, 632 26 Eskilstuna',
    city: 'Eskilstuna',
    postal_code: '632 26',
    phone: '076-081 66 34',
    email: 'kontakt@mnklinik.se',
    website: 'https://mnklinik.se',
    booking_url: 'https://www.bokadirekt.se/places/mn-klinik-48380',
    rating: 4.8,
    review_count: 45,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: true,
    extracted_services: ['Botoxbehandling', 'Fillerbehandling', 'Profhilo', 'Microneedling', 'Laser hårborttagning', 'Ansiktsbehandling'],
    ai_description: 'Mn Klinik erbjuder individanpassade estetiska behandlingar med legitimerad personal i en avslappnande och professionell miljö.',
    ai_faq: '**Vilka injektionsbehandlingar finns hos Mn Klinik?**\nMn Klinik erbjuder botox, läppfillers, kindbensfillers, käklinjefillers samt Profhilo.',
    ai_meta: 'Mn Klinik i Eskilstuna – Certifierad klinik för botox, fillers, profhilo och microneedling.',
    treatmentSlugs: ['botoxbehandling', 'fillerbehandling', 'profhilo', 'microneedling', 'laser-harborttagning', 'ansiktsbehandling', 'lappfiller']
  },
  {
    name: 'Estetik by Camilla',
    slug: 'estetik-by-camilla-eskilstuna',
    description: 'Estetik by Camilla erbjuder professionella estetiska injektionsbehandlingar, skinboosters, kemiska peelingar och hudvård med fokus på naturlig skönhet.',
    address: 'Lärkvägen 32B, 633 63 Eskilstuna',
    city: 'Eskilstuna',
    postal_code: '633 63',
    phone: '070-885 21 18',
    email: 'estetikbycamilla@gmail.com',
    website: 'https://www.bokadirekt.se/places/estetik-by-camilla-52119',
    booking_url: 'https://www.bokadirekt.se/places/estetik-by-camilla-52119',
    rating: 4.9,
    review_count: 38,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: true,
    extracted_services: ['Botoxbehandling', 'Fillerbehandling', 'Skin boosters', 'Kemisk peeling', 'Anti-aging behandling', 'Läppfiller'],
    ai_description: 'Hos Estetik by Camilla får du trygga injektionsbehandlingar utförda av legitimerad sjuksköterska med fokus på personlig service och naturliga resultat.',
    ai_faq: '**Vem utför behandlingarna?**\nBehandlingarna utförs av legitimerad sjuksköterska certifierad inom estetiska injektioner.',
    ai_meta: 'Boka botox, fillers och skinboosters hos Estetik by Camilla i Eskilstuna via Bokadirekt.',
    treatmentSlugs: ['botoxbehandling', 'fillerbehandling', 'skin-boosters', 'lappfiller', 'kemisk-peeling', 'anti-aging-behandling']
  },
  {
    name: 'Näckros Skin & Beauty',
    slug: 'nackros-skin-beauty-eskilstuna',
    description: 'Näckros Skin & Beauty i Eskilstuna drivs av auktoriserad hud- och spaterapeut, medlem i SHR, och erbjuder resultatinriktad hudvård, ansiktsbehandlingar och microneedling.',
    address: 'Rademachergatan 19, 632 18 Eskilstuna',
    city: 'Eskilstuna',
    postal_code: '632 18',
    phone: '072-277 99 40',
    email: 'info@nackrosskinandbeauty.se',
    website: 'https://www.bokadirekt.se/places/nackros-skin-beauty-45542',
    booking_url: 'https://www.bokadirekt.se/places/nackros-skin-beauty-45542',
    rating: 5.0,
    review_count: 67,
    is_shr_member: true,
    is_rfem_member: false,
    tier: 'free',
    is_verified: true,
    extracted_services: ['Ansiktsbehandling', 'Hudvård', 'Microneedling', 'Kemisk peeling', 'Hudterapeut', 'Anti-aging behandling'],
    ai_description: 'Näckros Skin & Beauty är en SHR-auktoriserad hudvårdssalong i Eskilstuna med fokus på helhetshälsa, avancerad hudvård och professionella resultat med produkter från ledande varumärken som BABOR och Circadia.',
    ai_faq: '**Är Näckros Skin & Beauty medlem i SHR?**\nJa, salongen drivs av en auktoriserad hudterapeut med medlemskap i Sveriges Hudterapeuters Riksorganisation (SHR).\n\n**Kan jag använda friskvårdsbidrag?**\nJa, friskvårdsberättigade behandlingar erbjuds.',
    ai_meta: 'SHR-auktoriserad hudvård och ansiktsbehandlingar hos Näckros Skin & Beauty i Eskilstuna. Boka tid enkelt online.',
    treatmentSlugs: ['ansiktsbehandling', 'hudvard', 'hudterapeut', 'microneedling', 'kemisk-peeling', 'anti-aging-behandling']
  },
  {
    name: 'Uniq Hudvård',
    slug: 'uniq-hudvard-eskilstuna',
    description: 'Uniq Hudvård i Eskilstuna drivs av Erika Gyarmati, auktoriserad hudterapeut med gesäll- och mästarbrev samt SHR-medlem. Erbjuder klassisk och avancerad hudvård.',
    address: 'Stensborgsgatan 2A, 633 55 Eskilstuna',
    city: 'Eskilstuna',
    postal_code: '633 55',
    phone: '016-51 10 10',
    email: 'info@uniqhud.se',
    website: 'https://www.uniqhud.se',
    booking_url: 'https://www.bokadirekt.se/places/uniq-hudvard-i-eskilstuna-16053',
    rating: 4.9,
    review_count: 94,
    is_shr_member: true,
    is_rfem_member: false,
    tier: 'free',
    is_verified: true,
    extracted_services: ['Ansiktsbehandling', 'Hudvård', 'Microneedling', 'Kemisk peeling', 'Hudterapeut', 'Anti-aging behandling'],
    ai_description: 'Uniq Hudvård har lång erfarenhet och mästarbrev inom hudterapi. Salongen erbjuder professionell hudanalys, djuprengörande ansiktsbehandlingar och avancerad anti-age hudvård.',
    ai_faq: '**Vad innebär mästarbrev inom hudvård?**\nMästarbrevet är det högsta beviset på yrkesskicklighet inom hudterapeutyrket och garanterar gedigen expertis.',
    ai_meta: 'Auktoriserad hudterapeut med mästarbrev i Eskilstuna. Boka ansiktsbehandling hos Uniq Hudvård.',
    treatmentSlugs: ['ansiktsbehandling', 'hudvard', 'hudterapeut', 'microneedling', 'kemisk-peeling', 'anti-aging-behandling']
  },
  {
    name: 'Ulrikas Hudvård',
    slug: 'ulrikas-hudvard-eskilstuna',
    description: 'Ulrikas Hudvård drivs av auktoriserad hudterapeut Ulrika Thomsen med över 30 års erfarenhet, mästarbrev och SHR-medlemskap. Specialiserad på resultatinriktad hudvård.',
    address: 'Kungsgatan 39-41, 632 20 Eskilstuna',
    city: 'Eskilstuna',
    postal_code: '632 20',
    phone: '072-250 06 46',
    email: 'ulrikashudvard@gmail.com',
    website: 'https://www.ulrikashudvard.com',
    booking_url: 'https://www.bokadirekt.se/places/ulrikas-hudvard-5536',
    rating: 4.9,
    review_count: 112,
    is_shr_member: true,
    is_rfem_member: false,
    tier: 'free',
    is_verified: true,
    extracted_services: ['Ansiktsbehandling', 'Hudvård', 'Kemisk peeling', 'Microneedling', 'Hudterapeut', 'Anti-aging behandling'],
    ai_description: 'Med över 3 decenniers erfarenhet erbjuder Ulrikas Hudvård skräddarsydda och effektiva hudvårdsbehandlingar med Dermapen och medicinska peels i centrala Eskilstuna.',
    ai_faq: '**Vilka märken arbetar Ulrikas Hudvård med?**\nSalongen arbetar med noga utvalda professionella hudvårdsmärken med bevisad effekt på hudhälsa.',
    ai_meta: 'Ulrikas Hudvård i Eskilstuna – SHR-auktoriserad hudterapeut med 30+ års erfarenhet och mästarbrev.',
    treatmentSlugs: ['ansiktsbehandling', 'hudvard', 'hudterapeut', 'kemisk-peeling', 'microneedling', 'anti-aging-behandling']
  },
  {
    name: 'Glow And Beauty Clinic',
    slug: 'glow-and-beauty-clinic-eskilstuna',
    description: 'Glow And Beauty Clinic i Eskilstuna är en specialistklinik inom avancerad laserhårborttagning med Motus PRO Alexandrit-laser, microneedling och hudföryngring.',
    address: 'Drottninggatan 7, 632 18 Eskilstuna',
    city: 'Eskilstuna',
    postal_code: '632 18',
    phone: '076-126 06 88',
    email: 'info@glownbeauty.se',
    website: 'http://www.glownbeauty.se',
    booking_url: 'https://www.bokadirekt.se/places/glow-and-beauty-clinic-49120',
    rating: 4.9,
    review_count: 58,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: true,
    extracted_services: ['Laserbehandling', 'Laser hårborttagning', 'Microneedling', 'Kemisk peeling', 'Hudvård'],
    ai_description: 'Glow And Beauty Clinic erbjuder smärtfri och effektiv permanent hårborttagning med den senaste Alexandrit-lasertekniken samt resultatinriktad hudvård.',
    ai_faq: '**Fungerar er laser på alla hudtoner?**\nJa, vår Motus PRO Alexandrit-laser med Moveo-teknologi behandlar säkert och effektivt alla hud- och hårtyper.',
    ai_meta: 'Glow And Beauty Clinic i Eskilstuna – Smärtfri laserhårborttagning med Alexandrit-laser och microneedling.',
    treatmentSlugs: ['laserbehandling', 'laser-harborttagning', 'microneedling', 'kemisk-peeling', 'hudvard', 'skonhetsklinik']
  },
  {
    name: 'Sara Beauty Clinic',
    slug: 'sara-beauty-clinic-eskilstuna',
    description: 'Sara Beauty Clinic vid Klosters kyrka i Eskilstuna erbjuder permanent hårborttagning med laser, ansiktsbehandlingar och hudföryngrande behandlingar.',
    address: 'Västra Storgatan 2B, 633 42 Eskilstuna',
    city: 'Eskilstuna',
    postal_code: '633 42',
    phone: '073-670 40 55',
    email: 'sarabeautyclinic.eskilstuna@gmail.com',
    website: 'https://www.bokadirekt.se/places/sara-beauty-clinic-23363',
    booking_url: 'https://www.bokadirekt.se/places/sara-beauty-clinic-23363',
    rating: 4.8,
    review_count: 42,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: true,
    extracted_services: ['Laser hårborttagning', 'Ansiktsbehandling', 'Hudvård', 'Microneedling'],
    ai_description: 'Sara Beauty Clinic erbjuder professionella skönhets- och hudbehandlingar i lugn och trivsam miljö i Eskilstuna centrum.',
    ai_faq: '**Hur många laserbehandlingar krävs för hårborttagning?**\nVanligtvis behövs mellan 6 och 8 behandlingar för ett varaktigt resultat.',
    ai_meta: 'Boka laserhårborttagning och ansiktsbehandling hos Sara Beauty Clinic i Eskilstuna.',
    treatmentSlugs: ['laser-harborttagning', 'laserbehandling', 'ansiktsbehandling', 'hudvard', 'microneedling']
  },
  {
    name: 'Life Team Sweden AB',
    slug: 'life-team-sweden-eskilstuna',
    description: 'Life Team Sweden AB i Eskilstuna erbjuder modern laserhårborttagning, IPL, ansiktsbehandlingar och kemisk peeling i centrala lokaler.',
    address: 'Kungsgatan 9, 632 20 Eskilstuna',
    city: 'Eskilstuna',
    postal_code: '632 20',
    phone: '016-14 00 20',
    email: 'kontakt@lifeteam.se',
    website: 'https://www.bokadirekt.se/places/life-team-sweden-ab-48890',
    booking_url: 'https://www.bokadirekt.se/places/life-team-sweden-ab-48890',
    rating: 4.7,
    review_count: 36,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: true,
    extracted_services: ['Laser hårborttagning', 'Laserbehandling', 'Ansiktsbehandling', 'Kemisk peeling'],
    ai_description: 'Life Team Sweden tillhandahåller professionella laser- och skönhetsbehandlingar på Kungsgatan i Eskilstuna med modern utrustning.',
    ai_faq: '**Hur bokar jag tid hos Life Team Sweden?**\nDu kan enkelt boka lediga tider direkt online via Bokadirekt.',
    ai_meta: 'Life Team Sweden AB i Eskilstuna – Laserhårborttagning, hudvård och kemisk peeling på Kungsgatan.',
    treatmentSlugs: ['laser-harborttagning', 'laserbehandling', 'ansiktsbehandling', 'kemisk-peeling', 'hudvard']
  },
  {
    name: 'Bernau Esthetic',
    slug: 'bernau-esthetic-eskilstuna',
    description: 'Bernau Esthetic i Eskilstuna erbjuder professionell avancerad hudvård, Dermapen microneedling, kemiska peelingar och hudföryngring med medicinsk handledning.',
    address: 'Alforsgatan 9, 632 20 Eskilstuna',
    city: 'Eskilstuna',
    postal_code: '632 20',
    phone: '070-738 30 40',
    email: 'info@bernauesthetic.se',
    website: 'https://www.bokadirekt.se/places/bernau-esthetic-51090',
    booking_url: 'https://www.bokadirekt.se/places/bernau-esthetic-51090',
    rating: 4.9,
    review_count: 31,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: true,
    extracted_services: ['Microneedling', 'Ansiktsbehandling', 'Hudvård', 'Anti-aging behandling', 'Kemisk peeling'],
    ai_description: 'Bernau Esthetic är en klinik med fokus på medicinsk hudvård och hudförbättrande behandlingar med hög precision.',
    ai_faq: '**Vad hjälper microneedling mot?**\nMicroneedling stimulerar kollagenproduktionen och reducerar ärr, fina linjer, pigmenteringar och stora porer.',
    ai_meta: 'Bernau Esthetic Eskilstuna – Avancerad hudvård, Dermapen microneedling och kemisk peeling.',
    treatmentSlugs: ['microneedling', 'ansiktsbehandling', 'hudvard', 'anti-aging-behandling', 'kemisk-peeling']
  },
  {
    name: 'EC Estetik',
    slug: 'ec-estetik-eskilstuna',
    description: 'EC Estetik drivs av legitimerad sjuksköterska och erbjuder estetiska injektioner som botox, fillers och skinboosters med fokus på säkerhet och diskreta resultat.',
    address: 'Berzeliigatan 12, 632 20 Eskilstuna',
    city: 'Eskilstuna',
    postal_code: '632 20',
    phone: '070-149 53 20',
    email: 'ecestetik@gmail.com',
    website: 'https://www.bokadirekt.se/places/ec-estetik-50210',
    booking_url: 'https://www.bokadirekt.se/places/ec-estetik-50210',
    rating: 4.9,
    review_count: 28,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: true,
    extracted_services: ['Botoxbehandling', 'Fillerbehandling', 'Skin boosters', 'Läppfiller', 'Anti-aging behandling'],
    ai_description: 'EC Estetik utför säkra injektionsbehandlingar med certifiering och patientförsäkring i Eskilstuna.',
    ai_faq: '**Vilka fillers används hos EC Estetik?**\nKliniken använder uteslutande CE-märkta hyaluronsyrebaserade fillers av högsta kvalitet.',
    ai_meta: 'Boka botox och fillers hos EC Estetik i Eskilstuna. Utförs av legitimerad sjuksköterska.',
    treatmentSlugs: ['botoxbehandling', 'fillerbehandling', 'skin-boosters', 'lappfiller', 'anti-aging-behandling']
  },
  {
    name: 'Hk Estetik',
    slug: 'hk-estetik-eskilstuna',
    description: 'Hk Estetik i Eskilstuna är en certifierad injektionsklinik som utför botox och fillers med fokus på precision, symetri och naturlig harmoni.',
    address: 'Gränsgatan 17B, 632 23 Eskilstuna',
    city: 'Eskilstuna',
    postal_code: '632 23',
    phone: '073-515 12 80',
    email: 'hkestetik@outlook.com',
    website: 'https://www.bokadirekt.se/places/hk-estetik-52990',
    booking_url: 'https://www.bokadirekt.se/places/hk-estetik-52990',
    rating: 4.8,
    review_count: 25,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: true,
    extracted_services: ['Botoxbehandling', 'Fillerbehandling', 'Läppfiller', 'Skin boosters'],
    ai_description: 'Hk Estetik i Eskilstuna erbjuder trygga estetiska injektioner med individanpassad rådgivning och uppföljning.',
    ai_faq: '**Hur länge håller botox?**\nEffekten av en botoxbehandling kvarstår normalt i cirka 3–5 månader.',
    ai_meta: 'Hk Estetik i Eskilstuna – Certifierad injektionsbehandling med botox och fillers.',
    treatmentSlugs: ['botoxbehandling', 'fillerbehandling', 'lappfiller', 'skin-boosters']
  },
  {
    name: "I'nnovans Skincare",
    slug: 'innovans-skincare-eskilstuna',
    description: "I'nnovans Skincare drivs av auktoriserad hud- och spaterapeut Ann-Sofie med gesällbrev och CIDESCO-examen, medlem i SHR. Fokus på hållbar och ekologisk hudvård.",
    address: 'Djurgårdsvägen 4, 633 40 Eskilstuna',
    city: 'Eskilstuna',
    postal_code: '633 40',
    phone: '072-949 52 92',
    email: 'info@innovansskincare.se',
    website: 'https://innovansskincare.se',
    booking_url: 'https://www.bokadirekt.se/places/i-nnovans-skincare-37736',
    rating: 5.0,
    review_count: 52,
    is_shr_member: true,
    is_rfem_member: false,
    tier: 'free',
    is_verified: true,
    extracted_services: ['Ansiktsbehandling', 'Hudvård', 'Hudterapeut', 'Kemisk peeling', 'Anti-aging behandling'],
    ai_description: "I'nnovans Skincare erbjuder personligt anpassade hudvårdsbehandlingar med holistiskt tänk och dokumenterad effekt av auktoriserad hudterapeut med CIDESCO-examen.",
    ai_faq: '**Vad är CIDESCO-examen?**\nCIDESCO är världens mest prestigefyllda internationella certifiering inom hudterapi och skönhetsvård.',
    ai_meta: "Auktoriserad hudterapeut med CIDESCO-examen i Eskilstuna. Boka ansiktsbehandling hos I'nnovans Skincare.",
    treatmentSlugs: ['ansiktsbehandling', 'hudvard', 'hudterapeut', 'kemisk-peeling', 'anti-aging-behandling']
  },
  {
    name: 'Vianabeautyclinic',
    slug: 'vianabeautyclinic-eskilstuna',
    description: 'Vianabeautyclinic i Eskilstuna erbjuder fillers, botox, PRP (vampyrbehandling), skinboosters och microneedling med legitimerad behandlare.',
    address: 'Västeråsvägen 2A, 632 23 Eskilstuna',
    city: 'Eskilstuna',
    postal_code: '632 23',
    phone: '072-053 03 15',
    email: 'info@vianabeautyclinic.se',
    website: 'https://www.bokadirekt.se/places/vianabeautyclinic-47402',
    booking_url: 'https://www.bokadirekt.se/places/vianabeautyclinic-47402',
    rating: 4.8,
    review_count: 34,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: true,
    extracted_services: ['Botoxbehandling', 'Fillerbehandling', 'PRP', 'Skin boosters', 'Microneedling', 'Läppfiller'],
    ai_description: 'Vianabeautyclinic erbjuder populära estetiska behandlingar som PRP mot håravfall och hudföryngring samt fillers och botox.',
    ai_faq: '**Vad är PRP-behandling?**\nPRP innebär att kroppseget plasma med tillväxtfaktorer injiceras för att stimulera hudföryngring eller hårväxt.',
    ai_meta: 'Vianabeautyclinic i Eskilstuna – PRP, botox, fillers och microneedling. Boka tid på Bokadirekt.',
    treatmentSlugs: ['botoxbehandling', 'fillerbehandling', 'prp', 'skin-boosters', 'microneedling', 'lappfiller']
  },
  {
    name: 'May Beauty House',
    slug: 'may-beauty-house-eskilstuna',
    description: 'May Beauty House i Eskilstuna erbjuder skönhetsbehandlingar såsom fillers, microneedling, ansiktsbehandlingar och mesoterapi.',
    address: 'Bredängsgatan 38, 633 46 Eskilstuna',
    city: 'Eskilstuna',
    postal_code: '633 46',
    phone: '070-032 62 40',
    email: 'maybeautyhouse@gmail.com',
    website: 'https://www.bokadirekt.se/places/may-beauty-house-48130',
    booking_url: 'https://www.bokadirekt.se/places/may-beauty-house-48130',
    rating: 4.7,
    review_count: 22,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: true,
    extracted_services: ['Fillerbehandling', 'Microneedling', 'Ansiktsbehandling', 'Hudvård', 'Skin boosters'],
    ai_description: 'May Beauty House erbjuder prisvärda och professionella skönhetsbehandlingar i en hemtrevlig atmosfär i Eskilstuna.',
    ai_faq: '**Vilka ansiktsbehandlingar erbjuds?**\nSalongen erbjuder djuprengörande ansiktsbehandlingar, fuktgivande kurer och microneedling.',
    ai_meta: 'May Beauty House i Eskilstuna – Ansiktsbehandling, fillers och microneedling.',
    treatmentSlugs: ['fillerbehandling', 'microneedling', 'ansiktsbehandling', 'hudvard', 'skin-boosters']
  },
  {
    name: 'Salong Style Hår & Brud',
    slug: 'salong-style-har-brud-eskilstuna',
    description: 'Salong Style Hår & Brud på Ruddammsgatan i Eskilstuna erbjuder professionell hudvård av auktoriserad hudterapeut (SHR), laserhårborttagning och ansiktsbehandlingar.',
    address: 'Ruddammsgatan 9, 632 20 Eskilstuna',
    city: 'Eskilstuna',
    postal_code: '632 20',
    phone: '016-13 88 50',
    email: 'info@salongstylebrud.se',
    website: 'https://salongstylebrud.se',
    booking_url: 'https://www.bokadirekt.se/places/salong-style-har-brud-eskilstuna-17520',
    rating: 4.9,
    review_count: 88,
    is_shr_member: true,
    is_rfem_member: false,
    tier: 'free',
    is_verified: true,
    extracted_services: ['Ansiktsbehandling', 'Hudvård', 'Hudterapeut', 'Laser hårborttagning'],
    ai_description: 'Salong Style Hår & Brud är en anrik skönhetssalong med centralt läge i Eskilstuna som erbjuder auktoriserad hudvård och laserbehandlingar.',
    ai_faq: '**Har hudterapeuten SHR-auktorisation?**\nJa, hudvårdsavdelningen drivs av en SHR-auktoriserad hudterapeut med behandlingsskadeförsäkring.',
    ai_meta: 'Auktoriserad hudvård och laserbehandling hos Salong Style Hår & Brud i centrala Eskilstuna.',
    treatmentSlugs: ['ansiktsbehandling', 'hudvard', 'hudterapeut', 'laser-harborttagning']
  },
  {
    name: 'Hud Hälsa Jennifer K Wistrand',
    slug: 'hud-halsa-jennifer-k-wistrand-eskilstuna',
    description: 'Hud Hälsa har funnits i Eskilstuna sedan 2004 och drivs av auktoriserad hudterapeut Jennifer K Wistrand, medlem i SHR. Specialiserad på resultatinriktade ansiktsbehandlingar.',
    address: 'Köpmangatan 41, 632 20 Eskilstuna',
    city: 'Eskilstuna',
    postal_code: '632 20',
    phone: '016-12 55 00',
    email: 'hudohalsa@wistrand.se',
    website: 'https://www.bokadirekt.se/places/hud-halsa-jennifer-k-wistrand-eskilstuna-23190',
    booking_url: 'https://www.bokadirekt.se/places/hud-halsa-jennifer-k-wistrand-eskilstuna-23190',
    rating: 4.9,
    review_count: 76,
    is_shr_member: true,
    is_rfem_member: false,
    tier: 'free',
    is_verified: true,
    extracted_services: ['Ansiktsbehandling', 'Hudvård', 'Hudterapeut', 'Kemisk peeling', 'Anti-aging behandling'],
    ai_description: 'Hud Hälsa i Eskilstuna erbjuder över 20 års erfarenhet av professionell hudvård med skräddarsydda kurer och ledande hudvårdsmärken.',
    ai_faq: '**Hur länge har salongen funnits?**\nHud Hälsa etablerades i Eskilstuna år 2004 och drivs av auktoriserad hudterapeut.',
    ai_meta: 'Hud Hälsa Jennifer K Wistrand i Eskilstuna – SHR-auktoriserad hudterapeut sedan 2004. Boka ansiktsbehandling.',
    treatmentSlugs: ['ansiktsbehandling', 'hudvard', 'hudterapeut', 'kemisk-peeling', 'anti-aging-behandling']
  }
];

const BEAUTY_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512290900672-1f41e57c0e86?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1629744360341-399066bfb104?q=80&w=1200&auto=format&fit=crop'
];

async function uploadImageToSupabase(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) return null;

    const buffer = await res.arrayBuffer();
    const contentType = res.headers.get('content-type') || 'image/jpeg';
    let ext = 'jpg';
    if (contentType.includes('png')) ext = 'png';
    else if (contentType.includes('webp')) ext = 'webp';

    const filePath = `clinics/${randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from('company-images')
      .upload(filePath, buffer, {
        contentType,
        upsert: true
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('company-images')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (err: any) {
    console.error('Error fetching/uploading image:', err?.message);
    return null;
  }
}

async function scrapeImageForClinic(websiteUrl?: string, bookingUrl?: string): Promise<string | null> {
  const urlsToTry = [websiteUrl, bookingUrl].filter(Boolean) as string[];

  for (const targetUrl of urlsToTry) {
    try {
      const res = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        signal: AbortSignal.timeout(6000)
      });
      if (!res.ok) continue;

      const html = await res.text();
      const $ = cheerio.load(html);

      let img = $('meta[property="og:image"]').attr('content') ||
                $('meta[name="twitter:image"]').attr('content') ||
                $('meta[property="og:image:secure_url"]').attr('content');

      if (!img) {
        const firstImg = $('img[src*="header"], img[src*="banner"], img[src*="hero"], img[src*="clinic"], img[src*="salon"], img[src*="salong"]').first().attr('src');
        if (firstImg) img = firstImg;
      }

      if (img) {
        if (img.startsWith('//')) {
          img = 'https:' + img;
        } else if (img.startsWith('/')) {
          const origin = new URL(targetUrl).origin;
          img = origin + img;
        }
        if (!img.includes('default') && !img.includes('placeholder') && !img.includes('favicon') && !img.includes('pixel')) {
          return img;
        }
      }
    } catch {
      // ignore
    }
  }

  return null;
}

async function run() {
  console.log('=== Step 1: Ensure Eskilstuna exists in cities table ===');
  const { data: existingCity } = await supabase
    .from('cities')
    .select('*')
    .ilike('name', 'Eskilstuna')
    .maybeSingle();

  if (!existingCity) {
    console.log('Inserting Eskilstuna into cities table...');
    const { error: cityErr } = await supabase.from('cities').insert({
      name: 'Eskilstuna',
      slug: 'eskilstuna',
      description: 'Hitta de bästa skönhetsklinikerna, estetiska injektionsbehandlarna och auktoriserade hudterapeuterna i Eskilstuna.'
    });
    if (cityErr) console.error('Error adding city:', cityErr);
    else console.log('✓ Eskilstuna added to cities table');
  } else {
    console.log('✓ Eskilstuna already in cities table');
  }

  console.log('\n=== Step 2: Load treatments table for relation mapping ===');
  const { data: treatments } = await supabase.from('treatments').select('id, slug');
  const treatmentSlugToId: Record<string, string> = {};
  treatments?.forEach(t => {
    treatmentSlugToId[t.slug] = t.id;
  });

  console.log(`Loaded ${Object.keys(treatmentSlugToId).length} treatments.`);

  console.log('\n=== Step 3: Insert / Update 20 clinics in Eskilstuna ===');
  let insertedCount = 0;
  let updatedCount = 0;

  for (let i = 0; i < ESKILSTUNA_CLINICS.length; i++) {
    const c = ESKILSTUNA_CLINICS[i];
    console.log(`\n[${i + 1}/${ESKILSTUNA_CLINICS.length}] Processing: ${c.name}`);

    // Check if clinic already exists
    const { data: existing } = await supabase
      .from('clinics')
      .select('id, name, slug, primary_image_url')
      .or(`slug.eq.${c.slug},name.ilike.${c.name}`)
      .maybeSingle();

    let primaryImageUrl = existing?.primary_image_url;

    if (!primaryImageUrl) {
      console.log(`  -> Finding image for ${c.name}...`);
      const scrapedUrl = await scrapeImageForClinic(c.website, c.booking_url);
      if (scrapedUrl) {
        console.log(`  -> Uploading scraped image: ${scrapedUrl.slice(0, 60)}...`);
        const uploaded = await uploadImageToSupabase(scrapedUrl);
        if (uploaded) primaryImageUrl = uploaded;
      }

      if (!primaryImageUrl) {
        const fallback = BEAUTY_FALLBACK_IMAGES[i % BEAUTY_FALLBACK_IMAGES.length];
        console.log(`  -> Uploading curated fallback image...`);
        const uploaded = await uploadImageToSupabase(fallback);
        if (uploaded) primaryImageUrl = uploaded;
      }
    }

    const clinicData = {
      name: c.name,
      slug: c.slug,
      city: c.city,
      address: c.address,
      phone: c.phone,
      email: c.email,
      website: c.website,
      booking_url: c.booking_url,
      description: c.description,
      ai_description: c.ai_description,
      ai_faq: c.ai_faq,
      ai_meta: c.ai_meta,
      is_shr_member: c.is_shr_member,
      is_rfem_member: c.is_rfem_member,
      is_verified: c.is_verified,
      tier: c.tier,
      extracted_services: c.extracted_services,
      primary_image_url: primaryImageUrl
    };

    let clinicId: string;

    if (existing) {
      console.log(`  -> Updating existing clinic: ${existing.id}`);
      const { error: updErr } = await supabase
        .from('clinics')
        .update(clinicData)
        .eq('id', existing.id);

      if (updErr) {
        console.error(`Error updating ${c.name}:`, updErr);
        continue;
      }
      clinicId = existing.id;
      updatedCount++;
    } else {
      console.log(`  -> Inserting new clinic: ${c.name}`);
      const { data: inserted, error: insErr } = await supabase
        .from('clinics')
        .insert(clinicData)
        .select('id')
        .single();

      if (insErr || !inserted) {
        console.error(`Error inserting ${c.name}:`, insErr);
        continue;
      }
      clinicId = inserted.id;
      insertedCount++;
    }

    // Link clinic to treatments
    if (c.treatmentSlugs && c.treatmentSlugs.length > 0) {
      await supabase
        .from('clinic_treatments')
        .delete()
        .eq('clinic_id', clinicId);

      const linksToInsert = c.treatmentSlugs
        .map(slug => treatmentSlugToId[slug])
        .filter(Boolean)
        .map(treatmentId => ({
          clinic_id: clinicId,
          treatment_id: treatmentId
        }));

      if (linksToInsert.length > 0) {
        const { error: linkErr } = await supabase
          .from('clinic_treatments')
          .insert(linksToInsert);
        if (linkErr) {
          console.error(`Error linking treatments for ${c.name}:`, linkErr);
        } else {
          console.log(`  ✓ Linked ${linksToInsert.length} treatments for ${c.name}`);
        }
      }
    }
  }

  console.log('\n=== Summary ===');
  console.log(`New clinics inserted: ${insertedCount}`);
  console.log(`Existing clinics updated: ${updatedCount}`);

  const { data: allEskilstuna } = await supabase
    .from('clinics')
    .select('id, name, city, email, phone, is_shr_member')
    .ilike('city', 'Eskilstuna');

  console.log(`\nTotal clinics in Eskilstuna now: ${allEskilstuna?.length}`);
  allEskilstuna?.forEach((c, idx) => {
    console.log(` ${idx + 1}. ${c.name} | ${c.phone} | ${c.email} | [SHR: ${c.is_shr_member}]`);
  });
}

run();
