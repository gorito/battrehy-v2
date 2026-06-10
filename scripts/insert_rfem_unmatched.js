import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function generateSlug(name, city) {
  const base = `${name} ${city}`.toLowerCase()
    .replace(/[åä]/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return base;
}

async function main() {
  const rfemExtended = JSON.parse(fs.readFileSync('rfem_clinics_extended.json', 'utf-8'));
  console.log(`Loaded ${rfemExtended.length} extended RFEM members.`);

  let insertedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const clinic of rfemExtended) {
    if (!clinic.name || clinic.name.trim().length < 2) {
      console.log(`Skipping empty/invalid name: ${clinic.name}`);
      continue;
    }

    const rfemName = clinic.name.toLowerCase().replace(/ ab$/i, '').trim();
    const rfemCity = clinic.city.toLowerCase().trim();

    // Check if it exists
    const { data: exactMatch, error: exactError } = await supabase
      .from('clinics')
      .select('id, name')
      .ilike('name', `${rfemName}%`)
      .ilike('city', `%${rfemCity}%`);

    if (exactError) {
      console.error(`Error searching for ${clinic.name}:`, exactError);
      errorCount++;
      continue;
    }

    if (exactMatch && exactMatch.length > 0) {
      // Already exists
      skippedCount++;
    } else {
      // Insert new clinic
      const slug = generateSlug(clinic.name, clinic.city);
      // Let's ensure the slug is unique by appending a random string if needed, 
      // but let's try the base slug first.

      const insertData = {
        name: clinic.name,
        city: clinic.city || 'Okänd',
        slug: slug,
        email: clinic.email || null,
        website: clinic.website || null,
        phone: clinic.phone || null,
        tier: 'free',
        is_rfem_member: true,
        is_verified: false,
        is_shr_member: false
      };

      const { error: insertError } = await supabase
        .from('clinics')
        .insert([insertData]);

      if (insertError) {
        // If it's a unique constraint violation on slug, append random numbers
        if (insertError.code === '23505') {
           const fallbackSlug = `${slug}-${Math.floor(Math.random() * 10000)}`;
           const { error: fallbackError } = await supabase
            .from('clinics')
            .insert([{ ...insertData, slug: fallbackSlug }]);
            
           if (fallbackError) {
             console.error(`Failed to insert ${clinic.name} even with fallback slug:`, fallbackError);
             errorCount++;
           } else {
             console.log(`Inserted: ${clinic.name} (with fallback slug)`);
             insertedCount++;
           }
        } else {
          console.error(`Failed to insert ${clinic.name}:`, insertError);
          errorCount++;
        }
      } else {
        console.log(`Inserted: ${clinic.name}`);
        insertedCount++;
      }
    }
  }

  console.log(`\nImport Summary:`);
  console.log(`Total checked: ${rfemExtended.length}`);
  console.log(`Skipped (already matched in DB): ${skippedCount}`);
  console.log(`Successfully Inserted: ${insertedCount}`);
  console.log(`Errors: ${errorCount}`);
}

main().catch(console.error);
