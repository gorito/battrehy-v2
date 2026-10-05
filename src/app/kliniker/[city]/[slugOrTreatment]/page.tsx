import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect, redirect } from 'next/navigation';
import { getClinicBySlug, getTreatments, getClinics, getCities, getUniqueCities, getClinicsByCity } from '@/lib/supabase/actions/queries';
import { MapPin, Globe, Phone, Mail, Calendar, Image as ImageIcon, Sparkles, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';
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
    const [treatments, cities, uniqueCityNames] = await Promise.all([
        getTreatments(),
        getCities(),
        getUniqueCities()
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
            const cityClinics = await getClinicsByCity(city.name);
            const filteredClinics = cityClinics.filter(c => {
                const cityMatch = slugifyCity(c.city).toLowerCase() === citySlug.toLowerCase();
                const treatmentsArray = (c as any).treatments || [];
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

    const resolvedSlugOrTreatment = ALIAS_MAP[slugOrTreatment] || slugOrTreatment;
    if (citySlug !== asciiCitySlug || slugOrTreatment !== asciiSlugOrTreatment || ALIAS_MAP[slugOrTreatment]) {
        permanentRedirect(`/kliniker/${asciiCitySlug}/${resolvedSlugOrTreatment}`);
    }

    // 1. Fetch treatments and cities in parallel
    const [treatments, cities, uniqueCityNames] = await Promise.all([
        getTreatments(),
        getCities(),
        getUniqueCities()
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
            permanentRedirect(`/kliniker/${clinicCitySlug}/${clinic.slug}`);
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

        const contactUrl = clinic.booking_url || clinic.website;
        const parsedFaqs = parseFaq(clinic.ai_faq);

        return (
            <main className="min-h-screen bg-[#fafaf9] p-4 sm:p-8 pb-24">
                <SchemaScript schemas={schemas} />
                <ClinicTracker clinicId={clinic.id} />
                <div className="max-w-6xl mx-auto">
                    {/* Breadcrumbs */}
                    <nav className="text-sm text-gray-500 mb-6 flex flex-wrap gap-2 items-center">
                        <Link href="/" className="hover:text-gray-900 transition-colors">Hem</Link>
                        <span className="text-gray-400">/</span>
                        <Link href={`/kliniker/${citySlug}`} className="hover:text-gray-900 capitalize">{clinic.city}</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">{clinic.name}</span>
                    </nav>

                    {/* Profile Header Image (Only if available) */}
                    {primaryImage && (
                        <div className="w-full h-72 sm:h-88 md:h-[425px] lg:h-[450px] rounded-2xl overflow-hidden border border-gray-100 shadow-xs mb-8 bg-gray-50">
                            <img
                                src={primaryImage}
                                alt={clinic.name}
                                className="w-full h-full object-cover object-top md:object-[center_20%]"
                            />
                        </div>
                    )}

                    {/* Main Layout Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                        {/* Left Column: Story, About, Treatments, FAQ */}
                        <div className="lg:col-span-7 xl:col-span-8 space-y-6 sm:space-y-8">
                            {/* Header Card */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5">
                                {/* Badges */}
                                <div className="flex flex-wrap items-center gap-2">
                                    {clinic.tier === 'premium' && (
                                        <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-100 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                                            <Sparkles size={13} className="text-rose-500" />
                                            Premium
                                        </span>
                                    )}
                                    {clinic.is_verified && (
                                        <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 border border-sky-100 px-3 py-1 rounded-full text-xs font-semibold">
                                            <CheckCircle2 size={13} className="text-sky-500" />
                                            Verifierad
                                        </span>
                                    )}
                                    {clinic.is_shr_member && (
                                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/70 px-3 py-1 rounded-full text-xs font-semibold">
                                            <ShieldCheck size={13} className="text-emerald-600" />
                                            SHR-medlem
                                        </span>
                                    )}
                                    {clinic.is_rfem_member && (
                                        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200/70 px-3 py-1 rounded-full text-xs font-semibold">
                                            <ShieldCheck size={13} className="text-amber-600" />
                                            RFEM-medlem
                                        </span>
                                    )}
                                </div>

                                {/* Title & Location */}
                                <div>
                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-2">
                                        {clinic.name}
                                    </h1>
                                    <div className="flex items-center gap-1.5 text-gray-500 text-sm sm:text-base">
                                        <MapPin size={16} className="text-gray-400 shrink-0" />
                                        <span>{clinic.address ? `${clinic.address}, ` : ''}{clinic.city}</span>
                                    </div>
                                </div>

                                {/* Lead description */}
                                <p className="text-gray-600 text-base sm:text-lg leading-relaxed whitespace-pre-wrap font-normal pt-2 border-t border-gray-100">
                                    {clinic.description || `${clinic.name} är en klinik belägen i ${clinic.city}.`}
                                </p>

                                {/* Mobile Quick Contact Bar */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100 lg:hidden">
                                    {contactUrl ? (
                                        <TrackedLink 
                                            clinicId={clinic.id}
                                            eventType={clinic.booking_url ? 'booking_click' : 'website_click'}
                                            href={contactUrl} 
                                            className="bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-5 rounded-xl shadow-xs text-center flex items-center justify-center gap-2 transition-all text-sm"
                                        >
                                            {clinic.booking_url ? <Calendar size={16} /> : <Globe size={16} />}
                                            {clinic.booking_url ? 'Boka tid' : `Besök ${clinic.name}`}
                                        </TrackedLink>
                                    ) : null}
                                    {clinic.phone && (
                                        <a 
                                            href={`tel:${clinic.phone}`}
                                            className="bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 py-3 px-4 rounded-xl font-medium text-center flex items-center justify-center gap-2 transition-colors text-sm"
                                        >
                                            <Phone size={16} className="text-primary" />
                                            Ring {clinic.phone}
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Om kliniken Section */}
                            {clinic.ai_description && (
                                <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xs">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Om kliniken</h2>
                                    <p className="text-gray-600 text-base leading-relaxed whitespace-pre-wrap font-normal">
                                        {clinic.ai_description}
                                    </p>
                                </section>
                            )}

                            {/* Behandlingar Section */}
                            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xs">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-xl font-bold text-gray-900">Behandlingar</h2>
                                    {clinic.treatments && clinic.treatments.length > 0 && (
                                        <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200/60">
                                            {clinic.treatments.length} st
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {clinic.treatments && clinic.treatments.length > 0 ? (
                                        clinic.treatments.map((t: any) => (
                                            <Link 
                                                key={t.id} 
                                                href={`/behandlingar/${t.slug}`} 
                                                className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-gray-50/80 hover:bg-rose-50 text-gray-700 hover:text-rose-600 border border-gray-200/70 hover:border-rose-200 transition-all shadow-2xs"
                                            >
                                                {t.name}
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 italic text-sm">Denna klinik har inte angett sina behandlingar ännu.</p>
                                    )}
                                </div>
                            </section>

                            {/* Vanliga frågor (FAQ) Section */}
                            {parsedFaqs.length > 0 && (
                                <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xs">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Vanliga frågor</h2>
                                    <div className="space-y-4 divide-y divide-gray-100">
                                        {parsedFaqs.map((item, idx) => (
                                            <div key={idx} className={idx > 0 ? 'pt-4 space-y-1.5' : 'space-y-1.5'}>
                                                <h3 className="font-semibold text-gray-900 text-base flex items-start gap-2">
                                                    <span className="text-primary font-bold">Q:</span>
                                                    <span>{item.question}</span>
                                                </h3>
                                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed pl-6 whitespace-pre-wrap">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Right Column: Sticky Action & Info Sidebar */}
                        <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-8 space-y-5">
                            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-xs space-y-6">
                                {/* Sidebar Header */}
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Kontakt & Bokning</span>
                                    <h3 className="text-lg font-bold text-gray-900 mt-1 truncate">{clinic.name}</h3>
                                </div>

                                {/* Main Action Buttons */}
                                <div className="space-y-3">
                                    {contactUrl ? (
                                        <TrackedLink 
                                            clinicId={clinic.id}
                                            eventType={clinic.booking_url ? 'booking_click' : 'website_click'}
                                            href={contactUrl} 
                                            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 px-5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 text-base text-center"
                                        >
                                            {clinic.booking_url ? <Calendar size={18} /> : <Globe size={18} />}
                                            {clinic.booking_url ? 'Boka tid online' : 'Besök hemsida'}
                                        </TrackedLink>
                                    ) : (
                                        <div className="w-full bg-gray-100 text-gray-400 font-medium py-3 px-4 rounded-xl text-center cursor-not-allowed text-sm">
                                            Ingen webblänk tillgänglig
                                        </div>
                                    )}

                                    {clinic.phone && (
                                        <a 
                                            href={`tel:${clinic.phone}`}
                                            className="w-full bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200/80 font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm text-center"
                                        >
                                            <Phone size={16} className="text-primary shrink-0" />
                                            <span>{clinic.phone}</span>
                                        </a>
                                    )}
                                </div>

                                {/* Clinic Details List */}
                                <div className="border-t border-gray-100 pt-5 space-y-4">
                                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Klinikinformation</div>
                                    <ul className="space-y-3.5 text-sm text-gray-600">
                                        <li className="flex items-start gap-3">
                                            <MapPin className="text-gray-400 shrink-0 mt-0.5" size={18} />
                                            <div>
                                                <div className="text-gray-900 font-medium">{clinic.city}</div>
                                                {clinic.address && <div className="text-gray-500 text-xs mt-0.5">{clinic.address}</div>}
                                            </div>
                                        </li>
                                        {clinic.phone && (
                                            <li className="flex items-center gap-3">
                                                <Phone className="text-gray-400 shrink-0" size={18} />
                                                <a href={`tel:${clinic.phone}`} className="hover:text-primary transition-colors font-medium text-gray-900">
                                                    {clinic.phone}
                                                </a>
                                            </li>
                                        )}
                                        {clinic.email && (
                                            <li className="flex items-center gap-3">
                                                <Mail className="text-gray-400 shrink-0" size={18} />
                                                <a href={`mailto:${clinic.email}`} className="hover:text-primary transition-colors font-medium text-gray-900 truncate">
                                                    {clinic.email}
                                                </a>
                                            </li>
                                        )}
                                        {clinic.website && (
                                            <li className="flex items-center gap-3">
                                                <Globe className="text-gray-400 shrink-0" size={18} />
                                                <TrackedLink 
                                                    clinicId={clinic.id}
                                                    eventType="website_click"
                                                    href={clinic.website} 
                                                    className="text-primary hover:underline font-medium truncate inline-flex items-center gap-1"
                                                >
                                                    <span>{clinic.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
                                                    <ExternalLink size={12} className="shrink-0" />
                                                </TrackedLink>
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                {/* Certifications & Memberships */}
                                {(clinic.is_shr_member || clinic.is_rfem_member || clinic.is_verified) && (
                                    <div className="border-t border-gray-100 pt-5 space-y-3">
                                        <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Kvalitet & Certifiering</div>
                                        <div className="space-y-2">
                                            {clinic.is_shr_member && (
                                                <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50/70 border border-emerald-200/60 p-2.5 rounded-xl">
                                                    <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                                                    <span>SHR-auktoriserad hudterapeut</span>
                                                </div>
                                            )}
                                            {clinic.is_rfem_member && (
                                                <div className="flex items-center gap-2 text-xs font-medium text-amber-800 bg-amber-50/70 border border-amber-200/60 p-2.5 rounded-xl">
                                                    <ShieldCheck size={16} className="text-amber-600 shrink-0" />
                                                    <span>RFEM-ansluten klinik</span>
                                                </div>
                                            )}
                                            {clinic.is_verified && (
                                                <div className="flex items-center gap-2 text-xs font-medium text-sky-800 bg-sky-50/70 border border-sky-200/60 p-2.5 rounded-xl">
                                                    <CheckCircle2 size={16} className="text-sky-600 shrink-0" />
                                                    <span>Verifierad profil</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Subtle booking notice */}
                                <div className="pt-2 text-xs text-gray-400 text-center leading-normal">
                                    Bokning och rådgivning sker direkt hos kliniken via deras officiella kanaler.
                                </div>
                            </div>

                            {/* Support card */}
                            <div className="bg-white/80 rounded-xl p-4 border border-gray-150 text-center">
                                <p className="text-xs text-gray-500">
                                    Representerar du {clinic.name}?{' '}
                                    <Link href="/kontakt" className="text-primary hover:underline font-medium">
                                        Uppdatera uppgifter
                                    </Link>
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        );
    }

    // already resolved at function top

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
            const cityClinics = await getClinicsByCity(city.name);
            const filteredClinics = cityClinics.filter(c => {
                const cityMatch = slugifyCity(c.city).toLowerCase() === citySlug.toLowerCase();
                const treatmentsArray = (c as any).treatments || [];
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
            
            if (filteredClinics.length === 0) {
                console.log(`[ROUTER] No clinics offering ${treatment.name} in ${city.name}. Redirecting to /kliniker/${citySlug}`);
                redirect(`/kliniker/${citySlug}`);
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
    
    // If route is completely unresolved, check if the city is valid to redirect to city page,
    // otherwise redirect to homepage to avoid 404s.
    let city = cities.find(c => slugifyCity(c.name) === citySlug || c.slug === citySlug);
    if (!city) {
        const cityName = uniqueCityNames.find(name => slugifyCity(name) === citySlug);
        if (cityName) city = { name: cityName, slug: slugifyCity(cityName) } as any;
    }

    if (city) {
        console.log(`[ROUTER] Route unresolved. Redirecting to city page /kliniker/${citySlug}`);
        redirect(`/kliniker/${citySlug}`);
    }

    console.log(`[ROUTER] City and Route unresolved. Redirecting to home page`);
    redirect('/');
}
