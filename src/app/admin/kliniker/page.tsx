import { getClinics } from '@/lib/supabase/actions/queries';
import Link from 'next/link';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { Clinic } from '@/lib/supabase/types';
import { Suspense } from 'react';
import AdminSearch from '@/components/admin/AdminSearch';
import AdminPagination from '@/components/admin/AdminPagination';
import DeleteClinicButton from '@/components/admin/DeleteClinicButton';

export default async function AdminClinicsPage({
    searchParams,
}: {
    searchParams?: Promise<{ query?: string; page?: string }> | { query?: string; page?: string };
}) {
    // Support for NextJS 15+ async searchParams API
    const resolvedParams = await searchParams;
    const query = resolvedParams?.query || '';
    const currentPage = Number(resolvedParams?.page) || 1;
    const itemsPerPage = 50;

    const { data: clinics, count: totalItems } = await getClinics({
        query,
        page: currentPage,
        limit: itemsPerPage
    });

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Hantera kliniker</h1>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <Suspense fallback={<div className="h-10 w-64 bg-gray-100 rounded animate-pulse"></div>}>
                        <AdminSearch />
                    </Suspense>
                    <Link href="/admin/kliniker/skapa" className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors whitespace-nowrap">
                        <Plus size={20} />
                        <span className="hidden sm:inline">Lägg till</span>
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600 w-16">Bild</th>
                                <th className="p-4 font-semibold text-gray-600">Namn</th>
                                <th className="p-4 font-semibold text-gray-600 hidden sm:table-cell">Stad</th>
                                <th className="p-4 font-semibold text-gray-600 hidden md:table-cell">Nivå (Tier)</th>
                                <th className="p-4 font-semibold text-gray-600 hidden lg:table-cell">Datakvalitet</th>
                                <th className="p-4 font-semibold text-gray-600">Status</th>
                                <th className="p-4 font-semibold text-gray-600 text-right">Åtgärder</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {clinics.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">
                                        Inga kliniker hittades{query ? ` för sökningen "${query}"` : ''}.
                                    </td>
                                </tr>
                            ) : (
                                clinics.map((clinic: Clinic) => (
                                    <tr key={clinic.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <Link href={`/admin/kliniker/${clinic.slug}?returnPage=${currentPage}`} className="block w-12 h-12 rounded-lg bg-gray-100 border border-gray-100 overflow-hidden flex items-center justify-center relative group">
                                                {clinic.primary_image_url ? (
                                                    <img 
                                                        src={clinic.primary_image_url} 
                                                        alt={clinic.name}
                                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <ImageIcon className="text-gray-300" size={20} />
                                                )}
                                                {clinic.tier === 'premium' && (
                                                    <div className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border border-white shadow-sm" title="Premium Clinic"></div>
                                                )}
                                            </Link>
                                        </td>
                                        <td className="p-4 text-nowrap">
                                            <Link href={`/admin/kliniker/${clinic.slug}?returnPage=${currentPage}`} className="group">
                                                <div className="font-bold text-gray-900 group-hover:text-primary transition-colors group-hover:underline">{clinic.name}</div>
                                                <div className="text-sm text-gray-500 hidden sm:block">{clinic.slug}</div>
                                            </Link>
                                        </td>
                                        <td className="p-4 text-gray-600 hidden sm:table-cell">{clinic.city}</td>
                                        <td className="p-4 hidden md:table-cell">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize
                        ${clinic.tier === 'premium' ? 'bg-rose-100 text-rose-700' :
                                                    clinic.tier === 'verified' ? 'bg-purple-100 text-purple-700' :
                                                        'bg-gray-100 text-gray-600'}`
                                            }>
                                                {clinic.tier}
                                            </span>
                                        </td>
                                        <td className="p-4 hidden lg:table-cell">
                                            <div className="flex flex-wrap gap-1">
                                                {!clinic.primary_image_url && <span className="bg-yellow-50 text-yellow-700 text-[10px] px-1.5 py-0.5 rounded border border-yellow-200" title="Saknar omslagsbild">Bild</span>}
                                                {!clinic.description && <span className="bg-yellow-50 text-yellow-700 text-[10px] px-1.5 py-0.5 rounded border border-yellow-200" title="Saknar beskrivning">Text</span>}
                                                {(!clinic.treatments || clinic.treatments.length === 0) && <span className="bg-yellow-50 text-yellow-700 text-[10px] px-1.5 py-0.5 rounded border border-yellow-200" title="Saknar behandlingar">Behandl.</span>}
                                                {!clinic.booking_url && <span className="bg-yellow-50 text-yellow-700 text-[10px] px-1.5 py-0.5 rounded border border-yellow-200" title="Saknar bokningslänk">Bokning</span>}
                                                {clinic.primary_image_url && clinic.description && clinic.booking_url && clinic.treatments && clinic.treatments.length > 0 && <span className="text-green-500 text-xs flex items-center gap-1">✓ <span className="hidden xl:inline">Komplett</span></span>}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            {clinic.is_verified ? (
                                                <span className="text-blue-600 font-medium text-sm flex items-center gap-1">✓ <span className="hidden sm:inline">Verifierad</span></span>
                                            ) : (
                                                <span className="text-gray-400 text-sm">Ej verifierad</span>
                                            )}
                                        </td>
                                        <td className="p-4 flex gap-2 justify-end">
                                            <Link href={`/admin/kliniker/${clinic.slug}?returnPage=${currentPage}`} className="p-2 text-gray-400 hover:text-primary transition-colors">
                                                <Edit size={18} />
                                            </Link>
                                            <DeleteClinicButton id={clinic.id} clinicName={clinic.name} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Suspense fallback={<div className="h-16 mt-4 w-full bg-gray-100 rounded-xl animate-pulse"></div>}>
                <AdminPagination totalItems={totalItems} currentPage={currentPage} itemsPerPage={itemsPerPage} />
            </Suspense>
        </div>
    );
}
