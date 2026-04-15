import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load env
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Anon key allows uploads based on our UI code

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing credentials");
    process.exit(1);
}

const s = createClient(supabaseUrl, supabaseKey);

const OLD_URL_PREFIX = 'https://uxuhmizabvduptruonnr.supabase.co/storage/v1/object/public/company-images/';

async function migrateImages() {
    console.log("Starting image migration from old bucket to new bucket...");

    // 1. Process Treatments
    console.log("\n--- Processing Treatments ---");
    const { data: treatments, error: errT } = await s.from('treatments').select('id, name, image_url');
    if (errT) throw errT;

    let updatedT = 0;
    for (const t of treatments) {
        if (t.image_url && t.image_url.startsWith(OLD_URL_PREFIX)) {
            console.log(`Migrating treatment: ${t.name}`);
            try {
                // Fetch the image from the old bucket
                const response = await fetch(t.image_url);
                if (!response.ok) {
                    console.error(`Failed to download ${t.image_url}: ${response.statusText}`);
                    continue;
                }
                const blob = await response.blob();
                
                // Extract relative path from the url (e.g. services/service-1772657469675.jpg)
                const relativePath = t.image_url.replace(OLD_URL_PREFIX, '');

                // Upload to the new bucket
                const { error: uploadError } = await s.storage
                    .from('company-images')
                    .upload(relativePath, blob, { upsert: true });

                if (uploadError) {
                    console.error(`Failed to upload ${relativePath}:`, uploadError);
                    continue;
                }

                // Get new public URL
                const { data: { publicUrl } } = s.storage.from('company-images').getPublicUrl(relativePath);

                // Update row
                const { error: updateError } = await s.from('treatments')
                    .update({ image_url: publicUrl })
                    .eq('id', t.id);

                if (updateError) {
                    console.error("Failed to update db row for", t.name, updateError);
                } else {
                    console.log(`✅ Success: ${t.name}`);
                    updatedT++;
                }

            } catch(e: any) {
                console.error("Error on", t.name, e.message);
            }
        }
    }
    console.log(`Finished integrating ${updatedT} treatment images.`);

    // 2. Process Clinics
    console.log("\n--- Processing Clinics ---");
    // Fetch clinics where primary_image_url starts with old url
    const { data: clinics, error: errC } = await s.from('clinics')
        .select('id, name, primary_image_url')
        .not('primary_image_url', 'is', null);

    if (errC) throw errC;

    let updatedC = 0;
    for (const c of clinics) {
        if (c.primary_image_url && c.primary_image_url.startsWith(OLD_URL_PREFIX)) {
            console.log(`Migrating clinic: ${c.name}`);
            try {
                const response = await fetch(c.primary_image_url);
                if (!response.ok) {
                    console.error(`Failed to download ${c.primary_image_url}: ${response.statusText}`);
                    continue;
                }
                const blob = await response.blob();
                
                const relativePath = c.primary_image_url.replace(OLD_URL_PREFIX, '');

                const { error: uploadError } = await s.storage
                    .from('company-images')
                    .upload(relativePath, blob, { upsert: true });

                if (uploadError) {
                    console.error(`Failed to upload ${relativePath}:`, uploadError);
                    continue;
                }

                const { data: { publicUrl } } = s.storage.from('company-images').getPublicUrl(relativePath);

                const { error: updateError } = await s.from('clinics')
                    .update({ primary_image_url: publicUrl })
                    .eq('id', c.id);

                if (updateError) {
                    console.error("Failed to update db row for", c.name, updateError);
                } else {
                    console.log(`✅ Success: ${c.name}`);
                    updatedC++;
                }
            } catch(e: any) {
                console.error("Error on", c.name, e.message);
            }
        }
    }
    console.log(`Finished integrating ${updatedC} clinic images.`);

    console.log("\nMigration Complete!");
}

migrateImages().catch(console.error);
