'use client';

import { useState } from 'react';
import { enrichClinicTreatmentsAction, enrichClinicFromWebsiteAction } from '@/lib/supabase/actions/enrichment';
import { Sparkles, Globe, Loader2 } from 'lucide-react';

interface Props {
    clinicId: string;
    bookingUrl?: string | null;
}

export default function EnrichButton({ clinicId, bookingUrl }: Props) {
    const [isLoading, setIsLoading] = useState<'none' | 'bokadirekt' | 'website'>('none');
    const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

    const handleEnrichBokadirekt = async () => {
        const bookingInput = document.querySelector('input[name="booking_url"]') as HTMLInputElement;
        const websiteInput = document.querySelector('input[name="website"]') as HTMLInputElement;
        let urlToUse = bookingInput?.value || websiteInput?.value || bookingUrl;

        if (!urlToUse) {
            setMessage({ text: 'Kliniken saknar länk. Klistra in en Bokadirekt-länk i fältet Bokningslänk först.', isError: true });
            return;
        }

        if (!urlToUse.includes('bokadirekt.se')) {
            setMessage({ text: 'Måste vara en giltig Bokadirekt-URL för att berika behandlingar.', isError: true });
            return;
        }

        setIsLoading('bokadirekt');
        setMessage(null);

        try {
            const result = await enrichClinicTreatmentsAction(clinicId, urlToUse);
            setMessage({ text: result.message, isError: false });
        } catch (error: any) {
            setMessage({ text: error.message || 'Något gick fel', isError: true });
        } finally {
            setIsLoading('none');
        }
    };

    const handleEnrichWebsite = async () => {
        const websiteInput = document.querySelector('input[name="website"]') as HTMLInputElement;
        let urlToUse = websiteInput?.value;
        if (!urlToUse && bookingUrl && !bookingUrl.includes('bokadirekt.se')) {
            urlToUse = bookingUrl;
        }

        if (!urlToUse) {
            setMessage({ text: 'Kliniken saknar hemsida. Klistra in en länk i fältet Hemsida ovan först.', isError: true });
            return;
        }

        setIsLoading('website');
        setMessage(null);

        try {
            const result = await enrichClinicFromWebsiteAction(clinicId, urlToUse);
            setMessage({ text: result.message, isError: false });
        } catch (error: any) {
            setMessage({ text: error.message || 'Något gick fel', isError: true });
        } finally {
            setIsLoading('none');
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={handleEnrichBokadirekt}
                    disabled={isLoading !== 'none'}
                    className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-fit"
                >
                    {isLoading === 'bokadirekt' ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                    Berika från Bokadirekt
                </button>
                <button
                    type="button"
                    onClick={handleEnrichWebsite}
                    disabled={isLoading !== 'none'}
                    className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-fit"
                >
                    {isLoading === 'website' ? <Loader2 size={16} className="animate-spin" /> : <Globe size={16} />}
                    Berika från Hemsida
                </button>
            </div>
            {message && (
                <p className={`text-sm mt-1 p-2 rounded-md ${message.isError ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                    {message.text}
                </p>
            )}
        </div>
    );
}
