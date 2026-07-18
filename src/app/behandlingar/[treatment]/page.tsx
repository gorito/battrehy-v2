import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTreatments, getClinics } from '@/lib/supabase/actions/queries';
import { Image as ImageIcon, MapPin, ChevronDown } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import TreatmentContentBlock from '@/components/seo/TreatmentContentBlock';
import { SchemaScript } from '@/components/SchemaScript';
import { buildBreadcrumbSchema, buildOrganizationSchema, buildItemListSchema } from '@/lib/schema';

export const dynamic = 'force-dynamic';

type Props = {
    params: Promise<{ treatment: string }> | { treatment: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const supabase = await createClient();
    
    const { data: treatment, error: tError } = await supabase
        .from('treatments')
        .select('name, slug, treatment_content')
        .eq('slug', resolvedParams.treatment)
        .single();

    if (tError || !treatment) return { title: 'Behandling hittades inte' };

    let metaDesc = `Jämför och hitta de bästa klinikerna för ${treatment.name.toLowerCase()} i Sverige. Certifierade kliniker, enkelt att boka.`;
    
    if (treatment.treatment_content) {
        let parsed: any = {};
        try {
            if (typeof treatment.treatment_content === 'string') {
                parsed = JSON.parse(treatment.treatment_content);
            } else {
                parsed = treatment.treatment_content;
            }
            if (parsed.intro) {
                // Match the first sentence ending with a dot, question mark, or exclamation mark.
                const firstSentence = parsed.intro.match(/^[^.!?]+[.!?]/)?.[0];
                if (firstSentence) {
                    metaDesc = firstSentence.trim();
                }
            }
        } catch (e) {
            console.error("Error parsing treatment content for metadata description:", e);
        }
    }

    return {
        title: `${treatment.name} – Hitta kliniker nära dig`,
        description: metaDesc,
        alternates: {
            canonical: `/behandlingar/${treatment.slug}`,
        },
        openGraph: {
            title: `${treatment.name} - Expertkliniker i Sverige`,
            description: metaDesc,
            url: `https://battrehy.se/behandlingar/${treatment.slug}`,
        }
    };
}

export default async function TreatmentPage({ params }: Props) {
    const resolvedParams = await params;
    const headersList = await headers();
    const userCityHeader = headersList.get('x-vercel-ip-city');
    const userCity = userCityHeader ? decodeURIComponent(userCityHeader) : 'Stockholm';
    
    const supabase = await createClient();

    // Fetch the treatment first
    const { data: treatment, error: tError } = await supabase
        .from('treatments')
        .select('*')
        .eq('slug', resolvedParams.treatment)
        .single();

    if (tError || !treatment) {
        notFound();
    }

    // Query clinics that offer this treatment in the user's city
    const { data: clinicsData, error: cError } = await supabase
        .from('clinics')
        .select(`
            *,
            clinic_treatments!inner (
                treatment_id,
                treatments (*)
            )
        `)
        .eq('clinic_treatments.treatment_id', treatment.id)
        .ilike('city', userCity);

    let clinics = clinicsData || [];
    let treatmentClinics = clinics.map((c: any) => ({
        ...c,
        treatments: c.clinic_treatments?.map((ct: any) => ct.treatments).filter(Boolean) || []
    }));

    let displayCity = userCity;

    // Fallback: If no clinics found in the user's city for this treatment, show clinics in Sweden (limit 100)
    if (treatmentClinics.length === 0) {
        const { data: allClinicsData, error: allErr } = await supabase
            .from('clinics')
            .select(`
                *,
                clinic_treatments!inner (
                    treatment_id,
                    treatments (*)
                )
            `)
            .eq('clinic_treatments.treatment_id', treatment.id)
            .limit(100);
            
        const fallbackClinics = allClinicsData || [];
        treatmentClinics = fallbackClinics.map((c: any) => ({
            ...c,
            treatments: c.clinic_treatments?.map((ct: any) => ct.treatments).filter(Boolean) || []
        }));
        displayCity = 'Stockholm'; // Default fallback city string
    }

    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Hem', url: 'https://battrehy.se' },
            { name: 'Behandlingar', url: 'https://battrehy.se/behandlingar' },
            { name: treatment.name, url: `https://battrehy.se/behandlingar/${treatment.slug}` }
        ]),
        buildOrganizationSchema(),
        buildItemListSchema({
            pageTitle: `Kliniker som erbjuder ${treatment.name}`,
            pageUrl: `https://battrehy.se/behandlingar/${treatment.slug}`,
            clinics: treatmentClinics.map(c => ({
                name: c.name,
                slug: c.slug,
                city_slug: c.city.toLowerCase()
            }))
        })
    ];

    // Parse treatment_content if exists
    let parsedContent: any = null;
    if (treatment.treatment_content) {
        try {
            parsedContent = typeof treatment.treatment_content === 'string'
                ? JSON.parse(treatment.treatment_content)
                : treatment.treatment_content;
        } catch (e) {
            console.error("Error parsing treatment content for rendering:", e);
        }
    }

    return (
        <main className="min-h-screen bg-[#fffafa] pt-24 pb-16 px-8 flex flex-col items-center">
            <SchemaScript schemas={schemas} />
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

                {parsedContent ? (
                    <div className="bg-white rounded-[2rem] p-6 sm:p-10 border border-gray-100 shadow-sm mb-12 space-y-8">
                        {parsedContent.title && (
                            <h2 className="text-2xl font-black text-charcoal-900 border-b border-gray-100 pb-4">
                                {parsedContent.title}
                            </h2>
                        )}
                        {parsedContent.intro && (
                            <div className="prose max-w-none text-charcoal-600">
                                {parsedContent.intro.split('\n\n').map((para: string, idx: number) => (
                                    <p key={idx} className="text-base sm:text-lg leading-relaxed mb-4 last:mb-0">
                                        {para}
                                    </p>
                                ))}
                            </div>
                        )}
                        {(parsedContent.price_section || parsedContent.choice_section) && (
                            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                                {parsedContent.price_section && (
                                    <div className="bg-[#fafaff] rounded-2xl p-6 border border-blue-100/50">
                                        <h3 className="font-bold text-gray-900 text-lg mb-3">
                                            {parsedContent.price_section.title}
                                        </h3>
                                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                            {parsedContent.price_section.text}
                                        </p>
                                    </div>
                                )}
                                {parsedContent.choice_section && (
                                    <div className="bg-[#fffafa] rounded-2xl p-6 border border-rose-100/50">
                                        <h3 className="font-bold text-gray-900 text-lg mb-3">
                                            {parsedContent.choice_section.title}
                                        </h3>
                                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                            {parsedContent.choice_section.text}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-xl text-charcoal-600 mb-12 font-medium">
                        {treatment.description || `Läs mer om ${treatment.name.toLowerCase()} och hitta certifierade experter nära dig.`}
                    </p>
                )}

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

                {/* Reverse cross-linking section: Kliniker som erbjuder [treatment.name] */}
                <div className="mt-20 pt-12 border-t border-gray-100">
                    <h2 className="text-3xl font-black text-charcoal-900 mb-2">
                        Kliniker som erbjuder {treatment.name}
                    </h2>
                    <p className="text-charcoal-500 mb-8">Här listas verifierade och certifierade experter i Sverige.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {treatmentClinics
                            .sort((a, b) => {
                                // Prioritize premium tier clinics
                                if (a.tier === 'premium' && b.tier !== 'premium') return -1;
                                if (a.tier !== 'premium' && b.tier === 'premium') return 1;
                                return a.name.localeCompare(b.name);
                            })
                            .slice(0, 12)
                            .map(clinic => (
                                <Link 
                                    key={clinic.id} 
                                    href={`/kliniker/${slugifyCity(clinic.city)}/${clinic.slug}`}
                                    className="bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group block"
                                >
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <h3 className="font-bold text-charcoal-900 group-hover:text-[#e8234a] transition-colors line-clamp-1">
                                                {clinic.name}
                                            </h3>
                                            {clinic.tier === 'premium' && (
                                                <span className="bg-[#e8234a] text-white text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Premium</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-charcoal-400 font-bold mb-3 flex items-center gap-1">
                                            <MapPin size={12} className="text-[#e8234a]" />
                                            {clinic.city}
                                        </p>
                                        {clinic.description && (
                                            <p className="text-charcoal-500 text-xs line-clamp-3 leading-relaxed mb-4">{clinic.description}</p>
                                        )}
                                    </div>
                                    <div className="text-[#e8234a] font-bold text-xs group-hover:underline flex items-center gap-1 mt-2">
                                        Visa profil &rarr;
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

// Helpers
function slugifyCity(str: string) {
    return str.toLowerCase().trim().replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/[^a-z0-9]+/g, '-');
}

