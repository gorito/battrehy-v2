import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { getCities, getClinics, getUniqueCities, getTreatments } from '@/lib/supabase/actions/queries';
import { slugifyCity } from '@/lib/utils';
import { City } from '@/lib/supabase/types';
import { Image as ImageIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

type Props = {
    params: Promise<{ city: string }> | { city: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const cityParam = decodeURIComponent(resolvedParams.city);
    const [cities, uniqueCityNames] = await Promise.all([getCities(), getUniqueCities()]);
    
    // Try to find the city in our cities table first
    let city: Partial<City> | undefined = cities.find(c => slugifyCity(c.name) === cityParam);
    
    // If not found in cities table, check if it exists in clinics by name
    if (!city) {
        const cityName = uniqueCityNames.find(name => slugifyCity(name) === cityParam);
        if (cityName) {
            city = {
                name: cityName,
                slug: slugifyCity(cityName),
            };
        }
    }

    if (!city) return { title: 'Skönhetskliniker' };

    const cityName = city.name!;
    const supabase = await createClient();
    const { count } = await supabase.from('clinics').select('id', { count: 'exact', head: true }).ilike('city', cityName);
    const clinicCount = count || 0;

    return {
        title: `${clinicCount || ''} Skönhetskliniker i ${cityName}`,
        description: city.description || `Hitta och jämför ${clinicCount ? `de ${clinicCount} ` : ''}bästa skönhetsklinikerna i ${cityName}. Certifierade kliniker med omdömen och bokningsinformation på battrehy.se.`,
        alternates: {
            canonical: `/kliniker/${cityParam}`,
        },
        robots: {
            index: clinicCount > 1,
            follow: true
        },
        openGraph: {
            title: `Skönhetskliniker i ${cityName}`,
            description: `Hitta certifierade kliniker i ${cityName}.`,
            url: `https://battrehy.se/kliniker/${cityParam}`,
        }
    };
}

export default async function CityPage({ params }: Props) {
    const resolvedParams = await params;
    const citySlug = decodeURIComponent(resolvedParams.city);
    const asciiCitySlug = slugifyCity(citySlug);

    if (citySlug !== asciiCitySlug) {
        permanentRedirect(`/kliniker/${asciiCitySlug}`);
    }

    // Fetch data for the page
    const [cities, clinicsResponse, uniqueCityNames, treatments] = await Promise.all([
        getCities(), 
        getClinics({ limit: 1000 }),
        getUniqueCities(),
        getTreatments()
    ]);
    const clinics = clinicsResponse.data;

    // Try to find the city
    let city: Partial<City> | undefined = cities.find(c => slugifyCity(c.name) === citySlug);
    
    if (!city) {
        const cityName = uniqueCityNames.find(name => slugifyCity(name) === citySlug);
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

    const cityName = city.name!;
    const cityClinics = clinics.filter(
        c => c.city.toLowerCase() === cityName.toLowerCase()
    );

    // Get treatments available in this city for cross-linking
    const cityTreatments = Array.from(new Set(
        cityClinics.flatMap(c => c.treatments?.map(t => ({ id: t.id, name: t.name, slug: t.slug })) || [])
    )).filter((v, i, a) => v && a.findIndex(t => t.id === v.id) === i);

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
                name: `Kliniker i ${cityName}`,
                item: `https://battrehy.se/kliniker/${citySlug}`
            }
        ]
    };

    return (
        <main className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <div className="max-w-4xl mx-auto">
                {/* Breadcrumbs */}
                <nav className="text-sm text-gray-500 mb-6">
                    <Link href="/" className="hover:text-primary transition-colors">Hem</Link>
                    <span className="mx-2">&gt;</span>
                    <span className="text-gray-900 font-medium">{cityName}</span>
                </nav>

                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Skönhetskliniker i {cityName}
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                        {city.description || `Hitta och jämför Sveriges bästa skönhetskliniker i ${cityName}. Här listar vi certifierade kliniker som erbjuder professionella estetiska behandlingar med fokus på kvalitet och säkerhet.`}
                    </p>
                </div>

                {/* City Treatments Filter/Cross-links */}
                {cityClinics.length >= 3 && cityTreatments.length > 0 && (
                    <div className="mb-10">
                        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Populära behandlingar i {cityName}</h2>
                        <div className="flex flex-wrap gap-2">
                            {cityTreatments.slice(0, 10).map(t => (
                                <Link 
                                    key={t.id} 
                                    href={`/kliniker/${resolvedParams.city}/${t.slug}`}
                                    className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-700 hover:border-primary hover:text-primary transition-all shadow-sm"
                                >
                                    {t.name} i {cityName}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-y-6">
                    {cityClinics.length > 0 ? (
                        cityClinics.map(clinic => (
                            <div key={clinic.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start gap-6 hover:shadow-md transition-shadow">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-xl font-bold text-gray-900">
                                            <Link href={`/kliniker/${resolvedParams.city}/${clinic.slug}`} className="hover:text-primary transition-colors">
                                                {clinic.name}
                                            </Link>
                                        </h2>
                                        {clinic.tier === 'premium' && (
                                            <span className="bg-rose-100 text-rose-700 text-[10px] uppercase px-2 py-1 rounded-full font-bold">Premium</span>
                                        )}
                                        {clinic.is_verified && (
                                            <span className="bg-blue-100 text-blue-700 text-[10px] uppercase px-2 py-1 rounded-full font-bold">Verifierad</span>
                                        )}
                                        {clinic.is_shr_member && (
                                            <span className="bg-emerald-100 text-emerald-800 text-[10px] uppercase px-2 py-1 rounded-full font-bold">SHR-medlem</span>
                                        )}
                                        {clinic.is_rfem_member && (
                                            <span className="bg-amber-100 text-amber-800 text-[10px] uppercase px-2 py-1 rounded-full font-bold">RFEM-medlem</span>
                                        )}
                                    </div>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                                        {clinic.description || `Välkommen till ${clinic.name} i ${clinic.city}. Vi erbjuder ett brett utbud av skönhetsbehandlingar.`}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {clinic.treatments?.slice(0, 5).map(t => (
                                            <span key={t.id} className="text-[11px] bg-gray-50 px-2.5 py-1 text-gray-500 rounded-md border border-gray-100">
                                                {t.name}
                                            </span>
                                        ))}
                                        {(clinic.treatments?.length || 0) > 5 && (
                                            <span className="text-[11px] text-gray-400 py-1">+{clinic.treatments!.length - 5} till</span>
                                        )}
                                    </div>
                                </div>

                                <Link 
                                    href={`/kliniker/${resolvedParams.city}/${clinic.slug}`}
                                    className="w-full md:w-48 h-32 shrink-0 rounded-xl bg-cover bg-center bg-gray-100 border border-gray-100 flex items-center justify-center overflow-hidden relative group"
                                >
                                    {clinic.primary_image_url ? (
                                        <>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img 
                                                src={clinic.primary_image_url} 
                                                alt={clinic.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                                        </>
                                    ) : (
                                        <ImageIcon className="text-gray-300" size={32} strokeWidth={1.5} />
                                    )}
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-200 text-center">
                            <p className="text-gray-500">Vi har tyvärr inga kliniker listade i {cityName} ännu.</p>
                            <Link href="/" className="text-primary hover:underline mt-4 inline-block font-medium">Tillbaka till start</Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
