'use client';

import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeSearch() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/sok?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="bg-white p-2 rounded-full shadow-lg flex items-center mb-10 max-w-xl mx-auto border border-rose-100 focus-within:ring-2 focus-within:ring-rose-500 focus-within:border-transparent transition-all">
            <Search className="text-rose-500 ml-4 mr-2" />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Sök på klinik, behandling eller stad..."
                className="flex-grow p-3 outline-none bg-transparent text-gray-900 placeholder:text-gray-400"
            />
            <button
                type="submit"
                className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
                Sök
            </button>
        </form>
    );
}
