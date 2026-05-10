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
        .select('name, description, website, booking_url')
        .in('name', ['Lifetime Clinic', 'LaserCenter', 'Uppsala Hud & Kroppsvård', 'Renew Skin Clinic']);

    if (error) {
        console.error(error);
        return;
    }

    clinics.forEach(c => {
        console.log(`\nName: ${c.name}`);
        console.log(`Desc: ${c.description?.substring(0, 200)}...`);
    });
}
main();
