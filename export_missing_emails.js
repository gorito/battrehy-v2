const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    let allClinics = [];
    let from = 0;
    while (true) {
        // fetch relevant columns that hyperagent might use for finding emails
        const { data, error } = await supabase.from('clinics').select('*').range(from, from + 999);
        if (error) throw error;
        allClinics = allClinics.concat(data);
        if (data.length < 1000) break;
        from += 1000;
    }

    const missingEmail = allClinics.filter(c => !c.email || c.email.trim() === '');
    
    // Create CSV
    let csv = '\uFEFF'; // BOM for Excel
    csv += 'Clinic Name,City,Phone Number,Website,Boka Direkt URL\n';
    
    missingEmail.forEach(c => {
        const name = `"${(c.name || '').replace(/"/g, '""')}"`;
        const city = `"${(c.city || '').replace(/"/g, '""')}"`;
        const phone = `"${(c.phone || '').replace(/"/g, '""')}"`;
        const website = `"${(c.website_url || '').replace(/"/g, '""')}"`;
        const bokadirekt = `"${(c.booking_url || '').replace(/"/g, '""')}"`;
        
        csv += `${name},${city},${phone},${website},${bokadirekt}\n`;
    });
    
    fs.writeFileSync('../clinics_missing_emails.csv', csv);
    console.log(`Exported ${missingEmail.length} clinics to clinics_missing_emails.csv`);
}

run();
