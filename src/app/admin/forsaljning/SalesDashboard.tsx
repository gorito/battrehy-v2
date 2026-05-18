'use client';

import React, { useState } from 'react';
import { updateClinicSalesInfoAction } from '@/lib/supabase/actions/mutations';
import { getClinicStats } from '@/lib/supabase/actions/analytics';
import { Search, Save, CheckCircle2, XCircle, ChevronDown, ChevronUp, BarChart2, Globe, Calendar } from 'lucide-react';
import { slugifyCity } from '@/lib/utils';

type Clinic = any; // Using any to avoid strict type issues with the new columns

const STATUS_OPTIONS = [
    { value: 'not_contacted', label: 'Ej kontaktad' },
    { value: 'contacted', label: 'Kontaktad (Mail/Samtal)' },
    { value: 'in_progress', label: 'Förhandling / Följ upp' },
    { value: 'premium', label: '🌟 Kund (Premium)' },
    { value: 'not_interested', label: 'Ej intresserad' },
];

export default function SalesDashboard({ initialClinics }: { initialClinics: Clinic[] }) {
    const [clinics, setClinics] = useState<Clinic[]>(initialClinics);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    
    // Track saving state per clinic
    const [savingId, setSavingId] = useState<string | null>(null);
    
    // Analytics expansion state
    const [expandedClinicId, setExpandedClinicId] = useState<string | null>(null);
    const [clinicStats, setClinicStats] = useState<Record<string, {views: number, website_clicks: number, booking_clicks: number} | 'loading'>>({});

    const toggleExpand = async (id: string) => {
        if (expandedClinicId === id) {
            setExpandedClinicId(null);
            return;
        }
        
        setExpandedClinicId(id);
        
        if (!clinicStats[id]) {
            setClinicStats(prev => ({ ...prev, [id]: 'loading' }));
            const stats = await getClinicStats(id);
            if (stats.success) {
                setClinicStats(prev => ({ ...prev, [id]: stats.data }));
            }
        }
    };

    const handleUpdate = async (id: string, field: string, value: string) => {
        // Optimistic update locally
        setClinics(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
        
        setSavingId(id);
        const result = await updateClinicSalesInfoAction(id, { [field]: value });
        setSavingId(null);
        
        if (!result.success) {
            alert('Kunde inte spara ändringen. Ladda om sidan och försök igen.');
        }
    };

    const filteredClinics = clinics.filter(c => {
        const matchesSearch = (c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              c.city?.toLowerCase().includes(searchTerm.toLowerCase()));
        const cStatus = c.sales_status || 'not_contacted';
        const matchesStatus = filterStatus === 'all' || cStatus === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
            {/* Filters */}
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 bg-gray-50">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Sök på klinik eller stad..." 
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <select 
                    className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                >
                    <option value="all">Alla statusar</option>
                    {STATUS_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <div className="ml-auto text-sm text-gray-500 self-center font-medium">
                    Visar {filteredClinics.length} av {clinics.length} kliniker
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-gray-100 text-gray-600 sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="px-4 py-3 font-semibold">Klinik & Stad</th>
                            <th className="px-4 py-3 font-semibold">Status</th>
                            <th className="px-4 py-3 font-semibold">Kontaktperson</th>
                            <th className="px-4 py-3 font-semibold">Email & Telefon</th>
                            <th className="px-4 py-3 font-semibold w-1/3">Anteckningar</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredClinics.map(clinic => (
                            <React.Fragment key={clinic.id}>
                            <tr className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-4 py-4 cursor-pointer" onClick={() => toggleExpand(clinic.id)}>
                                    <div className="flex items-center gap-2">
                                        <div className="font-bold text-gray-900 truncate max-w-[200px]">{clinic.name}</div>
                                        {expandedClinicId === clinic.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                                    </div>
                                    <div className="text-gray-500 text-xs mt-1">{clinic.city}</div>
                                    <div className="flex items-center gap-3 mt-1" onClick={(e) => e.stopPropagation()}>
                                        <a href={`/kliniker/${slugifyCity(clinic.city || '')}/${clinic.slug}`} target="_blank" className="text-rose-500 hover:underline text-xs inline-block">Visa profil ↗</a>
                                        <a href={`/admin/kliniker/${clinic.slug}`} className="text-blue-500 hover:underline text-xs inline-block">Redigera ✏️</a>
                                    </div>
                                </td>
                                
                                <td className="px-4 py-4">
                                    <select 
                                        className={`border rounded-md px-2 py-1.5 text-xs font-medium outline-none cursor-pointer
                                            ${(!clinic.sales_status || clinic.sales_status === 'not_contacted') ? 'bg-gray-100 border-gray-300 text-gray-600' : ''}
                                            ${clinic.sales_status === 'contacted' ? 'bg-blue-50 border-blue-200 text-blue-700' : ''}
                                            ${clinic.sales_status === 'in_progress' ? 'bg-orange-50 border-orange-200 text-orange-700' : ''}
                                            ${clinic.sales_status === 'premium' ? 'bg-green-50 border-green-200 text-green-700' : ''}
                                            ${clinic.sales_status === 'not_interested' ? 'bg-red-50 border-red-200 text-red-700' : ''}
                                        `}
                                        value={clinic.sales_status || 'not_contacted'}
                                        onChange={(e) => handleUpdate(clinic.id, 'sales_status', e.target.value)}
                                    >
                                        {STATUS_OPTIONS.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </td>

                                <td className="px-4 py-4">
                                    <input 
                                        type="text" 
                                        placeholder="Namn..."
                                        className="w-32 border border-transparent hover:border-gray-300 focus:border-rose-500 rounded px-2 py-1 outline-none transition-colors bg-transparent focus:bg-white"
                                        defaultValue={clinic.contact_name || ''}
                                        onBlur={(e) => {
                                            if (e.target.value !== clinic.contact_name) {
                                                handleUpdate(clinic.id, 'contact_name', e.target.value);
                                            }
                                        }}
                                    />
                                </td>

                                <td className="px-4 py-4 space-y-2">
                                    <div>
                                        <input 
                                            type="text" 
                                            placeholder="E-post..."
                                            className={`w-40 border border-transparent hover:border-gray-300 focus:border-rose-500 rounded px-2 py-1 outline-none transition-colors bg-transparent focus:bg-white ${clinic.email_status === 'invalid' ? 'text-red-500 line-through' : ''}`}
                                            defaultValue={clinic.email || ''}
                                            onBlur={(e) => {
                                                if (e.target.value !== clinic.email) {
                                                    handleUpdate(clinic.id, 'email', e.target.value);
                                                }
                                            }}
                                        />
                                        {clinic.email_status === 'valid' && <span className="text-green-500 text-xs ml-1" title="Verifierad">✓</span>}
                                    </div>
                                    <div>
                                        <input 
                                            type="text" 
                                            placeholder="Telefon..."
                                            className="w-40 border border-transparent hover:border-gray-300 focus:border-rose-500 rounded px-2 py-1 outline-none transition-colors bg-transparent focus:bg-white text-xs text-gray-600"
                                            defaultValue={clinic.phone || ''}
                                            onBlur={(e) => {
                                                if (e.target.value !== clinic.phone) {
                                                    handleUpdate(clinic.id, 'phone', e.target.value);
                                                }
                                            }}
                                        />
                                    </div>
                                </td>

                                <td className="px-4 py-4 w-full">
                                    <div className="relative flex items-center">
                                        <textarea 
                                            placeholder="Skriv anteckningar här... (Sparas automatiskt när du klickar utanför)"
                                            className="w-full min-w-[250px] border border-gray-200 hover:border-gray-300 focus:border-rose-500 rounded-lg px-3 py-2 outline-none transition-colors resize-y min-h-[60px] text-xs bg-gray-50 focus:bg-white"
                                            defaultValue={clinic.sales_notes || ''}
                                            onBlur={(e) => {
                                                if (e.target.value !== clinic.sales_notes) {
                                                    handleUpdate(clinic.id, 'sales_notes', e.target.value);
                                                }
                                            }}
                                        />
                                        {savingId === clinic.id && (
                                            <span className="absolute right-2 top-2 text-rose-500 flex items-center gap-1 text-xs font-bold animate-pulse">
                                                <Save size={12} /> Sparar...
                                            </span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                            
                            {expandedClinicId === clinic.id && (
                                <tr className="bg-gray-50/80 border-b-2 border-gray-100">
                                    <td colSpan={5} className="px-8 py-6">
                                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                            <div className="flex items-center gap-2 mb-4">
                                                <BarChart2 className="text-rose-500" size={20} />
                                                <h3 className="text-lg font-bold text-gray-900">Statistik för {clinic.name}</h3>
                                            </div>
                                            
                                            {clinicStats[clinic.id] === 'loading' ? (
                                                <div className="text-gray-500 text-sm animate-pulse">Hämtar data...</div>
                                            ) : clinicStats[clinic.id] ? (
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Profilvisningar</div>
                                                        <div className="text-2xl font-bold text-gray-900">{(clinicStats[clinic.id] as any).views}</div>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex flex-col">
                                                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1 flex items-center gap-1">
                                                            <Globe size={12} /> Hemsida-klick
                                                        </div>
                                                        <div className="text-2xl font-bold text-gray-900">{(clinicStats[clinic.id] as any).website_clicks}</div>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex flex-col">
                                                        <div className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1 flex items-center gap-1">
                                                            <Calendar size={12} /> Boknings-klick
                                                        </div>
                                                        <div className="text-2xl font-bold text-gray-900">{(clinicStats[clinic.id] as any).booking_clicks}</div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-gray-500 text-sm">Kunde inte hämta statistik.</div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                            </React.Fragment>
                        ))}
                        {filteredClinics.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                                    Inga kliniker hittades som matchar din sökning.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
