import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Map of clinics with authentic photos extracted directly from their official websites
const officialWebsitePhotos: Record<string, string> = {
    'estetic-walk-in-umea': 'https://estetic.se/wp-content/uploads/2020/01/Estetic-front-banner.jpg',
    'medpark-aesthetics-umea': 'https://medpark.se/media/medpark-umea-n.png',
    'wetterflod-estetik-ab-umea': 'https://9b468178f3.clvaw-cdnwnd.com/c132b4327323d4fa024fb488084a9e3d/200000944-1772617728/startsida-we-clinic%20estetiskainjektioner.webp',
    'blixt-laser-clinic-ab-umea': 'https://blixtlaser.se/wp-content/uploads/2025/09/heroimg.webp',
    'fillmein-umea': 'https://fillmein.se/wp-content/uploads/2026/06/BB4038E1-8C44-4AD3-ACDF-DECCA243710F.jpg',
    'specialistkliniken-polarkliniken-umea': 'https://specialistklinikenumea.se/wp-content/uploads/2022/12/Specialist-Injektioner.webp',
    'hudlakaren-i-umea-ab-umea': 'https://hudlakaren.se/wp-content/uploads/har_karl_pigment.jpg',
    'hudterapeuten-anna-umea': 'https://311a62bc0e.clvaw-cdnwnd.com/962f39ee5065e83019aa125180b891e3/200000079-893f98a3bb/anna-stor-9.jpg?ph=311a62bc0e',
    'hud-i-harmoni-umea': 'https://static.wixstatic.com/media/38043b3c05f64dbf99237fc72a2d7f5e.jpg/v1/crop/x_0,y_164,w_1920,h_952/fill/w_1200,h_600,al_c,q_85,enc_avif,quality_auto/Model%20Applying%20Cream.jpg'
};

async function updateOfficialPhotos() {
    console.log('--- UPLOADING AUTHENTIC CLINIC WEBSITE PHOTOS TO SUPABASE STORAGE ---');

    for (const [slug, photoUrl] of Object.entries(officialWebsitePhotos)) {
        console.log(`Processing ${slug}...`);
        try {
            const res = await fetch(photoUrl, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' }
            });

            if (!res.ok) {
                console.error(`  Failed to fetch ${photoUrl} (Status: ${res.status})`);
                continue;
            }

            const contentType = res.headers.get('content-type') || 'image/jpeg';
            const ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg';
            const buf = Buffer.from(await res.arrayBuffer());
            const fileName = `clinics/official-site-${slug}-${Date.now()}.${ext}`;

            const { error: upErr } = await supabase.storage
                .from('company-images')
                .upload(fileName, buf, {
                    contentType: contentType,
                    upsert: true
                });

            if (upErr) {
                console.error(`  Storage upload error for ${slug}:`, upErr.message);
                continue;
            }

            const { data: pubData } = supabase.storage
                .from('company-images')
                .getPublicUrl(fileName);

            const { error: dbErr } = await supabase
                .from('clinics')
                .update({ primary_image_url: pubData.publicUrl })
                .eq('slug', slug);

            if (dbErr) {
                console.error(`  DB update error for ${slug}:`, dbErr.message);
            } else {
                console.log(`  -> SUCCESS: Updated ${slug} with authentic website photo: ${pubData.publicUrl}`);
            }
        } catch (e: any) {
            console.error(`  Exception for ${slug}:`, e.message);
        }
    }

    console.log('\n--- AUTHENTIC PHOTO UPLOAD COMPLETE ---');
}

updateOfficialPhotos();
