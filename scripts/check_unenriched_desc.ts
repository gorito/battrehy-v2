import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

async function main() {
    const { data: clinics, error } = await supabase
        .from('clinics')
        .select('id, name, description');

    if (error) {
        console.error('Error fetching clinics:', error);
        return;
    }

    let badDesc = clinics.filter(c => 
        !c.description || 
        c.description.length < 50 || 
        c.description.includes('is a professional beauty and aesthetic clinic located in') ||
        c.description.includes('Discover and connect with verified local businesses worldwide')
    );

    console.log(`There are ${badDesc.length} clinics with bad/missing descriptions.`);
}
main();
