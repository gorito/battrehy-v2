import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCities, getClinics, getUniqueCities } from '@/lib/supabase/actions/queries';
import { slugifyCity } from '@/lib/utils';
import { City } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

type Props = {
    params: Promise<{ city: string }> | { city: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const [cities, uniqueCityNames] = await Promise.all([getCities(), getUniqueCities()]);
    
    // Try to find the city in our cities table first
    let city: Partial<City> | undefined = cities.find(c => slugifyCity(c.name) === resolvedParams.city);
    
    // If not found in cities table, check if it exists in clinics by name
    if (!city) {
        const cityName = uniqueCityNames.find(name => slugifyCity(name) === resolvedParams.city);
        if (cityName) {
            city = {
                name: cityName,
                slug: slugifyCity(cityName),
            };
        }
    }

    if (!city) return { title: 'Stad hittades inte' };

    const displaySlug = slugifyCity(city.name!);

    return {
        title: `Skönhetskliniker i ${city.name} | Hitta & Jämför`,
        description: city.description || `Jämför de bästa skönhetsklinikerna i ${city.name}. Se omdömen, priser och boka tid direkt på Bättrehy.se.`,
        alternates: {
            canonical: `/stad/${displaySlug}`,
        },
        openGraph: {
            title: `Bästa skönhetsklinikerna i ${city.name}`,
            description: `Hitta certifierade kliniker i ${city.name}.`,
            url: `https://battrehy.se/stad/${displaySlug}`,
        }
    };
}

export default async function CityPage({ params }: Props) {
    const resolvedParams = await params;

    // Use a high limit for public rendering
    const [cities, clinicsResponse, uniqueCityNames] = await Promise.all([
        getCities(), 
        getClinics({ limit: 1000 }),
        getUniqueCities()
    ]);
    const clinics = clinicsResponse.data;

    // Try to find the city in our cities table first
    let city: Partial<City> | undefined = cities.find(c => slugifyCity(c.name) === resolvedParams.city);
    
    // If not found in cities table, check if it exists in clinics by name
    if (!city) {
        const cityName = uniqueCityNames.find(name => slugifyCity(name) === resolvedParams.city);
        if (cityName) {
            city = {
                name: cityName,
                slug: slugifyCity(cityName),
            };
        }
    }

    if (!city) {
        notFound();
    }

    const cityClinics = clinics.filter(
        c => c.city.toLowerCase() === city!.name!.toLowerCase()
    );

    const displaySlug = slugifyCity(city.name!);

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Hem',
                item: 'https://battrehy.se'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: city.name,
                item: `https://battrehy.se/stad/${displaySlug}`
            }
        ]
    };

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
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
                                            <Link href={`/kliniker/${displaySlug}/${clinic.slug}`} className="hover:text-primary">
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
