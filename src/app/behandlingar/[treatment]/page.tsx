import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTreatments, getClinics } from '@/lib/supabase/actions/queries';
import { Image as ImageIcon } from 'lucide-react';

export default async function TreatmentPage({ params }: { params: Promise<{ treatment: string }> | { treatment: string } }) {
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

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Breadcrumbs */}
                <nav className="text-sm text-gray-500 mb-6">
                    <Link href="/" className="hover:text-primary">Hem</Link>
                    <span className="mx-2">&gt;</span>
                    <span className="text-gray-900">{treatment.name}</span>
                </nav>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Kliniker som erbjuder {treatment.name}
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
                                    <p className="text-gray-600 mb-4">{clinic.city}</p>
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
