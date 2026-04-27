/**
 * Bulk enrichment script using BrowserAct to scrape Bokadirekt clinic pages.
 * Fetches image, description, and phone for clinics that are missing data.
 * Images are automatically downloaded and hosted on Supabase Storage.
 * 
 * Usage: npx tsx scripts/enrich_via_browseract_bulk.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { randomUUID } from 'crypto';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const API_KEY = process.env.BROWSERACT_API_KEY!;
const WORKFLOW_ID = process.env.BROWSERACT_WORKFLOW_ID!;

if (!supabaseUrl || !supabaseKey || !API_KEY || !WORKFLOW_ID) {
    console.error('Missing required environment variables. Check .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

// --- BrowserAct helpers ---

async function startTask(bookingUrl: string): Promise<string> {
    const res = await fetch('https://api.browseract.com/v2/workflow/run-task', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            workflow_id: WORKFLOW_ID,
            input_parameters: [
                { name: 'booking_url', value: bookingUrl }
            ]
        })
    });

    if (!res.ok) {
        throw new Error(`BrowserAct start error: ${res.status} ${await res.text()}`);
    }

    const data = await res.json() as { id: string };
    if (!data.id) throw new Error('No task ID returned from BrowserAct');
    return data.id;
}

async function waitForTask(taskId: string, maxWaitMs = 120000): Promise<any> {
    const pollInterval = 6000;
    const maxPolls = Math.ceil(maxWaitMs / pollInterval);

    for (let i = 0; i < maxPolls; i++) {
        await delay(pollInterval);

        const res = await fetch(
            `https://api.browseract.com/v2/workflow/get-task?task_id=${taskId}`,
            { headers: { 'Authorization': `Bearer ${API_KEY}` } }
        );

        const data = await res.json() as { status: string; output?: { string?: string } };

        if (data.status === 'finished') {
            // Parse the nested JSON string in output.string
            if (data.output?.string) {
                try {
                    const parsed = JSON.parse(data.output.string);
                    return Array.isArray(parsed) ? parsed[0] : parsed;
                } catch {
                    return null;
                }
            }
            return null;
        }

        if (['failed', 'canceled', 'error'].includes(data.status)) {
            throw new Error(`Task ${taskId} ${data.status}`);
        }
    }

    throw new Error(`Task ${taskId} timed out`);
}

// --- Supabase image import ---

async function importExternalImage(url: string): Promise<string> {
    if (!url || url.includes('supabase.co')) return url;

    try {
        const res = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
            signal: AbortSignal.timeout(15000)
        });
        if (!res.ok) return url;

        const buffer = await res.arrayBuffer();
        const contentType = res.headers.get('content-type') || 'image/jpeg';
        let ext = 'jpg';
        if (contentType.includes('png')) ext = 'png';
        else if (contentType.includes('webp')) ext = 'webp';

        const filePath = `clinics/${randomUUID()}.${ext}`;
        const { error } = await supabase.storage
            .from('company-images')
            .upload(filePath, buffer, { contentType, upsert: true });

        if (error) return url;

        const { data: { publicUrl } } = supabase.storage
            .from('company-images')
            .getPublicUrl(filePath);

        return publicUrl;
    } catch {
        return url;
    }
}

// --- Main ---

// Detects generic auto-generated template descriptions
function isGenericDescription(desc: string | null): boolean {
    if (!desc) return true;
    const genericMarkers = [
        'is a professional beauty and aesthetic clinic',
        'välkommen till',
        'skönhetsklinik',
        'professional beauty',
        'hitta och jämför',
        'denna webbplats använder cookies',
        'cookie settings',
        'gdpr cookie',
        'sekretessöversikt',
        'denna webbplats använder cookies',
        'strängt nödvändiga cookies'
    ];
    
    // Check if description is too short or contains generic markers
    if (desc.length < 50) return true;
    
    const lowerDesc = desc.toLowerCase();
    return genericMarkers.some(marker => lowerDesc.includes(marker.toLowerCase()));
}

async function main() {
    console.log('Fetching clinics with Bokadirekt URLs...');

    // Fetch ALL clinics with Bokadirekt /places/ URLs
    const { data: clinics, error } = await supabase
        .from('clinics')
        .select('id, name, city, booking_url, primary_image_url, description, phone, extracted_services')
        .ilike('booking_url', '%bokadirekt.se/places/%');

    if (error || !clinics) {
        console.error('Error fetching clinics:', error);
        return;
    }

    // Target clinics that are missing data OR have generic descriptions
    const targets = clinics.filter(c =>
        !c.booking_url?.includes('/profile-places/') && // Skip unverified profiles
        (
            !c.primary_image_url ||
            !c.phone ||
            !c.extracted_services ||
            c.extracted_services.length === 0 ||
            isGenericDescription(c.description) ||
            (c.primary_image_url && !c.primary_image_url.includes('supabase.co'))
        )
    );

    console.log(`Found ${targets.length} clinics to enrich.`);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < targets.length; i++) {
        const clinic = targets[i];
        console.log(`\n[${i + 1}/${targets.length}] ${clinic.name} (${clinic.city})`);
        console.log(`  URL: ${clinic.booking_url}`);

        try {
            // Start the BrowserAct task
            const taskId = await startTask(clinic.booking_url!);
            console.log(`  Task: ${taskId}`);

            // Wait for result
            const result = await waitForTask(taskId);

            if (!result) {
                console.log('  ⚠️  No data extracted');
                failCount++;
                continue;
            }

            console.log(`  Extracted: image=${!!result.image_url}, phone=${!!result.phone}, desc=${!!result.description}, treatments=${result.treatments?.length || 0}`);

            const updates: any = {};
            const updated: string[] = [];

            // Image — import to Supabase if external or missing
            if (result.image_url && (!clinic.primary_image_url || !clinic.primary_image_url.includes('supabase.co'))) {
                console.log(`  Importing image...`);
                updates.primary_image_url = await importExternalImage(result.image_url);
                updated.push('image');
            }

            // Phone — only fill if missing
            if (result.phone && !clinic.phone) {
                updates.phone = result.phone.substring(0, 20);
                updated.push('phone');
            }

            // Description — fill if missing OR if current is a generic template
            if (result.description && (!clinic.description || clinic.description.length < 50 || isGenericDescription(clinic.description))) {
                updates.description = result.description.substring(0, 3000);
                updated.push('description');
            }

            // Treatments — fill if missing
            if (result.treatments && (!clinic.extracted_services || clinic.extracted_services.length === 0)) {
                let serviceList: string[] = [];
                
                if (Array.isArray(result.treatments)) {
                    serviceList = result.treatments.map((t: any) => 
                        typeof t === 'string' ? t : (t.name || t.title)
                    );
                } else if (typeof result.treatments === 'string') {
                    // Split by common separators if it came back as a long string
                    serviceList = result.treatments.split(/[,;\n\-\•]/).map(s => s.trim());
                }

                // Clean up: unique names, filter empty, and limit length
                const cleanedList = [...new Set(serviceList)]
                    .filter(s => s && s.length > 2 && s.length < 100)
                    .map(s => String(s).substring(0, 100));
                
                if (cleanedList.length > 0) {
                    updates.extracted_services = cleanedList;
                    updated.push('treatments');
                }
            }

            if (Object.keys(updates).length > 0) {
                const { error: updateErr } = await supabase
                    .from('clinics')
                    .update(updates)
                    .eq('id', clinic.id);

                if (updateErr) {
                    console.error(`  ❌ DB error: ${updateErr.message}`);
                    failCount++;
                } else {
                    console.log(`  ✅ Updated: ${updated.join(', ')}`);
                    successCount++;
                }
            } else {
                console.log('  ℹ️  Nothing new to update');
            }

        } catch (err: any) {
            console.error(`  ❌ Error: ${err.message}`);
            failCount++;
        }

        // Rate limit: 3 second pause between clinics to avoid hammering BrowserAct
        if (i < targets.length - 1) {
            await delay(3000);
        }
    }

    console.log(`\n=== Done ===`);
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log(`Total processed: ${targets.length}`);
}

main().catch(console.error);
