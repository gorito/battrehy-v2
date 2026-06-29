'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClinicAction } from '@/lib/supabase/actions/mutations';
import { fetchClinicMetadataAction } from '@/lib/supabase/actions/enrichment';

interface CreateClinicFormProps {
    cities: string[];
    allTreatments?: any[];
}

export default function CreateClinicForm({ cities, allTreatments = [] }: CreateClinicFormProps) {
  const [cityList, setCityList] = useState<string[]>(cities);
  const [showAddCityModal, setShowAddCityModal] = useState(false);
  const [newCityName, setNewCityName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [magicUrl, setMagicUrl] = useState('');
    const [magicError, setMagicError] = useState('');
    const [magicSuccess, setMagicSuccess] = useState('');
    
    // Form state
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [bookingUrl, setBookingUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState('');

    const handleMagicFetch = async () => {
        if (!magicUrl) return;
        setIsLoading(true);
        setMagicError('');
        setMagicSuccess('');
        
        try {
            const res = await fetchClinicMetadataAction(magicUrl);
            if (res.success && res.data) {
                // Auto-fill available fields
                if (res.data.name) setName(res.data.name);
                if (res.data.description) setDescription(res.data.description);
                if (res.data.phone) setPhone(res.data.phone);
                if (res.data.address) setAddress(res.data.address);
                
                // If it was a bokadirekt URL, put it in bookingUrl. 
                // If it was a private site, put it in website.
                if (magicUrl.includes('bokadirekt.se')) {
                    setBookingUrl(magicUrl);
                } else {
                    setWebsite(magicUrl);
                }

                // Temporary storing the image to pass it to the final form
                if (res.data.image) {
                    setImageUrl(res.data.image);
                }

                // Auto-check the treatments that were found
                if (res.data.matched_treatment_slugs && res.data.matched_treatment_slugs.length > 0) {
                    const matchedIds = allTreatments
                        .filter(t => res.data.matched_treatment_slugs.includes(t.slug))
                        .map(t => t.id);
                    
                    setTimeout(() => {
                        const checkboxes = document.querySelectorAll('input[name="treatment_ids"]');
                        checkboxes.forEach((cb) => {
                            const input = cb as HTMLInputElement;
                            if (matchedIds.includes(input.value)) {
                                input.checked = true;
                            }
                        });
                        
                        setMagicSuccess(`Hittade kontaktuppgifter och matchade ${matchedIds.length} behandlingar!`);
                    }, 100);
                } else {
                    setMagicSuccess(`Hittade kontaktuppgifter men inga behandlingar kunde matchas.`);
                }
            } else {
                setMagicError(res.error || 'Kunde inte hämta data ifrån denna URL.');
            }
        } catch (error) {
            setMagicError('Ett oväntat fel uppstod.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveError('');
        const formData = new FormData(e.currentTarget);
        try {
            const res = await createClinicAction(formData);
            if (res && res.error) {
                setSaveError(res.error);
                setIsSaving(false);
            }
        } catch (error: any) {
            setSaveError(error.message || 'Ett oväntat fel uppstod.');
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* MAGIC AUTOFILL BOX */}
            <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
                <h2 className="text-lg font-bold text-rose-900 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    Snabbuppläggning med auto-fyll
                </h2>
                <p className="text-sm text-rose-700 mb-4">
                    Klistra in en webbadress (t.ex. klinikens egen hemsida eller deras Bokadirekt-länk) och klicka på Hämta så fyller vi automatiskt in fälten nedan.
                </p>
                
                <div className="flex gap-2">
                    <input 
                        type="url" 
                        value={magicUrl}
                        onChange={(e) => setMagicUrl(e.target.value)}
                        placeholder="https://www.superiorart.se/"
                        className="flex-1 border border-rose-200 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleMagicFetch(); } }}
                    />
                    <button 
                        type="button"
                        disabled={isLoading || !magicUrl}
                        onClick={handleMagicFetch}
                        className="bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
                    >
                        {isLoading ? 'Hämtar...' : 'Hämta Info'}
                    </button>
                </div>
                {magicError && <p className="text-red-600 text-sm mt-2">{magicError}</p>}
                {magicSuccess && <p className="text-green-700 bg-green-50 p-2 rounded text-sm mt-2">{magicSuccess}</p>}
                {imageUrl && <p className="text-xs text-green-700 mt-2 font-medium">Bannern lyckades hämtas (gömd tills du sparar).</p>}
            </div>

            {saveError && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4">
                    <p className="font-semibold text-sm">{saveError}</p>
                </div>
            )}

            {/* ACTUAL FORM */}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                {/* Hidden input to securely submit the fetched image url */}
                <input type="hidden" name="primary_image_url" value={imageUrl} />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kliniknamn *</label>
                    <input
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        placeholder="T.ex. Stockholm Beauty Clinic"
                    />
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stad *</label>
                    <div className="flex items-center">
                        <input
                            name="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            list="cities-list"
                            type="text"
                            className="flex-1 border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                            placeholder="Skriv stad (t.ex. Uppsala) eller välj från listan"
                            autoComplete="off"
                        />
                        <button type="button" onClick={() => setShowAddCityModal(true)} className="ml-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
                            Lägg till ny stad
                        </button>
                    </div>
                    <datalist id="cities-list">
                        {cityList.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </datalist>
                </div>
                {/* Add City Modal */}
                {showAddCityModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Lägg till ny stad</h2>
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                if (!newCityName.trim()) return;
                                const res = await fetch('/api/cities', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ name: newCityName.trim() })
                                });
                                if (res.ok) {
                                    setCityList(prev => [...prev, newCityName.trim()]);
                                    setNewCityName('');
                                    setShowAddCityModal(false);
                                } else {
                                    alert('Kunde inte lägga till staden.');
                                }
                            }} className="space-y-4">
                                <input
                                    type="text"
                                    value={newCityName}
                                    onChange={(e) => setNewCityName(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Stadens namn"
                                    required
                                />
                                <div className="flex justify-end space-x-2">
                                    <button type="button" onClick={() => setShowAddCityModal(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Avbryt</button>
                                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover">Lägg till</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kort beskrivning</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={6}
                        className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        placeholder="Beskriv kliniken och vad de är experter på..."
                    ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adress</label>
                        <input
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                        <input
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="text"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hemsida (URL)</label>
                        <input
                            name="website"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            type="url"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                            placeholder="https://"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bokningslänk (URL)</label>
                        <input
                            name="booking_url"
                            value={bookingUrl}
                            onChange={(e) => setBookingUrl(e.target.value)}
                            type="url"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                            placeholder="https://bokadirekt.se/..."
                        />
                    </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Behandlingar (Manuellt val)</h3>
                    <p className="text-sm text-gray-500 mb-4">Välj de behandlingar som kliniken erbjuder. (Skrivs över om du klickar på Berika från Bokadirekt)</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {allTreatments.map((t: any) => (
                            <label key={t.id} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                                <input
                                    type="checkbox"
                                    name="treatment_ids"
                                    value={t.id}
                                    className="w-4 h-4 text-rose-500 rounded border-gray-300 focus:ring-rose-500"
                                />
                                <span className="text-sm font-medium text-gray-700">{t.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Status & Medlemskap</h3>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_shr_member"
                                name="is_shr_member"
                                className="w-5 h-5 text-rose-500 rounded border-gray-300 focus:ring-rose-500"
                            />
                            <label htmlFor="is_shr_member" className="text-sm font-medium text-gray-700">Auktoriserad SHR-medlem?</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_rfem_member"
                                name="is_rfem_member"
                                className="w-5 h-5 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
                            />
                            <label htmlFor="is_rfem_member" className="text-sm font-medium text-gray-700">RFEM-medlem?</label>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="bg-primary hover:bg-primary-hover disabled:opacity-50 text-white px-8 py-3 rounded-lg font-bold transition-colors"
                    >
                        {isSaving ? 'Sparar...' : 'Spara Klinik'}
                    </button>
                </div>
            </form>
        </div>
    );
}
