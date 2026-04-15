import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const browseractKey = process.env.BROWSERACT_API_KEY;
const browseractWorkflowId = process.env.BROWSERACT_WORKFLOW_ID;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function runBrowserActWorkflow(clinicName: string, clinicCity: string) {
    if (!browseractKey || !browseractWorkflowId) {
        throw new Error("Missing BROWSERACT_API_KEY or BROWSERACT_WORKFLOW_ID");
    }

    // 1. Trigger the workflow
    console.log(`[API] Starting BrowserAct workflow for: ${clinicName}`);
    const triggerRes = await fetch('https://api.browseract.com/v2/workflow/run', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${browseractKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            workflow_id: browseractWorkflowId,
            input: {
                clinic_name: clinicName,
                clinic_city: clinicCity
            }
        })
    });

    if (!triggerRes.ok) {
        throw new Error(`BrowserAct API Error: ${triggerRes.statusText} - ${await triggerRes.text()}`);
    }

    const data = await triggerRes.json();
    
    // Depending on BrowserAct's API, it might return the data immediately or give us a task ID.
    // For our very first test run, let's just log what we got so we can inspect the structure perfectly.
    console.log(`[API] Raw response:`, data);
    
    // Check if data is returned immediately synchronous (easiest case)
    if (data.data || data.output) {
        return data.data || data.output;
    }
    
    return data;
}

async function main() {
    console.log('Fetching missing clinics from Supabase...');

    // Fetch clinics that don't have a primary image
    const { data: clinics, error } = await supabase
        .from('clinics')
        .select('id, name, city')
        .is('primary_image_url', null)
        .limit(1); // LIMIT 1 FOR OUR FIRST TEST RUN

    if (error) {
        console.error('Error fetching clinics:', error);
        return;
    }

    if (!clinics || clinics.length === 0) {
        console.log('No clinics missing images!');
        return;
    }

    console.log(`Found ${clinics.length} clinics. Testing the first one...`);

    const clinic = clinics[0];

    try {
        const result = await runBrowserActWorkflow(clinic.name, clinic.city);
        
        console.log(`\nSuccess! BrowserAct finished.`);
        console.log(`Data we can extract:`, result);
        
        /* 
        // THIS CODE WILL BE UNCOMMENTED ONCE WE VERIFY THE API RESPONSE
        const updates = {
            primary_image_url: result.image_url,
            description: result.description,
            phone: result.phone,
            website: result.website
        };

        const { error: updateError } = await supabase
            .from('clinics')
            .update(updates)
            .eq('id', clinic.id);
            
        console.log('Database updated successfully!');
        */

    } catch (err: any) {
        console.error(`Error:`, err.message);
    }
}

main().catch(console.error);
