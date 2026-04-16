import { getClinicBySlug } from '@/lib/supabase/actions/queries';
import { MOCK_CITIES } from '@/lib/mock-data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import EditClinicForm from '@/components/admin/EditClinicForm';

export const dynamic = 'force-dynamic';

export default async function EditClinicPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
    const resolvedParams = await params;
    const clinic = await getClinicBySlug(resolvedParams.slug);

    if (!clinic) {
        notFound();
    }

    // Combine mock cities with the clinic's city in case the clinic's city is not in the mock list
    // This allows them to keep the custom dynamically ported cities
    const uniqueCities = Array.from(new Set([...MOCK_CITIES.map(c => c.name), clinic.city])).sort();

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
                <Link href="/admin/kliniker" className="text-gray-500 hover:text-primary">&larr; Tillbaka</Link>
                <h1 className="text-3xl font-bold text-gray-900">Redigera {clinic.name}</h1>
            </div>

            <EditClinicForm clinic={clinic} uniqueCities={uniqueCities} />
        </div>
    );
}
