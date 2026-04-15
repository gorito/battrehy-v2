import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

async function run() {
    const { data: clinics } = await s
        .from('clinics')
        .select('id, name, city, website')
        .is('primary_image_url', null);

    let csv = "id,name,city,website\n";
    clinics?.forEach(c => {
        csv += `"${c.id}","${c.name.replace(/"/g, '""')}","${c.city.replace(/"/g, '""')}","${c.website || ''}"\n`;
    });

    fs.writeFileSync('missing_clinics_for_browseract.csv', csv);
    console.log(`Exported ${clinics?.length} clinics to missing_clinics_for_browseract.csv`);
}
run();
