import Link from 'next/link';
import { Mail, ShieldCheck, Globe } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-12">
                    
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="text-2xl font-bold flex items-center">
                            <span className="text-rose-500">Battre</span><span className="text-charcoal-900">hy.se</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Sveriges personliga guide till de bästa skönhetsklinikerna. Vi hjälper dig hitta rätt behandling hos certifierade experter.
                        </p>
                        <div className="flex flex-wrap gap-4 items-center">
                            <a 
                                href="https://se.pinterest.com/battrehy/" 
                                target="_blank" 
                                rel="noopener" 
                                aria-label="Battrehy på Pinterest" 
                                className="text-gray-400 hover:text-[#E8365D] transition-colors p-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.27 2.68 7.9 6.46 9.38-.1-.8-.19-2.03.04-2.91.2-.82 1.33-5.65 1.33-5.65s-.34-.68-.34-1.68c0-1.57.91-2.75 2.05-2.75.97 0 1.43.73 1.43 1.6 0 .97-.62 2.43-.94 3.78-.27 1.13.56 2.05 1.68 2.05 2.02 0 3.57-2.13 3.57-5.21 0-2.72-1.96-4.63-4.75-4.63-3.24 0-5.14 2.43-5.14 4.94 0 .98.38 2.03.85 2.6.09.11.1.2.07.32-.08.33-.26 1.05-.3 1.2-.05.21-.17.26-.39.16C5.9 16.53 5 14.4 5 12c0-3.65 2.65-7 7.64-7 4.14 0 7.36 2.95 7.36 6.89 0 4.12-2.6 7.43-6.2 7.43-1.21 0-2.35-.63-2.74-1.37l-.75 2.85c-.27 1.04-1 2.34-1.49 3.14C10.02 23.75 11 24 12 24c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
                                </svg>
                            </a>
                            <a 
                                href="https://www.instagram.com/battrehy/" 
                                target="_blank" 
                                rel="noopener" 
                                aria-label="Battrehy på Instagram" 
                                className="text-gray-400 hover:text-[#E8365D] transition-colors p-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                                </svg>
                            </a>
                            <a 
                                href="https://www.facebook.com/profile.php?id=61592716316970" 
                                target="_blank" 
                                rel="noopener" 
                                aria-label="Battrehy på Facebook" 
                                className="text-gray-400 hover:text-[#E8365D] transition-colors p-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
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

                </div>

                {/* Expanded SEO City x Treatment Link Matrix */}
                <div className="mt-16 pt-12 border-t border-gray-100 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-xs text-gray-500">
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wider">Botox & Fillers</h4>
                        <ul className="space-y-2">
                            <li><Link href="/kliniker/stockholm/botoxbehandling" className="hover:text-[#e8234a] font-medium text-gray-900">Botox Stockholm</Link></li>
                            <li><Link href="/kliniker/goteborg/botoxbehandling" className="hover:text-[#e8234a] font-medium text-gray-900">Botox Göteborg</Link></li>
                            <li><Link href="/kliniker/malmo/botoxbehandling" className="hover:text-[#e8234a] font-medium text-gray-900">Botox Malmö</Link></li>
                            <li className="pt-1"><Link href="/kliniker/stockholm/fillerbehandling" className="hover:text-[#e8234a] font-medium text-gray-900">Fillers Stockholm</Link></li>
                            <li><Link href="/kliniker/goteborg/fillerbehandling" className="hover:text-[#e8234a] font-medium text-gray-900">Fillers Göteborg</Link></li>
                            <li><Link href="/kliniker/malmo/fillerbehandling" className="hover:text-[#e8234a] font-medium text-gray-900">Fillers Malmö</Link></li>
                            
                            <li className="pt-2 border-t border-gray-50 text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Fler städer</li>
                            <li><Link href="/kliniker/uppsala/botoxbehandling" className="hover:text-[#e8234a]">Botox Uppsala</Link></li>
                            <li><Link href="/kliniker/vasteras/botoxbehandling" className="hover:text-[#e8234a]">Botox Västerås</Link></li>
                            <li><Link href="/kliniker/helsingborg/botoxbehandling" className="hover:text-[#e8234a]">Botox Helsingborg</Link></li>
                            <li><Link href="/kliniker/linkoping/botoxbehandling" className="hover:text-[#e8234a]">Botox Linköping</Link></li>
                            <li><Link href="/kliniker/lund/botoxbehandling" className="hover:text-[#e8234a]">Botox Lund</Link></li>
                            <li><Link href="/kliniker/uppsala/fillerbehandling" className="hover:text-[#e8234a]">Fillers Uppsala</Link></li>
                            <li><Link href="/kliniker/vasteras/fillerbehandling" className="hover:text-[#e8234a]">Fillers Västerås</Link></li>
                            <li><Link href="/kliniker/helsingborg/fillerbehandling" className="hover:text-[#e8234a]">Fillers Helsingborg</Link></li>
                            <li><Link href="/kliniker/linkoping/fillerbehandling" className="hover:text-[#e8234a]">Fillers Linköping</Link></li>
                            <li><Link href="/kliniker/lund/fillerbehandling" className="hover:text-[#e8234a]">Fillers Lund</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wider">Laser & Nålar</h4>
                        <ul className="space-y-2">
                            <li><Link href="/kliniker/stockholm/laserbehandling" className="hover:text-[#e8234a] font-medium text-gray-900">Laser Stockholm</Link></li>
                            <li><Link href="/kliniker/goteborg/laserbehandling" className="hover:text-[#e8234a] font-medium text-gray-900">Laser Göteborg</Link></li>
                            <li><Link href="/kliniker/malmo/laserbehandling" className="hover:text-[#e8234a] font-medium text-gray-900">Laser Malmö</Link></li>
                            <li className="pt-1"><Link href="/kliniker/stockholm/microneedling" className="hover:text-[#e8234a] font-medium text-gray-900">Microneedling Stockholm</Link></li>
                            <li><Link href="/kliniker/goteborg/microneedling" className="hover:text-[#e8234a] font-medium text-gray-900">Microneedling Göteborg</Link></li>
                            <li><Link href="/kliniker/malmo/microneedling" className="hover:text-[#e8234a] font-medium text-gray-900">Microneedling Malmö</Link></li>
                            
                            <li className="pt-2 border-t border-gray-50 text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Fler städer</li>
                            <li><Link href="/kliniker/uppsala/laserbehandling" className="hover:text-[#e8234a]">Laser Uppsala</Link></li>
                            <li><Link href="/kliniker/vasteras/laserbehandling" className="hover:text-[#e8234a]">Laser Västerås</Link></li>
                            <li><Link href="/kliniker/helsingborg/laserbehandling" className="hover:text-[#e8234a]">Laser Helsingborg</Link></li>
                            <li><Link href="/kliniker/linkoping/laserbehandling" className="hover:text-[#e8234a]">Laser Linköping</Link></li>
                            <li><Link href="/kliniker/lund/laserbehandling" className="hover:text-[#e8234a]">Laser Lund</Link></li>
                            <li><Link href="/kliniker/uppsala/microneedling" className="hover:text-[#e8234a]">Microneedling Uppsala</Link></li>
                            <li><Link href="/kliniker/vasteras/microneedling" className="hover:text-[#e8234a]">Microneedling Västerås</Link></li>
                            <li><Link href="/kliniker/helsingborg/microneedling" className="hover:text-[#e8234a]">Microneedling Helsingborg</Link></li>
                            <li><Link href="/kliniker/linkoping/microneedling" className="hover:text-[#e8234a]">Microneedling Linköping</Link></li>
                            <li><Link href="/kliniker/lund/microneedling" className="hover:text-[#e8234a]">Microneedling Lund</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wider">Ansikte & Hud</h4>
                        <ul className="space-y-2">
                            <li><Link href="/kliniker/stockholm/ansiktsbehandling" className="hover:text-[#e8234a] font-medium text-gray-900">Ansiktsbehandling Stockholm</Link></li>
                            <li><Link href="/kliniker/goteborg/ansiktsbehandling" className="hover:text-[#e8234a] font-medium text-gray-900">Ansiktsbehandling Göteborg</Link></li>
                            <li><Link href="/kliniker/malmo/ansiktsbehandling" className="hover:text-[#e8234a] font-medium text-gray-900">Ansiktsbehandling Malmö</Link></li>
                            <li className="pt-1"><Link href="/kliniker/stockholm/anti-aging-behandling" className="hover:text-[#e8234a] font-medium text-gray-900">Anti-aging Stockholm</Link></li>
                            <li><Link href="/kliniker/goteborg/anti-aging-behandling" className="hover:text-[#e8234a] font-medium text-gray-900">Anti-aging Göteborg</Link></li>
                            <li><Link href="/kliniker/malmo/anti-aging-behandling" className="hover:text-[#e8234a] font-medium text-gray-900">Anti-aging Malmö</Link></li>
                            
                            <li className="pt-2 border-t border-gray-50 text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Fler städer</li>
                            <li><Link href="/kliniker/uppsala/ansiktsbehandling" className="hover:text-[#e8234a]">Ansiktsbehandling Uppsala</Link></li>
                            <li><Link href="/kliniker/vasteras/ansiktsbehandling" className="hover:text-[#e8234a]">Ansiktsbehandling Västerås</Link></li>
                            <li><Link href="/kliniker/helsingborg/ansiktsbehandling" className="hover:text-[#e8234a]">Ansiktsbehandling Helsingborg</Link></li>
                            <li><Link href="/kliniker/linkoping/ansiktsbehandling" className="hover:text-[#e8234a]">Ansiktsbehandling Linköping</Link></li>
                            <li><Link href="/kliniker/lund/ansiktsbehandling" className="hover:text-[#e8234a]">Ansiktsbehandling Lund</Link></li>
                            <li><Link href="/kliniker/uppsala/anti-aging-behandling" className="hover:text-[#e8234a]">Anti-aging Uppsala</Link></li>
                            <li><Link href="/kliniker/vasteras/anti-aging-behandling" className="hover:text-[#e8234a]">Anti-aging Västerås</Link></li>
                            <li><Link href="/kliniker/helsingborg/anti-aging-behandling" className="hover:text-[#e8234a]">Anti-aging Helsingborg</Link></li>
                            <li><Link href="/kliniker/linkoping/anti-aging-behandling" className="hover:text-[#e8234a]">Anti-aging Linköping</Link></li>
                            <li><Link href="/kliniker/lund/anti-aging-behandling" className="hover:text-[#e8234a]">Anti-aging Lund</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wider">Peeling & Läppar</h4>
                        <ul className="space-y-2">
                            <li><Link href="/kliniker/stockholm/kemisk-peeling" className="hover:text-[#e8234a]">Kemisk peeling Stockholm</Link></li>
                            <li><Link href="/kliniker/goteborg/kemisk-peeling" className="hover:text-[#e8234a]">Kemisk peeling Göteborg</Link></li>
                            <li><Link href="/kliniker/malmo/kemisk-peeling" className="hover:text-[#e8234a]">Kemisk peeling Malmö</Link></li>
                            <li><Link href="/kliniker/uppsala/kemisk-peeling" className="hover:text-[#e8234a]">Kemisk peeling Uppsala</Link></li>
                            <li><Link href="/kliniker/vasteras/kemisk-peeling" className="hover:text-[#e8234a]">Kemisk peeling Västerås</Link></li>
                            <li><Link href="/kliniker/helsingborg/kemisk-peeling" className="hover:text-[#e8234a]">Kemisk peeling Helsingborg</Link></li>
                            <li><Link href="/kliniker/linkoping/kemisk-peeling" className="hover:text-[#e8234a]">Kemisk peeling Linköping</Link></li>
                            <li><Link href="/kliniker/lund/kemisk-peeling" className="hover:text-[#e8234a]">Kemisk peeling Lund</Link></li>
                            <li className="pt-2"><Link href="/kliniker/stockholm/lappfiller" className="hover:text-[#e8234a] font-medium border-t border-gray-50 pt-2 block">Läppfillers Stockholm</Link></li>
                            <li><Link href="/kliniker/goteborg/lappfiller" className="hover:text-[#e8234a]">Läppfillers Göteborg</Link></li>
                            <li><Link href="/kliniker/malmo/lappfiller" className="hover:text-[#e8234a]">Läppfillers Malmö</Link></li>
                            <li><Link href="/kliniker/vasteras/lappfiller" className="hover:text-[#e8234a]">Läppfillers Västerås</Link></li>
                            <li><Link href="/kliniker/helsingborg/lappfiller" className="hover:text-[#e8234a]">Läppfillers Helsingborg</Link></li>
                            <li><Link href="/kliniker/linkoping/lappfiller" className="hover:text-[#e8234a]">Läppfillers Linköping</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wider">Huvudstäder & Hudvård</h4>
                        <ul className="space-y-2 mb-6">
                            <li><Link href="/kliniker/stockholm/hudterapeut" className="hover:text-[#e8234a]">Hudvård Stockholm</Link></li>
                            <li><Link href="/kliniker/goteborg/hudterapeut" className="hover:text-[#e8234a]">Hudvård Göteborg</Link></li>
                            <li><Link href="/kliniker/malmo/hudterapeut" className="hover:text-[#e8234a]">Hudvård Malmö</Link></li>
                            <li><Link href="/kliniker/uppsala/hudterapeut" className="hover:text-[#e8234a]">Hudvård Uppsala</Link></li>
                            <li><Link href="/kliniker/vasteras/hudterapeut" className="hover:text-[#e8234a]">Hudvård Västerås</Link></li>
                            <li><Link href="/kliniker/helsingborg/hudterapeut" className="hover:text-[#e8234a]">Hudvård Helsingborg</Link></li>
                            <li><Link href="/kliniker/linkoping/hudterapeut" className="hover:text-[#e8234a]">Hudvård Linköping</Link></li>
                            <li><Link href="/kliniker/lund/hudterapeut" className="hover:text-[#e8234a]">Hudvård Lund</Link></li>
                        </ul>
                        
                        <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wider border-t border-gray-100 pt-4">Städer</h4>
                        <ul className="space-y-2">
                            <li><Link href="/kliniker/stockholm" className="hover:text-[#e8234a]">Stockholm</Link></li>
                            <li><Link href="/kliniker/goteborg" className="hover:text-[#e8234a]">Göteborg</Link></li>
                            <li><Link href="/kliniker/malmo" className="hover:text-[#e8234a]">Malmö</Link></li>
                            <li><Link href="/kliniker/uppsala" className="hover:text-[#e8234a]">Uppsala</Link></li>
                            <li><Link href="/kliniker/vasteras" className="hover:text-[#e8234a]">Västerås</Link></li>
                            <li><Link href="/kliniker/helsingborg" className="hover:text-[#e8234a]">Helsingborg</Link></li>
                            <li><Link href="/kliniker/linkoping" className="hover:text-[#e8234a]">Linköping</Link></li>
                            <li><Link href="/kliniker/lund" className="hover:text-[#e8234a]">Lund</Link></li>
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
                        <Link href="/om-redaktionen" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Om oss</Link>
                        <Link href="/anvandarvillkor" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Användarvillkor</Link>
                        <Link href="/integritetspolicy" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Integritetspolicy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
