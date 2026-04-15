import { createClient } from '@supabase/supabase-js';

const newSupa = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);
const oldSupa = createClient('https://uxuhmizabvduptruonnr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4dWhtaXphYnZkdXB0cnVvbm5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3ODAyMTcsImV4cCI6MjA4MzM1NjIxN30.qOOXc0T9VmAAkMt8t9VadFQ3cEDlqhG4KjJG4bWjlzg');

async function check() {
    const { data: oldCS } = await oldSupa.from('company_services').select('*').limit(1);
    const cs = oldCS?.[0];
    console.log("Trying to insert:", cs);

    const { error } = await newSupa.from('clinic_treatments').insert({
        clinic_id: cs.company_id,
        treatment_id: cs.service_id
    });
    console.log("Insert constraint Error:", error);
}
check();
