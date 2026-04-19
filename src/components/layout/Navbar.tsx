'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Focus input when search opens
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Handle ESC key to close search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsSearchOpen(false);
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/sok?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold flex items-center">
                            <span className="text-rose-500">Bättre</span><span className="text-charcoal-900">hy.se</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-charcoal-700 hover:text-rose-500 font-medium transition-colors">
                            Hem
                        </Link>
                        <Link href="/behandlingar" className="text-charcoal-700 hover:text-rose-500 font-medium transition-colors">
                            Behandlingar
                        </Link>
                        <Link href="/blogg" className="text-charcoal-700 hover:text-rose-500 font-medium transition-colors">
                            Blogg
                        </Link>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center">
                        <Link 
                            href="/sok"
                            className="p-3 mr-2 text-charcoal-700 hover:text-rose-500 transition-colors cursor-pointer group"
                            aria-label="Sök"
                        >
                            <Search size={24} className="group-hover:scale-110 transition-transform" />
                        </Link>
                    </div>

                    {/* Mobile menu and search buttons */}
                    <div className="md:hidden flex items-center space-x-1">
                        <Link 
                            href="/sok"
                            className="p-3 text-charcoal-900 hover:text-rose-500 transition-colors"
                            aria-label="Sök"
                        >
                            <Search size={24} />
                        </Link>
                        <button 
                            onClick={() => {
                                setIsMenuOpen(!isMenuOpen);
                                setIsSearchOpen(false);
                            }}
                            className="text-charcoal-900 hover:text-rose-500 p-3 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 transition-all duration-200 ease-in-out">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        <Link 
                            href="/" 
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-4 text-base font-medium text-charcoal-700 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                        >
                            Hem
                        </Link>
                        <Link 
                            href="/behandlingar" 
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-4 text-base font-medium text-charcoal-700 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                        >
                            Behandlingar
                        </Link>
                        <Link 
                            href="/blogg" 
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-4 text-base font-medium text-charcoal-700 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                        >
                            Blogg
                        </Link>
                    </div>
                </div>
            )}
            {/* Search Overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[9999]">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300"
                        onClick={() => setIsSearchOpen(false)}
                    />
                    
                    {/* Search Bar Container */}
                    <div className="absolute inset-x-0 top-0 bg-white border-b border-gray-200 shadow-2xl h-32 flex items-center">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                            <form onSubmit={handleSearch} className="flex items-center relative group">
                                <Search className="absolute left-0 text-gray-400 group-focus-within:text-rose-500 transition-colors" size={28} />
                                <input 
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Vad söker du efter? (klinik, stad eller behandling)"
                                    className="w-full pl-12 pr-12 py-5 text-2xl border-none focus:ring-0 placeholder-gray-300 text-charcoal-900 bg-transparent font-light"
                                />
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setIsSearchOpen(false);
                                        setSearchQuery('');
                                    }}
                                    className="absolute right-0 p-4 text-gray-400 hover:text-rose-500 transition-colors"
                                >
                                    <X size={32} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
