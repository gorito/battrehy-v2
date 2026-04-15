import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function fetchBokadirektServices(url: string) {
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            }
        });
        if (!res.ok) return [];

        const html = await res.text();
        const $ = cheerio.load(html);
        let services: string[] = [];

        $('script').each((_, el) => {
            const text = $(el).html();
            if (text && text.includes('window.__PRELOADED_STATE__ = {')) {
                try {
                    const jsonStart = text.indexOf('{');
                    const jsonEnd = text.lastIndexOf('}') + 1;
                    const jsonStr = text.substring(jsonStart, jsonEnd);
                    const data = JSON.parse(jsonStr);
                    const place = data?.place;
                    if (place && place.services) {
                        place.services.forEach((category: any) => {
                            if (category.services) {
                                category.services.forEach((service: any) => {
                                    if (service.name) services.push(service.name as string);
                                });
                            }
                        });
                    }
                } catch (e) {}
            }
        });
        return [...new Set(services)];
    } catch (e) {
        console.error(`Failed to scrape ${url}:`, e);
        return [];
    }
}

async function main() {
    console.log('--- BACKFILL SERVICES SCRIPT ---');
    
    const { data: clinics, error } = await supabase
        .from('clinics')
        .select('id, name, booking_url')
        .not('booking_url', 'is', null);

    if (error) {
        console.error('Error fetching clinics:', error);
        return;
    }

    const targetClinics = (clinics || []).filter(c => c.booking_url?.includes('bokadirekt.se'));
    console.log(`Found ${targetClinics.length} Bokadirekt clinics to process.`);

    let count = 0;
    for (let i = 0; i < targetClinics.length; i++) {
        const clinic = targetClinics[i];
        process.stdout.write(`[\${i + 1}/\${targetClinics.length}] \${clinic.name}... `);

        const services = await fetchBokadirektServices(clinic.booking_url!);
        
        if (services.length > 0) {
            const { error: updateError } = await supabase
                .from('clinics')
                .update({ extracted_services: services })
                .eq('id', clinic.id);

            if (updateError) {
                console.log('Error update: ' + updateError.message);
            } else {
                console.log(`Saved \${services.length} services.`);
                count++;
            }
        } else {
            console.log('No services found.');
        }

        await delay(500); // Small delay to be nice
    }

    console.log(`\nDone! Successfully updated \${count} clinics.`);
    process.exit(0);
}

main().catch(console.error);
