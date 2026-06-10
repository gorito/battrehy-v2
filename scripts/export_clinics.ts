import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import * as fs from 'fs';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function escapeCsvValue(val: any): string {
    if (val === null || val === undefined) {
        return '';
    }
    let str = String(val);
    // Replace newlines with spaces or keep them in quotes
    str = str.replace(/\r?\n|\r/g, " ");
    // Escape quotes
    if (str.includes('"') || str.includes(',') || str.includes(';') || str.includes('\t')) {
        str = `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}

async function main() {
    console.log("Fetching clinics from Supabase...");
    
    // Fetch all clinics (using pagination/loop just in case there are more than 1000, though currently c:a 475)
    let allClinics: any[] = [];
    let page = 0;
    const pageSize = 1000;
    let hasMore = true;

    while (hasMore) {
        const { data, error } = await supabase
            .from('clinics')
            .select('*')
            .range(page * pageSize, (page + 1) * pageSize - 1)
            .order('name', { ascending: true });

        if (error) {
            console.error("Error fetching clinics:", error.message);
            process.exit(1);
        }

        if (data && data.length > 0) {
            allClinics = allClinics.concat(data);
            console.log(`Fetched ${data.length} clinics...`);
            if (data.length < pageSize) {
                hasMore = false;
            } else {
                page++;
            }
        } else {
            hasMore = false;
        }
    }

    console.log(`Total clinics fetched: ${allClinics.length}`);

    // Create CSV header (Swedish titles)
    const headers = [
        "Namn",
        "Ort",
        "Adress",
        "Telefon",
        "E-post",
        "E-poststatus",
        "Hemsida",
        "Bokningslänk",
        "SHR-medlem",
        "Verifierad",
        "Tier",
        "Beskrivning",
        "Skapad",
        "Uppdaterad"
    ];

    // Build CSV content
    // Use semicolon (;) as separator, which is standard for Swedish Excel localizations
    let csvRows = [headers.join(";")];

    for (const clinic of allClinics) {
        const row = [
            escapeCsvValue(clinic.name),
            escapeCsvValue(clinic.city),
            escapeCsvValue(clinic.address),
            escapeCsvValue(clinic.phone),
            escapeCsvValue(clinic.email),
            escapeCsvValue(clinic.email_status),
            escapeCsvValue(clinic.website),
            escapeCsvValue(clinic.booking_url),
            clinic.is_shr_member ? "Ja" : "Nej",
            clinic.is_verified ? "Ja" : "Nej",
            escapeCsvValue(clinic.tier),
            escapeCsvValue(clinic.description),
            escapeCsvValue(clinic.created_at),
            escapeCsvValue(clinic.updated_at)
        ];
        csvRows.push(row.join(";"));
    }

    // Add UTF-8 BOM so Excel opens it with Swedish characters correctly
    const csvContent = "\uFEFF" + csvRows.join("\n");

    const outputPath = resolve(process.cwd(), '../kliniker_kontaktuppgifter.csv');
    fs.writeFileSync(outputPath, csvContent, 'utf8');

    console.log(`\n✨ Successfully exported all clinics to CSV!`);
    console.log(`📂 Saved to: ${outputPath}`);
}

main().catch(err => {
    console.error("Unhandled error:", err);
});
