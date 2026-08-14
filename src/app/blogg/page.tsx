import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SchemaScript } from '@/components/SchemaScript';
import { buildBreadcrumbSchema, buildOrganizationSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Blogg - Guider och artiklar om skönhet & hudvård',
    description: 'Läs våra senaste guider, tips och artiklar om hudvård, estetiska behandlingar och hur du väljer rätt klinik.',
    alternates: {
        canonical: 'https://battrehy.se/blogg',
    },
    openGraph: {
        title: 'Blogg - Guider och artiklar om skönhet & hudvård',
        description: 'Läs våra senaste guider, tips och artiklar om hudvård, estetiska behandlingar och hur du väljer rätt klinik.',
        url: 'https://battrehy.se/blogg',
        type: 'website',
    }
};

export default function BlogLandingPage() {
    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Hem', url: 'https://battrehy.se' },
            { name: 'Blogg', url: 'https://battrehy.se/blogg' }
        ]),
        buildOrganizationSchema()
    ];

    return (
        <main className="min-h-screen bg-gray-50 p-4 sm:p-8 pb-24">
            <SchemaScript schemas={schemas} />
            <div className="max-w-4xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Skönhetsbloggen</h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Läs våra guider, tips och djupdykningar inom hudvård och estetiska behandlingar. Vi hjälper dig att fatta välinformerade beslut.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Article Card */}
                    <Link href="/blogg/ansiktsbehandling-den-kompletta-guiden" className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
                        <div className="h-48 bg-gray-100 relative overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/blogg/ansiktsbehandling.jpeg" alt="Klassisk ansiktsbehandling på hudvårdsklinik" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white z-10 drop-shadow-sm">Ansiktsbehandling<br/><span className="text-sm font-medium opacity-90">Den kompletta guiden 2026</span></h2>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="text-xs text-primary font-bold tracking-wide uppercase mb-2">Guide</div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                Ansiktsbehandling: Den kompletta guiden 2026 — typer, priser och val av klinik
                            </h2>
                            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                En genomgång av 8 vanliga behandlingar, vad de faktiskt gör, vad de kostar och hur du undviker fallgroparna. Allt du behöver veta innan du bokar.
                            </p>
                            <div className="mt-auto flex items-center text-primary font-medium text-sm group-hover:underline">
                                Läs hela guiden <ArrowRight size={16} className="ml-1" />
                            </div>
                        </div>
                    </Link>

                    {/* Article Card 2 */}
                    <Link href="/blogg/botoxbehandling-den-kompletta-guiden" className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
                        <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/blogg/botox_hero.jpeg" alt="Botoxbehandling utförs av legitimerad personal" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white z-10 drop-shadow-sm">Botoxbehandling<br/><span className="text-sm font-medium opacity-90">Den kompletta guiden 2026</span></h2>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="text-xs text-primary font-bold tracking-wide uppercase mb-2">Guide</div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                Botoxbehandling i Sverige 2026 — priser, säkerhet och kliniker
                            </h2>
                            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                En komplett guide till botox: från hur mycket det kostar (medianpris per område) och vilka risker som finns, till hur du kollar att kliniken följer IVO-kraven.
                            </p>
                            <div className="mt-auto flex items-center text-primary font-medium text-sm group-hover:underline">
                                Läs hela guiden <ArrowRight size={16} className="ml-1" />
                            </div>
                        </div>
                    </Link>

                    {/* Article Card 3 */}
                    <Link href="/blogg/fillerbehandling-den-kompletta-guiden" className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
                        <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/blogg/fillerbehandling-hero.jpeg" alt="Professionell fillerbehandling utförs av legitimerad personal" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white z-10 drop-shadow-sm">Fillerbehandling<br/><span className="text-sm font-medium opacity-90">Den kompletta guiden 2026</span></h2>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="text-xs text-primary font-bold tracking-wide uppercase mb-2">Guide</div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                Fillerbehandling i Sverige 2026 — den kompletta guiden till priser, hållbarhet och säkerhet
                            </h2>
                            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                Allt om fillerbehandling i Sverige 2026: områden, priser, hållbarhet, IVO-regler och hur du väljer en seriös klinik.
                            </p>
                            <div className="mt-auto flex items-center text-primary font-medium text-sm group-hover:underline">
                                Läs hela guiden <ArrowRight size={16} className="ml-1" />
                            </div>
                        </div>
                    </Link>

                    {/* Article Card 4 */}
                    <Link href="/blogg/estetisk-klinik" className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
                        <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/blogg/estetisk-klinik-hero.webp" alt="Konsultation mellan legitimerad sjuksköterska och klient på en modern estetisk klinik" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white z-10 drop-shadow-sm">Estetisk klinik<br/><span className="text-sm font-medium opacity-90">Så väljer du en seriös klinik</span></h2>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="text-xs text-primary font-bold tracking-wide uppercase mb-2">Guide</div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                Estetisk klinik: så väljer du en seriös och säker klinik
                            </h2>
                            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                Så väljer du en trygg och seriös estetisk klinik i Sverige: kontrollera IVO-registrering, legitimerad personal, betänketid och dina rättigheter enligt lag.
                            </p>
                            <div className="mt-auto flex items-center text-primary font-medium text-sm group-hover:underline">
                                Läs hela guiden <ArrowRight size={16} className="ml-1" />
                            </div>
                        </div>
                    </Link>

                    {/* Article Card 5 */}
                    <Link href="/blogg/anti-aging-behandling" className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
                        <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/blogg/anti-aging-behandling-hero.webp" alt="Kvinna i 50-årsåldern med naturlig, frisk och lätt linjerad hud" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white z-10 drop-shadow-sm">Anti-aging<br/><span className="text-sm font-medium opacity-90">Hudföryngring & guide 2026</span></h2>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="text-xs text-primary font-bold tracking-wide uppercase mb-2">Guide</div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                Anti-aging behandling & hudföryngring – guide 2026
                            </h2>
                            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                Vilka anti-aging behandlingar fungerar mot rynkor och åldrande hud? Jämför hudföryngring, priser, risker och hur du väljer rätt behandling för din hud.
                            </p>
                            <div className="mt-auto flex items-center text-primary font-medium text-sm group-hover:underline">
                                Läs hela guiden <ArrowRight size={16} className="ml-1" />
                            </div>
                        </div>
                    </Link>

                    {/* Article Card 6 */}
                    <Link href="/blogg/hudvardsrutin" className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
                        <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/blogg/hudvardsrutin-hero.webp" alt="Kvinna applicerar fuktkräm i ett ljust, minimalistiskt badrum" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white z-10 drop-shadow-sm">Hudvårdsrutin<br/><span className="text-sm font-medium opacity-90">Steg för steg för din hudtyp</span></h2>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="text-xs text-primary font-bold tracking-wide uppercase mb-2">Guide</div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                Hudvårdsrutin: så bygger du en rutin som fungerar – steg för steg
                            </h2>
                            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                Så bygger du en hudvårdsrutin som fungerar: rätt ordning morgon och kväll, ingredienser för din hudtyp, och när professionell hudvård gör större skillnad.
                            </p>
                            <div className="mt-auto flex items-center text-primary font-medium text-sm group-hover:underline">
                                Läs hela guiden <ArrowRight size={16} className="ml-1" />
                            </div>
                        </div>
                    </Link>

                    {/* Article Card 7 */}
                    <Link href="/blogg/aknebehandling" className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
                        <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/blogg/aknebehandling-hero.webp" alt="Ung vuxen med naturlig, frisk hud i mjukt ljus" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white z-10 drop-shadow-sm">Aknebehandling<br/><span className="text-sm font-medium opacity-90">Akne och akneärr, guide 2026</span></h2>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="text-xs text-primary font-bold tracking-wide uppercase mb-2">Guide</div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                Aknebehandling: så behandlar du akne och akneärr
                            </h2>
                            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                Vilka behandlingar fungerar mot akne och akneärr? Guide till hemmavård, receptbelagt och professionella klinikbehandlingar – och när du bör söka vård.
                            </p>
                            <div className="mt-auto flex items-center text-primary font-medium text-sm group-hover:underline">
                                Läs hela guiden <ArrowRight size={16} className="ml-1" />
                            </div>
                        </div>
                    </Link>

                    {/* Article Card 8 */}
                    <Link href="/blogg/pigmentflackar" className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
                        <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/blogg/pigmentflackar-hero.webp" alt="Kvinna i 40-årsåldern med naturlig hud och lätta solfläckar" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white z-10 drop-shadow-sm">Pigmentfläckar<br/><span className="text-sm font-medium opacity-90">Orsaker & behandlingar 2026</span></h2>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="text-xs text-primary font-bold tracking-wide uppercase mb-2">Guide</div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                Pigmentfläckar – orsaker, behandling och hur du blir av med dem
                            </h2>
                            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                Vad hjälper mot pigmentfläckar, hyperpigmentering och melasma? Guide till orsaker, hemmavård, laser/IPL och peeling – plus när en fläck bör visas för läkare.
                            </p>
                            <div className="mt-auto flex items-center text-primary font-medium text-sm group-hover:underline">
                                Läs hela guiden <ArrowRight size={16} className="ml-1" />
                            </div>
                        </div>
                    </Link>

                    {/* Article Card 9 */}
                    <Link href="/blogg/laserharborttagning" className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
                        <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/blogg/laserharborttagning-hero.webp" alt="Kliniker utför laserhårborttagning på en klients ben, båda med skyddsglasögon" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white z-10 drop-shadow-sm">Laserhårborttagning<br/><span className="text-sm font-medium opacity-90">Fungerar det, pris & resultat</span></h2>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="text-xs text-primary font-bold tracking-wide uppercase mb-2">Guide</div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                Laserhårborttagning: så fungerar det, pris och att välja klinik
                            </h2>
                            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                Hur fungerar laserhårborttagning, hur många behandlingar behövs och vad kostar det? Guide till resultat, hud- och hårtyper, säkerhet och nya lagkrav (SSM 2026).
                            </p>
                            <div className="mt-auto flex items-center text-primary font-medium text-sm group-hover:underline">
                                Läs hela guiden <ArrowRight size={16} className="ml-1" />
                            </div>
                        </div>
                    </Link>

                    {/* Article Card 10 */}
                    <Link href="/blogg/estetik-for-man" className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full">
                        <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/blogg/estetik-for-man-hero.webp" alt="Välvårdad man i 30-årsåldern med naturlig, frisk hud" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white z-10 drop-shadow-sm">Estetik för män<br/><span className="text-sm font-medium opacity-90">Guide till hud & behandlingar</span></h2>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="text-xs text-primary font-bold tracking-wide uppercase mb-2">Guide</div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                Hudvård och estetiska behandlingar för män – guide 2026
                            </h2>
                            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                Hudvård och estetiska behandlingar för män: enkel hudvårdsrutin, botox och fillers med naturligt resultat, hår och hud – och hur du väljer rätt klinik.
                            </p>
                            <div className="mt-auto flex items-center text-primary font-medium text-sm group-hover:underline">
                                Läs hela guiden <ArrowRight size={16} className="ml-1" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
}
