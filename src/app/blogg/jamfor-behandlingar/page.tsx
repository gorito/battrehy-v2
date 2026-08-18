import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SchemaScript } from '@/components/SchemaScript';
import { buildBreadcrumbSchema, buildArticleSchema, buildFAQSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Botox, filler, HIFU eller laser? Så väljer du rätt behandling (2026)',
    description: 'Vilken estetisk behandling passar dig? Jämför botox, filler, HIFU, laser, peeling och microneedling – vad de gör, downtime, hållbarhet och pris.',
    alternates: {
        canonical: 'https://battrehy.se/blogg/jamfor-behandlingar',
    },
    openGraph: {
        title: 'Botox, filler, HIFU eller laser? Så väljer du rätt behandling (2026)',
        description: 'Vilken estetisk behandling passar dig? Jämför botox, filler, HIFU, laser, peeling och microneedling – vad de gör, downtime, hållbarhet och pris.',
        type: 'article',
        locale: 'sv_SE',
        url: 'https://battrehy.se/blogg/jamfor-behandlingar',
        images: [
            {
                url: 'https://battrehy.se/images/blogg/jamfor-behandlingar-hero.webp',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Botox, filler, HIFU eller laser? Så väljer du rätt behandling (2026)',
        description: 'Vilken estetisk behandling passar dig? Jämför botox, filler, HIFU, laser, peeling och microneedling – vad de gör, downtime, hållbarhet och pris.',
        images: ['https://battrehy.se/images/blogg/jamfor-behandlingar-hero.webp'],
    }
};

export default function BlogPost() {
    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Hem', url: 'https://battrehy.se' },
            { name: 'Blogg', url: 'https://battrehy.se/blogg' },
            { name: 'Jämför behandlingar', url: 'https://battrehy.se/blogg/jamfor-behandlingar' }
        ]),
        buildArticleSchema({
            headline: "Botox, filler, HIFU eller laser? Så väljer du rätt behandling",
            description: "Vilken estetisk behandling passar dig? Jämför botox, filler, HIFU, laser, peeling och microneedling – vad de gör, downtime, hållbarhet och pris.",
            datePublished: "2026-07-28T08:00:00+02:00",
            dateModified: "2026-07-28T08:00:00+02:00",
            imageUrl: "https://battrehy.se/images/blogg/jamfor-behandlingar-hero.webp",
            pageUrl: "https://battrehy.se/blogg/jamfor-behandlingar"
        }),
        buildFAQSchema([
            { question: "Vilken behandling är bäst mot rynkor?", answer: "Det beror på rynkan. Rörelserynkor svarar bäst på botox, medan struktur- och ytrynkor förbättras av microneedling, laser eller peeling. Volymrelaterade veck kan behandlas med filler." },
            { question: "Vad är skillnaden mellan botox och filler?", answer: "Botox slappnar av muskler och slätar ut rörelserynkor; filler fyller ut och ger volym eller kontur. De löser olika problem och kombineras ofta." },
            { question: "HIFU eller laser – vad ska jag välja?", answer: "HIFU för uppstramning vid slapphet, laser för pigment, kärl och ytförnyelse. De har olika mål och utesluter inte varandra." },
            { question: "Kan man kombinera flera behandlingar?", answer: "Ja, det är vanligt och ger ofta bäst resultat. En klinik kan lägga upp en behandlingsplan som kombinerar metoder över tid." },
            { question: "Hur vet jag vilken behandling som passar mig?", answer: "Utgå från ditt problem (rynkor, volym, slapphet, pigment, hudkvalitet) och boka en konsultation. En seriös klinik gör en individuell bedömning och rekommenderar utifrån din hud." },
            { question: "Vad kostar behandlingarna?", answer: "Priset varierar med behandling och klinik – se jämförelsetabellen för ungefärliga prisspann. Räkna med totalkostnaden, eftersom flera behandlingar ges i serier." }
        ])
    ];

    return (
        <main className="min-h-screen bg-white p-4 sm:p-8 pb-24">
            <SchemaScript schemas={schemas} />
            <div className="max-w-3xl mx-auto">
                <Link href="/blogg" className="inline-flex items-center text-primary hover:underline mb-8 font-medium">
                    <ArrowLeft size={16} className="mr-2" />
                    Tillbaka till bloggen
                </Link>
                
                <article>
                    <header className="mb-10">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                            Botox, filler, HIFU eller laser? Så väljer du rätt behandling
                        </h1>
                        <div className="flex items-center text-gray-500 text-sm mb-8">
                            <span className="font-medium">Av Battrehys redaktion</span>
                            <span className="mx-2">·</span>
                            <span>Publicerad 28 juli 2026</span>
                        </div>
                        
                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 mb-10 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/jamfor-behandlingar-hero.webp" 
                                alt="Klient och behandlare diskuterar behandlingsalternativ vid en konsultation" 
                                className="w-full h-auto object-cover max-h-[500px]"
                                width={1600}
                                height={893}
                                fetchPriority="high"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">Rätt behandling väljs efter ditt problem – en bra klinik utgår från en individuell bedömning.</p>
                        </div>
                    </header>

                    <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                        <p>
                            Utbudet av estetiska behandlingar kan kännas som en djungel: botox, filler, HIFU, laser, peeling, microneedling, skinboosters … Vilken passar egentligen dig? Den här guiden jämför de vanligaste behandlingarna sida vid sida – vad de gör, hur länge de håller, återhämtning och ungefärligt pris – och hjälper dig att välja utifrån ditt problem snarare än vad som är populärast. Vi är en oberoende katalog, så du får en neutral jämförelse.
                        </p>

                        <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl my-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Det viktigaste i korthet (TL;DR)</h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li><strong>Välj efter problem, inte hype.</strong> Olika behandlingar löser olika saker.</li>
                                <li><strong>Rörelserynkor → botox. Volym → filler. Slapphet → HIFU. Pigment → laser/peeling.</strong></li>
                                <li><strong>Kombination ger ofta bäst resultat</strong> – behandlingarna kompletterar varandra.</li>
                                <li><strong>Håll koll på totalkostnaden</strong> – många behandlingar ges i serie.</li>
                                <li>Injektioner kräver <strong>legitimerad personal</strong>; välj klinik med omsorg.</li>
                            </ul>
                        </div>

                        <nav className="bg-gray-50 border border-gray-200 p-6 rounded-2xl mb-12">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Innehåll</h2>
                            <ul className="space-y-2 text-gray-700">
                                <li><a href="#valet" className="text-primary hover:underline">1. Så tänker du kring valet</a></li>
                                <li><a href="#oversikt" className="text-primary hover:underline">2. Snabb översikt av behandlingarna</a></li>
                                <li><a href="#tabell" className="text-primary hover:underline">3. Stora jämförelsetabellen</a></li>
                                <li><a href="#problem" className="text-primary hover:underline">4. Vilken behandling för vilket problem?</a></li>
                                <li><a href="#jamforelser" className="text-primary hover:underline">5. Vanliga jämförelser förklarade</a></li>
                                <li><a href="#hifu" className="text-primary hover:underline">6. HIFU – icke-kirurgisk uppstramning</a></li>
                                <li><a href="#kombinera" className="text-primary hover:underline">7. Kan man kombinera behandlingar?</a></li>
                                <li><a href="#klinik" className="text-primary hover:underline">8. Att välja klinik</a></li>
                                <li><a href="#faq" className="text-primary hover:underline">9. Vanliga frågor</a></li>
                                <li><a href="#kallor" className="text-primary hover:underline">10. Källor</a></li>
                            </ul>
                        </nav>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="valet">Så tänker du kring valet</h2>
                        <p>
                            Det enklaste sättet att navigera bland behandlingarna är att utgå från <strong>vad de faktiskt gör</strong>. De flesta faller i några grupper: sådana som slappnar av muskler (botox), sådana som fyller ut och ger volym (filler), sådana som stimulerar hudens eget kollagen (microneedling, HIFU, laser), och sådana som jobbar på ytan med ton och pigment (peeling, IPL). När du vet vilket problem du vill åtgärda blir valet mycket enklare – och en bra klinik hjälper dig med bedömningen vid konsultationen.
                        </p>
                        <p>
                            Två saker är värda att ha med sig. För det första: <strong>icke-kirurgiska behandlingar har en gräns</strong> – de kan göra stor skillnad, men vid kraftig slapphet eller stort hudöverskott är det ibland kirurgi som faktiskt löser problemet. För det andra: <strong>mer är inte bättre.</strong> Målet är ett naturligt resultat, och en skicklig behandlare avråder ibland från en behandling lika ofta som hen rekommenderar en.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="oversikt">Snabb översikt av behandlingarna</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li><strong>Botox (muskelavslappnande):</strong> slätar ut rörelserynkor. → <Link href="/blogg/botoxbehandling-den-kompletta-guiden" className="text-primary hover:underline font-medium">Guide till botox</Link></li>
                            <li><strong>Filler:</strong> återställer volym och kontur. → <Link href="/blogg/fillerbehandling-den-kompletta-guiden" className="text-primary hover:underline font-medium">Guide till filler</Link></li>
                            <li><strong>Skinbooster / Profhilo:</strong> förbättrar fukt och hudkvalitet.</li>
                            <li><strong>Microneedling:</strong> stimulerar kollagen mot struktur, porer och ärr.</li>
                            <li><strong>Kemisk peeling:</strong> jämnar ton, pigment och ytstruktur. → <Link href="/blogg/ansiktsbehandling-den-kompletta-guiden" className="text-primary hover:underline font-medium">Guide till ansiktsbehandling</Link></li>
                            <li><strong>Laser & IPL:</strong> behandlar pigment, kärl och ytförnyelse (samt hårborttagning). → <Link href="/blogg/laserharborttagning" className="text-primary hover:underline font-medium">Laserhårborttagning</Link></li>
                            <li><strong>HIFU:</strong> icke-kirurgisk uppstramning med fokuserat ultraljud.</li>
                        </ul>
                        <p className="mt-4">
                            En bredare genomgång av behandlingar mot åldrande hud finns i vår <Link href="/blogg/anti-aging-behandling" className="text-primary hover:underline font-medium">guide till anti-aging och hudföryngring</Link>.
                        </p>

                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/jamfor-behandlingar-injektion.webp" 
                                alt="Behandlare ger en kosmetisk injektion i ansiktet" 
                                className="w-full h-auto object-cover max-h-96"
                                width={1600}
                                height={1073}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">Botox och filler är båda injektioner – men löser olika problem (muskel respektive volym).</p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="tabell">Stora jämförelsetabellen</h2>
                        <div className="overflow-x-auto my-6 border border-gray-200 rounded-xl">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Behandling</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Bäst för</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Återhämtning</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Håller i</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ungefärligt pris*</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-sm sm:text-base">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Botox</td>
                                        <td className="px-6 py-4 text-gray-700">Rörelserynkor; kraftig svettning</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">Ingen</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">3–4 mån</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">1 500–4 000 kr/område</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Filler</td>
                                        <td className="px-6 py-4 text-gray-700">Volym, käklinje, läppar, veck</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">Minimal</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">6–18 mån</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">3 000–6 000 kr/spruta</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Skinbooster / Profhilo</td>
                                        <td className="px-6 py-4 text-gray-700">Fukt, lyster, hudkvalitet</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">Minimal</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">~6 mån (kur)</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">2 000–5 000 kr/beh.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Microneedling (ev. RF)</td>
                                        <td className="px-6 py-4 text-gray-700">Struktur, porer, ärr, mild uppstramning</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">1–3 dagar</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">Serie</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">1 500–4 500 kr/beh.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Kemisk peeling</td>
                                        <td className="px-6 py-4 text-gray-700">Ton, pigment, ytstruktur, fina linjer</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">Ingen–flagning</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">Serie</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">500–2 000 kr/beh.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Laser & IPL</td>
                                        <td className="px-6 py-4 text-gray-700">Pigment, kärl, ytförnyelse, hårborttagning</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">Låg (CO2 flera dagar)</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">Månader–år</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">1 000–8 000+ kr/beh.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">HIFU</td>
                                        <td className="px-6 py-4 text-gray-700">Mild–måttlig slapphet, uppstramning</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">Ingen–minimal</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">1–2 år</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">1 900–8 900 kr/beh.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-gray-500 italic mt-1">* Ungefärliga prisspann i Sverige; varierar med klinik, stad och omfattning. Många behandlingar ges i serie – räkna med totalkostnaden.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="problem">Vilken behandling för vilket problem?</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Rörelserynkor</strong> (panna, mellan ögonbrynen, kråksparkar) → botox</li>
                            <li><strong>Volymförlust, otydlig käklinje, tunna läppar</strong> → filler</li>
                            <li><strong>Slapp hud</strong> → HIFU eller RF-microneedling</li>
                            <li><strong>Pigmentfläckar och solskador</strong> → laser/IPL eller kemisk peeling → se <Link href="/blogg/pigmentflackar" className="text-primary hover:underline font-medium">pigmentfläckar</Link></li>
                            <li><strong>Ärr, porer och ojämn struktur</strong> → microneedling eller laser</li>
                            <li><strong>Torr, glåmig hud</strong> → skinbooster/Profhilo</li>
                            <li><strong>Oönskad hårväxt</strong> → <Link href="/blogg/laserharborttagning" className="text-primary hover:underline font-medium">laserhårborttagning</Link></li>
                            <li><strong>Akne och akneärr</strong> → se <Link href="/blogg/aknebehandling" className="text-primary hover:underline font-medium">aknebehandling</Link></li>
                        </ul>
                        <p className="mt-4">
                            And kom ihåg: grunden för allt är en bra <Link href="/blogg/hudvardsrutin" className="text-primary hover:underline font-medium">hudvårdsrutin</Link> och dagligt solskydd.
                        </p>

                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/jamfor-behandlingar-resultat.webp" 
                                alt="Person med naturligt frisk och strålande hud" 
                                className="w-full h-auto object-cover max-h-96"
                                width={1600}
                                height={1073}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">Målet är alltid ett naturligt resultat – ofta genom en kombination av behandlingar över tid.</p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="jamforelser">Vanliga jämförelser förklarade</h2>
                        <p>
                            <strong>Botox eller filler?</strong> De löser olika problem: botox slappnar av muskler (rörelserynkor), filler fyller ut (volym och kontur). Vid t.ex. en trött övre ansiktshalva kombineras de ofta.
                        </p>
                        <p>
                            <strong>HIFU eller laser?</strong> HIFU värmer hudens djupare lager för uppstramning (kollagen), medan laser främst jobbar på ytan med pigment, kärl och ytförnyelse. Har du slapphet passar HIFU; har du pigment eller solskador passar laser.
                        </p>
                        <p>
                            <strong>Profhilo/skinbooster eller filler?</strong> Skinboosters förbättrar fukt och hudkvalitet men ger inte volym; filler ger volym och kontur. Många kombinerar dem.
                        </p>
                        <p>
                            <strong>Microneedling eller laser?</strong> Microneedling (nålar) stimulerar kollagen, passar de flesta hudtoner och är ofta billigare; laser (ljus) är kraftfullare mot pigment och kärl men kräver mer hänsyn till hudton. Valet beror på mål och hudtyp.
                        </p>
                        <p>
                            <strong>Icke-kirurgiskt eller kirurgi?</strong> De flesta behandlingar i den här guiden är icke-kirurgiska, med kort eller ingen återhämtning, och är ofta ett utmärkt förstasteg. Men vid kraftig slapphet eller stort hudöverskott ger ett kirurgiskt ingrepp (t.ex. ansiktslyft eller ögonlocksplastik) mer bestående resultat. En ärlig klinik säger till när du nått gränsen för vad icke-kirurgiskt kan åstadkomma.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="hifu">HIFU – icke-kirurgisk uppstramning</h2>
                        <p>
                            HIFU (fokuserat ultraljud) värmer hudens djupare lager och stimulerar nybildning av kollagen, vilket ger en gradvis uppstramning. Det är ett populärt <strong>icke-kirurgiskt</strong> alternativ vid mild till måttlig slapphet – till exempel längs käklinje och hals.
                        </p>
                        <p>
                            Resultatet byggs upp under två till sex månader och håller ofta i ett till två år. Återhämtningen är minimal. Viktigt att veta: HIFU ersätter inte ett kirurgiskt ansiktslyft vid kraftig hudöverskott – där kan kirurgi vara mer relevant. En seriös klinik är tydlig med vad som är realistiskt för just din hud.
                        </p>

                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/jamfor-behandlingar-device.webp" 
                                alt="Energibaserad behandling med handstycke mot ansiktet" 
                                className="w-full h-auto object-cover max-h-96"
                                width={1600}
                                height={1073}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">HIFU och laser är energibaserade – för uppstramning respektive pigment och ytförnyelse.</p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="kombinera">Kan man kombinera behandlingar?</h2>
                        <p>
                            Ja – och det är ofta så man får bäst och mest naturligt resultat, eftersom behandlingarna gör olika saker. Vanliga kombinationer är botox och filler (muskel + volym), HIFU eller microneedling tillsammans med skinboosters (uppstramning + fukt), och laser eller peeling tillsammans med rätt hemmavård. En bra klinik lägger upp en <strong>behandlingsplan</strong> över tid snarare än att sälja in en enskild behandling. Ett exempel: mot ett trött ansikte i 40-årsåldern kan planen kombinera botox mot pannrynkor, en skinbooster för lyster och HIFU för lätt uppstramning – utspritt över några månader i stället för allt på en gång.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="klinik">Att välja klinik</h2>
                        <p>
                            Oavsett behandling gäller samma grundregler. Kontrollera att injektionsbehandlingar utförs av <strong>legitimerad läkare, tandläkare eller sjuksköterska</strong> och att kliniken är registrerad hos <strong>IVO</strong>. (För laser- och IPL-behandlingar är det i stället <strong>Strålsäkerhetsmyndigheten</strong> som är tillsynsmyndighet sedan 2026.) Se till att du får en <strong>konsultation</strong> där behandlaren utgår från ditt problem – inte från en enskild produkt de vill sälja.
                        </p>
                        <p>
                            Läs vår guide <Link href="/blogg/estetisk-klinik" className="text-primary hover:underline font-medium">Så väljer du en seriös estetisk klinik</Link> för en komplett checklista, och <Link href="/behandlingar/hudvard" className="text-primary hover:underline font-medium">jämför kliniker på battrehy.se</Link>.
                        </p>

                        <div className="bg-gray-50 border-l-4 border-primary p-6 mt-8 rounded-r-lg">
                            <h3 className="font-bold text-gray-900 mb-2">Hitta en klinik nära dig</h3>
                            <p className="text-gray-700 text-sm sm:text-base mb-4">
                                På <strong>battrehy.se</strong> samlar vi kliniker som utför hudvård och estetiska behandlingar i hela Sverige. Hitta och jämför verifierade kliniker i ditt område.
                            </p>
                            <Link href="/behandlingar/hudvard" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary hover:bg-rose-600 transition-colors">
                                Hitta kliniker för hudvård
                            </Link>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="faq">Vanliga frågor</h2>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-gray-900">Vilken behandling är bäst mot rynkor?</h4>
                                <p className="text-gray-700 mt-1">Det beror på rynkan. Rörelserynkor svarar bäst på botox, medan struktur- och ytrynkor förbättras av microneedling, laser eller peeling. Volymrelaterade veck kan behandlas med filler.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Vad är skillnaden mellan botox och filler?</h4>
                                <p className="text-gray-700 mt-1">Botox slappnar av muskler och slätar ut rörelserynkor; filler fyller ut och ger volym eller kontur. De löser olika problem och kombineras ofta.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">HIFU eller laser – vad ska jag välja?</h4>
                                <p className="text-gray-700 mt-1">HIFU for uppstramning vid slapphet, laser för pigment, kärl och ytförnyelse. De har olika mål och utesluter inte varandra.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Kan man kombinera flera behandlingar?</h4>
                                <p className="text-gray-700 mt-1">Ja, det är vanligt och ger ofta bäst resultat. En klinik kan lägga upp en behandlingsplan som kombinerar metoder över tid.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Hur vet jag vilken behandling som passar mig?</h4>
                                <p className="text-gray-700 mt-1">Utgå från ditt problem (rynkor, volym, slapphet, pigment, hudkvalitet) och boka en konsultation. En seriös klinik gör en individuell bedömning och rekommenderar utifrån din hud – inte utifrån en kampanj.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Vad kostar behandlingarna?</h4>
                                <p className="text-gray-700 mt-1">Priset varierar med behandling och klinik – se jämförelsetabellen ovan för ungefärliga prisspann. Räkna med totalkostnaden, eftersom flera behandlingar ges i serier.</p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="kallor">Källor</h2>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                            <li>1177 Vårdguiden – information inför estetiska behandlingar</li>
                            <li>Socialstyrelsen – Lag (2021:363) om estetiska injektioner och kirurgi; Strålsäkerhetsmyndigheten – laser/IPL</li>
                            <li>Dermatologisk konsensus – metoder, effekt och säkerhet</li>
                        </ul>

                        <div className="mt-12 text-sm text-gray-500 italic border-t border-gray-200 pt-8">
                            Den här artikeln är framtagen av Battrehys redaktion i informationssyfte och utgör inte medicinsk rådgivning. Rådgör med legitimerad personal inför en behandling.
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}
