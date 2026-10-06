import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const verifiedClinics = [
    {
        name: 'Estetic Walk-in Umeå',
        slug: 'estetic-walk-in-umea',
        address: 'Kungsgatan 65B, 903 26 Umeå',
        phone: '090-77 22 61',
        email: 'info@estetic.se',
        website: 'https://www.estetic.se',
        booking_url: 'https://www.bokadirekt.se/places/estetic-i-umea-39781'
    },
    {
        name: 'MedPark Aesthetics',
        slug: 'medpark-aesthetics-umea',
        address: 'Nygatan 22C, 903 27 Umeå',
        phone: '090-71 00 22',
        email: 'kontakt@medpark.se',
        website: 'https://medpark.se',
        booking_url: 'https://www.bokadirekt.se/places/medpark-aesthetics-38265'
    },
    {
        name: 'Mercurion Medicinsk Skönhetsvård',
        slug: 'mercurion-medicinsk-skonhetsvard-umea',
        address: 'Skolgatan 56A, 903 26 Umeå',
        phone: '090-349 80 09',
        email: 'info@mercurion-medical.com',
        website: 'https://mercurion-medical.com',
        booking_url: 'https://www.bokadirekt.se/places/mercurion-medicinsk-skonhetsvard-60652'
    },
    {
        name: 'Specialistkliniken & Polarkliniken Umeå',
        slug: 'specialistkliniken-polarkliniken-umea',
        address: 'Norra Obbolavägen 129A, 904 22 Umeå',
        phone: '090-349 58 10',
        email: 'info@specialistklinikenumea.se',
        website: 'https://specialistklinikenumea.se',
        booking_url: 'https://specialistklinikenumea.se/kontakt'
    },
    {
        name: 'Skinlobby',
        slug: 'skinlobby-umea',
        address: 'Storgatan 43, 903 26 Umeå',
        phone: '070-358 05 25',
        email: 'nina@skinlobby.se',
        website: 'https://skinlobby.se',
        booking_url: 'https://www.bokadirekt.se/places/skinlobby-135794'
    },
    {
        name: 'Hudläkaren i Umeå AB',
        slug: 'hudlakaren-i-umea-ab-umea',
        address: 'Övägen 4, 904 26 Umeå',
        phone: '090-77 52 61',
        email: 'info@hudlakaren.se',
        website: 'https://www.hudlakaren.se',
        booking_url: 'https://www.bokadirekt.se/places/hudlakaren-i-umea-41331'
    },
    {
        name: 'Skinify',
        slug: 'skinify-umea',
        address: 'Skolgatan 53, 903 27 Umeå',
        phone: '090-12 12 50',
        email: 'kontakt@skinify.se',
        website: 'https://skinify.se',
        booking_url: 'https://www.bokadirekt.se/places/skinify-48698'
    },
    {
        name: 'Fillmein Umeå',
        slug: 'fillmein-umea',
        address: 'Bankgatan 18A, 903 25 Umeå',
        phone: '076-226 02 19',
        email: 'fillmeinumea@hotmail.com',
        website: 'https://fillmein.se',
        booking_url: 'https://www.bokadirekt.se/places/fillmein-umeafd-salong-mirame-36272'
    },
    {
        name: 'Face Hudstudio',
        slug: 'face-hudstudio-umea',
        address: 'Västra Norrlandsgatan 18B, 903 27 Umeå',
        phone: '090-77 99 55',
        email: 'mail@face.se',
        website: 'https://face.se',
        booking_url: 'https://www.bokadirekt.se/places/face-hudstudio-umea-38357'
    },
    {
        name: 'Systra Mi',
        slug: 'systra-mi-umea',
        address: 'Västra Esplanaden 7, 903 25 Umeå',
        phone: '070-558 89 80',
        email: 'info@systramiumea.se',
        website: 'https://systramiumea.se',
        booking_url: 'https://www.bokadirekt.se/places/systra-mi-52567'
    },
    {
        name: 'Wetterflod Estetik AB',
        slug: 'wetterflod-estetik-ab-umea',
        address: 'Stöcksjö 566, 905 80 Umeå',
        phone: '072-212 65 02',
        email: 'info@wetterflodestetik.se',
        website: 'https://wetterflodestetik.se',
        booking_url: 'https://www.bokadirekt.se/places/wetterflod-estetik-ab-27267'
    },
    {
        name: 'Blixt Laser Clinic AB',
        slug: 'blixt-laser-clinic-ab-umea',
        address: 'Götgatan 1 (Sagagallerian, vån 2), 903 27 Umeå',
        phone: '070-850 54 10',
        email: 'info@blixtlaser.se',
        website: 'https://blixtlaser.se',
        booking_url: 'https://www.bokadirekt.se/places/blixt-laser-clinic-ab-27644'
    },
    {
        name: 'Creative Beauty',
        slug: 'creative-beauty-umea',
        address: 'Kungsgatan 101, 903 31 Umeå',
        phone: '070-399 60 70',
        email: 'Creative.beauty@hotmail.com',
        website: 'https://creativebeauty.se',
        booking_url: 'https://www.bokadirekt.se/places/creative-beauty-sweden-11236'
    },
    {
        name: 'Hudterapeuten Anna',
        slug: 'hudterapeuten-anna-umea',
        address: 'Västra Esplanaden 7, 903 25 Umeå',
        phone: '070-202 93 78',
        email: 'hudterapeuten.anna@gmail.com',
        website: 'http://www.hudterapeuten-anna.se',
        booking_url: 'https://www.bokadirekt.se/places/hudterapeuten-anna-c-o-systra-mi-29253'
    },
    {
        name: 'Hud i Harmoni Sweden AB',
        slug: 'hud-i-harmoni-umea',
        address: 'Strömpilsplatsen 16 / Norra Obbolavägen 129A, 904 22 Umeå',
        phone: '090-18 00 20',
        email: 'info@hudiharmoni.se',
        website: 'https://hudiharmoni.se',
        booking_url: 'https://www.bokadirekt.se/places/hud-i-harmoni-37928'
    },
    {
        name: 'Salong Nefertiti',
        slug: 'salong-nefertiti-umea',
        address: 'Norra Ersmarksgatan 24, 903 44 Umeå',
        phone: '090-12 18 10',
        email: 'info@salongnefertiti.se',
        website: 'https://salongnefertiti.se',
        booking_url: 'https://www.bokadirekt.se/places/salong-nefertiti-45358'
    },
    {
        name: 'Cfo clinic',
        slug: 'cfo-clinic-umea',
        address: 'Hissjö 740, 905 91 Umeå',
        phone: '070-290 85 85',
        email: 'cecilia.forsner@gmail.com',
        website: 'https://cfoclinic.se',
        booking_url: 'https://www.bokadirekt.se/places/cfo-clinic-34672'
    },
    {
        name: 'Rooted Beauty Concept',
        slug: 'rooted-beauty-concept-umea',
        address: 'Västra Norrlandsgatan 22B, 903 27 Umeå',
        phone: '090-12 10 20',
        email: 'info@rootedbeauty.se',
        website: 'https://rootedbeauty.se',
        booking_url: 'https://www.bokadirekt.se/places/rooted-beauty-concept-48465'
    },
    {
        name: 'Skin Clinic Umeå',
        slug: 'skin-clinic-umea',
        address: 'Västra Esplanaden 2, 903 26 Umeå',
        phone: '070-620 40 88',
        email: 'info@skinclinicumea.se',
        website: 'https://skinclinic.se',
        booking_url: 'https://skinclinic.se'
    },
    {
        name: 'Eco Hudvård i Umeå AB',
        slug: 'eco-hudvard-i-umea-ab-umea',
        address: 'Götgatan 1, 903 27 Umeå',
        phone: '070-304 49 10',
        email: 'info@ecohudvard.se',
        website: 'https://ecohudvard.se',
        booking_url: 'https://www.shr.nu'
    }
];

async function updateAll() {
    console.log('--- UPDATING ALL 20 UMEÅ CLINICS WITH VERIFIED QC LINKS ---');

    for (const c of verifiedClinics) {
        console.log(`Updating ${c.name}...`);
        const { error } = await supabase
            .from('clinics')
            .update({
                address: c.address,
                phone: c.phone,
                email: c.email,
                website: c.website,
                booking_url: c.booking_url
            })
            .eq('slug', c.slug);

        if (error) {
            console.error(`  Error updating ${c.name}:`, error);
        } else {
            console.log(`  Updated successfully -> ${c.booking_url}`);
        }
    }

    console.log('--- QC UPDATE COMPLETE ---');
}

updateAll();
