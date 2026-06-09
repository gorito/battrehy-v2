'use client';

import { useState } from 'react';
import Papa from 'papaparse';
import { analyzeShrSyncAction, applyShrSyncAction, autoFetchShrAction, CsvClinic, SyncAnalysisResult } from '@/lib/supabase/actions/shr-sync';
import { Check, AlertTriangle, X, Upload, Loader2, Save, DownloadCloud } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ShrSyncClient() {
    const [file, setFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isApplying, setIsApplying] = useState(false);
    const [result, setResult] = useState<SyncAnalysisResult | null>(null);
    const [selectedFuzzyIds, setSelectedFuzzyIds] = useState<Set<string>>(new Set());
    const [error, setError] = useState<string | null>(null);
    const [cityInput, setCityInput] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setResult(null);
            setError(null);
        }
    };

    const handleAutoFetch = async () => {
        if (!cityInput.trim()) {
            setError('Ange en stad först.');
            return;
        }

        setIsFetching(true);
        setError(null);
        setResult(null);

        try {
            const csvClinics = await autoFetchShrAction(cityInput.trim());
            
            if (csvClinics.length === 0) {
                setError(`Hittade inga salonger för "${cityInput}" på SHR.`);
                setIsFetching(false);
                return;
            }

            const analysis = await analyzeShrSyncAction(csvClinics);
            setResult(analysis);
            
            const autoSelected = new Set<string>();
            analysis.fuzzyMatches.forEach(f => {
                if (f.score > 0.8) autoSelected.add(f.dbId);
            });
            setSelectedFuzzyIds(autoSelected);

        } catch (err: any) {
            setError(err.message || 'Ett fel uppstod vid hämtning från SHR.');
        } finally {
            setIsFetching(false);
        }
    };

    const handleAnalyze = () => {
        if (!file) return;

        setIsAnalyzing(true);
        setError(null);

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                try {
                    // Try to guess the columns. Typical headers might be "Name", "City", "Ort", "Namn"
                    const data = results.data as any[];
                    const csvClinics: CsvClinic[] = data.map((row) => {
                        const name = row.Name || row.name || row.Namn || row.namn || row['Klinik'] || row['Företag'] || '';
                        const city = row.City || row.city || row.Ort || row.ort || row['Stad'] || row['Kommun'] || '';
                        return { name: name.trim(), city: city.trim() };
                    }).filter(c => c.name && c.city);

                    if (csvClinics.length === 0) {
                        throw new Error('Kunde inte hitta kolumnerna för Namn och Stad/Ort i CSV-filen. Kolla rubrikerna.');
                    }

                    const analysis = await analyzeShrSyncAction(csvClinics);
                    setResult(analysis);
                    
                    // Pre-select all fuzzy matches (or maybe none?)
                    // Let's pre-select ones with score > 0.8
                    const autoSelected = new Set<string>();
                    analysis.fuzzyMatches.forEach(f => {
                        if (f.score > 0.8) autoSelected.add(f.dbId);
                    });
                    setSelectedFuzzyIds(autoSelected);

                } catch (err: any) {
                    setError(err.message || 'Ett fel uppstod vid tolkning av filen.');
                } finally {
                    setIsAnalyzing(false);
                }
            },
            error: (err) => {
                setError('Fel vid läsning av CSV: ' + err.message);
                setIsAnalyzing(false);
            }
        });
    };

    const toggleFuzzy = (id: string) => {
        const next = new Set(selectedFuzzyIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedFuzzyIds(next);
    };

    const handleApply = async () => {
        if (!result) return;
        setIsApplying(true);
        setError(null);

        try {
            const idsToUpdate = [
                ...result.exactMatches.map(m => m.dbId),
                ...Array.from(selectedFuzzyIds)
            ];

            const res = await applyShrSyncAction(idsToUpdate);
            if (res.success) {
                alert(`Uppdaterade ${res.updatedCount} kliniker med SHR-märkning!`);
                router.push('/admin/kliniker');
            }
        } catch (err: any) {
            setError(err.message || 'Ett fel uppstod vid uppdatering.');
            setIsApplying(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-8">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/kliniker" className="text-gray-500 hover:text-gray-900">&larr; Tillbaka</Link>
                <h1 className="text-3xl font-bold text-gray-900">Synkronisera SHR-medlemmar</h1>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-lg font-semibold mb-4">Alternativ 1: Automatisk Hämtning (Rekommenderas)</h2>
                <p className="text-gray-600 mb-4">
                    Skriv in stadens namn (t.ex. &quot;Stockholm&quot;) så hämtar systemet automatiskt alla salonger från SHR:s databas.
                </p>
                <div className="flex items-center gap-4 max-w-md">
                    <input 
                        type="text" 
                        value={cityInput}
                        onChange={(e) => setCityInput(e.target.value)}
                        placeholder="T.ex. Stockholm"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        onKeyDown={(e) => e.key === 'Enter' && handleAutoFetch()}
                    />
                    <button
                        onClick={handleAutoFetch}
                        disabled={isFetching || !cityInput.trim()}
                        className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 whitespace-nowrap"
                    >
                        {isFetching ? <Loader2 className="animate-spin" size={20} /> : <DownloadCloud size={20} />}
                        Hämta från SHR
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-lg font-semibold mb-4">Alternativ 2: Ladda upp CSV (Reservlösning)</h2>
                <p className="text-gray-600 mb-4 text-sm">
                    Använd detta om den automatiska hämtningen misslyckas. Ladda upp filen du exporterat från Browse AI. Filen måste innehålla kolumner för <strong>Namn</strong> och <strong>Ort/Stad</strong>.
                </p>
                <div className="flex items-center gap-4">
                    <input 
                        type="file" 
                        accept=".csv" 
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                    />
                    <button
                        onClick={handleAnalyze}
                        disabled={!file || isAnalyzing}
                        className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
                    >
                        {isAnalyzing ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                        Analysera
                    </button>
                </div>
                {error && <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>}
            </div>

            {result && (
                <div className="space-y-8">
                    {/* Exact Matches */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-emerald-50 p-4 border-b border-emerald-100 flex items-center gap-2 text-emerald-800 font-semibold">
                            <Check size={20} /> Exakta matchningar ({result.exactMatches.length})
                        </div>
                        <div className="p-4">
                            {result.exactMatches.length === 0 ? (
                                <p className="text-gray-500 text-sm">Inga exakta matchningar hittades.</p>
                            ) : (
                                <p className="text-sm text-gray-600 mb-4">Dessa kliniker matchade exakt och kommer att uppdateras automatiskt.</p>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
                                {result.exactMatches.map((m, i) => (
                                    <div key={i} className="text-sm border border-gray-100 rounded p-2 bg-gray-50">
                                        <span className="font-medium text-gray-900">{m.dbName}</span> <span className="text-gray-400">({m.city})</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Fuzzy Matches */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-amber-50 p-4 border-b border-amber-100 flex items-center gap-2 text-amber-800 font-semibold">
                            <AlertTriangle size={20} /> Möjliga matchningar ({result.fuzzyMatches.length})
                        </div>
                        <div className="p-4">
                            {result.fuzzyMatches.length === 0 ? (
                                <p className="text-gray-500 text-sm">Inga osäkra matchningar hittades.</p>
                            ) : (
                                <p className="text-sm text-gray-600 mb-4">Kryssa för de som stämmer. (Automatiskt förvalda om systemet är ganska säkert).</p>
                            )}
                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                {result.fuzzyMatches.map((m, i) => (
                                    <label key={i} className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedFuzzyIds.has(m.dbId)}
                                            onChange={() => toggleFuzzy(m.dbId)}
                                            className="mt-1 w-4 h-4 text-primary rounded border-gray-300"
                                        />
                                        <div>
                                            <div className="font-medium text-gray-900">Din databas: {m.dbName} <span className="text-gray-400">({m.city})</span></div>
                                            <div className="text-sm text-gray-600">SHR Fil: {m.csvName} <span className="text-gray-400">({m.city})</span></div>
                                            <div className="text-xs text-amber-600 mt-1">Säkerhet: {Math.round(m.score * 100)}%</div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleApply}
                            disabled={isApplying || (result.exactMatches.length === 0 && selectedFuzzyIds.size === 0)}
                            className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 shadow-md disabled:opacity-50"
                        >
                            {isApplying ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            Uppdatera {result.exactMatches.length + selectedFuzzyIds.size} kliniker
                        </button>
                    </div>

                    {/* No matches (hidden but useful) */}
                    {result.noMatches.length > 0 && (
                        <div className="mt-12 text-sm text-gray-400">
                            {result.noMatches.length} rader från filen matchade inte alls och ignoreras.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
