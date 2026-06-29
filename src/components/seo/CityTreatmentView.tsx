import Link from 'next/link';
import { Image as ImageIcon } from 'lucide-react';
import TreatmentContentBlock from './TreatmentContentBlock';

interface Clinic {
    id: string;
    name: string;
    slug: string;
    city: string;
    description?: string | null;
    primary_image_url?: string | null;
    tier: string;
    is_verified: boolean;
    is_shr_member?: boolean;
    is_rfem_member?: boolean;
    neighborhood?: string | null;
    ai_description?: string;
    ai_faq?: string;
    ai_meta?: string;
    treatments?: { id: string; name: string; slug: string }[];
}

interface Props {
    city: { name: string; slug: string; description?: string };
    treatment: { name: string; slug: string; description?: string };
    clinics: Clinic[];
    neighborhood?: { name: string; slug: string };
    customH1?: string;
    customEditorial?: string;
}

export default function CityTreatmentView({ city, treatment, clinics, neighborhood, customH1, customEditorial }: Props) {
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
                name: `Kliniker i ${city.name}`,
                item: `https://battrehy.se/kliniker/${city.slug}`
            },
            ...(neighborhood ? [
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: `${treatment.name} i ${neighborhood.name}`,
                    item: `https://battrehy.se/kliniker/${city.slug}/${neighborhood.slug}/${treatment.slug}`
                }
            ] : [
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: `${treatment.name} i ${city.name}`,
                    item: `https://battrehy.se/kliniker/${city.slug}/${treatment.slug}`
                }
            ])
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
                <nav className="text-sm text-gray-500 mb-6 flex flex-wrap gap-2 items-center">
                    <Link href="/" className="hover:text-primary transition-colors">Hem</Link>
                    <span>&gt;</span>
                    <Link href={`/kliniker/${city.slug}`} className="hover:text-primary capitalize">{city.name}</Link>
                    {neighborhood && (
                        <>
                            <span>&gt;</span>
                            <span className="capitalize">{neighborhood.name}</span>
                        </>
                    )}
                    <span>&gt;</span>
                    <span className="text-gray-900 font-medium">{treatment.name}</span>
                </nav>

                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {customH1 || (neighborhood ? `${treatment.name} i ${neighborhood.name} — ${city.name}` : `${treatment.name} i ${city.name}`)}
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-3xl whitespace-pre-line">
                        {customEditorial || (neighborhood 
                            ? `Hitta de bästa klinikerna för ${treatment.name.toLowerCase()} i ${neighborhood.name}, ${city.name}. Jämför verifierade kliniker, priser och boka direkt.`
                            : `Hitta de bästa klinikerna för ${treatment.name.toLowerCase()} i ${city.name}. Vi har listat certifierade kliniker som utför ${treatment.name.toLowerCase()} med högsta precision och säkerhet.`
                        )}
                    </p>
                </div>

                <div className="space-y-6">
                    {clinics.length > 0 ? (
                        clinics.map(clinic => (
                            <div key={clinic.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start gap-6 hover:shadow-md transition-shadow">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-xl font-bold text-gray-900">
                                            <Link href={`/kliniker/${city.slug}/${clinic.slug}`} className="hover:text-primary transition-colors">
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
                                        {clinic.description || `Specialister på ${treatment.name.toLowerCase()} och andra skönhetsbehandlingar i ${city.name}.`}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {clinic.treatments?.slice(0, 5).map(t => (
                                            <span key={t.id} className="text-[11px] bg-gray-50 px-2.5 py-1 text-gray-500 rounded-md border border-gray-100">
                                                {t.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <Link 
                                    href={`/kliniker/${city.slug}/${clinic.slug}`}
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
                            <p className="text-gray-500">Vi har tyvärr inga kliniker listade för {treatment.name.toLowerCase()} i {city.name} ännu.</p>
                            <Link href={`/kliniker/${city.slug}`} className="text-primary hover:underline mt-4 inline-block font-medium">Se alla kliniker i {city.name}</Link>
                        </div>
                    )}
                </div>

                {/* Treatment Editorial Content Block */}
                <TreatmentContentBlock content={(treatment as any).treatment_content} />
            </div>
        </main>
    );
}
