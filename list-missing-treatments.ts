import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    
    // Get all clinic treatments with pagination
    let clinicTreatments: any[] = [];
    let page = 0;
    const pageSize = 1000;
    while (true) {
        const { data, error } = await supabase
            .from('clinic_treatments')
            .select('clinic_id')
            .range(page * pageSize, (page + 1) * pageSize - 1);
        if (error) {
            console.error('Error fetching clinic treatments:', error);
            break;
        }
        if (!data || data.length === 0) {
            break;
        }
        clinicTreatments = clinicTreatments.concat(data);
        if (data.length < pageSize) {
            break;
        }
        page++;
    }

    const clinicsWithTreatments = new Set();
    if (clinicTreatments) {
        clinicTreatments.forEach(ct => clinicsWithTreatments.add(ct.clinic_id));
    }
    
    // Get all clinics with pagination
    let clinics: any[] = [];
    let clinicPage = 0;
    while (true) {
        const { data, error } = await supabase
            .from('clinics')
            .select('id, name, slug, city, booking_url')
            .order('name')
            .range(clinicPage * pageSize, (clinicPage + 1) * pageSize - 1);
        if (error) {
            console.error('Error fetching clinics:', error);
            break;
        }
        if (!data || data.length === 0) {
            break;
        }
        clinics = clinics.concat(data);
        if (data.length < pageSize) {
            break;
        }
        clinicPage++;
    }
    
    const missing = clinics?.filter(c => !clinicsWithTreatments.has(c.id)) || [];
    
    console.log(JSON.stringify(missing));
}
run();
