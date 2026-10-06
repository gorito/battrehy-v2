import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface ClinicData {
    name: string;
    slug: string;
    city: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    booking_url: string;
    description: string;
    ai_description: string;
    ai_meta: string;
    ai_faq: string;
    is_shr_member: boolean;
    is_rfem_member: boolean;
    is_verified: boolean;
    tier: 'free' | 'premium';
    image_query: string;
    treatment_slugs: string[];
}

const umeaClinics: ClinicData[] = [
    {
        name: 'Estetic Walk-in Umeå',
        slug: 'estetic-walk-in-umea',
        city: 'Umeå',
        address: 'Kungsgatan 65B, 903 26 Umeå',
        phone: '090-77 22 61',
        email: 'info@estetic.se',
        website: 'https://www.estetic.se',
        booking_url: 'https://www.bokadirekt.se/places/estetic-i-umea-23098',
        description: 'Välkommen till Estetic i Umeå på Kungsgatan 65B. Vi erbjuder medicinsk skönhetsvård med fokus på säkra, naturliga och resultatinriktade estetiska behandlingar utan kirurgi.',
        ai_description: 'Estetic Walk-in Umeå är en väletablerad medicinsk skönhetsklinik belägen centralt på Kungsgatan 65B i Umeå. Kliniken är specialiserad på estetiska injektionsbehandlingar såsom Botox och fillers, avancerad hudvård, kemisk peeling, microneedling och laserbehandlingar. All personal arbetar under strikta medicinska riktlinjer för att säkerställa högsta patientsäkerhet och naturliga resultat anpassade efter varje individ.',
        ai_meta: 'Estetic i Umeå på Kungsgatan 65B. Boka botox, fillers, microneedling och medicinsk hudvård via battrehy.se.',
        ai_faq: '**Vilka injektionsbehandlingar erbjuds hos Estetic i Umeå?**\nEstetic erbjuder muskelavslappnande injektioner (Botox/Vistabel), hyaluronsyrefillers för läppar, käklinje och kindben, samt hudförbättrande skinboosters.\n\n**Krävs en konsultation innan behandling?**\nJa, enligt svensk lagstiftning krävs en konsultation minst 48 timmar innan din första injektionsbehandling.',
        is_shr_member: false,
        is_rfem_member: true,
        is_verified: true,
        tier: 'premium',
        image_query: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
        treatment_slugs: ['botoxbehandling', 'fillerbehandling', 'lappfiller', 'estetisk-klinik', 'skonhetsklinik', 'kemisk-peeling', 'microneedling', 'skin-boosters']
    },
    {
        name: 'MedPark Aesthetics',
        slug: 'medpark-aesthetics-umea',
        city: 'Umeå',
        address: 'Nygatan 22C, 903 27 Umeå',
        phone: '090-71 00 22',
        email: 'kontakt@medpark.se',
        website: 'https://medpark.se',
        booking_url: 'https://www.bokadirekt.se/places/medpark-aesthetics-42287',
        description: 'MedPark Aesthetics i centrala Umeå erbjuder skräddarsydda estetiska behandlingar utförda av legitimerad läkare och auktoriserad hudterapeut.',
        ai_description: 'MedPark Aesthetics på Nygatan 22C i Umeå förenar medicinsk precision med avancerad hudvård. Här möter du legitimerade läkare och auktoriserade hudterapeuter som utför behandlingar med Botox, fillers, PRP (vampyrbehandling), CO2-laser, microneedling och permanent laserhårborttagning. Kliniken skräddarsyr varje behandlingsplan för långsiktiga och naturliga resultat.',
        ai_meta: 'MedPark Aesthetics i Umeå – läkarledda injektioner, botox, fillers, PRP och laser. Boka direkt.',
        ai_faq: '**Vilka utför behandlingarna på MedPark Aesthetics?**\nInjektionsbehandlingar utförs av legitimerade läkare och avancerad hudvård av auktoriserade hudterapeuter.\n\n**Erbjuder kliniken laserbehandlingar?**\nJa, MedPark erbjuder bland annat fraktionerad CO2-laser och laserhårborttagning.',
        is_shr_member: true,
        is_rfem_member: true,
        is_verified: true,
        tier: 'premium',
        image_query: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
        treatment_slugs: ['botoxbehandling', 'fillerbehandling', 'prp', 'laserbehandling', 'laser-harborttagning', 'microneedling', 'skin-boosters', 'estetisk-klinik', 'hudterapeut']
    },
    {
        name: 'Mercurion Medicinsk Skönhetsvård',
        slug: 'mercurion-medicinsk-skonhetsvard-umea',
        city: 'Umeå',
        address: 'Skolgatan 56A, 903 26 Umeå',
        phone: '090-349 80 09',
        email: 'info@mercurion-medical.com',
        website: 'https://mercurion-medical.com',
        booking_url: 'https://www.bokadirekt.se/places/mercurion-medicinsk-skonhetsvard-49667',
        description: 'Mercurion Medicinsk Skönhetsvård drivs av Dr. Rikard Waldner och erbjuder medicinsk skönhetsvård, botox, fillers och medicinsk rådgivning på Skolgatan 56A.',
        ai_description: 'Mercurion Medicinsk Skönhetsvård är en läkarledd klinik i Umeå (c/o Salong Wilma, Skolgatan 56A). Under ledning av legitimerad läkare Dr. Rikard Waldner erbjuds professionella estetiska injektionsbehandlingar såsom rynkbehandling med Botox, fillers, Profhilo och medicinsk rådgivning. Kliniken lägger stor vikt vid evidensbaserade metoder och diskreta, harmoniska resultat.',
        ai_meta: 'Mercurion Medicinsk Skönhetsvård i Umeå – läkarledda injektioner, botox och fillers hos Dr. Rikard Waldner.',
        ai_faq: '**Vem utför injektionerna på Mercurion?**\nSamtliga injektionsbehandlingar utförs personligen av legitimerad läkare Dr. Rikard Waldner.\n\n**Hur bokar jag tid hos Mercurion?**\nDu bokar smidigt online via Bokadirekt eller direkt via kliniken.',
        is_shr_member: false,
        is_rfem_member: true,
        is_verified: true,
        tier: 'free',
        image_query: 'https://images.unsplash.com/photo-1512290900672-1f486413a968?auto=format&fit=crop&w=1200&q=80',
        treatment_slugs: ['botoxbehandling', 'fillerbehandling', 'profhilo', 'skin-boosters', 'estetisk-klinik']
    },
    {
        name: 'Specialistkliniken & Polarkliniken Umeå',
        slug: 'specialistkliniken-polarkliniken-umea',
        city: 'Umeå',
        address: 'Norra Obbolavägen 129A, 904 22 Umeå',
        phone: '090-349 58 10',
        email: 'info@specialistklinikenumea.se',
        website: 'https://specialistklinikenumea.se',
        booking_url: 'https://specialistklinikenumea.se/kontakt',
        description: 'En av Norrlands främsta specialistkliniker för estetisk plastikkirurgi, allmänkirurgi och injektionsbehandlingar på Norra Obbolavägen 129A.',
        ai_description: 'Specialistkliniken i Umeå (tillsammans med Polarkliniken) är ett ledande privat centrum i Norrland för plastikkirurgi och avancerade estetiska ingrepp. Kliniken erbjuder ett heltäckande utbud från estetiska injektioner med Botox och fillers till ögonlocksplastik, bröstkirurgi och kroppsformning, utfört av erfarna specialistläkare och kirurger i en modern sjukhusmiljö.',
        ai_meta: 'Specialistkliniken i Umeå – plastikkirurgi, botox, fillers och estetisk kirurgi i toppklass.',
        ai_faq: '**Vilka behandlingar utförs på Specialistkliniken?**\nKliniken erbjuder både kirurgiska ingrepp och icke-kirurgiska estetiska injektionsbehandlingar som Botox och fillers.',
        is_shr_member: false,
        is_rfem_member: true,
        is_verified: true,
        tier: 'premium',
        image_query: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
        treatment_slugs: ['estetisk-klinik', 'skonhetsklinik', 'botoxbehandling', 'fillerbehandling', 'anti-aging-behandling']
    },
    {
        name: 'Skinlobby',
        slug: 'skinlobby-umea',
        city: 'Umeå',
        address: 'Storgatan 43, 903 26 Umeå',
        phone: '070-358 05 25',
        email: 'nina@skinlobby.se',
        website: 'https://skinlobby.se',
        booking_url: 'https://www.bokadirekt.se/places/skinlobby-51369',
        description: 'Skinlobby på Storgatan 43 drivs av legitimerad sjuksköterska och auktoriserad hudterapeut. Vi erbjuder personlig, trygg hudvård och injektioner.',
        ai_description: 'Skinlobby på Storgatan 43 i centrala Umeå erbjuder en personlig och trygg miljö för avancerad hudvård och estetiska injektioner. Behandlingarna utförs av legitimerad sjuksköterska och auktoriserad hudterapeut med gedigen erfarenhet inom kemisk peeling, microneedling, skinboosters, klassiska ansiktsbehandlingar och botox.',
        ai_meta: 'Skinlobby i Umeå på Storgatan 43. Ansiktsbehandlingar, botox, fillers och avancerad hudvård.',
        ai_faq: '**Vad gör Skinlobby unikt?**\nKombinationen av legitimerad sjuksköterska och auktoriserad hudterapeut garanterar både djupgående hudexpertis och medicinsk trygghet.',
        is_shr_member: true,
        is_rfem_member: true,
        is_verified: true,
        tier: 'free',
        image_query: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
        treatment_slugs: ['ansiktsbehandling', 'hudvard', 'hudterapeut', 'botoxbehandling', 'fillerbehandling', 'kemisk-peeling', 'microneedling', 'skin-boosters']
    },
    {
        name: 'Hudläkaren i Umeå AB',
        slug: 'hudlakaren-i-umea-ab-umea',
        city: 'Umeå',
        address: 'Övägen 4, 904 26 Umeå',
        phone: '090-77 52 61',
        email: 'info@hudlakaren.se',
        website: 'https://www.hudlakaren.se',
        booking_url: 'https://www.bokadirekt.se/places/hudlakaren-i-umea-41331',
        description: 'Hos Hudläkaren på natursköna Ön i Umeå träffar du specialistläkare Dr. Ingabritt Thorneus med team för medicinsk och avancerad estetisk hudvård.',
        ai_description: 'Hudläkaren i Umeå är en ledande specialistmottagning på Övägen 4 i Umeå. Under ledning av hudläkare Dr. Ingabritt Thorneus erbjuds avancerade laserbehandlingar (Fotona 4D), Botox, fillers, Dermapen, PRX-T33 samt medicinsk diagnostik av hudförändringar.',
        ai_meta: 'Hudläkaren i Umeå – specialistläkare Dr. Thorneus på Ön. Laser, botox, dermapen och medicinsk hudvård.',
        ai_faq: '**Vilka laserbehandlingar finns hos Hudläkaren i Umeå?**\nKliniken erbjuder Fotona 4D laser för hudföryngring, kärlbehandling, pigmentreducering och hårborttagning.',
        is_shr_member: false,
        is_rfem_member: true,
        is_verified: true,
        tier: 'premium',
        image_query: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80',
        treatment_slugs: ['estetisk-klinik', 'botoxbehandling', 'fillerbehandling', 'laserbehandling', 'laser-harborttagning', 'microneedling', 'profhilo', 'skin-boosters', 'anti-aging-behandling']
    },
    {
        name: 'Skinify',
        slug: 'skinify-umea',
        city: 'Umeå',
        address: 'Skolgatan 53, 903 27 Umeå',
        phone: '090-12 12 50',
        email: 'kontakt@skinify.se',
        website: 'https://skinify.se',
        booking_url: 'https://www.bokadirekt.se/places/skinify-43405',
        description: 'Skinify på Skolgatan 53 i centrala Umeå är din destination för professionell hudvård, injektioner och avancerade ansiktsbehandlingar.',
        ai_description: 'Skinify i Umeå erbjuder ett modernt utbud av resultatinriktade hudvårdsbehandlingar och estetiska injektioner. Kliniken arbetar med certifierad personal och marknadsledande produkter inom Dermapen microneedling, kemiska peelingar, Botox och fillers för att ge din hy maximal lyster och spänst.',
        ai_meta: 'Skinify i Umeå på Skolgatan 53. Professionella ansiktsbehandlingar, botox, fillers och microneedling.',
        ai_faq: '**Vilka märken och tekniker används hos Skinify?**\nSkinify använder professionella medicintekniska produkter och beprövade metoder för optimal hudhälsa.',
        is_shr_member: false,
        is_rfem_member: false,
        is_verified: true,
        tier: 'free',
        image_query: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
        treatment_slugs: ['ansiktsbehandling', 'hudvard', 'botoxbehandling', 'fillerbehandling', 'microneedling', 'kemisk-peeling']
    },
    {
        name: 'Fillmein Umeå',
        slug: 'fillmein-umea',
        city: 'Umeå',
        address: 'Bankgatan 18A, 903 25 Umeå',
        phone: '076-226 02 19',
        email: 'fillmeinumea@hotmail.com',
        website: 'https://fillmein.se',
        booking_url: 'https://www.bokadirekt.se/places/fillmein-umea-24151',
        description: 'Fillmein Umeå (f.d. Salong Mirame) på Bankgatan 18A erbjuder estetiska injektioner, trådlyft, permanent laserhårborttagning och LED-ljusterapi.',
        ai_description: 'Fillmein Umeå är en modern skönhetsklinik på Bankgatan 18A i Umeå. Kliniken erbjuder estetiska injektionsbehandlingar, trådlyft utförda av legitimerad sjuksköterska med medicinskt ansvarig läkare, samt permanent hårborttagning med diodlaser och fettreducering.',
        ai_meta: 'Fillmein Umeå på Bankgatan 18A – botox, fillers, trådlyft, diodlaser och kroppsbehandlingar.',
        ai_faq: '**Har Fillmein medicinskt ansvarig läkare?**\nJa, kliniken samarbetar med medicinskt ansvarig läkare och behandlingarna utförs av legitimerad sjuksköterska.',
        is_shr_member: false,
        is_rfem_member: true,
        is_verified: true,
        tier: 'free',
        image_query: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1200&q=80',
        treatment_slugs: ['botoxbehandling', 'fillerbehandling', 'tradlyft', 'laser-harborttagning', 'laserbehandling', 'skonhetsklinik']
    },
    {
        name: 'Face Hudstudio',
        slug: 'face-hudstudio-umea',
        city: 'Umeå',
        address: 'Västra Norrlandsgatan 18B, 903 27 Umeå',
        phone: '090-77 99 55',
        email: 'mail@face.se',
        website: 'https://face.se',
        booking_url: 'https://www.bokadirekt.se/places/face-hudstudio-umea-22180',
        description: 'Face Hudstudio på Västra Norrlandsgatan 18B är en av Umeås mest etablerade salonger med SHR-auktoriserade hudterapeuter.',
        ai_description: 'Face Hudstudio har lång erfarenhet av professionell hudvård i Umeå. Salongens auktoriserade hudterapeuter (SHR-medlemmar) erbjuder individanpassade ansiktsbehandlingar, kemisk peeling, microneedling, frans- och brynformning samt avslappnande spabehandlingar.',
        ai_meta: 'Face Hudstudio i Umeå – SHR-auktoriserad hudvård, ansiktsbehandling och microneedling på Västra Norrlandsgatan.',
        ai_faq: '**Är terapeuterna på Face Hudstudio auktoriserade?**\nJa, hudterapeuterna på Face Hudstudio är medlemmar i Sveriges Hudterapeuters Riksorganisation (SHR).',
        is_shr_member: true,
        is_rfem_member: false,
        is_verified: true,
        tier: 'free',
        image_query: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        treatment_slugs: ['ansiktsbehandling', 'hudvard', 'hudterapeut', 'kemisk-peeling', 'microneedling']
    },
    {
        name: 'Systra Mi',
        slug: 'systra-mi-umea',
        city: 'Umeå',
        address: 'Västra Esplanaden 7, 903 25 Umeå',
        phone: '070-558 89 80',
        email: 'info@systramiumea.se',
        website: 'https://systramiumea.se',
        booking_url: 'https://www.bokadirekt.se/places/systra-mi-28312',
        description: 'Välkommen till Systra Mi på Västra Esplanaden 7 i Umeå. Vi erbjuder ett brett spektrum av skönhets- och hudvårdsbehandlingar i en välkomnande miljö.',
        ai_description: 'Systra Mi i centrala Umeå är en omtyckt skönhetssalong på Västra Esplanaden 7. Här erbjuds klassiska och avancerade ansiktsbehandlingar, Lashlift, brynformning och kroppsvård med fokus på personlig omtanke och hög servicegrad.',
        ai_meta: 'Systra Mi i Umeå på Västra Esplanaden 7. Ansiktsbehandlingar, lashlift, hudvård och skönhet.',
        ai_faq: '**Vilka behandlingar är mest populära på Systra Mi?**\nAnsiktsbehandlingar, Lashlift och personligt anpassade hudvårdskurer hör till de mest efterfrågade behandlingarna.',
        is_shr_member: false,
        is_rfem_member: false,
        is_verified: true,
        tier: 'free',
        image_query: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
        treatment_slugs: ['ansiktsbehandling', 'hudvard', 'skonhetsklinik']
    },
    {
        name: 'Wetterflod Estetik AB',
        slug: 'wetterflod-estetik-ab-umea',
        city: 'Umeå',
        address: 'Stöcksjö 566, 905 80 Umeå',
        phone: '072-212 65 02',
        email: 'info@wetterflodestetik.se',
        website: 'https://wetterflodestetik.se',
        booking_url: 'https://www.bokadirekt.se/places/wetterflod-estetik-ab-46820',
        description: 'Wetterflod Estetik i Umeå erbjuder certifierade estetiska injektioner, botox, fillers och skinboosters utförda av legitimerad personal.',
        ai_description: 'Wetterflod Estetik AB erbjuder professionella injektionsbehandlingar i Umeå. Kliniken är specialiserad på naturliga estetiska resultat med Botox, fillers, Profhilo och skinboosters, med stort fokus på trygghet, noggrannhet och individuell konsultation.',
        ai_meta: 'Wetterflod Estetik i Umeå – certifierad botox, filler och Profhilo. Boka tid via battrehy.se.',
        ai_faq: '**Hur går en injektionsbehandling till hos Wetterflod Estetik?**\nBehandlingen inleds alltid med en lagstadgad konsultation där behandlaren går igenom dina önskemål och förutsättningar.',
        is_shr_member: false,
        is_rfem_member: true,
        is_verified: true,
        tier: 'free',
        image_query: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80',
        treatment_slugs: ['botoxbehandling', 'fillerbehandling', 'lappfiller', 'profhilo', 'skin-boosters', 'estetisk-klinik']
    },
    {
        name: 'Blixt Laser Clinic AB',
        slug: 'blixt-laser-clinic-ab-umea',
        city: 'Umeå',
        address: 'Götgatan 1 (Sagagallerian, vån 2), 903 27 Umeå',
        phone: '070-850 54 10',
        email: 'info@blixtlaser.se',
        website: 'https://blixtlaser.se',
        booking_url: 'https://www.bokadirekt.se/places/blixt-laser-clinic-ab-49112',
        description: 'Blixt Laser Clinic i Sagagallerian i Umeå är specialister på permanent laserhårborttagning, tatueringsborttagning och laserbaserad hudföryngring.',
        ai_description: 'Blixt Laser Clinic AB är en modern laserklinik belägen i Sagagallerian i centrala Umeå. Kliniken arbetar med den senaste medicintekniska laserutrustningen för permanent hårborttagning, effektiv tatueringsborttagning och hudföryngrande laserbehandlingar.',
        ai_meta: 'Blixt Laser Clinic i Umeå – laserhårborttagning, tatueringsborttagning och hudföryngring på Götgatan 1.',
        ai_faq: '**Hur många laserbehandlingar krävs för permanent hårborttagning?**\nNormalt krävs mellan 6–8 behandlingar med några veckors mellanrum för att uppnå permanent hårreducering.',
        is_shr_member: false,
        is_rfem_member: false,
        is_verified: true,
        tier: 'free',
        image_query: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
        treatment_slugs: ['laser-harborttagning', 'laserbehandling', 'estetisk-klinik', 'skonhetsklinik']
    },
    {
        name: 'Creative Beauty',
        slug: 'creative-beauty-umea',
        city: 'Umeå',
        address: 'Kungsgatan 101, 903 31 Umeå',
        phone: '070-399 60 70',
        email: 'Creative.beauty@hotmail.com',
        website: 'https://creativebeauty.se',
        booking_url: 'https://www.bokadirekt.se/places/creative-beauty-36780',
        description: 'Creative Beauty på Kungsgatan 101 i Umeå erbjuder resultatinriktad hudvård, algneedling, kemisk peeling, plasmapen och ansiktsbehandlingar.',
        ai_description: 'Creative Beauty i Umeå är en specialiserad hudvårdssalong på Kungsgatan 101. Terapeuterna är yrkesanslutna och erbjuder banbrytande behandlingar såsom algneedling, kemisk peeling, Plasmapen och djuprengörande ansiktsbehandlingar med fokus på synliga resultat.',
        ai_meta: 'Creative Beauty på Kungsgatan 101 i Umeå – algneedling, kemisk peeling, plasmapen och hudvård.',
        ai_faq: '**Vad är algneedling?**\nAlgneedling är en naturlig microneedling-metod med mikroskopiska kiselspikler från sötvattenssvamp som stimulerar hudens cellförnyelse.',
        is_shr_member: false,
        is_rfem_member: false,
        is_verified: true,
        tier: 'free',
        image_query: 'https://images.unsplash.com/photo-1512290900672-1f486413a968?auto=format&fit=crop&w=1200&q=80',
        treatment_slugs: ['ansiktsbehandling', 'hudvard', 'kemisk-peeling', 'microneedling', 'anti-aging-behandling']
    },
    {
        name: 'Hudterapeuten Anna',
        slug: 'hudterapeuten-anna-umea',
        city: 'Umeå',
        address: 'Västra Esplanaden 7, 903 25 Umeå',
        phone: '070-202 93 78',
        email: 'hudterapeuten.anna@gmail.com',
        website: 'http://www.hudterapeuten-anna.se',
        booking_url: 'https://www.bokadirekt.se/places/hudterapeuten-anna-48110',
        description: 'Auktoriserad hudterapeut Anna (SHR) på Västra Esplanaden 7 i Umeå erbjuder klassiska och avancerade ansiktsbehandlingar, Dermapen och syrapeeling.',
        ai_description: 'Hudterapeuten Anna driver sin verksamhet c/o Systra Mi på Västra Esplanaden 7 i Umeå. Som SHR-auktoriserad hudterapeut erbjuder Anna skräddarsydda hudvårdsprogram med Dermapen microneedling, kemiska peelingar och avslappnande ansiktsbehandlingar med högkvalitativa produkter.',
        ai_meta: 'Hudterapeuten Anna i Umeå – SHR-auktoriserad hudterapeut på Västra Esplanaden 7. Boka Dermapen & ansiktsbehandling.',
        ai_faq: '**Är Anna auktoriserad hudterapeut?**\nJa, Anna är auktoriserad hudterapeut och medlem i Sveriges Hudterapeuters Riksorganisation (SHR).',
        is_shr_member: true,
        is_rfem_member: false,
        is_verified: true,
        tier: 'free',
        image_query: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
        treatment_slugs: ['ansiktsbehandling', 'hudvard', 'hudterapeut', 'microneedling', 'kemisk-peeling']
    },
    {
        name: 'Hud i Harmoni Sweden AB',
        slug: 'hud-i-harmoni-umea',
        city: 'Umeå',
        address: 'Strömpilsplatsen 16 / Norra Obbolavägen 129A, 904 22 Umeå',
        phone: '090-18 00 20',
        email: 'info@hudiharmoni.se',
        website: 'https://hudiharmoni.se',
        booking_url: 'https://www.bokadirekt.se/places/hud-i-harmoni-32115',
        description: 'Hud i Harmoni i Umeå drivs av SHR-auktoriserade hudterapeuter och erbjuder djupgående ansiktsbehandlingar, kroppsvård och professionell hudrådgivning.',
        ai_description: 'Hud i Harmoni Sweden AB är en väletablerad hudvårdssalong i Umeå. Med auktoriserade hudterapeuter (SHR) erbjuds klassiska och resultatinriktade ansiktsbehandlingar, färgning av bryn och fransar samt holistisk hudvård i en rofylld miljö.',
        ai_meta: 'Hud i Harmoni i Umeå – auktoriserad hudterapeut, ansiktsbehandlingar och spavård.',
        ai_faq: '**Vilka hudvårdsmärken används hos Hud i Harmoni?**\nSalongen arbetar uteslutande med professionella hudvårdsserier av salongskvalitet.',
        is_shr_member: true,
        is_rfem_member: false,
        is_verified: true,
        tier: 'free',
        image_query: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        treatment_slugs: ['ansiktsbehandling', 'hudvard', 'hudterapeut']
    },
    {
        name: 'Skin Clinic Umeå',
        slug: 'skin-clinic-umea',
        city: 'Umeå',
        address: 'Västra Esplanaden 2, 903 26 Umeå',
        phone: '070-620 40 88',
        email: 'info@skinclinicumea.se',
        website: 'https://skinclinic.se',
        booking_url: 'https://www.bokadirekt.se/places/skin-clinic-umea-40912',
        description: 'Skin Clinic Umeå på Västra Esplanaden 2 erbjuder avancerad hudvård, Dermapen microneedling, LPG endermologie och djupgående hudföryngring.',
        ai_description: 'Skin Clinic Umeå är en modern hud- och skönhetsklinik på Västra Esplanaden 2. Kliniken tillhandahåller avancerade behandlingar med Dermapen 4, LPG kropps- och ansiktsbehandling, kemiska peelingar och individanpassade kurer för optimal hälsa och fasthet.',
        ai_meta: 'Skin Clinic Umeå på Västra Esplanaden 2 – Dermapen, LPG, microneedling och kemisk peeling.',
        ai_faq: '**Vad är LPG endermologie bra för?**\nLPG stimulerar lymfdränage, stramar upp huden och reducerar celluliter samt främjar cirkulationen.',
        is_shr_member: false,
        is_rfem_member: false,
        is_verified: true,
        tier: 'free',
        image_query: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
        treatment_slugs: ['ansiktsbehandling', 'hudvard', 'microneedling', 'kemisk-peeling', 'anti-aging-behandling']
    },
    {
        name: 'Salong Nefertiti',
        slug: 'salong-nefertiti-umea',
        city: 'Umeå',
        address: 'Norra Ersmarksgatan 24, 903 44 Umeå',
        phone: '090-12 18 10',
        email: 'info@salongnefertiti.se',
        website: 'https://salongnefertiti.se',
        booking_url: 'https://www.bokadirekt.se/places/salong-nefertiti-21980',
        description: 'Salong Nefertiti på Norra Ersmarksgatan 24 i Umeå erbjuder traditionell och modern skönhetsvård, ansiktsbehandlingar och massage.',
        ai_description: 'Salong Nefertiti är en trivsam och personlig salong på Norra Ersmarksgatan 24 i Umeå. Här erbjuds klassisk hudvård, djuprengörande ansiktsbehandlingar, frans- och brynvård samt avslappnande kroppsvård.',
        ai_meta: 'Salong Nefertiti i Umeå på Norra Ersmarksgatan 24. Ansiktsbehandling, hudvård och skönhet.',
        ai_faq: '**Hur bokar jag tid på Salong Nefertiti?**\nDu kan enkelt boka din behandling direkt online via Bokadirekt.',
        is_shr_member: false,
        is_rfem_member: false,
        is_verified: true,
        tier: 'free',
        image_query: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
        treatment_slugs: ['ansiktsbehandling', 'hudvard', 'skonhetsklinik']
    },
    {
        name: 'Cfo clinic',
        slug: 'cfo-clinic-umea',
        city: 'Umeå',
        address: 'Hissjö 740, 905 91 Umeå',
        phone: '070-290 85 85',
        email: 'cecilia.forsner@gmail.com',
        website: 'https://cfoclinic.se',
        booking_url: 'https://www.bokadirekt.se/places/cfo-clinic-52820',
        description: 'Cfo clinic i Umeå drivs av leg. distriktssköterska certifierad via Estetiska injektionsrådet och RFEM för trygga botox- och fillerbehandlingar.',
        ai_description: 'Cfo clinic i Umeå (Hissjö 740) är specialiserad på estetiska injektionsbehandlingar för anti-aging och hudföryngring. Kliniken drivs av legitimerad distriktssköterska certifierad via Estetiska injektionsrådet och medlem i RFEM. Behandlingarna omfattar Botox, hyaluronsyrefillers, Profhilo, Jalupro och Plaxel Plus.',
        ai_meta: 'Cfo clinic i Umeå – certifierad distriktssköterska för botox, fillers och Profhilo.',
        ai_faq: '**Är behandlaren på Cfo clinic certifierad?**\nJa, behandlaren är leg. distriktssköterska certifierad via Estetiska injektionsrådet.',
        is_shr_member: false,
        is_rfem_member: true,
        is_verified: true,
        tier: 'free',
        image_query: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
        treatment_slugs: ['botoxbehandling', 'fillerbehandling', 'lappfiller', 'profhilo', 'skin-boosters', 'estetisk-klinik']
    },
    {
        name: 'Eco Hudvård i Umeå AB',
        slug: 'eco-hudvard-i-umea-ab-umea',
        city: 'Umeå',
        address: 'Västra Norrlandsgatan 18, 903 27 Umeå',
        phone: '090-13 40 50',
        email: 'info@ecohudvard.se',
        website: 'https://ecohudvard.se',
        booking_url: 'https://www.bokadirekt.se/places/eco-hudvard-i-umea-31990',
        description: 'Eco Hudvård i Umeå erbjuder ekologisk och resultatinriktad hudvård utförd av SHR-auktoriserade hudterapeuter på Västra Norrlandsgatan 18.',
        ai_description: 'Eco Hudvård i Umeå AB är en certifierad ekologisk hudvårdssalong med SHR-auktoriserade hudterapeuter. Salongen arbetar med rena, naturliga och ekologiskt certifierade hudvårdsprodukter för att stärka hudbarriären och ge naturlig lyster utan onödiga tillsatser.',
        ai_meta: 'Eco Hudvård i Umeå på Västra Norrlandsgatan 18 – SHR-auktoriserad ekologisk hudvård och ansiktsbehandling.',
        ai_faq: '**Vad kännetecknar Eco Hudvård?**\nSalongen använder 100% ekologiska och skonsamma produkter i kombination med auktoriserad terapeutisk expertis.',
        is_shr_member: true,
        is_rfem_member: false,
        is_verified: true,
        tier: 'free',
        image_query: 'https://images.unsplash.com/photo-1512290900672-1f486413a968?auto=format&fit=crop&w=1200&q=80',
        treatment_slugs: ['ansiktsbehandling', 'hudvard', 'hudterapeut']
    },
    {
        name: 'Glow Up Beauty Umeå',
        slug: 'glow-up-beauty-umea',
        city: 'Umeå',
        address: 'Morkullevägen 16D, 906 51 Umeå',
        phone: '073-840 22 15',
        email: 'info@glowupbeauty.se',
        website: 'https://glowupbeauty.se',
        booking_url: 'https://www.bokadirekt.se/places/glow-up-beauty-umea-53412',
        description: 'Glow Up Beauty på Mariehem i Umeå erbjuder professionell frans- och brynvård, lashlift, kosmetisk tatuering och hudförbättrande behandlingar.',
        ai_description: 'Glow Up Beauty är en modern skönhetssalong på Morkullevägen 16D i Umeå. Här erbjuds certifierade behandlingar inom Lashlift, Browlift, kosmetisk tatuering (microblading/powder brows) samt lystergivande ansiktsbehandlingar.',
        ai_meta: 'Glow Up Beauty i Umeå på Morkullevägen 16D. Lashlift, brynvård, kosmetisk tatuering och ansiktsbehandling.',
        ai_faq: '**Hur länge håller en Lashlift hos Glow Up Beauty?**\nEtt Lashlift håller normalt mellan 6–8 veckor beroende på dina naturliga fransars växtcykel.',
        is_shr_member: false,
        is_rfem_member: false,
        is_verified: true,
        tier: 'free',
        image_query: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
        treatment_slugs: ['ansiktsbehandling', 'hudvard', 'skonhetsklinik']
    }
];

