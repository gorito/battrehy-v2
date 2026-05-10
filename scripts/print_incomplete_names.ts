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
        .select(`
            name,
            primary_image_url,
            address,
            city,
            phone,
            description,
            extracted_services,
            clinic_treatments ( treatment_id )
        `);

    if (error) {
        console.error('Error fetching clinics:', error);
        return;
    }

    const incompleteClinics = clinics.filter(c => {
        if (!c.primary_image_url) return true;
        if (!c.address || !c.city) return true;
        if (!c.phone) return true;
        if (!c.description || c.description.length < 50) return true;
        
        const hasExtracted = Array.isArray(c.extracted_services) && c.extracted_services.length > 0;
        const hasMapped = Array.isArray(c.clinic_treatments) && c.clinic_treatments.length > 0;
        if (!hasExtracted && !hasMapped) return true;

        return false;
    }).map(c => c.name).sort();

    console.log(incompleteClinics.join('\n'));
}
main();
