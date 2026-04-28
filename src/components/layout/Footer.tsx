import Link from 'next/link';
import { Mail, ShieldCheck, Instagram, Facebook, Globe } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-12">
                    
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="text-2xl font-bold flex items-center">
                            <span className="text-rose-500">Bättre</span><span className="text-charcoal-900">hy.se</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Sveriges personliga guide till de bästa skönhetsklinikerna. Vi hjälper dig hitta rätt behandling hos certifierade experter.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-charcoal-900 font-bold mb-6">Navigering</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/" className="text-gray-500 hover:text-rose-500 transition-colors text-sm">Hem</Link>
                            </li>
                            <li>
                                <Link href="/behandlingar" className="text-gray-500 hover:text-rose-500 transition-colors text-sm">Behandlingar</Link>
                            </li>
                            <li>
                                <Link href="/blogg" className="text-gray-500 hover:text-rose-500 transition-colors text-sm">Blogg</Link>
                            </li>
                            <li>
                                <Link href="/kontakt" className="text-gray-500 hover:text-rose-500 transition-colors text-sm">Kontakt</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Popular Cities */}
                    <div>
                        <h3 className="text-charcoal-900 font-bold mb-6">Städer</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/kliniker/stockholm" className="text-gray-500 hover:text-rose-500 transition-colors text-sm">Stockholm</Link>
                            </li>
                            <li>
                                <Link href="/kliniker/goteborg" className="text-gray-500 hover:text-rose-500 transition-colors text-sm">Göteborg</Link>
                            </li>
                            <li>
                                <Link href="/kliniker/malmo" className="text-gray-500 hover:text-rose-500 transition-colors text-sm">Malmö</Link>
                            </li>
                            <li>
                                <Link href="/kliniker/uppsala" className="text-gray-500 hover:text-rose-500 transition-colors text-sm">Uppsala</Link>
                            </li>
                            <li>
                                <Link href="/kliniker/vasteras" className="text-gray-500 hover:text-rose-500 transition-colors text-sm">Västerås</Link>
                            </li>
                        </ul>
                    </div>

                    {/* For Clinics */}
                    <div>
                        <h3 className="text-charcoal-900 font-bold mb-6">För Kliniker</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/kontakt" className="text-gray-500 hover:text-rose-500 transition-colors text-sm">Anslut din klinik</Link>
                            </li>
                            <li>
                                <Link href="/portal-access" className="flex items-center gap-2 text-gray-500 hover:text-rose-500 transition-colors text-sm">
                                    <ShieldCheck size={16} />
                                    Adminportal
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-charcoal-900 font-bold mb-6">Kontakt</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="mailto:info@battrehy.se" className="flex items-center gap-3 text-gray-500 hover:text-rose-500 transition-colors text-sm group">
                                    <div className="p-2 bg-rose-50 text-rose-500 rounded-lg group-hover:bg-rose-100 transition-colors">
                                        <Mail size={16} />
                                    </div>
                                    info@battrehy.se
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-gray-500 text-sm">
                                <div className="p-2 bg-gray-50 text-gray-400 rounded-lg">
                                    <Globe size={16} />
                                </div>
                                Stockholm, Sverige
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-xs text-center md:text-left">
                        © {currentYear} battrehy.se. Alla rättigheter förbehållna.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/om-oss" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Om oss</Link>
                        <Link href="/anvandarvillkor" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Användarvillkor</Link>
                        <Link href="#" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Integritetspolicy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