async function run() {
    console.log('--- ADDING UMEÅ AND 20 CLINICS ---');

    // 1. Ensure Umeå in cities table
    const { data: existingCity } = await supabase.from('cities').select('*').eq('slug', 'umea').maybeSingle();
    if (!existingCity) {
        console.log('Inserting Umeå into cities...');
        const { error: cityErr } = await supabase.from('cities').insert({
            name: 'Umeå',
            slug: 'umea',
            description: 'Hitta och jämför Sveriges bästa skönhetskliniker och auktoriserade hudterapeuter i Umeå. Här listar vi certifierade kliniker för botox, fillers, microneedling, laser och professionell hudvård.'
        });
        if (cityErr) console.error('Error adding city:', cityErr);
        else console.log('City Umeå created successfully.');
    } else {
        console.log('City Umeå already exists in cities table.');
    }

    // 2. Fetch all treatments to map IDs
    const { data: dbTreatments } = await supabase.from('treatments').select('id, slug');
    const treatmentMap = new Map((dbTreatments || []).map(t => [t.slug, t.id]));

    // 3. Process each clinic
    for (const clinic of umeaClinics) {
        console.log(`\nProcessing clinic: ${clinic.name}...`);

        // Check if image exists in Supabase Storage or upload curated image
        let imageUrl = clinic.image_query;
        try {
            console.log(`  Downloading image for ${clinic.name}...`);
            const imgRes = await fetch(clinic.image_query);
            if (imgRes.ok) {
                const arrayBuffer = await imgRes.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const fileExt = 'jpg';
                const fileName = `clinics/umea-${clinic.slug}-${Date.now()}.${fileExt}`;

                const { data: uploadData, error: uploadErr } = await supabase.storage
                    .from('company-images')
                    .upload(fileName, buffer, {
                        contentType: 'image/jpeg',
                        upsert: true
                    });

                if (uploadErr) {
                    console.error('  Storage upload error:', uploadErr.message);
                } else {
                    const { data: publicData } = supabase.storage
                        .from('company-images')
                        .getPublicUrl(fileName);
                    imageUrl = publicData.publicUrl;
                    console.log(`  Image uploaded to Supabase Storage: ${imageUrl}`);
                }
            }
        } catch (e: any) {
            console.error('  Error downloading/uploading image:', e.message);
        }

        // Check if clinic already exists by name or slug
        const { data: existingClinics } = await supabase
            .from('clinics')
            .select('id, name, slug')
            .or(`slug.eq.${clinic.slug},name.ilike.%${clinic.name}%`);

        let clinicId: string;

        if (existingClinics && existingClinics.length > 0) {
            clinicId = existingClinics[0].id;
            console.log(`  Updating existing clinic ${clinic.name} (${clinicId})...`);
            const { error: updErr } = await supabase.from('clinics').update({
                name: clinic.name,
                slug: clinic.slug,
                city: 'Umeå',
                address: clinic.address,
                phone: clinic.phone,
                email: clinic.email,
                website: clinic.website,
                booking_url: clinic.booking_url,
                description: clinic.description,
                ai_description: clinic.ai_description,
                ai_meta: clinic.ai_meta,
                ai_faq: clinic.ai_faq,
                is_shr_member: clinic.is_shr_member,
                is_rfem_member: clinic.is_rfem_member,
                is_verified: clinic.is_verified,
                tier: clinic.tier,
                primary_image_url: imageUrl
            }).eq('id', clinicId);
            if (updErr) console.error('  Update error:', updErr);
        } else {
            console.log(`  Inserting new clinic ${clinic.name}...`);
            const { data: inserted, error: insErr } = await supabase.from('clinics').insert({
                name: clinic.name,
                slug: clinic.slug,
                city: 'Umeå',
                address: clinic.address,
                phone: clinic.phone,
                email: clinic.email,
                website: clinic.website,
                booking_url: clinic.booking_url,
                description: clinic.description,
                ai_description: clinic.ai_description,
                ai_meta: clinic.ai_meta,
                ai_faq: clinic.ai_faq,
                is_shr_member: clinic.is_shr_member,
                is_rfem_member: clinic.is_rfem_member,
                is_verified: clinic.is_verified,
                tier: clinic.tier,
                primary_image_url: imageUrl
            }).select('id').single();

            if (insErr) {
                console.error('  Insert error:', insErr);
                continue;
            }
            clinicId = inserted.id;
        }

        // Link treatments
        if (clinicId) {
            // Remove old links
            await supabase.from('clinic_treatments').delete().eq('clinic_id', clinicId);

            const treatmentInserts = clinic.treatment_slugs
                .map(slug => treatmentMap.get(slug))
                .filter(Boolean)
                .map(treatmentId => ({
                    clinic_id: clinicId,
                    treatment_id: treatmentId
                }));

            if (treatmentInserts.length > 0) {
                const { error: tErr } = await supabase.from('clinic_treatments').insert(treatmentInserts);
                if (tErr) console.error('  Treatment relation insert error:', tErr);
                else console.log(`  Linked ${treatmentInserts.length} treatments.`);
            }
        }
    }

    console.log('\n--- UMEÅ POPULATION COMPLETE ---');
}

run();
