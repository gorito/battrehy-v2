'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, ChevronDown, Check } from 'lucide-react';

interface LocationPillProps {
    initialCity: string;
    isLocalEmpty: boolean;
}

export default function LocationPill({ initialCity, isLocalEmpty }: LocationPillProps) {
    const router = useRouter();
    const [city, setCity] = useState(initialCity);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Sync state if initialCity prop changes
    useEffect(() => {
        setCity(initialCity);
    }, [initialCity]);

    // Handle local storage override on mount
    useEffect(() => {
        const storedCity = localStorage.getItem('battrehy_city_preference');
        // If there's a stored city and it doesn't match the current URL/detected city
        // AND the user hasn't actively cleared it, we should navigate to it
        if (storedCity && storedCity !== initialCity) {
            router.push(`/sok?city=${encodeURIComponent(storedCity)}`);
        }
    }, [initialCity, router]);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const newCity = inputValue.trim();
        if (newCity) {
            localStorage.setItem('battrehy_city_preference', newCity);
            setIsOpen(false);
            router.push(`/sok?city=${encodeURIComponent(newCity)}`);
        }
    };

    const handleClear = () => {
        localStorage.removeItem('battrehy_city_preference');
        setIsOpen(false);
        router.push('/sok');
    };

    let message = '';
    if (!city) {
        message = 'Ange din stad för att se kliniker nära dig först';
    } else if (isLocalEmpty) {
        message = `Inga kliniker i ${city} ännu — visar alla resultat`;
    } else {
        message = `Visar kliniker nära ${city}`;
    }

    return (
        <div className="relative inline-block mb-8 w-full max-w-xl mx-auto text-center" ref={dropdownRef}>
            <div 
                onClick={() => {
                    setInputValue(city || '');
                    setIsOpen(!isOpen);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm cursor-pointer transition-colors shadow-sm ${
                    city && !isLocalEmpty 
                        ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100' 
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
            >
                <MapPin size={16} className={city && !isLocalEmpty ? 'text-rose-500' : 'text-gray-400'} />
                <span className="font-medium">{message}</span>
                <span className="text-gray-300 mx-1">·</span>
                <span className="text-primary hover:underline font-medium flex items-center gap-1">
                    Ändra <ChevronDown size={14} />
                </span>
            </div>

            {isOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50 text-left">
                    <h4 className="text-sm font-bold text-gray-900 mb-3">Välj din stad</h4>
                    <form onSubmit={handleSave} className="flex gap-2">
                        <input
                            type="text"
                            placeholder="T.ex. Stockholm"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-50 transition-all"
                            autoFocus
                        />
                        <button 
                            type="submit"
                            className="bg-primary text-white rounded-lg px-3 py-2 hover:bg-primary-hover transition-colors flex items-center justify-center"
                        >
                            <Check size={16} />
                        </button>
                    </form>
                    {city && (
                        <button 
                            onClick={handleClear}
                            className="text-xs text-gray-500 hover:text-gray-700 underline mt-3 w-full text-center"
                        >
                            Rensa vald stad
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
