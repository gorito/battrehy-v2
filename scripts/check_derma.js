import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase
    .from('clinics')
    .select('id, name, city, is_rfem_member')
    .ilike('name', '%Derma Beauty%');

  if (error) {
    console.error('Error fetching clinic:', error);
    return;
  }

  console.log('Query results for Derma Beauty:');
  console.log(JSON.stringify(data, null, 2));
}

main().catch(console.error);
