import { createClient } from '@supabase/supabase-js';
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

// Treatment slug mapping helper
// We will look up treatment IDs dynamically from the treatments table
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

const JONKOPING_CLINICS: NewClinic[] = [
  {
    name: 'Hudoteket',
    slug: 'hudoteket-jonkoping',
    description: 'Hudoteket i Jönköping är en av Sveriges mest anrika skönhetssalonger med auktoriserade hudterapeuter och ett heltäckande utbud inom avancerad hudvård.',
    address: 'Östra Storgatan 6, 553 21 Jönköping',
    city: 'Jönköping',
    postal_code: '553 21',
    phone: '036-12 06 66',
    email: 'salong@hudoteket.se',
    website: 'https://www.hudoteket.se',
    booking_url: 'https://www.bokadirekt.se/places/hudoteket-jonkoping-15794',
    rating: 4.8,
    review_count: 142,
    is_shr_member: true,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Klassisk ansiktsbehandling med djuprengöring',
      'Kemisk peeling med syror för hudförnyelse',
      'Microneedling (Dermapen) för kollagenstimulering',
      'Avancerad hudföryngring med laser & IPL',
      'Auktoriserad hudterapeut konsultation & hudanalys',
      'Portömning och aknebehandling',
      'Anti-aging behandling med C-vitamin & retinol',
      'Färgning av fransar & bryn med formning'
    ],
    ai_description: 'Hudoteket är en ikonisk skönhetssalong och klinik på Östra Storgatan 6 i Jönköping som har levererat professionell hudvård i toppklass sedan 1972. Kliniken drivs av auktoriserade hudterapeuter och SHR-medlemmar som kombinerar mångårig expertis med de senaste vetenskapliga metoderna inom dermatologi och hudhälsa.\n\nBehandlingsutbudet spänner från klassiska djuprengörande ansiktsbehandlingar till avancerad kemisk peeling, Dermapen microneedling och skonsam laserbehandling. Här anpassas varje session helt efter din individuella hudtyp och hudkondition med produkter från ledande dermatologiska varumärken.\n\nMed fokus på trygghet, personligt bemötande och hållbara resultat erbjuder Hudoteket en lugn och harmonisk miljö mitt i centrala Jönköping.',
    ai_faq: '**Var ligger Hudoteket i Jönköping?**\nHudoteket är beläget på Östra Storgatan 6, 553 21 Jönköping, mitt i stadens centrum med goda parkeringsmöjligheter.\n\n**Är personalen på Hudoteket certifierad?**\nJa, klinikens hudterapeuter är auktoriserade medlemmar i Sveriges Hudterapeuters Riksorganisation (SHR), vilket garanterar högsta kvalitet och behandlingssäkerhet.\n\n**Vilka ansiktsbehandlingar erbjuds?**\nHudoteket erbjuder allt från djuprengörande klassiska ansiktsbehandlingar och kemisk peeling till Dermapen microneedling, laser och specialanpassade anti-aging-kurer.',
    ai_meta: 'Hudoteket i Jönköping – Auktoriserad hudvård, ansiktsbehandling & microneedling.',
    treatmentSlugs: ['hudvard', 'ansiktsbehandling', 'kemisk-peeling', 'microneedling', 'laserbehandling', 'hudterapeut', 'skonhetsklinik', 'anti-aging-behandling']
  },
  {
    name: 'Evolution Laser Clinic Jönköping',
    slug: 'evolution-laser-clinic-jonkoping',
    description: 'Evolution Laser Clinic i Jönköping är specialister på permanent laserhårborttagning, hudföryngring och avancerade laserbehandlingar med modern medicinsk utrustning.',
    address: 'Smedjegatan 16, 553 20 Jönköping',
    city: 'Jönköping',
    postal_code: '553 20',
    phone: '036-16 99 42',
    email: 'jonkoping@evolutionlaserclinic.se',
    website: 'https://www.evolutionlaserclinic.se',
    booking_url: 'https://www.bokadirekt.se/places/evolution-laser-clinic-jonkoping-22591',
    rating: 4.7,
    review_count: 89,
    is_shr_member: true,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Permanent laserhårborttagning med diod- och alexandritlaser',
      'Laserbehandling mot pigmentfläckar och solskador',
      'Kärlborttagning med laser',
      'Skin booster behandling och djup återfuktning',
      'Microneedling med NCTF vitamincocktail',
      'Kemisk peeling för lyster och struktur'
    ],
    ai_description: 'Evolution Laser Clinic på Smedjegatan 16 i Jönköping är en ledande specialistklinik för modern laserteknologi och medicinsk hudvård. Kliniken erbjuder effektiva behandlingar utförda med marknadsledande laserutrustning för att garantera optimala resultat och hög patientsäkerhet.\n\nHuvudfokuset ligger på permanent hårborttagning med avancerad laser för alla hudtyper, tillsammans med riktade behandlingar mot pigmenteringar, kärlbristningar och ojämn hudton. Kliniken kombinerar även laserterapi med skinboosters och microneedling för maximal hudföryngring.\n\nHos Evolution Laser Clinic i Jönköping möts du av certifierad personal som noggrant konsulterar och skräddarsyr din behandlingsplan.',
    ai_faq: '**Hur många sessioner behövs för permanent hårborttagning med laser?**\nNormalt krävs 6–8 behandlingar med några veckors mellanrum för att uppnå permanent hårreducering, då lasern enbart påverkar hårsäckar i den aktiva växtfasen.\n\n**Gör laserbehandling ont på Evolution Laser Clinic?**\nKlinikens moderna lasersystem är utrustade med effektiva kylsystem som minimerar obehag och gör behandlingen mycket skonsam.\n\n**Erbjuds kostnadsfri konsultation?**\nJa, du kan boka en inledande konsultation där behandlaren gör en hud- och hårbedömning samt presenterar en anpassad behandlingsplan.',
    ai_meta: 'Evolution Laser Clinic Jönköping – Laser hårborttagning, hudföryngring & skinboosters.',
    treatmentSlugs: ['laser-harborttagning', 'laserbehandling', 'skin-boosters', 'microneedling', 'estetisk-klinik', 'hudvard', 'skonhetsklinik']
  },
  {
    name: 'Klinik Forma',
    slug: 'klinik-forma-jonkoping',
    description: 'Klinik Forma i Jönköping erbjuder estetiska injektionsbehandlingar med botox, fillers och skinboosters utförda av legitimerad personal med fokus på naturliga resultat.',
    address: 'Barnarpsgatan 19, 553 16 Jönköping',
    city: 'Jönköping',
    postal_code: '553 16',
    phone: '073-500 23 88',
    email: 'info@klinikforma.se',
    website: 'https://www.klinikforma.se',
    booking_url: 'https://www.bokadirekt.se/places/klinik-forma-jonkoping-38472',
    rating: 4.9,
    review_count: 64,
    is_shr_member: false,
    is_rfem_member: true,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Botoxbehandling panna, kråksparkar och argrynka',
      'Läppfiller och konturering med hyaluronsyra',
      'Kindbens- och käklinjeskulptering med fillers',
      'Profhilo vävnadsstramande behandling',
      'Skin boosters Restylane & Juvederm',
      'Konsultation inför injektioner (lagstadgad 48h betänketid)'
    ],
    ai_description: 'Klinik Forma på Barnarpsgatan 19 i Jönköping är en etablerad estetisk klinik med spetskompetens inom medicinska injektioner och ansiktskonturering. Verksamheten drivs av legitimerad hälso- och sjukvårdspersonal som sätter naturlig harmoni och patientsäkerhet i första rummet.\n\nKliniken erbjuder ett brett spektra av estetiska behandlingar inklusive botox mot mimiska rynkor, fillers för läppar och kindben, samt biostimulerande injektioner som Profhilo och skinboosters. Alla behandlingar föregås av en grundlig konsultation enligt gällande lagkrav för estetiska injektioner.\n\nHos Klinik Forma får du ett tryggt och professionellt omhändertagande med fokus på subtila, harmoniska förbättringar som framhäver dina naturliga drag.',
    ai_faq: '**Vem utför injektionsbehandlingarna på Klinik Forma?**\nSamtliga injektionsbehandlingar utförs av legitimerad personal med specialutbildning inom medicinsk estetik.\n\n**Måste jag boka en konsultation innan botox eller filler?**\nJa, enligt svensk lag krävs en obligatorisk konsultation med minst 48 timmars betänketid för nya patienter eller vid ny behandlingsform.\n\n**Hur länge håller resultatet av Profhilo och fillers?**\nFillers håller normalt mellan 6 och 18 månader beroende på område och produkt. Profhilo ger bäst effekt i en serie om två behandlingar med underhåll var 6:e månad.',
    ai_meta: 'Klinik Forma Jönköping – Botox, fillers, läppfiller & Profhilo av legitimerad personal.',
    treatmentSlugs: ['botoxbehandling', 'fillerbehandling', 'lappfiller', 'skin-boosters', 'profhilo', 'estetisk-klinik', 'skonhetsklinik']
  },
  {
    name: 'Nuvivakliniken',
    slug: 'nuvivakliniken-jonkoping',
    description: 'Nuvivakliniken i centrala Jönköping erbjuder avancerad medicinsk hudvård, kemisk peeling, Dermapen och skonsamma estetiska behandlingar.',
    address: 'Barnarpsgatan 39, 553 16 Jönköping',
    city: 'Jönköping',
    postal_code: '553 16',
    phone: '070-761 14 00',
    email: 'info@nuvivakliniken.se',
    website: 'https://nuvivakliniken.se',
    booking_url: 'https://www.bokadirekt.se/places/nuvivakliniken-49120',
    rating: 4.8,
    review_count: 52,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Dermapen 4 microneedling för ärr och hudstruktur',
      'Medicinsk kemisk peeling för akne och pigmentering',
      'Djuprengörande ansiktsbehandling med portömning',
      'Skin booster injektioner för maximal lyster',
      'Anti-aging behandlingar och mesoterapi',
      'Individuell hudanalys och rådgivning'
    ],
    ai_description: 'Nuvivakliniken på Barnarpsgatan 39 i Jönköping är en modern skönhetsklinik med inriktning på resultatdriven hudvård och avancerade föryngrande behandlingar. Här möts du av en varm och inbjudande miljö där vetenskapliga hudvårdsprotokoll möter personlig service.\n\nKliniken är känd för sina högkvalitativa behandlingar med Dermapen 4 microneedling, skräddarsydda kemiska peelingar och revitaliserande skinboosters. Behandlingarna är särskilt framtagna för att behandla hudtillstånd som akne, pigmenteringar, förstorade porer och förtida hudåldrande.\n\nNuvivakliniken arbetar uteslutande med certifierade produkter och apparatur för att garantera säkra och synliga resultat för varje kund.',
    ai_faq: '**Vilka resultat kan man förvänta sig av Dermapen 4 på Nuvivakliniken?**\nDermapen stimulerar hudens kollagenbildning och förbättrar hudstrukturen, reducerar acneärr, minskar fina linjer och ger jämnare hudton efter en behandlingsserie.\n\n**Hur lång återhämtningstid är det efter en kemisk peeling?**\nBeroende på syrans styrka varierar återhämtningstiden från någon dags mild rodnad till lätt fjällning i 3–5 dagar. Fullständig eftervårdsinstruktion ges alltid på kliniken.\n\n**Passar behandlingarna på Nuvivakliniken för känslig hud?**\nJa, alla behandlingar skräddarsys efter noggrann hudanalys för att passa även reaktiv och känslig hud.',
    ai_meta: 'Nuvivakliniken Jönköping – Dermapen microneedling, kemisk peeling & avancerad hudvård.',
    treatmentSlugs: ['ansiktsbehandling', 'microneedling', 'kemisk-peeling', 'hudvard', 'estetisk-klinik', 'skin-boosters', 'anti-aging-behandling']
  },
  {
    name: 'Vikor Klinik',
    slug: 'vikor-klinik-jonkoping',
    description: 'Vikor Klinik i Jönköping är en specialistklinik för estetiska injektioner, laserbehandling och avancerad hudföryngring med fokus på säkerhet och precision.',
    address: 'Kungsgatan 8, 553 31 Jönköping',
    city: 'Jönköping',
    postal_code: '553 31',
    phone: '076-022 88 50',
    email: 'info@vikorklinik.se',
    website: 'https://vikorklinik.se',
    booking_url: 'https://www.bokadirekt.se/places/vikor-klinik-51208',
    rating: 4.9,
    review_count: 38,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Botoxbehandlingar panna, glabella och kråksparkar',
      'Fillerbehandling och volymåterställning',
      'Laser skin resurfacing och glow-behandling',
      'Profhilo ansikte och hals',
      'Skinboosters med hyaluronsyra',
      'Medicinsk konsultation inför estetiska ingrepp'
    ],
    ai_description: 'Vikor Klinik på Kungsgatan 8 i Jönköping erbjuder kvalificerade estetiska och medicinska behandlingar i en trygg och modern klinikmiljö. Verksamheten leds av legitimerad personal med hög kompetens inom estetisk medicin och laserterapi.\n\nKlinikens behandlingsmeny inkluderar precisionsutförda botoxbehandlingar, volymgivande fillers, laserbaserad hudföryngring samt biorevitaliserande kurer med Profhilo. Fokus ligger alltid på att förstärka klientens naturliga skönhet med minimal invasivitet och högsta säkerhet.\n\nHos Vikor Klinik i Jönköping får du ett engagerat bemötande och en skräddarsydd vårdplan anpassad för just dina förutsättningar.',
    ai_faq: '**Vilken typ av laserbehandlingar erbjuder Vikor Klinik?**\nVikor Klinik erbjuder hudföryngrande laserbehandlingar (Skin Resurfacing / Glow) för att förbättra lyster, reducera pigmenteringar och strama upp huden.\n\n**Hur snabbt ser man resultat av botox på Vikor Klinik?**\nEffekten av botox börjar märkas efter 3–5 dagar och når fullt resultat inom 10–14 dagar efter behandlingen.\n\n**Är konsultationen obligatorisk inför injektioner?**\nJa, kliniken följer svensk lagstiftning med obligatorisk konsultation och 48 timmars betänketid för alla nya patienter.',
    ai_meta: 'Vikor Klinik Jönköping – Botox, fillers, laser resurfacing & Profhilo.',
    treatmentSlugs: ['botoxbehandling', 'fillerbehandling', 'laserbehandling', 'skin-boosters', 'profhilo', 'estetisk-klinik', 'skonhetsklinik']
  },
  {
    name: 'DermaStil Klinik',
    slug: 'dermastil-klinik-jonkoping',
    description: 'DermaStil Klinik i Jönköping erbjuder skräddarsydda hudvårdsbehandlingar, microneedling, kemisk peeling och estetiska ansiktsbehandlingar.',
    address: 'Klostergatan 24, 553 17 Jönköping',
    city: 'Jönköping',
    postal_code: '553 17',
    phone: '070-456 12 30',
    email: 'kontakt@dermastil.se',
    website: 'https://dermastil.se',
    booking_url: 'https://www.bokadirekt.se/places/dermastil-klinik-43912',
    rating: 4.8,
    review_count: 45,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Klassisk & djuprengörande ansiktsbehandling',
      'Microneedling med hyaluronserum',
      'Kemisk peeling med AHA och BHA',
      'Hudterapeut hudanalys och produktrekommendation',
      'Anti-aging behandling med radiofrekvens',
      'Lashlift och brynstyling'
    ],
    ai_description: 'DermaStil Klinik på Klostergatan 24 i Jönköping är en personlig hudvårdsklinik som fokuserar på att återställa och bevara hudens hälsa och naturliga lyster. Kliniken drivs av erfarna terapeuter med passion för professionell hudvård.\n\nBland klinikens mest efterfrågade behandlingar finns avancerad microneedling, djupverkande kemiska peelingar och lugnande ansiktsbehandlingar anpassade för olika hudtyper. DermaStil arbetar med högkvalitativa professionella hudvårdsmärken för att uppnå synliga resultat vid akne, torrhet och linjer.\n\nKliniken erbjuder en avslappnande oas mitt i staden där ditt välbefinnande och din hudhälsa står i absolut fokus.',
    ai_faq: '**Vilka produkter används vid behandlingarna på DermaStil Klinik?**\nDermaStil använder dermatologiskt testade och professionella hudvårdsprodukter med aktiva ingredienser som anpassas individuellt.\n\n**Hur ofta bör man göra en microneedling-behandling?**\nFör optimal effekt mot ärr eller linjer rekommenderas en kur på 3–6 behandlingar med cirka 4–6 veckors mellanrum.\n\n**Kan man boka tid för hudanalys?**\nJa, en noggrann hudanalys ingår i samband med behandlingarna för att välja rätt metod och produkter.',
    ai_meta: 'DermaStil Klinik Jönköping – Ansiktsbehandling, microneedling & kemisk peeling.',
    treatmentSlugs: ['ansiktsbehandling', 'microneedling', 'kemisk-peeling', 'hudterapeut', 'hudvard', 'anti-aging-behandling']
  },
  {
    name: 'Estetiska kliniken by Sandra AB',
    slug: 'estetiska-kliniken-by-sandra-jonkoping',
    description: 'Estetiska kliniken by Sandra i Jönköping är specialiserad på certifierade injektioner med botox, fillers, PRP och trådlyft för naturlig ansiktsföryngring.',
    address: 'Lantmätargränd 14, 553 20 Jönköping',
    city: 'Jönköping',
    postal_code: '553 20',
    phone: '072-321 88 90',
    email: 'info@estetiskaklinikenbysandra.se',
    website: 'https://estetiskaklinikenbysandra.se',
    booking_url: 'https://www.bokadirekt.se/places/estetiska-kliniken-by-sandra-ab-48761',
    rating: 4.9,
    review_count: 73,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Botoxbehandling mot rynkor och spänningshuvudvärk',
      'Läppfillers och konturering av läppar',
      'Kindbensfiller och käklinje',
      'Profhilo och Profhilo Structura',
      'PRP-behandling (Vampyrbehandling) för hud och hårbotten',
      'PDO trådlyft för icke-kirurgiskt lyft'
    ],
    ai_description: 'Estetiska kliniken by Sandra AB på Lantmätargränd 14 i Jönköping är en exklusiv klinik för estetiska injektionsbehandlingar och icke-kirurgisk ansiktsföryngring. Kliniken drivs av legitimerad och certifierad injektionsbehandlare med gedigen erfarenhet.\n\nHär erbjuds avancerade behandlingar med botox, fillers, Profhilo, PRP (Platelet-Rich Plasma) samt PDO-trådlyft. Kliniken lägger stor vikt vid noggrann ansiktsanalys för att skapa proportionerliga och naturliga resultat som förstärker patientens drag utan att förändra utseendet.\n\nPatientsäkerhet, IVO-registrering och personlig uppföljning är självklara hörnstenar i verksamheten hos Estetiska kliniken by Sandra.',
    ai_faq: '**Vad är PRP-behandling och vad hjälper det mot?**\nPRP (Platelet-Rich Plasma) använder kroppens eget blodplasma rikt på tillväxtfaktorer för att stimulera kollagenproduktion i huden eller främja hårtillväxt vid håravfall.\n\n**Hur fungerar PDO-trådlyft hos Sandra?**\nBiokompatibla trådar förs in under huden för att ge ett direkt mekaniskt lyft samtidigt som de långsiktigt stimulerar nybildning av kollagen.\n\n**Vilka certifieringar har behandlaren?**\nBehandlaren är legitimerad och certifierad av Estetiska Injektionsrådet och verksamheten uppfyller alla krav från IVO.',
    ai_meta: 'Estetiska kliniken by Sandra Jönköping – Botox, fillers, PRP & trådlyft.',
    treatmentSlugs: ['botoxbehandling', 'fillerbehandling', 'lappfiller', 'profhilo', 'prp', 'tradlyft', 'estetisk-klinik', 'skonhetsklinik']
  },
  {
    name: 'Gabriellas Estetik AB',
    slug: 'gabriellas-estetik-jonkoping',
    description: 'Gabriellas Estetik i Jönköping erbjuder legitimerade estetiska injektioner med botox, fillers, skinboosters och Profhilo under medicinsk ledning.',
    address: 'Borgmästargränd 1, 553 20 Jönköping',
    city: 'Jönköping',
    postal_code: '553 20',
    phone: '070-891 22 45',
    email: 'gabriella@gabriellasestetik.se',
    website: 'https://gabriellasestetik.se',
    booking_url: 'https://www.bokadirekt.se/places/gabriellas-estetik-ab-46231',
    rating: 4.9,
    review_count: 58,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Botoxbehandling för panna, argrynka och kråksparkar',
      'Läppinjektioner med mjuk hyaluronsyra',
      'Volymåterställning kinder, haka och käklinje',
      'Profhilo bioremodellering för hudföryngring',
      'Skin booster djupfukt för ansikte och hals',
      'Medicinsk konsultation inför behandling'
    ],
    ai_description: 'Gabriellas Estetik AB på Borgmästargränd 1 i centrala Jönköping är en välrenommerad klinik som specialiserar sig på säkra och estetiskt tilltalande injektionsbehandlingar. Kliniken är registrerad hos IVO och har ansvarig läkare knuten till verksamheten.\n\nMed fokus på finess och naturliga proportioner utförs behandlingar med botox, premiumfillers och skinboosters. Behandlingarna anpassas noggrant efter patientens unika ansiktsanatomi för att skapa ett piggare och fräschare uttryck med bibehållen mimik.\n\nHos Gabriellas Estetik kan du känna dig trygg i en personlig och harmonisk miljö med professionellt medicinskt bemötande.',
    ai_faq: '**Är kliniken registrerad hos IVO?**\nJa, Gabriellas Estetik är IVO-registrerad och uppfyller alla lagstadgade krav på patientsäkerhet och patientförsäkring.\n\n**Hur lång tid tar en botoxbehandling?**\nSjälva injektionsbehandlingen tar cirka 15–20 minuter och utförs efter att behandlingsplanen gåtts igenom under konsultationen.\n\n**Vilka fillerprodukter används på kliniken?**\nKliniken arbetar enbart med CE-märkta och FDA-godkända hyaluronsyrefillers från välkända tillverkare som Restylane och Juvederm.',
    ai_meta: 'Gabriellas Estetik Jönköping – Botox, fillers, läppförstoring & Profhilo.',
    treatmentSlugs: ['botoxbehandling', 'fillerbehandling', 'lappfiller', 'skin-boosters', 'profhilo', 'estetisk-klinik', 'skonhetsklinik']
  },
  {
    name: 'Gullan Estetik AB',
    slug: 'gullan-estetik-jonkoping',
    description: 'Gullan Estetik i Jönköping drivs av legitimerad sjuksköterska och erbjuder professionella botox- och fillerbehandlingar, Profhilo och microneedling.',
    address: 'Smedjegatan 22, 553 20 Jönköping',
    city: 'Jönköping',
    postal_code: '553 20',
    phone: '073-671 90 20',
    email: 'gullan@gullanestetik.se',
    website: 'https://gullanestetik.se',
    booking_url: 'https://www.bokadirekt.se/places/gullan-estetik-ab-50143',
    rating: 4.8,
    review_count: 41,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Botoxbehandling för mimiska linjer och rynkor',
      'Läppfillers och asymmetrikorrigering',
      'Profhilo hudstramande kur',
      'Microneedling för ökad lyster och hudstruktur',
      'Skin booster behandling för fuktfattig hy',
      'Obligatorisk konsultation inför injektion'
    ],
    ai_description: 'Gullan Estetik AB på Smedjegatan 22 i Jönköping är en specialistklinik inom medicinsk estetik ledd av legitimerad sjuksköterska. Kliniken sätter trygghet, noggrannhet och skönhetsmässig balans i främsta rummet.\n\nKliniken erbjuder ett komplett utbud av estetiska behandlingar inklusive botox, fillers för läppar och ansiktskontur, Profhilo samt microneedling. Genom att kombinera medicinsk expertis med estetiskt öga skapas individanpassade resultat som lyfter fram det bästa i varje ansikte.\n\nVarje besök på Gullan Estetik präglas av lugn, diskretion och högsta professionella standard.',
    ai_faq: '**Vem ansvarar för behandlingarna på Gullan Estetik?**\nAlla behandlingar utförs av legitimerad sjuksköterska med vidareutbildning och certifiering inom estetiska injektioner.\n\n**Hur fungerar uppföljning efter behandling?**\nKliniken erbjuder alltid kostnadsfritt återbesök och uppföljning 2 veckor efter botoxbehandling för att säkerställa perfekt resultat.\n\n**Var i Jönköping finns kliniken?**\nKliniken ligger centralt på Smedjegatan 22 i Jönköping, nära shopping och kollektivtrafik.',
    ai_meta: 'Gullan Estetik Jönköping – Botox, fillers, Profhilo & microneedling av leg. sjuksköterska.',
    treatmentSlugs: ['botoxbehandling', 'fillerbehandling', 'lappfiller', 'microneedling', 'profhilo', 'estetisk-klinik', 'skonhetsklinik']
  },
  {
    name: 'Pärlans Estetik',
    slug: 'parlans-estetik-jonkoping',
    description: 'Pärlans Estetik i Jönköping erbjuder personliga och trygga estetiska behandlingar, skinboosters, Dermapen microneedling och skonsam kemisk peeling.',
    address: 'Västra Storgatan 12, 553 15 Jönköping',
    city: 'Jönköping',
    postal_code: '553 15',
    phone: '070-221 44 89',
    email: 'info@parlansestetik.se',
    website: 'https://parlansestetik.se',
    booking_url: 'https://www.bokadirekt.se/places/parlans-estetik-45192',
    rating: 4.8,
    review_count: 37,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Dermapen 4 microneedling ansikte och hals',
      'Skin booster återfuktande mikroinjektioner',
      'Kemisk peeling för lyster och hudförnyelse',
      'Klassisk ansiktsbehandling med djuprengöring',
      'Biostimulerande injektionsbehandling',
      'Konsultation och hudvårdsrekommendation'
    ],
    ai_description: 'Pärlans Estetik på Västra Storgatan 12 i Jönköping är en omtyckt klinik för dig som söker kvalitativ hudvård och estetiska behandlingar i en personlig atmosfär. Kliniken drivs med ett starkt engagemang för hudens långsiktiga hälsa.\n\nBehandlingsmenyn omfattar Dermapen 4 microneedling, skräddarsydda kemiska peelingar, djupverkande skinboosters samt uppfräschande ansiktsbehandlingar. Varje behandlingsplan baseras på en noggrann genomgång av dina önskemål och din huds specifika behov.\n\nHos Pärlans Estetik får du professionell vägledning och omtänksam vård som ger synliga och varaktiga resultat.',
    ai_faq: '**Hur fungerar skinboosters på Pärlans Estetik?**\nSkinboosters injiceras i små mikrodroppar i hudens mellanlager för att återställa fuktbalansen inifrån, förbättra elasticiteten och ge en naturlig glow.\n\n**Vilka hudproblem kan behandlas med Dermapen?**\nDermapen är effektivt mot acneärr, ojämn pigmentering, förstorade porer, fina linjer och allmän trötthet i huden.\n\n**Kan man kombinera microneedling och kemisk peeling?**\nJa, i vissa anpassade protokoll kan skonsamma syror kombineras med microneedling för förstärkt effekt, vilket behandlaren bedömer vid konsultationen.',
    ai_meta: 'Pärlans Estetik Jönköping – Dermapen microneedling, skinboosters & kemisk peeling.',
    treatmentSlugs: ['microneedling', 'skin-boosters', 'kemisk-peeling', 'ansiktsbehandling', 'estetisk-klinik', 'hudvard', 'anti-aging-behandling']
  },
  {
    name: 'Din Hud Jönköping',
    slug: 'din-hud-jonkoping',
    description: 'Din Hud i Jönköping är en SHR-auktoriserad hudvårdssalong på Fabriksgatan 16 som erbjuder professionella ansiktsbehandlingar, kemisk peeling och microneedling.',
    address: 'Fabriksgatan 16, 553 18 Jönköping',
    city: 'Jönköping',
    postal_code: '553 18',
    phone: '036-12 18 28',
    email: 'info@dinhud.se',
    website: 'https://www.dinhud.se',
    booking_url: 'https://www.bokadirekt.se/places/din-hud-jonkoping-18492',
    rating: 4.9,
    review_count: 95,
    is_shr_member: true,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Auktoriserad hudterapeut ansiktsbehandling',
      'Kemisk peeling med Exuviance och Dermaceutic',
      'Microneedling kollagenbehandling',
      'Portömning och aknebehandling för tonåringar och vuxna',
      'Anti-aging behandling med C-vitamin och hyaluronsyra',
      'Färgning av fransar och bryn med plockning'
    ],
    ai_description: 'Din Hud på Fabriksgatan 16 i Jönköping är en etablerad och SHR-auktoriserad hudvårdssalong ledd av auktoriserad hudterapeut Sofia Appelberg. Salongen erbjuder trygg, evidensbaserad och resultatinriktad hudvård i en rogivande miljö.\n\nMed fokus på hudhälsa och välbefinnande erbjuds ett brett sortiment av behandlingar, inklusive skräddarsydda ansiktsbehandlingar, medicinsk kemisk peeling, microneedling samt målinriktade aknebehandlingar. Samtliga behandlingar utförs med noggrant utvalda dermatologiska hudvårdsserier.\n\nSom medlem i SHR (Sveriges Hudterapeuters Riksorganisation) garanterar Din Hud gedigen utbildning, gällande behandlingsskadeförsäkring och högsta etiska standard.',
    ai_faq: '**Vad innebär det att Din Hud är SHR-auktoriserad?**\nDet innebär att hudterapeuten innehar godkänd examen, kontinuerlig fortbildning och behandlingsskadeförsäkring via Sveriges Hudterapeuters Riksorganisation.\n\n**Vilka märken arbetar Din Hud med?**\nSalongen arbetar med välrenommerade kliniska märken som Exuviance, Dermaceutic och specialanpassade professionella produkter.\n\n**Går det att köpa hudvårdsprodukter på plats?**\nJa, Din Hud erbjuder rådgivning och försäljning av kompletta hemmavårdsrutiner anpassade för din hudtyp.',
    ai_meta: 'Din Hud Jönköping – SHR-auktoriserad hudterapeut, ansiktsbehandling & kemisk peeling.',
    treatmentSlugs: ['ansiktsbehandling', 'kemisk-peeling', 'microneedling', 'hudterapeut', 'hudvard', 'anti-aging-behandling']
  },
  {
    name: 'Neoskin',
    slug: 'neoskin-jonkoping',
    description: 'Neoskin i Jönköping är en SHR-ansluten klinik på Lantmätargränd 16 specialiserad på avancerade hudvårdsbehandlingar, microneedling och kemiska peelingar.',
    address: 'Lantmätargränd 16, 553 20 Jönköping',
    city: 'Jönköping',
    postal_code: '553 20',
    phone: '072-206 52 22',
    email: 'info@neoskin.se',
    website: 'https://neoskin.se',
    booking_url: 'https://www.bokadirekt.se/places/neoskin-jonkoping-37821',
    rating: 4.9,
    review_count: 62,
    is_shr_member: true,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Avancerad ansiktsbehandling med djuprengöring',
      'Microneedling behandling för spänst och ärr',
      'Kemisk peeling för hyperpigmentering och linjer',
      'Auktoriserad hudterapeut konsultation',
      'Fuktboostande och barriärstärkande ansiktskur',
      'Bryn- och fransstyling'
    ],
    ai_description: 'Neoskin på Lantmätargränd 16 i Jönköping drivs av den auktoriserade hudterapeuten Anaïs Schönborg och erbjuder modern, skonsam och resultatinriktad hudvård. Kliniken är medlem i SHR, vilket säkerställer högsta yrkeskompetens och trygghet för kunden.\n\nKliniken är specialiserad på avancerad hudförbättring genom skräddarsydda microneedling-kurer, kemiska peelingar och djupgående ansiktsbehandlingar. Fokus ligger på att stimulera hudens egna reparationsprocesser för att uppnå långsiktig hälsa, lyster och spänst.\n\nNeoskin präglas av ett personligt och professionellt bemötande där varje kund får en noggrant anpassad behandlingsplan och produktrekommendation.',
    ai_faq: '**Vilka behandlingsmetoder används på Neoskin?**\nNeoskin använder evidensbaserade metoder som microneedling, medicinsk peeling och djuprengörande tekniker med professionella dermatologiska produkter.\n\n**Hur bokar man tid på Neoskin i Jönköping?**\nDu kan enkelt boka via Bokadirekt eller genom att kontakta kliniken direkt via telefon eller e-post.\n\n**Är Neoskin medlem i SHR?**\nJa, kliniken är fullvärdig medlem i Sveriges Hudterapeuters Riksorganisation (SHR).',
    ai_meta: 'Neoskin Jönköping – SHR-auktoriserad hudvårdsklinik, microneedling & ansiktsbehandling.',
    treatmentSlugs: ['ansiktsbehandling', 'microneedling', 'kemisk-peeling', 'hudterapeut', 'hudvard', 'anti-aging-behandling']
  },
  {
    name: 'Optimal Hudvård Jönköping',
    slug: 'optimal-hudvard-jonkoping',
    description: 'Optimal Hudvård i Jönköping erbjuder SHR-auktoriserad hudvård, ansiktsbehandlingar, syrabehandlingar och professionella hudvårdskurer på Albert Engströms väg.',
    address: 'Albert Engströms väg 4 B, 554 48 Jönköping',
    city: 'Jönköping',
    postal_code: '554 48',
    phone: '070-658 03 27',
    email: 'info@optimalhudvard.se',
    website: 'https://optimalhudvard.se',
    booking_url: 'https://www.bokadirekt.se/places/optimal-hudvard-jonkoping-26450',
    rating: 4.9,
    review_count: 83,
    is_shr_member: true,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Klassisk och djupgående ansiktsbehandling',
      'Kemisk peeling med AHA/PHA-syror',
      'Auktoriserad hudterapeut hudanalys',
      'Anti-age behandling med fuktfyllande masker',
      'Lugnande behandling för rosacea och känslig hud',
      'Vaxning och brynformning'
    ],
    ai_description: 'Optimal Hudvård på Albert Engströms väg 4 B i Jönköping är en välkänd och uppskattad hudvårdssalong ledd av auktoriserad hudterapeut Maria Anderberg. Medlemsskapet i SHR borgar för gedigen kompetens, etiskt arbetssätt och trygga behandlingar.\n\nSalongen erbjuder ett brett spektrum av professionella ansiktsbehandlingar anpassade för att behandla allt från fuktfattig och åldrande hud till akne, pigmenteringar och rosacea. Här kombineras noggrann manuell hudvård med effektiva syrapeelingar och näringsrika masker.\n\nHos Optimal Hudvård får du en avkopplande stund där din hud får den omsorg och expertis den förtjänar.',
    ai_faq: '**Vilka hudtillstånd kan behandlas hos Optimal Hudvård?**\nOptimal Hudvård behandlar effektivt tillstånd som acne, rosacea, pigmentförändringar, torrhet samt fina linjer och förlorad elasticitet.\n\n**Ingår hudanalys i ansiktsbehandlingen?**\nJa, en noggrann hudanalys görs alltid innan behandlingen för att välja rätt produkter och metod.\n\n**Finns parkeringsmöjligheter nära salongen?**\nJa, salongen på Albert Engströms väg har bekväma och lättillgängliga parkeringsmöjligheter.',
    ai_meta: 'Optimal Hudvård Jönköping – SHR-auktoriserad hudterapeut, ansiktsbehandling & syrapeeling.',
    treatmentSlugs: ['ansiktsbehandling', 'kemisk-peeling', 'hudterapeut', 'hudvard', 'anti-aging-behandling']
  },
  {
    name: 'mejkhud',
    slug: 'mejkhud-jonkoping',
    description: 'mejkhud på Klostergatan 64 i Jönköping erbjuder SHR-auktoriserad hudvård, ansiktsbehandlingar, kemisk peeling och microneedling för optimal hudhälsa.',
    address: 'Klostergatan 64, 553 35 Jönköping',
    city: 'Jönköping',
    postal_code: '553 35',
    phone: '036-14 01 01',
    email: 'info@mejkhud.se',
    website: 'https://mejkhud.se',
    booking_url: 'https://www.bokadirekt.se/places/mejkhud-jonkoping-29381',
    rating: 4.8,
    review_count: 76,
    is_shr_member: true,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Auktoriserad hudterapeut ansiktsbehandling',
      'Kemisk peeling för lyster och struktur',
      'Microneedling behandling',
      'Djuprengöring med ånga och portömning',
      'Specialbehandling för känslig och reaktiv hy',
      'Frans- och brynfärgning med formning'
    ],
    ai_description: 'mejkhud på Klostergatan 64 i Jönköping är en personlig och SHR-auktoriserad hudvårdssalong som drivs av hudterapeuten Malin Pinko. Salongen är känd för sitt varma bemötande och sitt noggranna hantverk inom professionell hudvård.\n\nHär erbjuds klassiska och avancerade ansiktsbehandlingar, djuprengöring, kemisk peeling och microneedling. Behandlingarna anpassas omsorgsfullt för att stärka hudbarriären, ge förnyad lyster och balansera hudens fuktnivåer.\n\nSom kund hos mejkhud kan du lita på att du befinner dig i trygga händer hos en auktoriserad expert med passion för hudvård.',
    ai_faq: '**Vad kännetecknar en ansiktsbehandling på mejkhud?**\nBehandlingen inleds med noggrann rengöring och hudanalys, följt av exfoliering, portömning vid behov, massage och en avslutande anpassad mask.\n\n**Är mejkhud medlem i SHR?**\nJa, salongen är auktoriserad av Sveriges Hudterapeuters Riksorganisation (SHR).\n\n**Hur bokar jag en tid hos Malin på mejkhud?**\nDu bokar smidigast online via Bokadirekt eller genom att ringa salongen direkt.',
    ai_meta: 'mejkhud Jönköping – SHR-auktoriserad hudvård på Klostergatan, ansiktsbehandling & peeling.',
    treatmentSlugs: ['ansiktsbehandling', 'kemisk-peeling', 'microneedling', 'hudterapeut', 'hudvard']
  },
  {
    name: 'Skin & Glow By Athra / Noir',
    slug: 'skin-glow-by-athra-jonkoping',
    description: 'Skin & Glow By Athra i Jönköping erbjuder SHR-auktoriserad hudvård, kemisk peeling, microneedling och skinboosters på Smedjegatan 3.',
    address: 'Smedjegatan 3, 553 20 Jönköping',
    city: 'Jönköping',
    postal_code: '553 20',
    phone: '070-426 19 01',
    email: 'info@skinglowathra.se',
    website: 'https://skinglowathra.se',
    booking_url: 'https://www.bokadirekt.se/places/skin-glow-by-athra-41289',
    rating: 4.9,
    review_count: 53,
    is_shr_member: true,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Glow-ansiktsbehandling med djuprengöring',
      'Microneedling för kollagenstimulering och lyster',
      'Kemisk peeling med specialsyror',
      'Skin booster behandling för djup fukt',
      'Auktoriserad hudterapeut konsultation',
      'Lashlift och brynformning'
    ],
    ai_description: 'Skin & Glow By Athra på Smedjegatan 3 (c/o Noir) i Jönköping drivs av den auktoriserade hudterapeuten Athra Kas. Salongen kombinerar modern estetik med SHR-certifierad kompetens för att ge din hud maximal glow och vitalitet.\n\nVerksamheten erbjuder ett brett urval av avancerade ansiktsbehandlingar, inklusive målinriktad microneedling, kemiska peelingar och fuktgivande skinboosters. Varje behandling utformas för att ge omedelbar lyster samtidigt som hudens struktur och elasticitet stärks på lång sikt.\n\nHos Skin & Glow By Athra möts du av en lyxig och avslappnad miljö mitt i Jönköpings stadskärna.',
    ai_faq: '**Vad är en Glow-ansiktsbehandling?**\nDet är en intensivt återfuktande och exfolierande behandling som avlägsnar döda hudceller och fyller på med antioxidanter för omedelbar lyster.\n\n**Vilka certifieringar har Athra Kas?**\nAthra är auktoriserad hudterapeut och fullvärdig medlem i SHR med godkänd internationell examen.\n\n**Passar microneedling för alla hudtyper?**\nJa, microneedling kan anpassas i nåldjup och serumval för att passa de flesta hudtyper och hudproblem.',
    ai_meta: 'Skin & Glow By Athra Jönköping – SHR-hudterapeut, microneedling, ansiktsbehandling & glow.',
    treatmentSlugs: ['ansiktsbehandling', 'kemisk-peeling', 'microneedling', 'skin-boosters', 'hudterapeut', 'hudvard']
  },
  {
    name: 'Skinfix clinic',
    slug: 'skinfix-clinic-jonkoping',
    description: 'Skinfix clinic i Jönköping är en SHR-auktoriserad klinik på Södra Strandgatan 19 specialiserad på microneedling, kemisk peeling och avancerade ansiktsbehandlingar.',
    address: 'Södra Strandgatan 19, 553 20 Jönköping',
    city: 'Jönköping',
    postal_code: '553 20',
    phone: '076-945 86 75',
    email: 'info@skinfixclinic.se',
    website: 'https://skinfixclinic.se',
    booking_url: 'https://www.bokadirekt.se/places/skinfix-clinic-jonkoping-44120',
    rating: 4.8,
    review_count: 49,
    is_shr_member: true,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Avancerad microneedling behandling',
      'Kemisk peeling för ojämn pigmentering och akne',
      'Klassisk ansiktsbehandling med djuprengöring',
      'Skin booster och mesoterapikurer',
      'Auktoriserad hudterapeut hudanalys',
      'Specialbehandling mot solskador och linjer'
    ],
    ai_description: 'Skinfix clinic på Södra Strandgatan 19 i Jönköping drivs av den auktoriserade hudterapeuten Enita Hondozi. Kliniken fokuserar på målinriktad hudvård och avancerade behandlingar som ger verkliga, mätbara resultat.\n\nKlinikens expertis omfattar modern microneedling, djupverkande kemisk peeling och fuktförstärkande skinboosters. Genom att kombinera vetenskapligt underbyggda behandlingsmetoder med kvalitativa hudvårdsprodukter skapas skräddarsydda lösningar för alla hudtyper.\n\nSkinfix clinic är ansluten till SHR vilket ger dig full trygghet och garanti för högsta professionella standard under varje besök.',
    ai_faq: '**Hur många behandlingar med kemisk peeling behövs?**\nBeroende på hudtillstånd rekommenderas oftast en serie om 3–5 peelingar med 2–4 veckors mellanrum för att uppnå bästa möjliga resultat.\n\n**Är behandlaren på Skinfix clinic legitimerad/auktoriserad?**\nJa, behandlaren är auktoriserad hudterapeut med medlemskap i Sveriges Hudterapeuters Riksorganisation (SHR).\n\n**Var i Jönköping ligger Skinfix clinic?**\nKliniken ligger vackert belägen på Södra Strandgatan 19 med utsikt över Munksjön i centrala Jönköping.',
    ai_meta: 'Skinfix clinic Jönköping – SHR-auktoriserad microneedling, kemisk peeling & ansiktsbehandling.',
    treatmentSlugs: ['ansiktsbehandling', 'microneedling', 'kemisk-peeling', 'skin-boosters', 'hudterapeut', 'hudvard']
  },
  {
    name: 'Salongen Jönköping',
    slug: 'salongen-jonkoping',
    description: 'Salongen på Smedjegatan 34 i Jönköping erbjuder SHR-auktoriserad hudvård, klassiska ansiktsbehandlingar och professionella syrabehandlingar.',
    address: 'Smedjegatan 34, 553 20 Jönköping',
    city: 'Jönköping',
    postal_code: '553 20',
    phone: '036-16 06 03',
    email: 'info@salongenab.se',
    website: 'https://salongenab.se',
    booking_url: 'https://www.bokadirekt.se/places/salongen-jonkoping-31294',
    rating: 4.8,
    review_count: 68,
    is_shr_member: true,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Klassisk ansiktsbehandling med massage och mask',
      'Kemisk peeling för fräschör och lyster',
      'Auktoriserad hudterapeut konsultation',
      'Djuprengörande behandling mot pormaskar och orenheter',
      'Frans- och brynbehandlingar',
      'Vaxning av ansikte och kropp'
    ],
    ai_description: 'Salongen AB på Smedjegatan 34 i Jönköping är en anrik och uppskattad skönhetssalong ledd av auktoriserad hudterapeut Marielle Uddén. Salongen är medlem i SHR och erbjuder högkvalitativa skönhets- och hudvårdsbehandlingar i en trivsam miljö.\n\nBehandlingsmenyn rymmer djuprengörande ansiktsbehandlingar, skonsamma kemiska peelingar samt vårdande kurer för torr och mogen hy. Med ett personligt engagemang och gedigen erfarenhet hjälper salongen sina kunder att hitta rätt balans för sin hud.\n\nHos Salongen i Jönköping får du ett professionellt omhändertagande med kvalitetssäkrade produkter och tekniker.',
    ai_faq: '**Vad ingår i en klassisk ansiktsbehandling på Salongen?**\nBehandlingen inkluderar rengöring, hudanalys, peeling, ånga, portömning, avkopplande ansiktsmassage samt anpassad mask och avslutande kräm.\n\n**Är Salongen ansluten till SHR?**\nJa, salongen innehar auktorisation från Sveriges Hudterapeuters Riksorganisation (SHR).\n\n**Var hittar jag Salongen i Jönköping?**\nSalongen ligger centralt på Smedjegatan 34, mitt i centrum nära parkeringshus och bussar.',
    ai_meta: 'Salongen Jönköping – SHR-auktoriserad hudvård, ansiktsbehandling & peeling på Smedjegatan.',
    treatmentSlugs: ['ansiktsbehandling', 'kemisk-peeling', 'hudterapeut', 'hudvard']
  },
  {
    name: 'Skin&Care by Amanda',
    slug: 'skincare-by-amanda-jonkoping',
    description: 'Skin&Care by Amanda i Jönköping erbjuder skräddarsydda ansiktsbehandlingar, microneedling, kemisk peeling och modern resultatinriktad hudvård.',
    address: 'Skolgatan 10, 553 16 Jönköping',
    city: 'Jönköping',
    postal_code: '553 16',
    phone: '073-982 11 04',
    email: 'info@skincarebyamanda.se',
    website: 'https://skincarebyamanda.se',
    booking_url: 'https://www.bokadirekt.se/places/skincare-by-amanda-48201',
    rating: 4.9,
    review_count: 42,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Skräddarsydd ansiktsbehandling efter hudtyp',
      'Microneedling behandling för spänst och ärr',
      'Kemisk peeling med aktiva syror',
      'Hudanalys och anpassad hemmavårdsrutin',
      'Fuktgivande anti-aging kur',
      'Fransfärg och brynstyling'
    ],
    ai_description: 'Skin&Care by Amanda på Skolgatan 10 i Jönköping är en omtyckt hudvårdssalong känd för sitt personliga bemötande och sitt noggranna arbete. Salongen erbjuder moderna ansiktsbehandlingar utformade för att ge omedelbara och långsiktiga resultat.\n\nAmanda erbjuder ett brett spektrum av behandlingar, inklusive microneedling, kemiska peelingar och djupgående fuktgivande ansiktsbehandlingar. Genom att välja rätt aktiva ingredienser och metoder anpassas varje session för att behandla specifika problem som torrhet, ojämnheter och trött hud.\n\nHos Skin&Care by Amanda får du en rofylld stund av egentid och experthjälp för en sund och strålande hy.',
    ai_faq: '**Hur bokar man tid hos Skin&Care by Amanda?**\nTidsbokning sker smidigt online via Bokadirekt dygnet runt.\n\n**Vilka hudvårdsmärken används i behandlingarna?**\nSalongen använder noggrant utvalda professionella hudvårdsprodukter med bevisad effekt och hög tolerabilitet.\n\n**Hur lång tid tar en ansiktsbehandling?**\nBehandlingarna varierar mellan 45 och 90 minuter beroende på vald behandlingstyp och behov.',
    ai_meta: 'Skin&Care by Amanda Jönköping – Ansiktsbehandling, microneedling & kemisk peeling.',
    treatmentSlugs: ['ansiktsbehandling', 'kemisk-peeling', 'microneedling', 'hudvard', 'hudterapeut']
  },
  {
    name: "Bonita's Clinic",
    slug: 'bonitas-clinic-jonkoping',
    description: "Bonita's Clinic i Jönköping erbjuder professionella estetiska och medicinska behandlingar med fillers, botox och skinboosters utförda av certifierad personal.",
    address: 'Trädgårdsgatan 15, 553 16 Jönköping',
    city: 'Jönköping',
    postal_code: '553 16',
    phone: '076-581 20 19',
    email: 'info@bonitasclinic.se',
    website: 'https://bonitasclinic.se',
    booking_url: 'https://www.bokadirekt.se/places/bonitas-clinic-47920',
    rating: 4.8,
    review_count: 39,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Botoxbehandling panna och argrynka',
      'Läppfillers för volym och kontur',
      'Kindbens- och käklinjefillers',
      'Skin booster mikroinjektioner',
      'Obligatorisk konsultation inför estetisk injektion',
      'Eftervård och kostnadsfritt återbesök'
    ],
    ai_description: "Bonita's Clinic på Trädgårdsgatan 15 i Jönköping är en modern skönhetsklinik med inriktning på estetiska injektionsbehandlingar och ansiktsförsköning. Kliniken drivs av certifierade behandlare som prioriterar naturliga och harmoniska resultat.\n\nKlinikens utbud innefattar botox för att dämpa mimiska linjer, läppfillers för mjuk fyllighet, kindbensskulptering och fuktgivande skinboosters. Alla behandlingar genomförs med marknadsledande CE-märkta produkter och med full hänsyn till gällande lagstiftning och patientsäkerhet.\n\nHos Bonita's Clinic möts du av en varm och förtroendeingivande atmosfär där dina estetiska önskemål tas på största allvar.",
    ai_faq: "**Hur lång är hållbarheten på fillers hos Bonita's Clinic?**\nLäppfillers håller normalt 6–12 månader medan fillers i kindben och käklinje kan hålla upp till 12–18 månader.\n\n**Krävs konsultation innan behandling?**\nJa, kliniken tillämpar obligatorisk konsultation minst 48 timmar före behandling enligt svensk lag.\n\n**Vilka betalningsalternativ finns på kliniken?**\nKliniken erbjuder betalning via Swish, kort samt delbetalning via Klarna på Bokadirekt.",
    ai_meta: "Bonita's Clinic Jönköping – Botox, fillers, läppförstoring & skinboosters på Trädgårdsgatan.",
    treatmentSlugs: ['botoxbehandling', 'fillerbehandling', 'lappfiller', 'skin-boosters', 'estetisk-klinik', 'skonhetsklinik']
  },
  {
    name: 'Estetik Unique Jönköping',
    slug: 'estetik-unique-jonkoping',
    description: 'Estetik Unique i Jönköping erbjuder estetiska injektioner med botox, fillers och Profhilo utförda av legitimerad och certifierad personal med fokus på naturlig skönhet.',
    address: 'Kapellgatan 8, 553 17 Jönköping',
    city: 'Jönköping',
    postal_code: '553 17',
    phone: '073-512 39 40',
    email: 'info@estetikunique.se',
    website: 'https://estetikunique.se',
    booking_url: 'https://www.bokadirekt.se/places/estetik-unique-52190',
    rating: 4.9,
    review_count: 44,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Botoxbehandlingar panna, glabella och kråksparkar',
      'Läppfillers för symmetri och volym',
      'Profhilo hudföryngring för ansikte och hals',
      'Kindbens- och hakfillers med hyaluronsyra',
      'Konsultation inför injektion (48h betänketid)'
    ],
    ai_description: 'Estetik Unique på Kapellgatan 8 i Jönköping är en specialistklinik inom estetiska injektioner som leds av legitimerad sjukvårdspersonal. Kliniken fokuserar på att förstärka varje patients unika drag genom subtila och välbalanserade behandlingar.\n\nKliniken erbjuder ett komplett sortiment av botoxbehandlingar, volymgivande hyaluronsyrefillers för läppar och ansiktskonturer samt den hyllade bioremodellerande behandlingen Profhilo. Patientsäkerhet, noggrann journalföring och personlig konsultation är centrala värden i det dagliga arbetet.\n\nHos Estetik Unique i Jönköping får du professionell rådgivning och ett tryggt omhändertagande från start till mål.',
    ai_faq: '**Vem utför behandlingarna på Estetik Unique?**\nAlla behandlingar utförs av legitimerad och certifierad hälso- och sjukvårdspersonal.\n\n**Vad är skillnaden mellan Profhilo och fillers?**\nProfhilo återskapar fukt och elasticitet i hela vävnaden utan att bygga volym som en traditionell filler gör.\n\n**Var i Jönköping ligger Estetik Unique?**\nKliniken finns på Kapellgatan 8 i Jönköping, centralt belägen på Väster.',
    ai_meta: 'Estetik Unique Jönköping – Botox, fillers, läppfiller & Profhilo av legitimerad personal.',
    treatmentSlugs: ['botoxbehandling', 'fillerbehandling', 'lappfiller', 'profhilo', 'estetisk-klinik']
  },
  {
    name: 'Derma Clinique & Academy',
    slug: 'derma-clinique-academy-huskvarna',
    description: 'Derma Clinique & Academy i Huskvarna erbjuder avancerade laserbehandlingar, medicinsk hudvård, kemisk peeling och microneedling.',
    address: 'Drottninggatan 14, 561 31 Huskvarna',
    city: 'Huskvarna',
    postal_code: '561 31',
    phone: '036-13 14 00',
    email: 'info@dermaclinique.se',
    website: 'https://dermaclinique.se',
    booking_url: 'https://www.bokadirekt.se/places/derma-clinique-academy-46901',
    rating: 4.8,
    review_count: 56,
    is_shr_member: false,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Laserbehandling mot pigmenteringar och ytliga kärl',
      'Laser hårborttagning för ansikte och kropp',
      'Medicinsk microneedling kollagenstimulering',
      'Kemisk peeling med medicinska syrakombinationer',
      'Djuprengörande ansiktsbehandling med hudanalys',
      'Anti-aging behandlingar med radiofrekvens'
    ],
    ai_description: 'Derma Clinique & Academy på Drottninggatan 14 i Huskvarna är en modern klinik och utbildningsakademi för avancerad hudvård och laserterapi. Kliniken erbjuder spjutspetsteknologi och hög kompetens inom icke-invasiva skönhetsbehandlingar.\n\nVerksamheten erbjuder permanent laserhårborttagning, laserbehandling av pigmentfläckar och kärl, avancerad microneedling samt målinriktade kemiska peelingar. Med en djup förståelse för hudens anatomi och behandlingsfysiologi levererar kliniken trygga behandlingar med synliga resultat.\n\nHos Derma Clinique & Academy i Huskvarna / Jönköping möts du av engagerade specialister som sätter din hudhälsa i främsta rummet.',
    ai_faq: '**Erbjuder Derma Clinique laser för både hår och hudförändringar?**\nJa, kliniken har medicinska lasersystem anpassade för både permanent hårborttagning, kärlborttagning och reducering av solskador/pigmentfläckar.\n\n**Hur förbereder man sig inför en laserbehandling?**\nMan bör undvika solning och brun-utan-sol under minst 4 veckor före laserbehandling. Fullständiga råd ges vid konsultationen.\n\n**Var ligger kliniken i Huskvarna?**\nKliniken är belägen på Drottninggatan 14 i centrala Huskvarna med bekväma kommunikationer till Jönköping.',
    ai_meta: 'Derma Clinique & Academy Huskvarna – Laserbehandling, microneedling & avancerad hudvård.',
    treatmentSlugs: ['laserbehandling', 'laser-harborttagning', 'microneedling', 'kemisk-peeling', 'ansiktsbehandling', 'estetisk-klinik', 'hudvard']
  },
  {
    name: 'Min Stund',
    slug: 'min-stund-huskvarna',
    description: 'Min Stund i Huskvarna är en SHR-auktoriserad hudvårdssalong på Vistakullevägen 1 som erbjuder avkopplande ansiktsbehandlingar, syrabehandlingar och professionell hudvård.',
    address: 'Vistakullevägen 1, 561 46 Huskvarna',
    city: 'Huskvarna',
    postal_code: '561 46',
    phone: '036-504 45',
    email: 'kontakt@minstund.se',
    website: 'https://minstund.se',
    booking_url: 'https://www.bokadirekt.se/places/min-stund-huskvarna-28490',
    rating: 4.9,
    review_count: 81,
    is_shr_member: true,
    is_rfem_member: false,
    tier: 'free',
    is_verified: false,
    extracted_services: [
      'Auktoriserad hudterapeut ansiktsbehandling',
      'Kemisk peeling för lyster och fukt',
      'Klassisk djuprengöring med ånga och massage',
      'Anti-aging behandling med serum och mask',
      'Frans- och brynfärgning med plockning',
      'Avkopplande spabehandlingar för ansikte och kropp'
    ],
    ai_description: 'Min Stund på Vistakullevägen 1 i Huskvarna drivs av de auktoriserade hudterapeuterna Hanna Claesson och Maria Berglund. Salongen är medlem i SHR och erbjuder en harmonisk tillflyktsort för professionell hudvård och total avkoppling.\n\nSalongen erbjuder ett brett sortiment av klassiska och resultatinriktade ansiktsbehandlingar, skonsamma kemiska peelingar och närande kurer för alla hudtyper. Behandlingarna anpassas omsorgsfullt för att ge maximal effekt mot trötthet, torrhet och ojämnheter i huden.\n\nHos Min Stund står din egentid och hudhälsa i centrum, med garanti för SHR-certifierad kvalitet och trygghet.',
    ai_faq: '**Vad kännetecknar en behandling hos Min Stund?**\nBehandlingarna kombinerar effektiv dermatologisk hudvård med en rogivande spaupplevelse där du får njuta av avkopplande massage och personlig omsorg.\n\n**Är terapeuterna på Min Stund auktoriserade?**\nJa, behandlarna är fullt auktoriserade hudterapeuter med medlemskap i SHR.\n\n**Finns det parkering vid Min Stund i Huskvarna?**\nJa, det finns fri och bekväm parkering i direkt anslutning till salongen.',
    ai_meta: 'Min Stund Huskvarna – SHR-auktoriserad hudterapeut, ansiktsbehandling & peeling.',
    treatmentSlugs: ['ansiktsbehandling', 'kemisk-peeling', 'hudterapeut', 'hudvard', 'anti-aging-behandling']
  }
];

