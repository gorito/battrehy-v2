'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, ArrowRight } from 'lucide-react';

export default function KontaktPage() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        
        // Simulate a form submission
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    if (status === 'success') {
        return (
            <div className="min-h-[70vh] flex items-center justify-center p-6 bg-white">
                <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-rose-50 border border-rose-100 shadow-xl shadow-rose-200/20">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-4">
                        <CheckCircle2 size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-charcoal-900">Tack för ditt meddelande!</h1>
                    <p className="text-gray-600 leading-relaxed">
                        Vi har tagit emot ditt ärende och kommer att återkomma till dig på <strong>info@battrehy.se</strong> så snart som möjligt.
                    </p>
                    <button 
                        onClick={() => setStatus('idle')}
                        className="inline-flex items-center gap-2 text-rose-500 font-bold hover:gap-3 transition-all"
                    >
                        Skicka ett till meddelande <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden bg-rose-50">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-rose-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-3xl" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-bold text-charcoal-900 mb-6 tracking-tight">
                            Hör gärna av dig <span className="text-rose-500">till oss.</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed mb-8">
                            Har du frågor om en klinik, vill ansluta din verksamhet eller har förslag på hur vi kan bli bättre? Vi svarar oftast inom 24 timmar.
                        </p>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-20 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/30 hover:shadow-2xl hover:shadow-gray-200/40 transition-all group">
                            <div className="w-12 h-12 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Mail size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-charcoal-900 mb-2">E-post</h3>
                            <p className="text-gray-500 mb-4 text-sm">För generella frågor och samarbeten.</p>
                            <a href="mailto:info@battrehy.se" className="text-rose-500 font-bold hover:underline">
                                info@battrehy.se
                            </a>
                        </div>

                        <div className="bg-charcoal-900 p-8 rounded-3xl shadow-xl shadow-gray-900/10 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-4 italic">Klinikägare?</h3>
                                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                    Vill du att din klinik ska synas på battrehy.se? Kontakta oss för att höra mer om våra företagspaket.
                                </p>
                                <a href="mailto:info@battrehy.se" className="inline-flex items-center gap-2 bg-white text-charcoal-900 px-6 py-3 rounded-xl font-bold hover:bg-rose-50 transition-colors">
                                    Bli partner <ArrowRight size={18} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-2xl shadow-gray-200/50">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
                                <MessageSquare size={24} />
                            </div>
                            <h2 className="text-3xl font-bold text-charcoal-900">Skicka ett meddelande</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-bold text-charcoal-700 ml-1">Namn</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        required 
                                        placeholder="Ditt för- och efternamn"
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-bold text-charcoal-700 ml-1">E-post</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        required 
                                        placeholder="namn@exempel.se"
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all outline-none"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-bold text-charcoal-700 ml-1">Ärende</label>
                                <select 
                                    id="subject"
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all outline-none"
                                >
                                    <option>Allmän fråga</option>
                                    <option>För kliniker / Samarbete</option>
                                    <option>Felrapportering</option>
                                    <option>Övrigt</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-bold text-charcoal-700 ml-1">Meddelande</label>
                                <textarea 
                                    id="message" 
                                    required 
                                    rows={5}
                                    placeholder="Vad kan vi hjälpa dig med?"
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all outline-none resize-none"
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={status === 'submitting'}
                                className="w-full md:w-auto px-10 py-5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl shadow-xl shadow-rose-200/50 hover:shadow-2xl hover:shadow-rose-300 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                {status === 'submitting' ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Skickar...
                                    </>
                                ) : (
                                    <>
                                        Skicka meddelande
                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
