'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { href: '/admin', label: 'Översikt', exact: true },
    { href: '/admin/kliniker', label: 'Hantera Kliniker' },
    { href: '/admin/forsaljning', label: 'Försäljning (CRM)' },
    { href: '/admin/google-synlighet', label: 'Google-synlighet' },
    { href: '/admin/stader', label: 'Städer' },
    { href: '/admin/behandlingar', label: 'Behandlingar' },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-charcoal-900 border-r border-charcoal-800 text-white flex flex-col sticky top-0 h-screen">
            <div className="p-6 border-b border-charcoal-800">
                <Link href="/admin" className="text-xl font-bold flex items-center gap-2">
                    <span className="text-rose-500">Bättrehy</span> Admin
                </Link>
            </div>

            <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-1">
                    {navItems.map(({ href, label, exact }) => {
                        const isActive = exact
                            ? pathname === href
                            : pathname === href || pathname.startsWith(href + '/');

                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={`block px-4 py-3 rounded-lg transition-colors font-medium ${
                                        isActive
                                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                            : 'hover:bg-charcoal-800 text-gray-300 hover:text-white'
                                    }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}
