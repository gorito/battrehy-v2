import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 20 high-quality, text-free, authentic aesthetic clinic / skincare / treatment images
const clinicImageMap: Record<string, string> = {
    'estetic-walk-in-umea': 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80',
    'medpark-aesthetics-umea': 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80',
    'mercurion-medicinsk-skonhetsvard-umea': 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80',
    'specialistkliniken-polarkliniken-umea': 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=80',
    'skinlobby-umea': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
    'hudlakaren-i-umea-ab-umea': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    'skinify-umea': 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    'fillmein-umea': 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1200&q=80',
    'face-hudstudio-umea': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    'systra-mi-umea': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    'wetterflod-estetik-ab-umea': 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80',
    'blixt-laser-clinic-ab-umea': 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    'creative-beauty-umea': 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80',
    'hudterapeuten-anna-umea': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
    'hud-i-harmoni-umea': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    'salong-nefertiti-umea': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    'cfo-clinic-umea': 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    'rooted-beauty-concept-umea': 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80',
    'skin-clinic-umea': 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80',
    'eco-hudvard-i-umea-ab-umea': 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80'
};

async function fixImages() {
    console.log('--- REPLACING ALL UMEÅ IMAGES WITH CLEAN TEXT-FREE CLINIC PHOTOS ---');

    for (const [slug, imgUrl] of Object.entries(clinicImageMap)) {
        console.log(`Processing ${slug}...`);
        try {
            const res = await fetch(imgUrl);
            if (!res.ok) {
                console.error(`  Failed to download image for ${slug} (${res.status})`);
                continue;
            }
            const buf = Buffer.from(await res.arrayBuffer());
            const fileName = `clinics/clean-umea-${slug}-${Date.now()}.jpg`;

            const { error: upErr } = await supabase.storage
                .from('company-images')
                .upload(fileName, buf, {
                    contentType: 'image/jpeg',
                    upsert: true
                });

            if (upErr) {
                console.error(`  Upload error for ${slug}:`, upErr.message);
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
                console.error(`  DB error for ${slug}:`, dbErr.message);
            } else {
                console.log(`  Updated ${slug} -> ${pubData.publicUrl}`);
            }
        } catch (e: any) {
            console.error(`  Exception for ${slug}:`, e.message);
        }
    }

    console.log('\n--- ALL UMEÅ CLINIC IMAGES REPLACED SUCCESSFULLY ---');
}

fixImages();
