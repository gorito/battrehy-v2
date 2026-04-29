import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTreatments, getClinics } from '@/lib/supabase/actions/queries';
import { Image as ImageIcon, MapPin, ChevronDown } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

type Props = {
    params: Promise<{ treatment: string }> | { treatment: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const treatments = await getTreatments();
    const treatment = treatments.find(t => t.slug === resolvedParams.treatment);

    if (!treatment) return { title: 'Behandling hittades inte' };

    const supabase = await createClient();
    const { count } = await supabase.from('clinics').select('id', { count: 'exact', head: true }).contains('extracted_services', [treatment.name]);

    return {
        title: `${treatment.name} – Hitta kliniker nära dig`,
        description: `Jämför och hitta de bästa klinikerna för ${treatment.name.toLowerCase()} i Sverige. Certifierade kliniker, enkelt att boka.`,
        alternates: {
            canonical: `/behandlingar/${treatment.slug}`,
        },
        openGraph: {
            title: `${treatment.name} - Expertkliniker i Sverige`,
            description: `Hitta certifierade experter för ${treatment.name}.`,
            url: `https://battrehy.se/behandlingar/${treatment.slug}`,
        }
    };
}

export default async function TreatmentPage({ params }: Props) {
    const resolvedParams = await params;
    const headersList = await headers();
    const userCityHeader = headersList.get('x-vercel-ip-city');
    const userCity = userCityHeader ? decodeURIComponent(userCityHeader) : 'Stockholm';

    // Fetch treatments and ALL clinics for the specific city first
    let [treatments, clinicsResponse] = await Promise.all([
        getTreatments(), 
        getClinics({ limit: 1000, locationCity: userCity })
    ]);
    
    let clinics = clinicsResponse.data;

    // Try to find the treatment in our real data
    const treatment = treatments.find(t => t.slug === resolvedParams.treatment);

    if (!treatment) {
        notFound();
    }

    // Filter clinics that offer this treatment
    let treatmentClinics = clinics.filter(
        c => c.treatments?.some((t: any) => t.id === treatment.id)
    );

    let displayCity = userCity;

    // Fallback: If no clinics found in the user's city for this treatment, show ALL clinics in Sweden
    if (treatmentClinics.length === 0) {
        const allClinicsResponse = await getClinics({ limit: 1000 });
        clinics = allClinicsResponse.data;
        treatmentClinics = clinics.filter(
            c => c.treatments?.some((t: any) => t.id === treatment.id)
        );
        displayCity = 'Stockholm'; // Default fallback city string
    }

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
                name: 'Behandlingar',
                item: 'https://battrehy.se/behandlingar'
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: treatment.name,
                item: `https://battrehy.se/behandlingar/${treatment.slug}`
            }
        ]
    };

    const serviceLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: treatment.name,
        provider: {
            '@type': 'Organization',
            name: 'battrehy.se',
            url: 'https://battrehy.se'
        },
        areaServed: {
            '@type': 'Country',
            name: 'Sverige'
        },
        description: treatment.description || undefined
    };

    return (
        <main className="min-h-screen bg-[#fffafa] pt-24 pb-16 px-8 flex flex-col items-center">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
            />
            <div className="max-w-4xl w-full mx-auto">
                {/* Breadcrumbs */}
                <nav className="text-sm font-medium text-charcoal-400 mb-8 flex items-center gap-2">
                    <Link href="/" className="hover:text-[#e8234a] transition-colors">Hem</Link>
                    <span>&gt;</span>
                    <span className="text-charcoal-900 font-bold">{treatment.name}</span>
                </nav>

                <div className="flex flex-col mb-8">
                    <div className="flex justify-between items-center mb-1">
                        <Link href="/sok" className="text-sm font-bold text-charcoal-400 flex items-center gap-1.5 hover:text-charcoal-600 transition-colors group">
                            <MapPin size={14} className="text-[#e8234a]" />
                            Baserat på din plats &mdash; <span className="text-[#e8234a] border-b border-dashed border-[#e8234a]/30 group-hover:border-[#e8234a] transition-colors">{displayCity}</span>
                            <ChevronDown size={14} className="text-charcoal-400 group-hover:translate-y-0.5 transition-transform" />
                        </Link>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-charcoal-900 leading-tight">
                        Bästa klinikerna för <span className="text-[#e8234a]">{treatment.name.toLowerCase()}</span> nära dig
                    </h1>
                </div>

                <p className="text-xl text-charcoal-600 mb-12 font-medium">
                    {treatment.description || `Läs mer om ${treatment.name.toLowerCase()} och hitta certifierade experter nära dig.`}
                </p>

                <div className="grid gap-6">
                    {treatmentClinics.length > 0 ? (
                        treatmentClinics.map(clinic => (
                            <Link key={clinic.id} href={`/kliniker/${clinic.city.toLowerCase()}/${clinic.slug}`} className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col sm:flex-row justify-between items-start gap-6 group block">
                                <div className="flex-1 flex flex-col h-full">
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <h2 className="text-2xl font-black text-charcoal-900 group-hover:text-[#e8234a] transition-colors line-clamp-1">
                                            {clinic.name}
                                        </h2>
                                        {clinic.tier === 'premium' && (
                                            <span className="bg-[#e8234a] text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest shadow-lg ml-2">Premium</span>
                                        )}
                                        {clinic.is_verified && (
                                            <span className="bg-charcoal-900 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest ml-2">Verifierad</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-charcoal-400 font-bold mb-4 flex items-center gap-1.5">
                                        <MapPin size={14} className="text-[#e8234a]" />
                                        {clinic.city}
                                    </p>
                                    {clinic.description && (
                                        <p className="text-charcoal-500 text-sm line-clamp-2 max-w-xl font-medium leading-relaxed">{clinic.description}</p>
                                    )}
                                </div>

                                <div 
                                    className="w-full sm:w-56 h-40 shrink-0 rounded-[1.5rem] bg-cover bg-center bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-500" 
                                    style={clinic.primary_image_url ? { backgroundImage: `url(${clinic.primary_image_url})` } : {}}
                                >
                                    {!clinic.primary_image_url && (
                                        <ImageIcon className="text-gray-300" size={32} strokeWidth={1.5} />
                                    )}
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="bg-white p-12 rounded-[2rem] border border-gray-100 text-center shadow-sm">
                            <p className="text-xl font-bold text-charcoal-900 mb-2">Inga kliniker hittades</p>
                            <p className="text-charcoal-500 font-medium">Vi kunde tyvärr inte hitta några kliniker som erbjuder denna behandling i ditt område ännu.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
