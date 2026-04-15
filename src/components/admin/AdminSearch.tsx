'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { useTransition, useState, useEffect } from 'react';

export default function AdminSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [term, setTerm] = useState(searchParams.get('query') || '');

    // Debounced search
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            startTransition(() => {
                const params = new URLSearchParams(searchParams.toString());
                if (term) {
                    params.set('query', term);
                } else {
                    params.delete('query');
                }
                params.delete('page'); // Reset pagination on search
                router.push(`${pathname}?${params.toString()}`);
            });
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [term, router, pathname, searchParams]);

    return (
        <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 text-gray-400 ${isPending ? 'animate-pulse' : ''}`} />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 sm:text-sm transition-colors"
                placeholder="Sök på kliniknamn eller stad..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />
        </div>
    );
}
