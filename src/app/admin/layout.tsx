import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-charcoal-900 border-r border-charcoal-800 text-white flex flex-col">
                <div className="p-6 border-b border-charcoal-800">
                    <Link href="/admin" className="text-xl font-bold flex items-center gap-2">
                        <span className="text-rose-500">Bättrehy</span> Admin
                    </Link>
                </div>

                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/admin" className="block px-4 py-2 rounded-lg hover:bg-charcoal-800 transition-colors">
                                Översikt
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/kliniker" className="block px-4 py-2 rounded-lg hover:bg-charcoal-800 transition-colors">
                                Hantera Kliniker
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/stader" className="block px-4 py-2 rounded-lg hover:bg-charcoal-800 transition-colors">
                                Städer
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/behandlingar" className="block px-4 py-2 rounded-lg hover:bg-charcoal-800 transition-colors">
                                Behandlingar
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center px-8 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800">Kontrollpanel</h2>
                    <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        Inloggad som Admin
                    </div>
                </header>

                <div className="p-8 overflow-auto flex-1 h-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
