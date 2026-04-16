import { enrichClinicTreatmentsAction } from './src/lib/supabase/actions/enrichment';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env.local' });

async function test() {
    const url = "https://www.bokadirekt.se/places/facewellness-sweden-29770";
    const clinicId = "98765432-1234-5678-9012-345678901234"; // Dummy ID
    console.log("Testing enrichment for:", url);
    try {
        // We override supabase globally or just mock it? 
        // Actually, let's just copy the logic to a standalone script to see what it finds.
    } catch (e) {
        console.error(e);
    }
}
