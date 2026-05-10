import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import * as fs from 'fs';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

async function main() {
    const { data: clinics, error } = await supabase
        .from('clinics')
        .select(`
            id,
            name,
            primary_image_url,
            address,
            city,
            phone,
            description,
            extracted_services,
            clinic_treatments ( treatment_id )
        `);

    if (error) {
        console.error('Error fetching clinics:', error);
        return;
    }

    const incompleteClinics = clinics.map(c => {
        const missing = [];
        if (!c.primary_image_url) missing.push('Image');
        if (!c.address || !c.city) missing.push('Address/City');
        if (!c.phone) missing.push('Phone');
        if (!c.description || c.description.length < 50) missing.push('Description');
        
        // Treatments could be in extracted_services OR clinic_treatments
        const hasExtracted = Array.isArray(c.extracted_services) && c.extracted_services.length > 0;
        const hasMapped = Array.isArray(c.clinic_treatments) && c.clinic_treatments.length > 0;
        if (!hasExtracted && !hasMapped) missing.push('Treatments');

        return {
            name: c.name,
            missing: missing,
            id: c.id
        };
    }).filter(c => c.missing.length > 0);

    console.log(`Found ${incompleteClinics.length} clinics missing data.`);
    
    // Sort by number of missing fields (descending)
    incompleteClinics.sort((a, b) => b.missing.length - a.missing.length);

    // Save as CSV in scratch
    let csv = 'Name,Missing Fields\n';
    incompleteClinics.forEach(c => {
        // Escape quotes
        const name = `"${c.name.replace(/"/g, '""')}"`;
        const missing = `"${c.missing.join(', ')}"`;
        csv += `${name},${missing}\n`;
    });

    fs.writeFileSync(resolve(process.cwd(), 'scratch', 'incomplete_clinics.csv'), csv);
    
    // Generate a markdown summary
    let md = '# Incomplete Clinics Report\n\n';
    md += `Found ${incompleteClinics.length} clinics missing at least one piece of profile information.\n\n`;
    
    // Group by missing count
    const stats = {
        image: 0,
        address: 0,
        phone: 0,
        description: 0,
        treatments: 0
    };
    
    incompleteClinics.forEach(c => {
        if (c.missing.includes('Image')) stats.image++;
        if (c.missing.includes('Address/City')) stats.address++;
        if (c.missing.includes('Phone')) stats.phone++;
        if (c.missing.includes('Description')) stats.description++;
        if (c.missing.includes('Treatments')) stats.treatments++;
    });

    md += '## Missing Breakdown\n';
    md += `- **Image:** ${stats.image} clinics\n`;
    md += `- **Address:** ${stats.address} clinics\n`;
    md += `- **Phone:** ${stats.phone} clinics\n`;
    md += `- **Description:** ${stats.description} clinics\n`;
    md += `- **Treatments:** ${stats.treatments} clinics\n\n`;
    
    md += '## Full List\n\n';
    md += '| Clinic Name | Missing Data |\n|---|---|\n';
    
    // Only show top 50 in MD to avoid giant files, but all in CSV
    incompleteClinics.slice(0, 100).forEach(c => {
        md += `| ${c.name} | ${c.missing.join(', ')} |\n`;
    });

    if (incompleteClinics.length > 100) {
        md += `| ... and ${incompleteClinics.length - 100} more | ... |\n`;
    }

    fs.writeFileSync(resolve(process.cwd(), 'scratch', 'incomplete_clinics.md'), md);
    console.log('Saved report to scratch/incomplete_clinics.md and scratch/incomplete_clinics.csv');
}

main();
