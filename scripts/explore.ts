import { createClient } from '@supabase/supabase-js';

const oldSupa = createClient(
    'https://uxuhmizabvduptruonnr.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4dWhtaXphYnZkdXB0cnVvbm5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3ODAyMTcsImV4cCI6MjA4MzM1NjIxN30.qOOXc0T9VmAAkMt8t9VadFQ3cEDlqhG4KjJG4bWjlzg'
);

async function explore() {
    const { data, error } = await oldSupa.from('companies').select('*').limit(1);
    console.log("Companies:", data?.[0], error);

    const { data: srv, error: srvErr } = await oldSupa.from('services').select('*').limit(1);
    console.log("Services:", srv?.[0], srvErr);

    const { data: cs, error: csErr } = await oldSupa.from('company_services').select('*').limit(1);
    console.log("Company Services:", cs?.[0], csErr);
}

explore();
