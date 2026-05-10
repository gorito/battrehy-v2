import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

async function main() {
    console.log('Clearing template descriptions...');
    const { data: clinics, error } = await supabase
        .from('clinics')
        .select('id, name')
        .or('description.ilike.%is a professional beauty and aesthetic clinic located in%,description.ilike.%Discover and connect with verified local businesses worldwide%');

    if (error) {
        console.error(error);
        return;
    }

    console.log(`Found ${clinics.length} clinics to clear.`);
    
    for (const clinic of clinics) {
        const { error: updateErr } = await supabase
            .from('clinics')
            .update({ description: null })
            .eq('id', clinic.id);
            
        if (updateErr) {
            console.error(`Failed to clear ${clinic.id}:`, updateErr);
        }
    }
    console.log('Cleared successfully.');
}
main();
