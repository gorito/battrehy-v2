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
        .select('id, name, city, description')
        .ilike('description', '%Discover and connect with verified local businesses worldwide%');

    if (error) {
        console.error(error);
        return;
    }

    console.log(`Found ${clinics.length} clinics with "Discover and connect..."`);
}
main();
