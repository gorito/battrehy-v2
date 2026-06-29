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
    try {
        console.log("--- 1. Deleting Pro laserklinik / Studio Cat Eye ---");
        const { data: toDelete, error: fetchErr } = await supabase
            .from('clinics')
            .select('id, name')
            .or('name.ilike.%Pro laserklinik%,name.ilike.%Studio Cat Eye%');
            
        if (fetchErr) throw fetchErr;
        
        if (toDelete && toDelete.length > 0) {
            console.log(`Found ${toDelete.length} clinics to delete:`, toDelete.map(d => d.name));
            for (const d of toDelete) {
                const { error: delErr } = await supabase.from('clinics').delete().eq('id', d.id);
                if (delErr) {
                    console.error("Error deleting", d.name, delErr);
                } else {
                    console.log("Successfully deleted", d.name);
                }
            }
        } else {
            console.log("No clinics found matching 'Pro laserklinik' or 'Studio Cat Eye'.");
        }

        console.log("\n--- 2. Updating emails from Hyperagent CSV ---");
        const csvContent = fs.readFileSync('4ea692a4-7438-4549-b36f-792f1632bad3 (1).csv', 'utf8');
        const csvData = parseCSV(csvContent);
        console.log(`Parsed ${csvData.length} rows from CSV.`);

        let allClinics = [];
        let from = 0;
        while (true) {
            const { data, error } = await supabase.from('clinics').select('id, name, email').range(from, from + 999);
            if (error) throw error;
            allClinics = allClinics.concat(data);
            if (data.length < 1000) break;
            from += 1000;
        }

        const clinicMap = new Map();
        for (const c of allClinics) {
            if (c.name) {
                clinicMap.set(c.name.trim().toLowerCase(), c);
            }
        }

        let updatedCount = 0;
        let skippedHasEmailCount = 0;
        let notFoundCount = 0;
        let noEmailInCsvCount = 0;

        for (const row of csvData) {
            const csvName = row['Clinic Name'];
            const csvEmail = row['Email_Found'] || row['Email']; // support both

            if (!csvName || !csvEmail) {
                noEmailInCsvCount++;
                continue;
            }

            const dbClinic = clinicMap.get(csvName.trim().toLowerCase());
            if (!dbClinic) {
                notFoundCount++;
                continue;
            }

            if (dbClinic.email && dbClinic.email.trim() !== '') {
                skippedHasEmailCount++;
                continue;
            }

            const { error: updateError } = await supabase
                .from('clinics')
                .update({ email: csvEmail })
                .eq('id', dbClinic.id);

            if (updateError) {
                console.error(`Error updating clinic ${dbClinic.id}:`, updateError);
            } else {
                updatedCount++;
                dbClinic.email = csvEmail; 
                console.log(`Updated: ${csvName} -> ${csvEmail}`);
            }
        }

        console.log("\n--- Summary ---");
        console.log(`Successfully updated: ${updatedCount}`);
        console.log(`Skipped (already had email): ${skippedHasEmailCount}`);
        console.log(`Not found in DB: ${notFoundCount}`);
        console.log(`Skipped (no email found by Hyperagent): ${noEmailInCsvCount}`);

    } catch (e) {
        console.error("An error occurred:", e);
    }
}

run();
