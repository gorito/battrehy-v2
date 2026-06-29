'use client';

import React, { useState, useEffect } from 'react';
import { toggleGBPChecklistItemAction } from '@/lib/supabase/actions/mutations';
import { CheckSquare, Square, CheckCircle, RefreshCw, AlertCircle, Sparkles, MapPin, Search } from 'lucide-react';

interface Clinic {
    id: string;
    name: string;
    city: string;
    slug: string;
}

interface ChecklistItem {
    id: string;
    title: string;
    description: string;
    category: 'basic' | 'content' | 'reviews' | 'advanced';
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
    // Grundläggande
    { id: 'gbp_claimed', title: 'Äganderätt bekräftad', description: 'Profilen är registrerad och bekräftad hos Google.', category: 'basic' },
    { id: 'correct_name', title: 'Korrekt kliniknamn', description: 'Namnet matchar klinikens verkliga namn utan sökords-spam.', category: 'basic' },
    { id: 'correct_category', title: 'Rätt primärkategori', description: 'Primärkategorin är inställd på t.ex. "Skönhetsklinik" eller "Hudvårdsklinik".', category: 'basic' },
    { id: 'address_matches', title: 'Adressen stämmer exakt', description: 'Fysisk adress stämmer med hemsidan och är exakt utplacerad på kartan.', category: 'basic' },
    { id: 'opening_hours', title: 'Uppdaterade öppettider', description: 'Ordinarie och avvikande öppettider är korrekt inställda.', category: 'basic' },
    
    // Innehåll & Profilering
    { id: 'website_link', title: 'Länk till hemsida', description: 'Korrekt webbadress inlagd med UTM-taggning för spårning.', category: 'content' },
    { id: 'booking_link', title: 'Direktlänk till bokning', description: 'Bokningslänk inlagd under tidsboknings-fältet i profilen.', category: 'content' },
    { id: 'business_description', title: 'Optimerad beskrivning', description: 'Beskrivning upp till 750 tecken som beskriver unika fördelar och behandlingar.', category: 'content' },
    { id: 'services_list', title: 'Komplett lista över behandlingar', description: 'Alla estetiska tjänster (botox, fillers, etc.) är tillagda under Tjänster.', category: 'content' },
    { id: 'photos_interior_exterior', title: 'Bilder på klinik och personal', description: 'Foton på interiör, exteriör samt logotyp är uppladdade i hög kvalitet.', category: 'content' },

    // Recensioner & Engagemang
    { id: 'review_strategy', title: 'Strategi för recensioner', description: 'Kliniken ber aktivt kunder om recensioner på Google.', category: 'reviews' },
    { id: 'reviews_answered', title: 'Alla recensioner besvaras', description: 'Både positiva och negativa recensioner besvaras professionellt.', category: 'reviews' },
    
    // Avancerat
    { id: 'google_posts', title: 'Google-inlägg (Google Updates)', description: 'Kliniken publicerar uppdateringar eller erbjudanden regelbundet.', category: 'advanced' },
    { id: 'faq_setup', title: 'Vanliga frågor (Q&A) tillagda', description: 'Kliniken har lagt till vanliga frågor och svar direkt på Google-sökningen.', category: 'advanced' }
];

