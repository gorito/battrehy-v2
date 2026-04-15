import { createClient } from '@supabase/supabase-js';

const oldSupa = createClient(
    'https://uxuhmizabvduptruonnr.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4dWhtaXphYnZkdXB0cnVvbm5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3ODAyMTcsImV4cCI6MjA4MzM1NjIxN30.qOOXc0T9VmAAkMt8t9VadFQ3cEDlqhG4KjJG4bWjlzg'
);

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
    process.exit(1);
}

const newSupa = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function migrate() {
    console.log("Starting Data Migration...");

    // 1. Fetch old cities
    console.log("Fetching Old Cities...");
    const { data: oldCities, error: oldCitiesErr } = await oldSupa.from('cities').select('*');
    if (oldCitiesErr) throw oldCitiesErr;

    const cityMap = new Map(); // old_city_id -> city_name
    for (const c of oldCities) {
        cityMap.set(c.id, c.name_sv || c.name);
        // Insert into NEW DB
        await newSupa.from('cities').upsert({
            id: c.id,
            name: c.name_sv || c.name,
            slug: c.slug,
            description: c.description_sv || null
        }, { onConflict: 'id' });
    }
    console.log(`Migrated ${oldCities.length} cities.`);

    // 2. Fetch old services (Treatments) -> Build Slug Map
    console.log("Fetching Old Services (Treatments)...");
    const { data: oldServices, error: oldServicesErr } = await oldSupa.from('services').select('*');
    if (oldServicesErr) throw oldServicesErr;

    const oldServiceMap = new Map(); // old_service_id -> slug
    for (const s of oldServices) {
        oldServiceMap.set(s.id, s.slug || s.name_sv?.toLowerCase().replace(/\s+/g, '-'));
    }

    // Get NEW treatments to map slugs to new UUIDs
    const { data: newTreatments, error: ntErr } = await newSupa.from('treatments').select('id, slug');
    if (ntErr) throw ntErr;

    const _newTreatmentMap = new Map(); // slug -> new_treatment_id
    for (const nt of newTreatments) {
        _newTreatmentMap.set(nt.slug, nt.id);
    }

    // 3. Fetch old companies (Clinics)
    console.log("Fetching Old Companies (Clinics)...");
    // Pagination since there are ~500, select in batches or all at once if limit is 1000
    const { data: oldCompanies, error: oldCompErr } = await oldSupa.from('companies').select('*').limit(1000);
    if (oldCompErr) throw oldCompErr;

    let clinicsInserted = 0;
    for (const comp of oldCompanies) {

        // Map tier
        let tier = 'free';
        if (comp.subscription_tier === 'premium') tier = 'premium';
        if (comp.subscription_tier === 'pro') tier = 'verified';

        // Map city name from old city relation
        const cityName = cityMap.get(comp.city_id) || comp.city_id || 'Okänd';

        const { error: insertErr } = await newSupa.from('clinics').upsert({
            id: comp.id,
            name: comp.name,
            slug: comp.slug,
            city: cityName,
            address: comp.address,
            phone: comp.phone,
            website: comp.website,
            booking_url: comp.bokadirekt_url,
            description: comp.description_sv,
            tier: tier,
            primary_image_url: comp.cover_image_url,
            is_verified: comp.is_verified || false
        }, { onConflict: 'slug' }); // Handle by slug to avoid id collisions if they exist

        if (insertErr) {
            console.error("Error inserting clinic", comp.name, insertErr.message);
        } else {
            clinicsInserted++;
        }
    }
    console.log(`Migrated ${clinicsInserted} clinics.`);

    // 4. Fetch old company_services mappings
    console.log("Fetching Old Company-Services mappings...");

    // Need to paginate since there might be thousands
    let allCS: any[] = [];
    let offset = 0;
    const limit = 1000;
    let hasMore = true;

    while (hasMore) {
        const { data: batch, error: csErr } = await oldSupa
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

    console.log(`Found ${allCS.length} old mappings. Filtering out orphaned services...`);

    let csInserted = 0;
    for (const cs of allCS) {
        const slug = oldServiceMap.get(cs.service_id);
        if (!slug) continue; // Unknown old service

        const newTreatmentId = _newTreatmentMap.get(slug);
        if (!newTreatmentId) continue; // No matching treatment in NEW db

        const { error: csInsertErr } = await newSupa.from('clinic_treatments').upsert({
            clinic_id: cs.company_id,
            treatment_id: newTreatmentId
        }, { onConflict: 'clinic_id,treatment_id' });

        if (!csInsertErr) {
            csInserted++;
        }
    }

    console.log(`Migrated ${csInserted} clinic-treatment relations.`);
    console.log("Migration Complete! 🎉");
}

migrate().catch(console.error);
