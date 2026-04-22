import { getCityBySlug } from '@/lib/supabase/actions/queries';
import { notFound } from 'next/navigation';
import EditCityForm from '@/components/admin/EditCityForm';

interface AdminCityEditPageProps {
    params: {
        slug: string;
    };
}

export default async function AdminCityEditPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const city = await getCityBySlug(slug);

    if (!city) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Redigera stad: {city.name}</h1>
                <p className="text-gray-500 mt-2">Här kan du anpassa stadens namn och SEO-beskrivning.</p>
            </div>

            <EditCityForm city={city} />
        </div>
    );
}
