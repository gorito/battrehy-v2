import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { randomUUID } from 'crypto';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function importExternalImage(url: string, folder: string = 'clinics'): Promise<string> {
    if (!url) return url;
    if (url.includes('supabase.co/storage/v1/object/public/')) return url;
    if (!url.startsWith('http')) return url;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) return url;

        const buffer = await response.arrayBuffer();
        const contentType = response.headers.get('content-type') || 'image/jpeg';
        
        let ext = 'jpg';
        if (contentType.includes('png')) ext = 'png';
        else if (contentType.includes('webp')) ext = 'webp';
        
        const urlExt = url.split('.').pop()?.split(/[?#]/)[0];
        if (urlExt && ['jpg', 'jpeg', 'png', 'webp'].includes(urlExt.toLowerCase())) {
            ext = urlExt.toLowerCase();
        }

        const fileName = `${randomUUID()}.${ext}`;
        const filePath = folder ? `${folder}/${fileName}` : fileName;

        const { error: uploadError } = await supabase.storage
            .from('company-images')
            .upload(filePath, buffer, {
                contentType,
                upsert: true
            });

        if (uploadError) {
            console.error(`Error uploading ${url}:`, uploadError);
            return url;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('company-images')
            .getPublicUrl(filePath);

        return publicUrl;
    } catch (e) {
        console.error(`Failed to import ${url}:`, e);
        return url;
    }
}

async function migrate() {
    console.log('Starting image migration...');

    // 1. Migrate primary_image_url in clinics
    const { data: clinics, error: clinicErr } = await supabase
        .from('clinics')
        .select('id, name, primary_image_url');

    if (clinicErr) {
        console.error('Error fetching clinics:', clinicErr);
        return;
    }

    console.log(`Found ${clinics.length} clinics.`);

    for (const clinic of clinics) {
        if (clinic.primary_image_url && !clinic.primary_image_url.includes('supabase.co')) {
            console.log(`Importing primary image for ${clinic.name}...`);
            const newUrl = await importExternalImage(clinic.primary_image_url);
            if (newUrl !== clinic.primary_image_url) {
                await supabase.from('clinics').update({ primary_image_url: newUrl }).eq('id', clinic.id);
                console.log(`Updated ${clinic.name}`);
            }
        }
    }

    // 2. Migrate gallery images
    const { data: images, error: imageErr } = await supabase
        .from('clinic_images')
        .select('id, url');

    if (imageErr) {
        console.error('Error fetching gallery images:', imageErr);
        return;
    }

    console.log(`Found ${images.length} gallery images.`);

    for (const img of images) {
        if (img.url && !img.url.includes('supabase.co')) {
            console.log(`Importing gallery image ${img.id}...`);
            const newUrl = await importExternalImage(img.url);
            if (newUrl !== img.url) {
                await supabase.from('clinic_images').update({ url: newUrl }).eq('id', img.id);
                console.log(`Updated gallery image ${img.id}`);
            }
        }
    }

    console.log('Migration finished!');
}

migrate();
