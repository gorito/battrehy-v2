import { getTreatments } from '@/lib/supabase/actions/queries';
import Link from 'next/link';
import { Edit } from 'lucide-react';
import { Treatment } from '@/lib/supabase/types';

export default async function AdminTreatmentsPage() {
    const treatments = await getTreatments();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Hantera behandlingar</h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Bild</th>
                            <th className="p-4 font-semibold text-gray-600">Namn</th>
                            <th className="p-4 font-semibold text-gray-600">Beskrivning</th>
                            <th className="p-4 font-semibold text-gray-600 text-right">Åtgärder</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {treatments.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">
                                    Inga behandlingar hittades. Kör SQL-skriptet för att lägga till basutbudet!
                                </td>
                            </tr>
                        ) : (
                            treatments.map((treatment: Treatment) => (
                                <tr key={treatment.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 w-24">
                                        {treatment.image_url ? (
                                            <div
                                                className="w-16 h-16 rounded-lg bg-cover bg-center border border-gray-200"
                                                style={{ backgroundImage: `url(${treatment.image_url})` }}
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-xs text-gray-400">
                                                Ingen bild
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4 font-bold text-gray-900 w-1/4">
                                        {treatment.name}
                                    </td>
                                    <td className="p-4 text-gray-600 text-sm max-w-xs truncate">
                                        {treatment.description || <span className="text-gray-400 italic">Ingen beskrivning (rollover) satt ännu...</span>}
                                    </td>
                                    <td className="p-4 text-right">
                                        <Link
                                            href={`/admin/behandlingar/${treatment.slug}`}
                                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-charcoal-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                                        >
                                            <Edit size={16} /> Redigera
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
