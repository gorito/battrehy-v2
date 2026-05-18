import { getClinics } from '@/lib/supabase/actions/queries';
import SalesDashboard from './SalesDashboard';

export const dynamic = 'force-dynamic';

export default async function ForsaljningPage() {
    // Fetch all clinics (increase limit to ensure we get all of them for the CRM)
    const { data: clinics } = await getClinics({ limit: 1000 });
    
    return (
        <div className="flex flex-col h-full">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Försäljning (CRM)</h1>
                <p className="text-gray-600">
                    Här kan du hantera kontakt med kliniker, uppdatera kontaktuppgifter och skriva interna anteckningar.
                </p>
            </div>
            
            <SalesDashboard initialClinics={clinics || []} />
        </div>
    );
}
