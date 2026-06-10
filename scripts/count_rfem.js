import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const rfemClinics = JSON.parse(fs.readFileSync('rfem_clinics.json', 'utf-8'));
  console.log(`Loaded ${rfemClinics.length} RFEM members.`);

  const unmatched = [];
  const matched = [];

  for (const rfemClinic of rfemClinics) {
    const rfemName = rfemClinic.name.toLowerCase().replace(/ ab$/i, '').trim();
    const rfemCity = rfemClinic.city.toLowerCase().trim();

    const { data: exactMatch, error: exactError } = await supabase
      .from('clinics')
      .select('id, name, city')
      .ilike('name', `${rfemName}%`)
      .ilike('city', `%${rfemCity}%`);

    if (exactError) {
      console.error(`Error searching for ${rfemClinic.name}:`, exactError);
      continue;
    }

    if (exactMatch && exactMatch.length > 0) {
      matched.push({ rfem: rfemClinic, db: exactMatch[0] });
    } else {
      unmatched.push(rfemClinic);
    }
  }

  console.log(`\nResults:`);
  console.log(`Total RFEM clinics: ${rfemClinics.length}`);
  console.log(`Matched (present on battrehy.se): ${matched.length}`);
  console.log(`Unmatched (not present): ${unmatched.length}`);
}

main().catch(console.error);
