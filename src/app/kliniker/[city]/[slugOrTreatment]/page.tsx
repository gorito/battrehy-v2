import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { getClinicBySlug, getTreatments, getClinics, getCities, getUniqueCities } from '@/lib/supabase/actions/queries';
import { MapPin, Globe, Phone, Calendar, Image as ImageIcon } from 'lucide-react';
import { slugifyCity } from '@/lib/utils';
import CityTreatmentView from '@/components/seo/CityTreatmentView';
import ClinicTracker from '@/components/analytics/ClinicTracker';
import TrackedLink from '@/components/analytics/TrackedLink';
import { stockholmSeoData, ALIAS_MAP } from '@/lib/seo/stockholm-seo';
import { SchemaScript } from '@/components/SchemaScript';
import { buildBeautySalonSchema, buildBreadcrumbSchema, buildOrganizationSchema } from '@/lib/schema';
export const dynamic = 'force-dynamic';

type Props = {
    params: Promise<{ city: string, slugOrTreatment: string }> | { city: string, slugOrTreatment: string }
};

function parseFaq(faqText?: string): { question: string; answer: string }[] {
    if (!faqText) return [];
    const regex = /\*\*(.*?)\*\*\s*\n?([\s\S]*?)(?=\*\*|$)/g;
    const faqs: { question: string; answer: string }[] = [];
    let match;
    while ((match = regex.exec(faqText)) !== null) {
        faqs.push({
            question: match[1].trim(),
            answer: match[2].trim()
        });
    }
    return faqs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const citySlug = decodeURIComponent(resolvedParams.city);
    const slugOrTreatment = decodeURIComponent(resolvedParams.slugOrTreatment);

    // 1. Check if it's a specific clinic (Clinic Detail Page) - Check this FIRST to avoid hijacking
    const clinic = await getClinicBySlug(slugOrTreatment);
    if (clinic) {
        const clinicCitySlug = slugifyCity(clinic.city);
        if (clinicCitySlug === citySlug) {
            // Cleanup clinic name for title
            // Remove "AB", "i [City]" (case-insensitive, handling Swedish chars)
            let displayName = clinic.name
                .replace(/\bAB\b/g, '')
                .replace(new RegExp(`\\bi\\s+${clinic.city}\\b`, 'gi'), '')
                .trim();
            
            // If the name is now empty, fallback to the original clinic name
            if (!displayName) {
                displayName = clinic.name;
            }

            // Ensure the city name is appended exactly once
            // Check if city name is already at the end of the cleaned displayName
            const endsWithCity = new RegExp(`\\s+${clinic.city}$`, 'i');
            const citySuffix = endsWithCity.test(displayName) ? '' : ` ${clinic.city}`;

            // Build treatments suffix (top 2-3)
            const clinicTreatments = clinic.treatments || [];
            let servicesSuffix = 'Skönhetsklinik';
            if (clinicTreatments.length > 0) {
                servicesSuffix = clinicTreatments
                    .slice(0, 3)
                    .map((t: any) => t.name)
                    .join(' & ');
            }

            // Formulate base title: "[Clinic display name][City] – [Treatments]"
            let baseTitle = `${displayName}${citySuffix} – ${servicesSuffix}`;

            // Keep base title under 60 characters
            const maxBaseLength = 60;
            if (baseTitle.length > maxBaseLength) {
                // If too long, try with top 2 treatments
                if (clinicTreatments.length > 2) {
                    servicesSuffix = clinicTreatments
                        .slice(0, 2)
                        .map((t: any) => t.name)
                        .join(' & ');
                    baseTitle = `${displayName}${citySuffix} – ${servicesSuffix}`;
                }
                
                // If still too long, fallback to single top treatment
                if (baseTitle.length > maxBaseLength && clinicTreatments.length > 0) {
                    servicesSuffix = clinicTreatments[0].name;
                    baseTitle = `${displayName}${citySuffix} – ${servicesSuffix}`;
                }

                // If still too long, fallback to Skönhetsklinik
                if (baseTitle.length > maxBaseLength) {
                    servicesSuffix = 'Skönhetsklinik';
                    baseTitle = `${displayName}${citySuffix} – ${servicesSuffix}`;
                }

                // Final hard truncation to 57 chars + '...' if somehow still over limit
                if (baseTitle.length > maxBaseLength) {
                    baseTitle = baseTitle.substring(0, 57).trim() + '...';
                }
            }

            return {
                title: baseTitle,
                description: clinic.ai_meta || `Läs mer om ${clinic.name} i ${clinic.city} och boka din behandling enkelt via battrehy.se.`,
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
    const resolvedSlugOrTreatment = ALIAS_MAP[slugOrTreatment] || slugOrTreatment;
    const [treatments, cities, uniqueCityNames, clinicsResponse] = await Promise.all([
        getTreatments(),
        getCities(),
        getUniqueCities(),
        getClinics({ limit: 1000 })
    ]);

    let treatment = treatments.find(t => t.slug === resolvedSlugOrTreatment);
    
    // Fail-safe for treatment lookup
    if (!treatment && (resolvedSlugOrTreatment.includes('klinik') || resolvedSlugOrTreatment.includes('behandling'))) {
        treatment = { name: resolvedSlugOrTreatment.replace(/-/g, ' '), slug: resolvedSlugOrTreatment } as any;
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
            // Count matching clinics
            const filteredClinics = clinicsResponse.data.filter(c => {
                const cityMatch = slugifyCity(c.city).toLowerCase() === citySlug.toLowerCase();
                const treatmentsArray = (c as any).treatments || (c as any).clinic_treatments?.map((ct: any) => ct.treatments) || [];
                const treatmentMatch = treatmentsArray.some((t: any) => 
                    t.id === treatment!.id || 
                    t.slug === treatment!.slug || 
                    t.slug === resolvedSlugOrTreatment ||
                    t.slug === slugOrTreatment ||
                    (t.treatments && (t.treatments.slug === treatment!.slug || t.treatments.slug === resolvedSlugOrTreatment))
                );
                const serviceMatch = c.extracted_services?.some((s: string) => 
                    s.toLowerCase().includes(treatment!.name.toLowerCase()) ||
                    s.toLowerCase().includes(resolvedSlugOrTreatment.toLowerCase())
                );
                return cityMatch && (treatmentMatch || serviceMatch);
            });

            const count = filteredClinics.length;

            const seoKey = `${citySlug.toLowerCase()}/${slugOrTreatment.toLowerCase()}`;
            const customSeo = stockholmSeoData[seoKey];

            if (customSeo) {
                return {
                    title: customSeo.title,
                    description: customSeo.description,
                    alternates: {
                        canonical: `/kliniker/${citySlug}/${slugOrTreatment}`,
                    },
                    robots: {
                        index: count > 1,
                        follow: true
                    }
                };
            }

            return {
                title: `${treatment.name} i ${city.name} – Hitta Bästa Kliniken`,
                description: `Hitta och jämför de bästa klinikerna för ${treatment.name.toLowerCase()} i ${city.name}. Certifierade kliniker, priser och bokningsinformation via battrehy.se.`,
                alternates: {
                    canonical: `/kliniker/${citySlug}/${slugOrTreatment}`,
                },
                robots: {
                    index: count > 1,
                    follow: true
                }
            };
        }
    }

    return { title: 'Sidan hittades inte' };
}

export default async function SlugOrTreatmentPage({ params }: Props) {
    const resolvedParams = await params;
    const citySlug = decodeURIComponent(resolvedParams.city);
    const slugOrTreatment = decodeURIComponent(resolvedParams.slugOrTreatment);
    const asciiCitySlug = slugifyCity(citySlug);
    const asciiSlugOrTreatment = slugifyCity(slugOrTreatment);

    if (citySlug !== asciiCitySlug || slugOrTreatment !== asciiSlugOrTreatment) {
        permanentRedirect(`/kliniker/${asciiCitySlug}/${asciiSlugOrTreatment}`);
    }

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

        const schemas = [
            buildBreadcrumbSchema([
                { name: 'Hem', url: 'https://battrehy.se' },
                { name: clinic.city, url: `https://battrehy.se/kliniker/${citySlug}` },
                { name: clinic.name, url: `https://battrehy.se/kliniker/${citySlug}/${clinic.slug}` }
            ]),
            buildBeautySalonSchema(clinic),
            buildOrganizationSchema()
        ];

        return (
            <main className="min-h-screen bg-gray-50 p-4 sm:p-8 pb-24">
                <SchemaScript schemas={schemas} />
                <ClinicTracker clinicId={clinic.id} />
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
                        className="w-full h-56 sm:h-72 md:h-[26rem] bg-cover bg-center rounded-t-2xl border-x border-t border-gray-100/50 bg-gray-100"
                        style={primaryImage ? { backgroundImage: `url(${primaryImage})` } : {}}
                    />

                    {/* Profile Header */}
                    <div className="bg-white rounded-b-2xl shadow-sm p-6 sm:p-8 mb-8 border border-gray-100 flex flex-col md:flex-row justify-between items-start gap-6">
                        <div className="flex-1 w-full">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <h1 className="text-3xl font-bold text-gray-900">{clinic.name}</h1>
                                {clinic.tier === 'premium' && (
                                    <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Premium</span>
                                )}
                                {clinic.is_verified && (
                                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">✓ Verifierad</span>
                                )}
                                {clinic.is_shr_member && (
                                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">🛡️ SHR-medlem</span>
                                )}
                                {clinic.is_rfem_member && (
                                    <span className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">🛡️ RFEM-medlem</span>
                                )}
                            </div>
                            <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap mb-6">
                                {clinic.description || `${clinic.name} är en klinik belägen i ${clinic.city}.`}
                            </p>

                            {/* AI Description Section */}
                            {clinic.ai_description && (
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <h2 className="text-xl font-bold text-gray-900 mb-3">Om kliniken</h2>
                                    <p className="text-gray-600 text-base leading-relaxed whitespace-pre-wrap">
                                        {clinic.ai_description}
                                    </p>
                                </div>
                            )}

                            {/* FAQ Section */}
                            {clinic.ai_faq && (
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Vanliga frågor</h2>
                                    <div className="space-y-5">
                                        {parseFaq(clinic.ai_faq).map((item, idx) => (
                                            <div key={idx} className="space-y-1">
                                                <h3 className="font-semibold text-gray-900 text-base">{item.question}</h3>
                                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{item.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {clinic.booking_url ? (
                            <TrackedLink 
                                clinicId={clinic.id}
                                eventType="booking_click"
                                href={clinic.booking_url} 
                                className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md w-full md:w-auto justify-center shrink-0"
                            >
                                <Calendar size={20} />
                                Boka tid
                            </TrackedLink>
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

                            {/* CTA Boka Tid Card */}
                            <section className="bg-rose-50/50 rounded-2xl p-8 border border-rose-100/50 mt-8 flex flex-col items-center text-center">
                                <Calendar className="text-rose-500 mb-4" size={40} />
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Redo att boka din behandling?</h2>
                                <p className="text-gray-600 text-sm sm:text-base mb-6">
                                    Välj tid och behandling direkt hos {clinic.name}
                                </p>
                                {clinic.booking_url ? (
                                    <TrackedLink 
                                        clinicId={clinic.id}
                                        eventType="booking_click"
                                        href={clinic.booking_url} 
                                        className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md inline-flex justify-center"
                                    >
                                        <Calendar size={18} />
                                        Boka tid
                                    </TrackedLink>
                                ) : (
                                    <div className="bg-gray-100 text-gray-400 px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 inline-flex justify-center cursor-not-allowed">
                                        Ingen bokningslänk
                                    </div>
                                )}
                            </section>
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
                                            <TrackedLink 
                                                clinicId={clinic.id}
                                                eventType="website_click"
                                                href={clinic.website} 
                                                className="text-primary hover:underline truncate"
                                            >
                                                Besök hemsida
                                            </TrackedLink>
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

    // Resolve alias if needed
    const resolvedSlugOrTreatment = ALIAS_MAP[slugOrTreatment] || slugOrTreatment;

    // Step B: Is it a treatment combination? (FALLBACK)
    let treatment = treatments.find(t => t.slug === resolvedSlugOrTreatment);
    
    if (!treatment) {
        treatment = treatments.find(t => t.name.toLowerCase() === resolvedSlugOrTreatment.replace(/-/g, ' '));
    }
    
    if (!treatment && (resolvedSlugOrTreatment.includes('klinik') || resolvedSlugOrTreatment.includes('behandling') || ALIAS_MAP[slugOrTreatment])) {
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

        if (!city) {
            const cityName = uniqueCityNames.find(name => slugifyCity(name) === citySlug);
            if (cityName) city = { name: cityName, slug: slugifyCity(cityName) } as any;
        }

        if (city) {
            const filteredClinics = clinicsResponse.data.filter(c => {
                const cityMatch = slugifyCity(c.city).toLowerCase() === citySlug.toLowerCase();
                const treatmentsArray = (c as any).treatments || (c as any).clinic_treatments?.map((ct: any) => ct.treatments) || [];
                const treatmentMatch = treatmentsArray.some((t: any) => 
                    t.id === treatment!.id || 
                    t.slug === treatment!.slug || 
                    t.slug === resolvedSlugOrTreatment ||
                    t.slug === slugOrTreatment ||
                    (t.treatments && (t.treatments.slug === treatment!.slug || t.treatments.slug === resolvedSlugOrTreatment))
                );
                const serviceMatch = c.extracted_services?.some((s: string) => 
                    s.toLowerCase().includes(treatment!.name.toLowerCase()) ||
                    s.toLowerCase().includes(resolvedSlugOrTreatment.toLowerCase())
                );
                return cityMatch && (treatmentMatch || serviceMatch);
            });
            
            if (filteredClinics.length <= 1) {
                notFound();
            }

            const seoKey = `${citySlug.toLowerCase()}/${slugOrTreatment.toLowerCase()}`;
            const customSeo = stockholmSeoData[seoKey];

            return (
                <CityTreatmentView 
                    city={city as any} 
                    treatment={treatment} 
                    clinics={filteredClinics as any} 
                    customH1={customSeo?.h1}
                    customEditorial={customSeo?.editorial}
                />
            );
        }
    }
    notFound();
}
