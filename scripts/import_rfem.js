import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const rfemClinics = JSON.parse(fs.readFileSync('rfem_clinics.json', 'utf-8'));
  console.log(`Loaded ${rfemClinics.length} RFEM members.`);

  // 1. Reset all is_rfem_member to false
  const { error: resetError } = await supabase
    .from('clinics')
    .update({ is_rfem_member: false })
    .neq('is_rfem_member', false); // Only update if not already false

  if (resetError) {
    console.error("Failed to reset is_rfem_member flags:", resetError);
    return;
  }
  
  const unmatched = [];
  let matchCount = 0;

  for (const rfemClinic of rfemClinics) {
    const rfemName = rfemClinic.name.toLowerCase().replace(/ ab$/i, '').trim();
    const rfemCity = rfemClinic.city.toLowerCase().trim();

    // Try to find a match
    // Basic match: exact name and city
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
      // Found at least one match
      matchCount++;
      const clinicId = exactMatch[0].id;
      
      const { error: updateError } = await supabase
        .from('clinics')
        .update({ is_rfem_member: true })
        .eq('id', clinicId);
        
      if (updateError) {
        console.error(`Error updating clinic ${clinicId}:`, updateError);
      } else {
        console.log(`Matched: ${rfemClinic.name} (${rfemClinic.city}) -> DB: ${exactMatch[0].name} (${exactMatch[0].city})`);
      }
    } else {
      unmatched.push(rfemClinic);
    }
  }

  console.log(`\nResults:`);
  console.log(`Total RFEM clinics: ${rfemClinics.length}`);
  console.log(`Matched and updated: ${matchCount}`);
  console.log(`Unmatched: ${unmatched.length}`);

  if (unmatched.length > 0) {
    const csvHeader = "name,city\n";
    const csvContent = unmatched.map(c => `"${c.name}","${c.city}"`).join('\n');
    fs.writeFileSync('rfem_unmatched.csv', csvHeader + csvContent);
    console.log(`Unmatched clinics saved to rfem_unmatched.csv`);
  }
}

main().catch(console.error);
