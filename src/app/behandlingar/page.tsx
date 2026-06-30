import { getTreatments } from '@/lib/supabase/actions/queries';
import Link from 'next/link';
import { Metadata } from 'next';
import { SchemaScript } from '@/components/SchemaScript';
import { buildBreadcrumbSchema, buildOrganizationSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Estetiska Behandlingar i Sverige – Jämför & Boka',
    description: 'Hitta rätt estetisk klinik nära dig. Jämför botox, fillers, laserbehandling och mer hos certifierade kliniker i Sverige. Boka enkelt online.',
    alternates: {
        canonical: 'https://battrehy.se/behandlingar',
    },
    openGraph: {
        title: 'Estetiska Behandlingar i Sverige – Jämför & Boka',
        description: 'Hitta rätt estetisk klinik nära dig. Jämför botox, fillers, laserbehandling och mer hos certifierade kliniker i Sverige. Boka enkelt online.',
        url: 'https://battrehy.se/behandlingar',
        type: 'website',
    }
};

export const dynamic = 'force-dynamic';

export default async function TreatmentsPage() {
    const treatments = await getTreatments();

    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Hem', url: 'https://battrehy.se' },
            { name: 'Behandlingar', url: 'https://battrehy.se/behandlingar' }
        ]),
        buildOrganizationSchema()
    ];

    return (
        <main className="min-h-screen bg-gray-50 p-8 pb-24">
            <SchemaScript schemas={schemas} />
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Alla Behandlingar</h1>
                <p className="text-lg text-gray-700 mb-12">
                    Utforska vårt utbud av estetiska behandlingar och hitta rätt klinik för dig.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {treatments.map(treatment => (
                        <Link
                            key={treatment.id}
                            href={`/behandlingar/${treatment.slug}`}
                            className="group relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all block bg-charcoal-900"
                        >
                            {/* Background Image */}
                            {treatment.image_url ? (
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                                    style={{ backgroundImage: `url(${treatment.image_url})` }}
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-charcoal-800 to-charcoal-900 opacity-80" />
                            )}

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {treatment.name}
                                </h3>

                                {/* Rollover Description */}
                                <div className="overflow-hidden">
                                    <p className="text-white/90 text-sm line-clamp-3 opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                        {treatment.description || `Utforska certifierade kliniker som erbjuder ${treatment.name.toLowerCase()} nära dig.`}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
