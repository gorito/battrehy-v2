const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    let allClinics = [];
    let from = 0;
    while (true) {
        const { data, error } = await supabase.from('clinics').select('id, name, email').range(from, from + 999);
        if (error) throw error;
        allClinics = allClinics.concat(data);
        if (data.length < 1000) break;
        from += 1000;
    }

    const missingEmail = allClinics.filter(c => !c.email || c.email.trim() === '');
    
    console.log(`Total clinics: ${allClinics.length}`);
    console.log(`Clinics with email: ${allClinics.length - missingEmail.length}`);
    console.log(`Clinics missing email: ${missingEmail.length}`);
}

run();
