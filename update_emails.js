const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// CSV Parser helper (to handle quotes and commas properly)
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
                j++; // skip escaped quote
            } else if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                if (colIdx < headers.length) {
                    row[headers[colIdx]] = currentCell.trim();
                }
                currentCell = '';
                colIdx++;
            } else {
                currentCell += char;
            }
        }
        // Add the last cell
        if (colIdx < headers.length) {
            row[headers[colIdx]] = currentCell.trim();
        }
        data.push(row);
    }
    return data;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    try {
        console.log("Reading CSV...");
        const csvContent = fs.readFileSync('../52708b85-7a34-44bc-823b-eac14d1897a5.csv', 'utf8');
        const csvData = parseCSV(csvContent);
        console.log(`Parsed ${csvData.length} rows from CSV.`);

        console.log("Fetching all clinics from Supabase...");
        let allClinics = [];
        let from = 0;
        const limit = 1000;
        while (true) {
            const { data, error } = await supabase.from('clinics').select('id, name, email').range(from, from + limit - 1);
            if (error) throw error;
            allClinics = allClinics.concat(data);
            if (data.length < limit) break;
            from += limit;
        }
        console.log(`Fetched ${allClinics.length} clinics from Supabase.`);

        // Map for quick lookup
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
            let csvEmail = row['Email'];
            
            // if Email is empty but Email_Found has something, use that? User just said 'Email' field.
            // Let's use Email field.
            if (!csvEmail && row['Email_Found']) {
               // wait, looking at line 8: Adel Estetik,... goteborg@adelestetik.se in Email_Found
               csvEmail = row['Email_Found']; 
            }

            if (!csvName || !csvEmail) {
                noEmailInCsvCount++;
                continue;
            }

            const dbClinic = clinicMap.get(csvName.trim().toLowerCase());
            
            if (!dbClinic) {
                notFoundCount++;
                continue;
            }

            // Check if DB already has an email
            if (dbClinic.email && dbClinic.email.trim() !== '') {
                skippedHasEmailCount++;
                continue;
            }

            // Update needed
            const { error: updateError } = await supabase
                .from('clinics')
                .update({ email: csvEmail })
                .eq('id', dbClinic.id);

            if (updateError) {
                console.error(`Error updating clinic ${dbClinic.id}:`, updateError);
            } else {
                updatedCount++;
                dbClinic.email = csvEmail; // update local map just in case
            }
        }

        console.log("\n--- Summary ---");
        console.log(`Total CSV Rows: ${csvData.length}`);
        console.log(`Successfully updated: ${updatedCount}`);
        console.log(`Skipped (already had email): ${skippedHasEmailCount}`);
        console.log(`Not found in DB: ${notFoundCount}`);
        console.log(`Skipped (no email in CSV): ${noEmailInCsvCount}`);

    } catch (e) {
        console.error("An error occurred:", e);
    }
}

run();