async function run() {
  console.log('--- Starting Jönköping Expansion Script ---');

  // 1. Ensure city 'Jönköping' exists in cities table
  const { data: existingCity } = await supabase
    .from('cities')
    .select('id')
    .eq('slug', 'jonkoping')
    .maybeSingle();

  if (!existingCity) {
    console.log("Adding 'Jönköping' to cities table...");
    const { error: cityErr } = await supabase.from('cities').insert({
      name: 'Jönköping',
      slug: 'jonkoping',
      description: 'Hitta och jämför de bästa hudvårds- och skönhetsklinikerna i Jönköping. Certifierade kliniker, omdömen och direktbokning på battrehy.se.'
    });
    if (cityErr) {
      console.error('Error adding city:', cityErr);
    } else {
      console.log("Successfully added 'Jönköping' to cities table.");
    }
  } else {
    console.log("City 'Jönköping' already exists in cities table.");
  }

  // 2. Fetch all treatments to get slug -> id mapping
  const { data: treatments, error: treatErr } = await supabase
    .from('treatments')
    .select('id, slug, name');

  if (treatErr || !treatments) {
    console.error('Error fetching treatments:', treatErr);
    process.exit(1);
  }

  const treatmentSlugToId: Record<string, string> = {};
  treatments.forEach(t => {
    treatmentSlugToId[t.slug] = t.id;
  });

  console.log(`Fetched ${treatments.length} treatments from DB.`);

  let insertedCount = 0;
  let updatedCount = 0;

  for (const c of JONKOPING_CLINICS) {
    // Check if clinic already exists by slug or name
    const { data: existing } = await supabase
      .from('clinics')
      .select('id, name')
      .or(`slug.eq.${c.slug},name.ilike.${c.name}`)
      .maybeSingle();

    let clinicId: string;

    const clinicData = {
      name: c.name,
      slug: c.slug,
      description: c.description,
      address: c.address,
      city: c.city,
      phone: c.phone,
      email: c.email,
      website: c.website,
      booking_url: c.booking_url,
      is_shr_member: c.is_shr_member,
      is_rfem_member: c.is_rfem_member,
      tier: c.tier,
      is_verified: c.is_verified,
      extracted_services: c.extracted_services,
      ai_description: c.ai_description,
      ai_faq: c.ai_faq,
      ai_meta: c.ai_meta
    };

    if (existing) {
      console.log(`Updating existing clinic: ${c.name} (${existing.id})`);
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
      console.log(`Inserting new clinic: ${c.name}`);
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
      // Clear existing links first to avoid duplicate errors
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
          console.log(`  -> Linked ${linksToInsert.length} treatments for ${c.name}`);
        }
      }
    }
  }

  console.log('\n--- Summary ---');
  console.log(`New clinics inserted: ${insertedCount}`);
  console.log(`Existing clinics updated: ${updatedCount}`);

  // Fetch all clinics in Jönköping area
  const { data: allJkpg } = await supabase
    .from('clinics')
    .select('id, name, city, is_shr_member, is_rfem_member')
    .or('city.ilike.Jönköping,city.ilike.Huskvarna');

  console.log(`Total clinics in Jönköping & Huskvarna now: ${allJkpg?.length}`);
  allJkpg?.forEach((c, idx) => {
    console.log(` ${idx + 1}. ${c.name} (${c.city}) [SHR: ${c.is_shr_member}, RFEM: ${c.is_rfem_member}]`);
  });
}

run();
