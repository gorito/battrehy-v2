import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getClinicBySlug } from '@/lib/supabase/actions/queries';
import { MapPin, Globe, Phone, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

type Props = {
    params: Promise<{ city: string, slug: string }> | { city: string, slug: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const clinic = await getClinicBySlug(resolvedParams.slug);

    if (!clinic) return { title: 'Kliniken hittades inte' };

    const urlCity = decodeURIComponent(resolvedParams.city).toLowerCase();
    const clinicCity = clinic.city.toLowerCase();
    const clinicCitySlug = clinicCity.replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/[^a-z0-9]+/g, '-');

    if (clinicCity !== urlCity && clinicCitySlug !== urlCity) {
        return { title: 'Kliniken hittades inte' };
    }

    const title = `${clinic.name} i ${clinic.city} | Boka hos Bättrehy.se`;
    
    return {
        title: title.length > 60 ? clinic.name : title,
        description: clinic.description || `Se behandlingar och boka tid hos ${clinic.name} i ${clinic.city} på Bättrehy.se.`,
        alternates: {
            canonical: `/kliniker/${clinic.city.toLowerCase()}/${clinic.slug}`,
        },
        openGraph: {
            title: `${clinic.name} - Estetiska behandlingar i ${clinic.city}`,
            description: clinic.description || `Boka tid eller läs mer om ${clinic.name}.`,
            url: `https://battrehy.se/kliniker/${clinic.city.toLowerCase()}/${clinic.slug}`,
            images: [{ url: clinic.primary_image_url || 'https://battrehy.se/og-image.jpg' }]
        }
    };
}

export default async function ClinicProfilePage({ params }: Props) {
    const resolvedParams = await params;
    const clinic = await getClinicBySlug(resolvedParams.slug);

    if (!clinic) notFound();

    // Make sure clinic exists AND matches the city in the URL (support both 'norrköping' and 'norrkoping')
    const urlCity = decodeURIComponent(resolvedParams.city).toLowerCase();
    const clinicCity = clinic.city.toLowerCase();
    const clinicCitySlug = clinicCity.replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/[^a-z0-9]+/g, '-');

    if (clinicCity !== urlCity && clinicCitySlug !== urlCity) {
        notFound();
    }

    const primaryImage = clinic.primary_image_url;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'MedicalBusiness',
        name: clinic.name,
        image: primaryImage,
        '@id': `https://battrehy.se/kliniker/${clinic.city.toLowerCase()}/${clinic.slug}`,
        url: clinic.website || `https://battrehy.se/kliniker/${clinic.city.toLowerCase()}/${clinic.slug}`,
        telephone: clinic.phone || '',
        address: {
            '@type': 'PostalAddress',
            streetAddress: clinic.address || '',
            addressLocality: clinic.city,
            addressCountry: 'SE'
        },
        description: clinic.description || `Boka behandlingar på ${clinic.name} i ${clinic.city} via Bättrehy.se`,
    };

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
                item: `https://battrehy.se/stad/${resolvedParams.city}`
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: clinic.name,
                item: `https://battrehy.se/kliniker/${clinic.city.toLowerCase()}/${clinic.slug}`
            }
        ]
    };

    return (
        <main className="min-h-screen bg-gray-50 p-4 sm:p-8 pb-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <div className="max-w-4xl mx-auto">
                {/* Breadcrumbs */}
                <nav className="text-sm text-gray-500 mb-6 flex flex-wrap gap-2 items-center">
                    <Link href="/" className="hover:text-primary">Hem</Link>
                    <span>&gt;</span>
                    <Link href={`/stad/${resolvedParams.city}`} className="hover:text-primary capitalize">{decodeURIComponent(resolvedParams.city)}</Link>
                    <span>&gt;</span>
                    <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">{clinic.name}</span>
                </nav>

                {/* Profile Header Image (if any) */}
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
                                <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                    Premium
                                </span>
                            )}
                            {clinic.is_verified && (
                                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                    ✓ Verifierad
                                </span>
                            )}
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                            {clinic.description || `${clinic.name} är en klinik belägen i ${clinic.city}.`}
                        </p>
                    </div>

                    {clinic.booking_url ? (
                        <a
                            href={clinic.booking_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md w-full md:w-auto justify-center shrink-0"
                        >
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
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-8">
                        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Behandlingar</h2>
                            <div className="flex flex-wrap gap-3">
                                {clinic.treatments && clinic.treatments.length > 0 ? (
                                    clinic.treatments.map((t: any) => (
                                        <Link
                                            key={t.id}
                                            href={`/behandlingar/${t.slug}`}
                                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 px-4 py-2 rounded-full font-medium transition-colors"
                                        >
                                            {t.name}
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">Denna klinik har inte angett sina behandlingar ännu.</p>
                                )}
                            </div>
                        </section>

                        {/* Specific Services (Option 1) */}
                        {clinic.extracted_services && clinic.extracted_services.length > 0 && (
                            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 mt-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <div className="w-1.5 h-6 bg-rose-500 rounded-full"></div>
                                    Tjänster & Utbud
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {clinic.extracted_services.slice(0, 12).map((service: string, idx: number) => (
                                        <div 
                                            key={idx} 
                                            className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 font-medium flex items-center gap-2 hover:border-rose-200 transition-colors group"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-rose-300 group-hover:bg-rose-500 transition-colors"></div>
                                            <span className="truncate">{service}</span>
                                        </div>
                                    ))}
                                </div>
                                {clinic.extracted_services.length > 12 && (
                                    <div className="mt-6 pt-6 border-t border-gray-50 text-center">
                                        <p className="text-sm text-gray-400">
                                            +{clinic.extracted_services.length - 12} fler tjänster tillgängliga hos kliniken
                                        </p>
                                    </div>
                                )}
                            </section>
                        )}

                        {/* Image Gallery */}
                        {clinic.images && clinic.images.length > 0 && (
                            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Galleri</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {clinic.images.map((img: any) => (
                                        <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden shadow-sm group">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={img.url}
                                                alt={img.alt_text || `Bilder från ${clinic.name}`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 pb-4 border-b border-gray-50">Kontaktuppgifter</h3>
                            <ul className="space-y-4 text-gray-600">
                                {clinic.address ? (
                                    <li className="flex items-start gap-3">
                                        <MapPin className="text-gray-400 shrink-0 mt-0.5" size={20} />
                                        <span>{clinic.address}, <br />{clinic.city}</span>
                                    </li>
                                ) : (
                                    <li className="flex items-start gap-3">
                                        <MapPin className="text-gray-400 shrink-0 mt-0.5" size={20} />
                                        <span>{clinic.city}</span>
                                    </li>
                                )}
                                {clinic.phone && (
                                    <li className="flex items-center gap-3">
                                        <Phone className="text-gray-400 shrink-0" size={20} />
                                        <a href={`tel:${clinic.phone}`} className="hover:text-primary transition-colors">{clinic.phone}</a>
                                    </li>
                                )}
                                {clinic.website && (
                                    <li className="flex items-center gap-3">
                                        <Globe className="text-gray-400 shrink-0" size={20} />
                                        <a href={clinic.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">
                                            Besök hemsida
                                        </a>
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
