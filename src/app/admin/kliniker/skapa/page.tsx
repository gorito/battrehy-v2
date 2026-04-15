import Link from 'next/link';
import { getUniqueCities } from '@/lib/supabase/actions/queries';
import CreateClinicForm from '@/components/admin/CreateClinicForm';

export default async function CreateClinicPage() {
    const cities = await getUniqueCities();

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
                <Link href="/admin/kliniker" className="text-gray-500 hover:text-primary">&larr; Tillbaka</Link>
                <h1 className="text-3xl font-bold text-gray-900">Lägg till ny klinik</h1>
            </div>

            <CreateClinicForm cities={cities} />
        </div>
    );
}
