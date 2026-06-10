import { fetchClinicMetadataAction } from './src/lib/supabase/actions/enrichment';
async function run() {
    const res = await fetchClinicMetadataAction('https://denicare.se/');
    console.log(JSON.stringify(res, null, 2));
}
run();
