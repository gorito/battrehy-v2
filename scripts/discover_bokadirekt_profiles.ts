/**
 * Bulk Discovery Script using BrowserAct to find missing Bokadirekt profiles.
 * Searches Google for each clinic by name + city to find its Bokadirekt URL.
 * 
 * Usage: npx tsx scripts/discover_bokadirekt_profiles.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const API_KEY = process.env.BROWSERACT_API_KEY!;
const FINDER_WORKFLOW_ID = '92696379561947157'; // Your Google Finder Workflow ID

if (!supabaseUrl || !supabaseKey || !API_KEY) {
    console.error('Missing required environment variables. Check .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

async function startTask(clinicName: string, clinicCity: string): Promise<string> {
    const res = await fetch('https://api.browseract.com/v2/workflow/run-task', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            workflow_id: FINDER_WORKFLOW_ID,
            input_parameters: [
                { name: 'clinic_name', value: clinicName },
                { name: 'clinic_city', value: clinicCity }
            ]
        })
    });

    if (!res.ok) {
        throw new Error(`BrowserAct start error: ${res.status} ${await res.text()}`);
    }

    const data = await res.json() as { id: string };
    return data.id;
}

async function waitForResult(taskId: string): Promise<string | null> {
    for (let i = 0; i < 30; i++) {
        await delay(5000);
        const res = await fetch(
            `https://api.browseract.com/v2/workflow/get-task?task_id=${taskId}`,
            { headers: { 'Authorization': `Bearer ${API_KEY}` } }
        );
        const data = await res.json();
        
        if (data.status === 'finished') {
            if (data.output?.string) {
                try {
                    const parsed = JSON.parse(data.output.string);
                    const item = Array.isArray(parsed) ? parsed[0] : parsed;
                    return item?.profile_url || null;
                } catch {
                    return null;
                }
            }
            return null;
        }
        if (['failed', 'canceled', 'error'].includes(data.status)) {
            return null;
        }
    }
    return null;
}

async function main() {
    console.log('Fetching clinics missing Bokadirekt URLs...');

    // Find clinics that don't have a booking_url or it doesn't contain 'bokadirekt.se/places'
    const { data: clinics, error } = await supabase
        .from('clinics')
        .select('id, name, city, booking_url')
        .or('booking_url.is.null,booking_url.not.ilike.%bokadirekt.se/places/%')
        .range(200, 350); // Process the final batch (the remaining ~100 clinics)

    if (error || !clinics) {
        console.error('Error fetching clinics:', error);
        return;
    }

    console.log(`Found ${clinics.length} potential clinics to search for.`);

    let discoveredCount = 0;

    for (let i = 0; i < clinics.length; i++) {
        const clinic = clinics[i];
        console.log(`\n[${i + 1}/${clinics.length}] Searching for: ${clinic.name} (${clinic.city})`);

        try {
            const taskId = await startTask(clinic.name, clinic.city);
            console.log(`  Task: ${taskId}`);

            const profileUrl = await waitForResult(taskId);

            if (profileUrl && profileUrl.includes('bokadirekt.se/places/')) {
                console.log(`  ✅ Found: ${profileUrl}`);
                
                // Update the database
                const { error: updateErr } = await supabase
                    .from('clinics')
                    .update({ booking_url: profileUrl })
                    .eq('id', clinic.id);

                if (updateErr) {
                    console.error(`  ❌ DB Update Error: ${updateErr.message}`);
                } else {
                    discoveredCount++;
                }
            } else {
                console.log('  ℹ️  No Bokadirekt profile found on Google.');
            }

        } catch (err: any) {
            console.error(`  ❌ Error: ${err.message}`);
        }

        // Rate limit: 2 second pause
        await delay(2000);
    }

    console.log(`\n=== Discovery Done ===`);
    console.log(`✅ Profiles discovered and saved: ${discoveredCount}`);
}

main().catch(console.error);
