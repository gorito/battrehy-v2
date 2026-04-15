import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const sNew = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const OLD_URL = 'https://uxuhmizabvduptruonnr.supabase.co';
const OLD_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4dWhtaXphYnZkdXB0cnVvbm5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3ODAyMTcsImV4cCI6MjA4MzM1NjIxN30.qOOXc0T9VmAAkMt8t9VadFQ3cEDlqhG4KjJG4bWjlzg';
const sOld = createClient(OLD_URL, OLD_KEY);

async function run() {
    console.log("Fetching old services...");
    const {data: oldSrv} = await sOld.from('services').select('id, name_sv, slug');
    const {data: newTrt} = await sNew.from('treatments').select('id, name, slug');

    // Create a map from old_service_id to new_treatment_id based on NAME
    const oldIdToNewId = new Map();
    oldSrv?.forEach(os => {
        let searchName = os.name_sv?.toLowerCase().trim();
        const nt = newTrt?.find(t => t.name.toLowerCase().trim() === searchName);
        if (nt) {
            oldIdToNewId.set(os.id, nt.id);
        }
    });

    console.log(`Mapped ${oldIdToNewId.size} treatments by name.`);

    let allCS: any[] = [];
    let offset = 0;
    const limit = 1000;
    let hasMore = true;

    while (hasMore) {
        const { data: batch, error: csErr } = await sOld
            .from('company_services')
            .select('*')
            .range(offset, offset + limit - 1);

        if (csErr) throw csErr;
        if (batch && batch.length > 0) {
            allCS.push(...batch);
            offset += limit;
        } else {
            hasMore = false;
        }
    }

    console.log(`Found ${allCS.length} old mappings. Re-inserting with correct ids...`);

    let inserted = 0;
    for (const cs of allCS) {
        const newTreatmentId = oldIdToNewId.get(cs.service_id);
        if (!newTreatmentId) continue; 

        // clinic_id needs to be matched too. Did the clinic ID change? No, migration script used upsert on ID!
        const { error } = await sNew.from('clinic_treatments').upsert({
            clinic_id: cs.company_id,
            treatment_id: newTreatmentId
        }, { onConflict: 'clinic_id,treatment_id' });

        if (!error) inserted++;
    }

    console.log(`Successfully migrated ${inserted} clinic-treatment relations!`);
}
run();
