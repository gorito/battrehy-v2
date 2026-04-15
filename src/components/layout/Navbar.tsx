import Link from 'next/link';
import { Search, Menu } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
                            <span className="text-rose-500">Bättre</span>
                            <span className="text-charcoal-900">hy.se</span>
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
                        <div className="text-gray-300">|</div>
                        <Link href="/admin" className="text-charcoal-700 hover:text-rose-500 font-medium transition-colors">
                            För Kliniker (Admin)
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
                        <button className="text-charcoal-900 hover:text-rose-500 p-2">
                            <Menu size={28} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
