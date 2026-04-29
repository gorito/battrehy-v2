import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getClinicBySlug, getTreatments, getClinics, getCities, getUniqueCities } from '@/lib/supabase/actions/queries';
import { MapPin, Globe, Phone, Calendar, Image as ImageIcon } from 'lucide-react';
import { slugifyCity } from '@/lib/utils';
import CityTreatmentView from '@/components/seo/CityTreatmentView';

export const dynamic = 'force-dynamic';

type Props = {
    params: Promise<{ city: string, slugOrTreatment: string }> | { city: string, slugOrTreatment: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const { city: citySlug, slugOrTreatment } = resolvedParams;

    // 1. Check if it's a specific clinic (Clinic Detail Page) - Check this FIRST to avoid hijacking
    const clinic = await getClinicBySlug(slugOrTreatment);
    if (clinic) {
        const clinicCitySlug = slugifyCity(clinic.city);
        if (clinicCitySlug === citySlug) {
            return {
                title: `${clinic.name} i ${clinic.city} – Boka behandling`,
                description: `Läs mer om ${clinic.name} i ${clinic.city} och boka din behandling enkelt via battrehy.se.`,
                alternates: {
                    canonical: `/kliniker/${clinicCitySlug}/${clinic.slug}`,
                },
                openGraph: {
                    title: `${clinic.name} - Estetiska behandlingar i ${clinic.city}`,
                    images: [{ url: clinic.primary_image_url || 'https://battrehy.se/og-image.jpg' }]
                }
            };
        }
    }

    // 2. Check if it's a treatment (Combination Page)
    const [treatments, cities, uniqueCityNames] = await Promise.all([getTreatments(), getCities(), getUniqueCities()]);
    let treatment = treatments.find(t => t.slug === slugOrTreatment);
    
    // Fail-safe for treatment lookup
    if (!treatment && (slugOrTreatment.includes('klinik') || slugOrTreatment.includes('behandling'))) {
        treatment = { name: slugOrTreatment.replace(/-/g, ' '), slug: slugOrTreatment } as any;
    }

    if (treatment) {
        let city = cities.find(c => slugifyCity(c.name) === citySlug || c.slug === citySlug);
        
        // Fail-safe for city lookup
        if (!city && (citySlug.toLowerCase() === 'stockholm' || citySlug.toLowerCase() === 'goteborg' || citySlug.toLowerCase() === 'malmo')) {
            city = { name: citySlug.charAt(0).toUpperCase() + citySlug.slice(1), slug: citySlug.toLowerCase() } as any;
        }

        if (!city) {
            const cityName = uniqueCityNames.find(name => slugifyCity(name) === citySlug);
            if (cityName) city = { name: cityName, slug: slugifyCity(cityName) } as any;
        }

        if (city) {
            return {
                title: `${treatment.name} i ${city.name} – Hitta Bästa Kliniken`,
                description: `Hitta och jämför de bästa klinikerna för ${treatment.name.toLowerCase()} i ${city.name}. Certifierade kliniker, priser och bokningsinformation via battrehy.se.`,
                alternates: {
                    canonical: `/kliniker/${citySlug}/${slugOrTreatment}`,
                }
            };
        }
    }

    return { title: 'Sidan hittades inte' };
}

export default async function SlugOrTreatmentPage({ params }: Props) {
    const resolvedParams = await params;
    const { city: citySlug, slugOrTreatment } = resolvedParams;

    // 1. Fetch ALL data first to avoid multiple round-trips
    const [treatments, cities, uniqueCityNames, clinicsResponse] = await Promise.all([
        getTreatments(),
        getCities(),
        getUniqueCities(),
        getClinics({ limit: 1000 })
    ]);

    console.log(`[ROUTER] Path: /kliniker/${citySlug}/${slugOrTreatment}`);
    console.log(`[ROUTER] Treatments loaded: ${treatments.length}`);
    console.log(`[ROUTER] Cities in DB: ${cities.length}`);
    console.log(`[ROUTER] Unique Cities in Clinics: ${uniqueCityNames.length}`);

    // 2. Linear Resolution Logic
    // Step A: Is it a specific clinic? (PRIORITY)
    console.log(`[ROUTER] Checking for clinic: ${slugOrTreatment}`);
    const clinic = await getClinicBySlug(slugOrTreatment);
    
    if (clinic) {
        const clinicCitySlug = slugifyCity(clinic.city);
        
        // Ensure city in URL matches clinic city (case-insensitive)
        if (clinicCitySlug.toLowerCase() !== citySlug.toLowerCase()) {
            console.log(`[ROUTER] City mismatch! URL: ${citySlug}, Clinic: ${clinicCitySlug}`);
            notFound();
        }

        console.log(`[ROUTER] Clinic found: ${clinic.name}`);
        const primaryImage = clinic.primary_image_url;

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
                    name: clinic.city,
                    item: `https://battrehy.se/kliniker/${citySlug}`
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: clinic.name,
                    item: `https://battrehy.se/kliniker/${citySlug}/${clinic.slug}`
                }
            ]
        };

        const clinicLd = {
            '@context': 'https://schema.org',
            '@type': 'BeautySalon',
            name: clinic.name,
            description: clinic.description || undefined,
            address: clinic.address ? {
                '@type': 'PostalAddress',
                streetAddress: clinic.address,
                addressLocality: clinic.city,
                addressCountry: 'SE'
            } : undefined,
            telephone: clinic.phone || undefined,
            url: clinic.website || undefined,
            areaServed: {
                '@type': 'City',
                name: clinic.city
            },
            image: clinic.primary_image_url || undefined
        };

        return (
            <main className="min-h-screen bg-gray-50 p-4 sm:p-8 pb-24">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicLd) }}
                />
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumbs */}
                    <nav className="text-sm text-gray-500 mb-6 flex flex-wrap gap-2 items-center">
                        <Link href="/" className="hover:text-primary transition-colors">Hem</Link>
                        <span>&gt;</span>
                        <Link href={`/kliniker/${citySlug}`} className="hover:text-primary capitalize">{clinic.city}</Link>
                        <span>&gt;</span>
                        <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">{clinic.name}</span>
                    </nav>

                    {/* Profile Header Image */}
                    <div
                        className="w-full h-48 sm:h-64 md:h-80 bg-cover bg-center rounded-t-2xl border-x border-t border-gray-100/50 bg-gray-100"
                        style={primaryImage ? { backgroundImage: `url(${primaryImage})` } : {}}
                    />

                    {/* Profile Header */}
                    <div className="bg-white rounded-b-2xl shadow-sm p-6 sm:p-8 mb-8 border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <h1 className="text-3xl font-bold text-gray-900">{clinic.name}</h1>
                                {clinic.tier === 'premium' && (
                                    <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Premium</span>
                                )}
                                {clinic.is_verified && (
                                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">✓ Verifierad</span>
                                )}
                            </div>
                            <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                                {clinic.description || `${clinic.name} är en klinik belägen i ${clinic.city}.`}
                            </p>
                        </div>

                        {clinic.booking_url ? (
                            <a href={clinic.booking_url} target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md w-full md:w-auto justify-center shrink-0">
                                <Calendar size={20} />
                                Boka tid
                            </a>
                        ) : (
                            <div className="bg-gray-100 text-gray-400 px-8 py-4 rounded-xl font-bold flex items-center gap-2 w-full md:w-auto justify-center shrink-0 cursor-not-allowed">
                                Ingen bokningslänk
                            </div>
                        )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">
                            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Behandlingar</h2>
                                <div className="flex flex-wrap gap-3">
                                    {clinic.treatments && clinic.treatments.length > 0 ? (
                                        clinic.treatments.map((t: any) => (
                                            <Link key={t.id} href={`/behandlingar/${t.slug}`} className="bg-rose-50 hover:bg-rose-100 text-rose-700 px-4 py-2 rounded-full font-medium transition-colors">
                                                {t.name}
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 italic">Denna klinik har inte angett sina behandlingar ännu.</p>
                                    )}
                                </div>
                            </section>

                            {/* Extracted Services */}
                            {clinic.extracted_services && clinic.extracted_services.length > 0 && (
                                <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 mt-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <div className="w-1.5 h-6 bg-rose-500 rounded-full"></div>
                                        Tjänster & Utbud
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {clinic.extracted_services.slice(0, 12).map((service: string, idx: number) => (
                                            <div key={idx} className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 font-medium flex items-center gap-2 hover:border-rose-200 transition-colors group">
                                                <div className="w-1.5 h-1.5 rounded-full bg-rose-300 group-hover:bg-rose-500 transition-colors"></div>
                                                <span className="truncate">{service}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        <div className="space-y-8">
                            <div className="bg-white rounded-2xl p-6 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-4 pb-4 border-b border-gray-50">Kontakt</h3>
                                <ul className="space-y-4 text-gray-600">
                                    <li className="flex items-start gap-3">
                                        <MapPin className="text-gray-400 shrink-0 mt-0.5" size={20} />
                                        <span>{clinic.address ? `${clinic.address}, ` : ''}{clinic.city}</span>
                                    </li>
                                    {clinic.phone && (
                                        <li className="flex items-center gap-3">
                                            <Phone className="text-gray-400 shrink-0" size={20} />
                                            <a href={`tel:${clinic.phone}`} className="hover:text-primary transition-colors">{clinic.phone}</a>
                                        </li>
                                    )}
                                    {clinic.website && (
                                        <li className="flex items-center gap-3">
                                            <Globe className="text-gray-400 shrink-0" size={20} />
                                            <a href={clinic.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">Besök hemsida</a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // Step B: Is it a treatment combination? (FALLBACK)
    let treatment = treatments.find(t => t.slug === slugOrTreatment);
    
    if (!treatment) {
        treatment = treatments.find(t => t.name.toLowerCase() === slugOrTreatment.replace(/-/g, ' '));
    }
    
    if (!treatment && (slugOrTreatment.includes('klinik') || slugOrTreatment.includes('behandling'))) {
        treatment = { 
            name: slugOrTreatment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            slug: slugOrTreatment,
            id: 'fallback-id'
        } as any;
    }
    
    if (treatment) {
        let city = cities.find(c => slugifyCity(c.name) === citySlug || c.slug === citySlug);
        if (!city && (citySlug.toLowerCase() === 'stockholm' || citySlug.toLowerCase() === 'goteborg' || citySlug.toLowerCase() === 'malmo')) {
            city = { name: citySlug.charAt(0).toUpperCase() + citySlug.slice(1), slug: citySlug.toLowerCase() } as any;
        }

        if (city) {
            const filteredClinics = clinicsResponse.data.filter(c => {
                const cityMatch = slugifyCity(c.city).toLowerCase() === citySlug.toLowerCase();
                const treatmentsArray = (c as any).treatments || (c as any).clinic_treatments?.map((ct: any) => ct.treatments) || [];
                const treatmentMatch = treatmentsArray.some((t: any) => 
                    t.id === treatment!.id || t.slug === treatment!.slug || (t.treatments && t.treatments.slug === treatment!.slug)
                );
                const serviceMatch = c.extracted_services?.some((s: string) => 
                    s.toLowerCase().includes(treatment!.name.toLowerCase())
                );
                return cityMatch && (treatmentMatch || serviceMatch);
            });

            return <CityTreatmentView city={city as any} treatment={treatment} clinics={filteredClinics as any} />;
        }
    }
    notFound();
}
