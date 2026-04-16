import { getClinics } from '@/lib/supabase/actions/queries';
import Link from 'next/link';
import { Search, Image as ImageIcon } from 'lucide-react';
import HomeSearch from '@/components/home/HomeSearch';

export const dynamic = 'force-dynamic';

export default async function SearchResultsPage({
    searchParams,
}: {
    searchParams?: Promise<{ q?: string }> | { q?: string };
}) {
    const resolvedParams = await searchParams;
    const query = resolvedParams?.q || '';

    // Use the existing getClinics function which handles text search on name/city
    // We limit to 100 for public search to keep it fast
    const { data: clinics } = await getClinics({ query, limit: 100 });

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            {/* Mini Hero Search */}
            <div className="bg-charcoal-900 pt-16 pb-12 mb-8">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h1 className="text-white text-3xl font-bold mb-6">Sökresultat</h1>
                    <HomeSearch />
                </div>
            </div>

            <div className="max-w-4xl mx-auto w-full px-4 pb-16">
                <div className="mb-6 flex justify-between items-end">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {query ? `Resultat för "${query}"` : 'Alla kliniker'}
                    </h2>
                    <p className="text-gray-500">{clinics.length} kliniker hittades</p>
                </div>

                <div className="grid gap-6">
                    {clinics.length > 0 ? (
                        clinics.map((clinic) => (
                            <div key={clinic.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            <Link href={`/kliniker/${clinic.city.toLowerCase()}/${clinic.slug}`} className="hover:text-primary">
                                                {clinic.name}
                                            </Link>
                                        </h3>
                                        {clinic.tier === 'premium' && (
                                            <span className="bg-rose-100 text-rose-700 text-xs px-2 py-1 rounded-full font-bold">Premium</span>
                                        )}
                                        {clinic.tier === 'verified' && (
                                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-bold">Verifierad</span>
                                        )}
                                    </div>

                                    <p className="text-gray-600 mb-3">{clinic.address ? `${clinic.address}, ` : ''}{clinic.city}</p>

                                    {clinic.description && (
                                        <p className="text-gray-700 text-sm line-clamp-2 mb-4">{clinic.description}</p>
                                    )}

                                    <div className="flex gap-2 flex-wrap">
                                        {clinic.treatments?.slice(0, 4).map((t: any) => (
                                            <Link key={t.id} href={`/behandlingar/${t.slug}`} className="text-xs bg-gray-100 px-3 py-1 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
                                                {t.name}
                                            </Link>
                                        ))}
                                        {clinic.treatments && clinic.treatments.length > 4 && (
                                            <span className="text-xs text-gray-400 px-2 py-1">+{clinic.treatments.length - 4} mer</span>
                                        )}
                                    </div>
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
                        <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-100">
                            <p className="text-lg text-gray-500 mb-2">Ojsan, vi kunde inte hitta några kliniker som matchar "{query}".</p>
                            <p className="text-gray-400">Prova att söka på en annan stad eller behandling.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
