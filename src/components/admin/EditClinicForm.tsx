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
    allTreatments?: any[];
}

export default function EditClinicForm({ clinic, uniqueCities, returnPage = '1', allTreatments = [] }: EditClinicFormProps) {
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
                
                const oldSlug = clinic.slug;
                const newSlug = res?.newSlug;
                if (newSlug && newSlug !== oldSlug) {
                    // Redirect to the new edit URL
                    window.location.href = `/admin/kliniker/${newSlug}?page=${returnPage}`;
                } else {
                    // Hide success message after 5 seconds
                    setTimeout(() => setShowSuccess(false), 5000);
                }
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
                <input type="hidden" name="oldSlug" value={clinic.slug} />
                <input type="hidden" name="returnPage" value={returnPage} />

                <div className="grid grid-cols-4 gap-4">
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL-Slug *</label>
                        <input
                            name="slug"
                            required
                            type="text"
                            defaultValue={clinic.slug}
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono text-sm"
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stadsdel (Sthlm)</label>
                        <select
                            name="neighborhood"
                            defaultValue={clinic.neighborhood || ''}
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        >
                            <option value="">Ingen</option>
                            <option value="ostermalm">Östermalm</option>
                            <option value="sodermalm">Södermalm</option>
                            <option value="vasastan">Vasastan</option>
                            <option value="stureplan">Stureplan</option>
                            <option value="norrmalm-kungsholmen">Norrmalm / Kungsholmen</option>
                            <option value="gamla-stan">Gamla Stan</option>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">AI Beskrivning (Om kliniken)</label>
                        <textarea
                            name="ai_description"
                            rows={6}
                            defaultValue={clinic.ai_description || ''}
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                            placeholder="AI-genererad beskrivning..."
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">AI FAQ (Vanliga frågor)</label>
                        <textarea
                            name="ai_faq"
                            rows={6}
                            defaultValue={clinic.ai_faq || ''}
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono text-sm"
                            placeholder="**Fråga 1**&#10;Svar 1&#10;&#10;**Fråga 2**&#10;Svar 2"
                        ></textarea>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">AI Meta (Sökresultatsbeskrivning)</label>
                    <input
                        name="ai_meta"
                        type="text"
                        defaultValue={clinic.ai_meta || ''}
                        className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        placeholder="AI-genererad meta-beskrivning..."
                    />
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

                {/* Reco.se section */}
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 mt-2">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-amber-500 text-lg">⭐</span>
                        <h3 className="font-semibold text-gray-900">Reco.se-omdömen</h3>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">Fyll i klinikens betyg och länk från Reco.se. Visas på profilsidan som ett trovärdighetsbevis.</p>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Betyg (t.ex. 4.8)</label>
                            <input
                                name="reco_rating"
                                type="number"
                                step="0.1"
                                min="1"
                                max="5"
                                defaultValue={clinic.reco_rating || ''}
                                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                placeholder="4.8"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Antal omdömen</label>
                            <input
                                name="reco_review_count"
                                type="number"
                                min="0"
                                defaultValue={clinic.reco_review_count || ''}
                                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                placeholder="124"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Reco-länk (URL)</label>
                            <input
                                name="reco_url"
                                type="url"
                                defaultValue={clinic.reco_url || ''}
                                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                placeholder="https://www.reco.se/..."
                            />
                        </div>
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
                            <h3 className="font-semibold text-gray-900 pb-1">Behandlingar (Manuellt val)</h3>
                            <p className="text-sm text-gray-500">Kryssa i de behandlingar kliniken erbjuder. (Skrivs över vid automatisk berikning)</p>
                        </div>
                        <EnrichButton clinicId={clinic.id} bookingUrl={clinic.booking_url || clinic.website} />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                        {allTreatments.length > 0 ? (
                            allTreatments.map((t: any) => {
                                const isSelected = clinic.treatments?.some((ct: any) => ct.id === t.id);
                                return (
                                    <label key={t.id} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                                        <input
                                            type="checkbox"
                                            name="treatment_ids"
                                            value={t.id}
                                            defaultChecked={isSelected}
                                            className="w-4 h-4 text-rose-500 rounded border-gray-300 focus:ring-rose-500"
                                        />
                                        <span className="text-sm font-medium text-gray-700">{t.name}</span>
                                    </label>
                                );
                            })
                        ) : (
                            <p className="text-sm text-gray-400 italic">Inga behandlingar tillgängliga i databasen.</p>
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
                                id="is_rfem_member"
                                name="is_rfem_member"
                                defaultChecked={clinic.is_rfem_member}
                                className="w-5 h-5 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
                            />
                            <label htmlFor="is_rfem_member" className="text-sm font-medium text-gray-700">RFEM-medlem?</label>
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
