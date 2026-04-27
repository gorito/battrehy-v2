import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTreatments, getClinics } from '@/lib/supabase/actions/queries';
import { Image as ImageIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

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
        title: `${treatment.name} – ${count || ''} Kliniker i Sverige | Bättrehy.se`,
        description: treatment.description || `Hitta och jämför ${count ? `de ${count} ` : ''}bästa klinikerna för ${treatment.name} i Sverige. Se priser, omdömen och boka direkt på Bättrehy.se.`,
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

    // We fetch everything in parallel for speed. Limit set to 1000 since it is a public page rendering all.
    const [treatments, clinicsResponse] = await Promise.all([getTreatments(), getClinics({ limit: 1000 })]);
    const clinics = clinicsResponse.data;

    // Try to find the treatment in our real data
    const treatment = treatments.find(t => t.slug === resolvedParams.treatment);

    if (!treatment) {
        notFound();
    }

    // Filter clinics that offer this treatment
    const treatmentClinics = clinics.filter(
        c => c.treatments?.some((t: any) => t.id === treatment.id)
    );

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
                    <span className="text-gray-900">{treatment.name}</span>
                </nav>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Bästa klinikerna för {treatment.name} i Sverige
                </h1>
                <p className="text-lg text-gray-700 mb-12">
                    {treatment.description || `Läs mer om ${treatment.name} och hitta certifierade experter nära dig.`}
                </p>

                <div className="grid gap-6">
                    {treatmentClinics.length > 0 ? (
                        treatmentClinics.map(clinic => (
                            <div key={clinic.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-xl font-bold text-gray-900">
                                            <Link href={`/kliniker/${clinic.city.toLowerCase()}/${clinic.slug}`} className="hover:text-primary">
                                                {clinic.name}
                                            </Link>
                                        </h2>
                                        {clinic.tier === 'premium' && (
                                            <span className="bg-rose-100 text-rose-700 text-xs px-2 py-1 rounded-full font-bold">Premium</span>
                                        )}
                                        {clinic.is_verified && (
                                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-bold">Verifierad</span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 mb-2 truncate font-medium">{clinic.city}</p>
                                    {clinic.description && (
                                        <p className="text-gray-500 text-sm line-clamp-2 max-w-xl">{clinic.description}</p>
                                    )}
                                </div>

                                <div 
                                    className="w-full sm:w-48 h-32 shrink-0 rounded-lg bg-cover bg-center bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden" 
                                    style={clinic.primary_image_url ? { backgroundImage: `url(${clinic.primary_image_url})` } : {}}
                                >
                                    {!clinic.primary_image_url && (
                                        <ImageIcon className="text-gray-300" size={32} strokeWidth={1.5} />
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Inga kliniker erbjuder denna behandling ännu.</p>
                    )}
                </div>
            </div>
        </main>
    );
}
