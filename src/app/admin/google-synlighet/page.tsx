import { getClinics } from '@/lib/supabase/actions/queries';
import GoogleSynlighetDashboard from '@/components/admin/GoogleSynlighetDashboard';

export const dynamic = 'force-dynamic';

export default async function GoogleSynlighetPage() {
    const { data: clinics } = await getClinics({ limit: 1000 });
    
    // Sort clinics by name for easier lookup
    const sortedClinics = (clinics || []).sort((a, b) => a.name.localeCompare(b.name));

    return <GoogleSynlighetDashboard clinics={sortedClinics} />;
}
