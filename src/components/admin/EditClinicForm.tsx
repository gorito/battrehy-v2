'use client';

import { useState } from 'react';
import Link from 'next/link';
import { updateClinicAction } from '@/lib/supabase/actions/mutations';
import ImageUpload from '@/components/admin/ImageUpload';
import EnrichButton from '@/components/admin/EnrichButton';
import DeleteClinicButton from '@/components/admin/DeleteClinicButton';

interface EditClinicFormProps {
    clinic: any;
    uniqueCities: string[];
    returnPage?: string;
}

export default function EditClinicForm({ clinic, uniqueCities, returnPage = '1' }: EditClinicFormProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveError('');
        const formData = new FormData(e.currentTarget);
        
        try {
            const res = await updateClinicAction(formData);
            if (res && res.error) {
                setSaveError(res.error);
                setIsSaving(false);
            } else {
                setShowSuccess(true);
                setIsSaving(false);
                // Hide success message after 5 seconds
                setTimeout(() => setShowSuccess(false), 5000);
            }
        } catch (error: any) {
            setSaveError(error.message || 'Ett oväntat fel uppstod vid uppdatering.');
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            {showSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 mb-6 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">✅</span>
                        <p className="font-semibold text-sm">Ändringarna har sparats!</p>
                    </div>
                </div>
            )}

            {saveError && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 mb-6">
                    <p className="font-semibold text-sm">{saveError}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="id" value={clinic.id} />
                <input type="hidden" name="slug" value={clinic.slug} />

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kliniknamn *</label>
                        <input
                            name="name"
                            required
                            type="text"
                            defaultValue={clinic.name}
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stad *</label>
                        <select
                            name="city"
                            required
                            defaultValue={clinic.city}
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        >
                            {uniqueCities.map((city: string) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kort beskrivning (SEO)</label>
                    <textarea
                        name="description"
                        rows={4}
                        defaultValue={clinic.description || ''}
                        className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        placeholder="Beskriv kliniken och vad de är experter på..."
                    ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adress</label>
                        <input
                            name="address"
                            type="text"
                            defaultValue={clinic.address || ''}
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                        <input
                            name="phone"
                            type="text"
                            defaultValue={clinic.phone || ''}
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hemsida (URL)</label>
                        <input
                            name="website"
                            type="url"
                            defaultValue={clinic.website || ''}
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                            placeholder="https://"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bokningslänk (URL)</label>
                        <input
                            name="booking_url"
                            type="url"
                            defaultValue={clinic.booking_url || ''}
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                            placeholder="https://bokadirekt.se/..."
                        />
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-6">
                    <h3 className="font-semibold text-gray-900 mb-4 pb-4 border-b border-gray-200">Bilder</h3>
                    <div className="mb-6">
                        <ImageUpload
                            name="primary_image_url"
                            label="Omslagsbild (Visas i sökresultat och överst på profilen)"
                            defaultValue={clinic.primary_image_url || ''}
                            folder={clinic.id}
                        />
                    </div>

                    {clinic.tier !== 'free' ? (
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">Galleri (Endast Premium/Verifierad)</h4>
                            <p className="text-sm text-gray-500 mb-4">Ladda upp upp till 6 extra bilder som visas på klinikens profilsida.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {[1, 2, 3, 4, 5, 6].map((idx) => {
                                    const existingImage = clinic.images?.find((img: any) => img.sort_order === idx);
                                    return (
                                        <ImageUpload
                                            key={idx}
                                            name={`gallery_image_${idx}`}
                                            label={`Bild ${idx}`}
                                            defaultValue={existingImage?.url || ''}
                                            folder={`${clinic.id}/gallery`}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                            <p className="text-sm text-gray-500">
                                Vill du lägga till ett bildgalleri? Uppgradera listningen till Premium eller Verifierad nedan.
                            </p>
                        </div>
                    )}
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 mt-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 pb-1">Behandlingar (Kategorier)</h3>
                            <p className="text-sm text-gray-500">De huvudkategorier som kliniken är kopplad till.</p>
                        </div>
                        <EnrichButton clinicId={clinic.id} bookingUrl={clinic.booking_url || clinic.website} />
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {clinic.treatments && clinic.treatments.length > 0 ? (
                            clinic.treatments.map((t: any) => (
                                <span key={t.id} className="bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-sm font-medium border border-rose-100">
                                    {t.name}
                                </span>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400 italic">Inga behandlingar tillagda ännu. Klicka på "Berika" för att hämta från Bokadirekt.</p>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 mt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Medlemskap och Status</h3>

                    <div className="flex items-center gap-6">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Synlighet & Ranking (Tier)</label>
                            <select
                                name="tier"
                                defaultValue={clinic.tier}
                                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                            >
                                <option value="free">Free (Standard listning)</option>
                                <option value="premium">Premium (Högre ranking)</option>
                                <option value="verified">Premium + Verified (Högst ranking)</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2 pt-6">
                            <input
                                type="checkbox"
                                id="is_shr_member"
                                name="is_shr_member"
                                defaultChecked={clinic.is_shr_member}
                                className="w-5 h-5 text-rose-500 rounded border-gray-300 focus:ring-rose-500"
                            />
                            <label htmlFor="is_shr_member" className="text-sm font-medium text-gray-700">Auktoriserad SHR-medlem?</label>
                        </div>

                        <div className="flex items-center gap-2 pt-6">
                            <input
                                type="checkbox"
                                id="is_verified"
                                name="is_verified"
                                defaultChecked={clinic.is_verified}
                                className="w-5 h-5 text-rose-500 rounded border-gray-300 focus:ring-rose-500"
                            />
                            <label htmlFor="is_verified" className="text-sm font-medium text-gray-700">Är Verifierad Bättrehy-klinik?</label>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                    <Link
                        href={`/kliniker/${clinic.city}/${clinic.slug}`}
                        target="_blank"
                        className="text-primary hover:underline text-sm font-medium"
                    >
                        Visa publik profilsida &rarr;
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            href={`/admin/kliniker?page=${returnPage}`}
                            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-bold transition-colors"
                        >
                            Stäng
                        </Link>
                        <DeleteClinicButton 
                            id={clinic.id} 
                            clinicName={clinic.name} 
                            variant="button" 
                            redirectOnDelete={true} 
                        />
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="bg-primary hover:bg-primary-hover disabled:opacity-50 text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-lg shadow-rose-100"
                        >
                            {isSaving ? 'Sparar...' : 'Spara Ändringar'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
