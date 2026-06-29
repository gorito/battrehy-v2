const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    const { data, error } = await supabase.from('clinics').select('id, name, email');
    const matches = data.filter(c => 
        c.name.toLowerCase().includes('pro') && c.name.toLowerCase().includes('laser') ||
        c.name.toLowerCase().includes('cat eye') ||
        (c.email && c.email.includes('studiocateye.se'))
    );
    console.log(matches);
}

run();
