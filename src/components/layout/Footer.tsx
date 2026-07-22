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

                </div>

                {/* Expanded SEO City x Treatment Link Matrix */}
                <div className="mt-16 pt-12 border-t border-gray-100 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-xs text-gray-500">
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wider">Botox & Fillers</h4>
                        <ul className="space-y-2">
                            <li><Link href="/kliniker/stockholm/botox" className="hover:text-[#e8234a] font-medium text-gray-900">Botox Stockholm</Link></li>
                            <li><Link href="/kliniker/goteborg/botox" className="hover:text-[#e8234a] font-medium text-gray-900">Botox Göteborg</Link></li>
                            <li><Link href="/kliniker/malmo/botox" className="hover:text-[#e8234a] font-medium text-gray-900">Botox Malmö</Link></li>
                            <li className="pt-1"><Link href="/kliniker/stockholm/fillers" className="hover:text-[#e8234a] font-medium text-gray-900">Fillers Stockholm</Link></li>
                            <li><Link href="/kliniker/goteborg/fillers" className="hover:text-[#e8234a] font-medium text-gray-900">Fillers Göteborg</Link></li>
                            <li><Link href="/kliniker/malmo/fillers" className="hover:text-[#e8234a] font-medium text-gray-900">Fillers Malmö</Link></li>
                            
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
                            <li><Link href="/kliniker/stockholm/laser" className="hover:text-[#e8234a] font-medium text-gray-900">Laser Stockholm</Link></li>
                            <li><Link href="/kliniker/goteborg/laser" className="hover:text-[#e8234a] font-medium text-gray-900">Laser Göteborg</Link></li>
                            <li><Link href="/kliniker/malmo/laser" className="hover:text-[#e8234a] font-medium text-gray-900">Laser Malmö</Link></li>
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
                            <li><Link href="/kliniker/stockholm/hudvard" className="hover:text-[#e8234a]">Hudvård Stockholm</Link></li>
                            <li><Link href="/kliniker/goteborg/hudvard" className="hover:text-[#e8234a]">Hudvård Göteborg</Link></li>
                            <li><Link href="/kliniker/malmo/hudvard" className="hover:text-[#e8234a]">Hudvård Malmö</Link></li>
                            <li><Link href="/kliniker/uppsala/hudvard" className="hover:text-[#e8234a]">Hudvård Uppsala</Link></li>
                            <li><Link href="/kliniker/vasteras/hudvard" className="hover:text-[#e8234a]">Hudvård Västerås</Link></li>
                            <li><Link href="/kliniker/helsingborg/hudvard" className="hover:text-[#e8234a]">Hudvård Helsingborg</Link></li>
                            <li><Link href="/kliniker/linkoping/hudvard" className="hover:text-[#e8234a]">Hudvård Linköping</Link></li>
                            <li><Link href="/kliniker/lund/hudvard" className="hover:text-[#e8234a]">Hudvård Lund</Link></li>
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
                        <Link href="/om-oss" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Om oss</Link>
                        <Link href="/anvandarvillkor" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Användarvillkor</Link>
                        <Link href="/integritetspolicy" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Integritetspolicy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