export default function GoogleSynlighetDashboard({ clinics }: { clinics: Clinic[] }) {
    const [selectedClinicId, setSelectedClinicId] = useState<string>('');
    const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Pre-select first clinic if available
    useEffect(() => {
        if (clinics.length > 0) {
            setSelectedClinicId(clinics[0].id);
        }
    }, [clinics]);

    // Fetch checklist state when selected clinic changes
    useEffect(() => {
        if (!selectedClinicId) return;

        async function fetchChecklist() {
            setLoading(true);
            setMessage(null);
            try {
                // We use dynamic fetch here
                const res = await fetch(`/api/checklist?clinicId=${selectedClinicId}`);
                if (!res.ok) throw new Error('Kunde inte hämta checklistan');
                const data = await res.json();
                
                const state: Record<string, boolean> = {};
                CHECKLIST_ITEMS.forEach(item => {
                    const found = data.find((d: any) => d.item_id === item.id);
                    state[item.id] = found ? found.completed : false;
                });
                setChecklistState(state);
            } catch (err: any) {
                console.error(err);
                setMessage({ type: 'error', text: 'Ett fel uppstod när checklistan skulle hämtas.' });
            } finally {
                setLoading(false);
            }
        }

        fetchChecklist();
    }, [selectedClinicId]);

    const handleToggle = async (itemId: string, currentVal: boolean) => {
        if (!selectedClinicId) return;
        setUpdatingItemId(itemId);
        
        try {
            const newVal = !currentVal;
            const res = await toggleGBPChecklistItemAction(selectedClinicId, itemId, newVal);
            
            if (res.success) {
                setChecklistState(prev => ({ ...prev, [itemId]: newVal }));
            } else {
                throw new Error(res.error);
            }
        } catch (err: any) {
            console.error(err);
            setMessage({ type: 'error', text: 'Kunde inte spara framsteg. Försök igen.' });
        } finally {
            setUpdatingItemId(null);
        }
    };

    // Filter clinics based on search
    const filteredClinics = clinics.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate progress stats
    const totalItems = CHECKLIST_ITEMS.length;
    const completedItems = Object.values(checklistState).filter(Boolean).length;
    const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    const renderCategory = (category: 'basic' | 'content' | 'reviews' | 'advanced', title: string, colorClass: string) => {
        const items = CHECKLIST_ITEMS.filter(item => item.category === category);
        return (
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-8 rounded-full ${colorClass}`} />
                    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                </div>

                <div className="divide-y divide-gray-50">
                    {items.map(item => {
                        const isCompleted = checklistState[item.id] || false;
                        const isUpdating = updatingItemId === item.id;

                        return (
                            <div 
                                key={item.id} 
                                onClick={() => !isUpdating && handleToggle(item.id, isCompleted)}
                                className={`py-4 flex gap-4 items-start cursor-pointer hover:bg-gray-50/50 px-2 rounded-xl transition-colors select-none ${isCompleted ? 'opacity-80' : ''}`}
                            >
                                <div className="mt-1 flex-shrink-0">
                                    {isUpdating ? (
                                        <RefreshCw size={22} className="text-rose-500 animate-spin" />
                                    ) : isCompleted ? (
                                        <CheckSquare size={22} className="text-rose-500" />
                                    ) : (
                                        <Square size={22} className="text-gray-300 hover:text-gray-400" />
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <h4 className={`font-semibold text-sm md:text-base ${isCompleted ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                                        {item.title}
                                    </h4>
                                    <p className="text-xs md:text-sm text-gray-500">{item.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 flex items-center gap-2">
                        Google-synlighet <Sparkles size={28} className="text-yellow-500 fill-yellow-500" />
                    </h1>
                    <p className="text-gray-500 mt-1">Styr och optimera Google Business Profile-synlighet för anslutna experter.</p>
                </div>
            </div>

            {/* Clinic Selector Dropdown & Search Panel */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 items-end">
                <div className="w-full md:w-1/2 space-y-2">
                    <label className="text-sm font-bold text-gray-700 block">Sök klinik</label>
                    <div className="relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Sök klinik efter namn eller stad..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all outline-none text-sm"
                        />
                    </div>
                </div>

                <div className="w-full md:w-1/2 space-y-2">
                    <label className="text-sm font-bold text-gray-700 block">Välj klinik att konfigurera</label>
                    <select
                        value={selectedClinicId}
                        onChange={(e) => setSelectedClinicId(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all outline-none text-sm font-semibold text-gray-900"
                    >
                        {filteredClinics.length === 0 ? (
                            <option value="">Inga kliniker matchar din sökning</option>
                        ) : (
                            filteredClinics.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name} ({c.city})
                                </option>
                            ))
                        )}
                    </select>
                </div>
            </div>

            {message && (
                <div className={`p-4 rounded-2xl text-sm font-medium flex items-center gap-3 ${
                    message.type === 'success' 
                        ? 'bg-green-50 text-green-700 border border-green-100' 
                        : 'bg-red-50 text-red-700 border border-red-100'
                }`}>
                    {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    {message.text}
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <RefreshCw className="animate-spin text-rose-500" size={32} />
                    <p className="text-gray-500 font-medium">Laddar GBP checklistan...</p>
                </div>
            ) : selectedClinicId ? (
                <>
                    {/* Progress Bar Header */}
                    <div className="bg-charcoal-900 text-white p-6 md:p-8 rounded-[2.5rem] shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl -translate-y-12 translate-x-12" />
                        
                        <div className="space-y-2 relative z-10 text-center md:text-left">
                            <span className="text-[10px] bg-[#e8234a] text-white px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                                GBP Status
                            </span>
                            <h2 className="text-2xl font-black mt-2">
                                {clinics.find(c => c.id === selectedClinicId)?.name}
                            </h2>
                            <p className="text-sm text-gray-400 flex items-center justify-center md:justify-start gap-1">
                                <MapPin size={14} className="text-[#e8234a]" />
                                {clinics.find(c => c.id === selectedClinicId)?.city}
                            </p>
                        </div>

                        <div className="w-full md:w-72 space-y-2 relative z-10">
                            <div className="flex justify-between text-sm font-bold">
                                <span>Optimering</span>
                                <span>{progressPercent}% ({completedItems}/{totalItems})</span>
                            </div>
                            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-rose-500 rounded-full transition-all duration-500" 
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Grid of Checklist Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {renderCategory('basic', '1. Grundinställningar', 'bg-blue-500')}
                        {renderCategory('content', '2. Profilering & Innehåll', 'bg-purple-500')}
                        {renderCategory('reviews', '3. Kundomdömen', 'bg-yellow-500')}
                        {renderCategory('advanced', '4. Avancerad synlighet', 'bg-green-500')}
                    </div>
                </>
            ) : (
                <div className="bg-gray-50 border border-gray-200 border-dashed rounded-3xl p-12 text-center text-gray-500">
                    <p className="font-semibold">Välj en klinik ovan för att börja hantera synligheten.</p>
                </div>
            )}
        </div>
    );
}
