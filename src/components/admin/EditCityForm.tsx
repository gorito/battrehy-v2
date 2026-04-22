'use client';

import { useState } from 'react';
import Link from 'next/link';
import { updateCityAction } from '@/lib/supabase/actions/mutations';
import { City } from '@/lib/supabase/types';

interface EditCityFormProps {
    city: City;
}

export default function EditCityForm({ city }: EditCityFormProps) {
    const [isSaving, setIsSaving] = useState(false);

    return (
        <form action={updateCityAction} onSubmit={() => setIsSaving(true)} className="space-y-6">
            <input type="hidden" name="id" value={city.id} />
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="grid gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stadsnamn</label>
                        <input
                            name="name"
                            required
                            type="text"
                            defaultValue={city.name}
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                        <p className="text-xs text-gray-400 mt-1">Slug: {city.slug}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">SEO Beskrivning</label>
                        <textarea
                            name="description"
                            rows={10}
                            defaultValue={city.description || ''}
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                            placeholder="Beskriv staden och dess utbud av kliniker för att förbättra sökresultaten..."
                        ></textarea>
                        <p className="text-xs text-gray-400 mt-1">Denna text visas högst upp på stadssidan för besökarna.</p>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                    <Link
                        href="/admin/stader"
                        className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                    >
                        &larr; Avbryt
                    </Link>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="bg-primary hover:bg-primary-hover disabled:opacity-50 text-white px-8 py-3 rounded-lg font-bold transition-colors"
                    >
                        {isSaving ? 'Sparar...' : 'Spara Ändringar'}
                    </button>
                </div>
            </div>
        </form>
    );
}
