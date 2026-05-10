import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

async function main() {
    const { data: clinics, error } = await supabase
        .from('clinics')
        .select('id, name, description, primary_image_url');

    if (error) {
        console.error('Error fetching clinics:', error);
        return;
    }

    let needsEnrichment = clinics.filter(c => 
        !c.description || 
        c.description.length < 100 || 
        c.description.length === 1000 || 
        c.description.includes('Boka tid') || 
        c.description.includes('is a professional beauty and aesthetic clinic located in') ||
        c.description.includes('Discover and connect with verified local businesses worldwide') ||
        !c.primary_image_url
    );

    console.log(`There are ${needsEnrichment.length} clinics that still need enrichment.`);
    if (needsEnrichment.length > 0) {
        console.log("Here are the first few:");
        needsEnrichment.slice(0, 5).forEach(c => {
            console.log(`- ${c.name} (Has Image: ${!!c.primary_image_url}, Desc length: ${c.description?.length || 0})`);
        });
    }
}
main();
