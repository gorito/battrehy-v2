import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import * as fs from 'fs';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function exportTable(tableName: string) {
    console.log(` - Fetching ${tableName}...`);
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) {
        console.error(`   Error fetching ${tableName}:`, error.message);
        return null;
    }
    return data;
}

async function main() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `backups/snapshot_${timestamp}.json`;

    console.log(`🚀 Starting Data Backup snapshot...`);
    
    // Ensure backups directory exists
    if (!fs.existsSync('backups')) {
        fs.mkdirSync('backups');
    }

    const backupData: any = {
        timestamp: new Date().toISOString(),
        tables: {}
    };

    const tablesToExport = [
        'clinics',
        'cities',
        'treatments',
        'clinic_treatments',
        'clinic_images'
    ];

    for (const table of tablesToExport) {
        const data = await exportTable(table);
        if (data) {
            backupData.tables[table] = data;
            console.log(`   ✅ Exported ${data.length} rows from ${table}`);
        }
    }

    try {
        fs.writeFileSync(filename, JSON.stringify(backupData, null, 2));
        console.log(`\n✨ Backup successful!`);
        console.log(`📂 File saved: ${filename}`);
        console.log(`\nThis file contains all your manual profile text, city SEO, and clinic relationships.`);
    } catch (err: any) {
        console.error(`❌ Failed to write backup file:`, err.message);
    }
}

main();
