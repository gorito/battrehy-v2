import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCities, getClinics } from '@/lib/supabase/actions/queries';

export const dynamic = 'force-dynamic';

export default async function CityPage({ params }: { params: Promise<{ city: string }> | { city: string } }) {
    const resolvedParams = await params;

    // We fetch everything in parallel for speed. Limit set to 1000 since it is a public page rendering all.
    const [cities, clinicsResponse] = await Promise.all([getCities(), getClinics({ limit: 1000 })]);
    const clinics = clinicsResponse.data;

    // Try to find the city in our real data
    const city = cities.find(c => c.slug === resolvedParams.city);

    if (!city) {
        notFound();
    }

    // Filter clinics by this city
    const cityClinics = clinics.filter(
        c => c.city.toLowerCase() === city.name.toLowerCase()
    );

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Breadcrumbs */}
                <nav className="text-sm text-gray-500 mb-6">
                    <Link href="/" className="hover:text-primary">Hem</Link>
                    <span className="mx-2">&gt;</span>
                    <span className="text-gray-900">{city.name}</span>
                </nav>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Skönhetskliniker i {city.name}
                </h1>
                <p className="text-lg text-gray-700 mb-12">
                    {city.description || `Hitta och jämför de bästa klinikerna i ${city.name}.`}
                </p>

                <div className="grid gap-6">
                    {cityClinics.length > 0 ? (
                        cityClinics.map(clinic => (
                            <div key={clinic.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-xl font-bold text-gray-900">
                                            <Link href={`/kliniker/${city.slug}/${clinic.slug}`} className="hover:text-primary">
                                                {clinic.name}
                                            </Link>
                                        </h2>
                                        {clinic.tier === 'premium' && <span className="bg-rose-100 text-rose-700 text-xs px-2 py-1 rounded-full font-bold">Premium</span>}
                                        {clinic.tier === 'verified' && <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-bold">Verifierad</span>}
                                    </div>
                                    <p className="text-gray-600 mb-4">{clinic.description}</p>

                                    <div className="flex gap-2">
                                        {clinic.treatments?.map(t => (
                                            <Link key={t.id} href={`/behandlingar/${t.slug}`} className="text-xs bg-gray-100 px-3 py-1 text-gray-600 rounded-full hover:bg-gray-200">
                                                {t.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Vi hittade tyvärr inga kliniker i den här staden ännu.</p>
                    )}
                </div>
            </div>
        </main>
    );
}
