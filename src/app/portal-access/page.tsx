'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Mail, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;

            setMessage({
                type: 'success',
                text: 'En magisk länk har skickats till din e-post! Kontrollera din inkorg.',
            });
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: error.message || 'Ett fel uppstod. Försök igen senare.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-rose-200/50 p-8 border border-rose-100">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-2xl text-rose-500 mb-4">
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Adminportal</h1>
                    <p className="text-gray-500 mt-2">Logga in med en magisk länk för att hantera Bättrehy.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            E-postadress
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <Mail size={18} />
                            </div>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="din.epost@exempel.se"
                                required
                                className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-charcoal-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-lg shadow-gray-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                Skicka magisk länk
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                {message && (
                    <div className={`mt-6 p-4 rounded-xl text-sm font-medium ${
                        message.type === 'success' 
                            ? 'bg-green-50 text-green-700 border border-green-100' 
                            : 'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                        {message.text}
                    </div>
                )}

                <div className="mt-8 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
                    <Link href="/" className="hover:text-rose-500 transition-colors">
                        &larr; Tillbaka till start
                    </Link>
                </div>
            </div>
        </div>
    );
}
