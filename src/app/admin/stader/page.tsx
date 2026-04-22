import { getCities } from '@/lib/supabase/actions/queries';
import Link from 'next/link';
import { Edit, MapPin } from 'lucide-react';
import { City } from '@/lib/supabase/types';

export default async function AdminCitiesPage() {
    const cities = await getCities();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Hantera städer</h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600 w-16">Ikon</th>
                            <th className="p-4 font-semibold text-gray-600">Namn</th>
                            <th className="p-4 font-semibold text-gray-600">Beskrivning (SEO)</th>
                            <th className="p-4 font-semibold text-gray-600 text-right">Åtgärder</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {cities.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">
                                    Inga städer hittades i databasen.
                                </td>
                            </tr>
                        ) : (
                            cities.map((city: City) => (
                                <tr key={city.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
                                            <MapPin size={20} />
                                        </div>
                                    </td>
                                    <td className="p-4 font-bold text-gray-900">
                                        {city.name}
                                        <div className="text-xs text-gray-400 font-normal">{city.slug}</div>
                                    </td>
                                    <td className="p-4 text-gray-600 text-sm max-w-md">
                                        {city.description ? (
                                            <div className="line-clamp-2">{city.description}</div>
                                        ) : (
                                            <span className="text-gray-400 italic">Ingen SEO-beskrivning satt ännu...</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <Link
                                            href={`/admin/stader/${city.slug}`}
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
