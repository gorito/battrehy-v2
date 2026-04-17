'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                        <button className="text-charcoal-700 hover:text-rose-500 p-2 mr-4 transition-colors">
                            <Search size={22} />
                        </button>
                        <Link
                            href="/admin/kliniker/skapa"
                            className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-sm"
                        >
                            Anslut klinik
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-charcoal-900 hover:text-rose-500 p-2 transition-colors"
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
                        <div className="pt-4 px-3">
                            <Link
                                href="/admin/kliniker/skapa"
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full font-bold text-center transition-all shadow-sm"
                            >
                                Anslut klinik
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
