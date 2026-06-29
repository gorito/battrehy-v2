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
        return '""';
    }
    let str = String(val);
    // Double quotes must be escaped by prepending another double quote
    str = str.replace(/"/g, '""');
    return `"${str}"`;
}

async function main() {
    console.log("Fetching clinics with treatments from Supabase...");
    
    let allClinics: any[] = [];
    let page = 0;
    const pageSize = 1000;
    let hasMore = true;

    while (hasMore) {
        const { data, error } = await supabase
            .from('clinics')
            .select('id, name, slug, city, address, description, extracted_services, is_shr_member, is_rfem_member, website, clinic_treatments(treatments(name))')
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

    // Create CSV header
    const headers = [
        "id",
        "name",
        "slug",
        "city",
        "address",
        "description",
        "treatments",
        "services",
        "certifications/memberships",
        "website"
    ];

    // Build CSV content
    // Use comma (,) as standard separator
    let csvRows = [headers.join(",")];

    for (const clinic of allClinics) {
        // Extract treatments
        const treatmentsList: string[] = [];
        if (clinic.clinic_treatments && Array.isArray(clinic.clinic_treatments)) {
            clinic.clinic_treatments.forEach((ct: any) => {
                if (ct.treatments && ct.treatments.name) {
                    treatmentsList.push(ct.treatments.name);
                }
            });
        }
        const treatmentsStr = treatmentsList.join(", ");

        // Extract services
        let servicesStr = "";
        if (clinic.extracted_services && Array.isArray(clinic.extracted_services)) {
            servicesStr = clinic.extracted_services.join(", ");
        }

        // Extract certifications/memberships
        const memberships: string[] = [];
        if (clinic.is_shr_member) {
            memberships.push("SHR");
        }
        if (clinic.is_rfem_member) {
            memberships.push("RFEM");
        }
        const membershipsStr = memberships.join(", ");

        const row = [
            escapeCsvValue(clinic.id),
            escapeCsvValue(clinic.name),
            escapeCsvValue(clinic.slug),
            escapeCsvValue(clinic.city),
            escapeCsvValue(clinic.address),
            escapeCsvValue(clinic.description),
            escapeCsvValue(treatmentsStr),
            escapeCsvValue(servicesStr),
            escapeCsvValue(membershipsStr),
            escapeCsvValue(clinic.website)
        ];
        csvRows.push(row.join(","));
    }

    // Add UTF-8 BOM so Excel/Google Sheets open it correctly with special characters
    const csvContent = "\uFEFF" + csvRows.join("\n");

    // Save in workspace root
    const workspaceRootPath = resolve(process.cwd(), '../clinics_export.csv');
    // Also save in project directory for convenience
    const projectPath = resolve(process.cwd(), 'clinics_export.csv');

    fs.writeFileSync(workspaceRootPath, csvContent, 'utf8');
    fs.writeFileSync(projectPath, csvContent, 'utf8');

    console.log(`\n✨ Successfully exported all clinics to CSV!`);
    console.log(`📂 Saved to:`);
    console.log(`   - ${workspaceRootPath}`);
    console.log(`   - ${projectPath}`);
}

main().catch(err => {
    console.error("Unhandled error:", err);
});
