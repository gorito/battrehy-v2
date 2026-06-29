const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

function parseCSV(content) {
    const lines = content.split(/\r?\n/).filter(line => line.trim());
    if (lines.length === 0) return [];
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const row = {};
        let currentCell = '';
        let inQuotes = false;
        let colIdx = 0;
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"' && line[j+1] === '"') {
                currentCell += '"';
                j++;
            } else if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                if (colIdx < headers.length) row[headers[colIdx]] = currentCell.trim();
                currentCell = '';
                colIdx++;
            } else {
                currentCell += char;
            }
        }
        if (colIdx < headers.length) row[headers[colIdx]] = currentCell.trim();
        data.push(row);
    }
    return data;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    const csvContent = fs.readFileSync('../52708b85-7a34-44bc-823b-eac14d1897a5.csv', 'utf8');
    const csvData = parseCSV(csvContent);
    const csvNames = new Set(csvData.map(r => r['Clinic Name'].trim().toLowerCase()));

    let allClinics = [];
    let from = 0;
    while (true) {
        const { data, error } = await supabase.from('clinics').select('*').range(from, from + 999);
        if (error) throw error;
        allClinics = allClinics.concat(data);
        if (data.length < 1000) break;
        from += 1000;
    }

    const missingInCsv = allClinics.filter(c => !csvNames.has(c.name.trim().toLowerCase()));
    
    console.log(`DB Count: ${allClinics.length}`);
    console.log(`CSV Count: ${csvData.length}`);
    console.log(`In DB but NOT in CSV: ${missingInCsv.length}`);
    
    // Group missing by some properties to find a pattern
    const withEmail = missingInCsv.filter(c => c.email && c.email.trim() !== '');
    const withoutEmail = missingInCsv.filter(c => !c.email || c.email.trim() === '');
    
    console.log(`Missing in CSV that already have email: ${withEmail.length}`);
    console.log(`Missing in CSV that don't have email: ${withoutEmail.length}`);
    
    // Let's check created_at range for missing
    if (missingInCsv.length > 0 && missingInCsv[0].created_at) {
        const dates = missingInCsv.map(c => new Date(c.created_at).getTime()).sort();
        console.log(`Missing created between ${new Date(dates[0]).toISOString()} and ${new Date(dates[dates.length-1]).toISOString()}`);
    }

    // Print first 5
    console.log("\nExamples of missing:");
    for (let i = 0; i < Math.min(5, missingInCsv.length); i++) {
        const c = missingInCsv[i];
        console.log(`- ${c.name} (Email: ${c.email}, Created: ${c.created_at})`);
    }
}

run();
