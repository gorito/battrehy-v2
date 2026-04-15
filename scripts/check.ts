import { createClient } from '@supabase/supabase-js';

const newSupa = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);
const oldSupa = createClient('https://uxuhmizabvduptruonnr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4dWhtaXphYnZkdXB0cnVvbm5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3ODAyMTcsImV4cCI6MjA4MzM1NjIxN30.qOOXc0T9VmAAkMt8t9VadFQ3cEDlqhG4KjJG4bWjlzg');

async function check() {
    const { data: oldCS, error: err1 } = await oldSupa.from('company_services').select('*');
    console.log("old CS length:", oldCS?.length, err1);

    const { data: newCS, error: err2 } = await newSupa.from('clinic_treatments').select('*');
    console.log("new CS length:", newCS?.length, err2);
}
check();
