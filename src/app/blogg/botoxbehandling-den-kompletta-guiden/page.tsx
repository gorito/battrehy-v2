import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles, Clock } from 'lucide-react';
import { SchemaScript } from '@/components/SchemaScript';
import { buildBreadcrumbSchema, buildArticleSchema, buildFAQSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Botoxbehandling i Sverige 2026: Priser, Regler & Komplett Guide',
    description: 'Komplett guide till botox i Sverige 2026. Se aktuella priser per stad & område (snitt 3 064 kr), 48 h betänketid enligt lag 2021:363, eftervård och IVO-godkända kliniker.',
    alternates: {
        canonical: 'https://battrehy.se/blogg/botoxbehandling-den-kompletta-guiden',
    },
    openGraph: {
        title: 'Botoxbehandling i Sverige 2026: Priser, Regler & Komplett Guide',
        description: 'Komplett guide till botox i Sverige 2026. Se aktuella priser per stad & område (snitt 3 064 kr), 48 h betänketid enligt lag 2021:363, eftervård och IVO-godkända kliniker.',
        type: 'article',
        locale: 'sv_SE',
        url: 'https://battrehy.se/blogg/botoxbehandling-den-kompletta-guiden',
        images: [
            {
                url: 'https://battrehy.se/images/blogg/botox_hero.jpeg',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Botoxbehandling i Sverige 2026: Priser, Regler & Komplett Guide',
        description: 'Komplett guide till botox i Sverige 2026. Se aktuella priser per stad & område (snitt 3 064 kr), 48 h betänketid enligt lag 2021:363, eftervård och IVO-godkända kliniker.',
        images: ['https://battrehy.se/images/blogg/botox_hero.jpeg'],
    }
};

export default function BotoxBlogPost() {
    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Hem', url: 'https://battrehy.se' },
            { name: 'Blogg', url: 'https://battrehy.se/blogg' },
            { name: 'Botoxbehandling', url: 'https://battrehy.se/blogg/botoxbehandling-den-kompletta-guiden' }
        ]),
        buildArticleSchema({
            headline: "Botoxbehandling i Sverige 2026 — den kompletta guiden till priser, säkerhet och kliniker",
            description: "Allt om botoxbehandling i Sverige 2026: priser, säkerhet, IVO-regler, områden och hur du väljer en seriös klinik.",
            datePublished: "2026-05-01T08:00:00+02:00",
            dateModified: "2026-09-07T08:00:00+02:00",
            imageUrl: "https://battrehy.se/images/blogg/botox_hero.jpeg",
            pageUrl: "https://battrehy.se/blogg/botoxbehandling-den-kompletta-guiden"
        }),
        buildFAQSchema([
            { question: "Vad kostar en botoxbehandling i Sverige 2026?", answer: "En botoxbehandling kostar mellan 1 800 kr (för 1 mindre område) och cirka 5 500 kr (för 3 standardområden i övre ansiktet). Riksgenomsnittet i Sverige 2026 ligger på cirka 3 064 kr per behandling enligt Skönhetskollens prisindex över 550+ kliniker." },
            { question: "Hur länge håller resultatet av botox?", answer: "Resultatet varar i regel mellan 3 och 6 månader. Vid din allra första behandling håller effekten ofta i cirka 3 månader eftersom muskeln snabbt återhämtar sig. Vid regelbundna underhållsbehandlingar försvagas muskeln lätt, vilket kan förlänga hållbarheten till 4–6 månader." },
            { question: "Vem får utföra botox i Sverige enligt lag?", answer: "Enligt Lag (2021:363) om estetiska injektionsbehandlingar får botox endast utföras av legitimerad läkare, legitimerad sjuksköterska eller legitimerad tandläkare. Kliniken måste dessutom vara registrerad i IVO:s vårdgivarregister." },
            { question: "Måste man ha konsultation och betänketid innan behandlingen?", answer: "Ja. Enligt svensk lag är det obligatoriskt med minst 48 timmars betänketid mellan konsultationen och behandlingen för nya patienter. Samma regel gäller om du inte har besökt kliniken under de senaste sex månaderna." },
            { question: "Gör en botoxbehandling ont?", answer: "De allra flesta upplever behandlingen som relativt smärtfri. Nålarna som används är extremt tunna (ofta 30G–32G). Varje stick känns som ett litet, snabbt myggstick och varar i en bråkdel av en sekund." },
            { question: "Kan man träna samma dag som man tagit botox?", answer: "Nej. Du ska helt undvika pulshöjande träning, gympass och tunga lyft under minst 24 timmar efter injektionen. Träning ökar blodtrycket och cirkulationen, vilket ökar risken för att toxinet sprider sig till icke-avsedda muskler samt förvärrar blåmärken." },
            { question: "Kan man ta botox under graviditet eller amning?", answer: "Nej, absolut inte. Det saknas tillräckliga kliniska säkerhetsstudier om hur botulinumtoxin påverkar fosterutveckling eller om det passerar över i bröstmjölk. Seriösa kliniker behandlar aldrig gravida eller ammande kvinnor." },
            { question: "Kan man lösa upp eller ångra botox om man blir missnöjd?", answer: "Nej. Till skillnad från hyaluronsyrebaserade fillers finns det inget motgift eller upplösande medel för botox. Om en biverkning eller asymmetri uppstår måste man vänta ut kroppens naturliga återhämtning (ofta 8–12 veckor innan rörligheten börjar återkomma)." },
            { question: "Hur skiljer sig preventiv botox ('baby botox') från traditionell botox?", answer: "Preventiv botox innebär att man injicerar mycket små mikrodoser i ett tidigt skede (ofta i 25–30-årsåldern) innan mimiklinjerna hunnit etablera sig som permanenta, statiska veck. Traditionell botox använder högre doser för att slappna av redan etablerade rynkor." },
            { question: "Hur många enheter (units) botox behövs per område?", answer: "Dosen anpassas individuellt efter muskelstyrka. Typiska riktlinjer för kvinnor är: glabella 15–25 enheter, panna 10–20 enheter, kråksparkar 12–24 enheter totalt, masseter 40–60 enheter och lip flip 4–8 enheter. Män har kraftigare muskelmassa och kräver ofta 30–50 % fler enheter." },
            { question: "Är botox vanligt för män ('Brotox') och skiljer sig doseringen?", answer: "Ja, botox bland män växer mycket snabbt. Det kräver dock särskild anatomisk expertis: doserna måste vara högre på grund av kraftigare muskulatur, och tekniken måste anpassas för att inte lyfta brynens ytterkanter och skapa ett feminint bågformat ögonbryn." },
            { question: "Vad händer med ansiktet om man slutar med botox efter flera år?", answer: "Musklerna återfår successivt sin fulla rörlighet och rynkorna återgår långsamt till sitt ursprungliga utseende. Huden åldras inte snabbare för att du slutar – tvärtom har huden vilat från upprepade veck under behandlingsperioden." },
            { question: "Kan man kombinera botox och fillers vid samma besök?", answer: "Ja, det kallas ofta för ett 'Liquid Facelift'. Det är vanligt att kombinera botox i övre ansiktet med fillers i mellan- eller nedre ansiktet för att återskapa volym i exempelvis kinder eller käklinje." },
            { question: "Kan man bli immun eller utveckla resistens mot botox?", answer: "Ja, men det är mycket ovanligt (under 1 % av patienter). Det beror på att kroppen bildar antikroppar mot toxinet eller hjälpproteinerna. Risken minimeras genom att undvika för täta påfyllningar samt genom att använda proteinrenat toxin som Bocouture." },
            { question: "Vad är en 'lip flip' och hur skiljer det sig från läppfillers?", answer: "En lip flip innebär att 4–8 enheter botox injiceras i muskeln precis ovanför överläppens kant, vilket får läppen att rulla ut lätt utan extra volym. Fillers bygger däremot fysisk volym och kontur inifrån med hyaluronsyragel." },
            { question: "Hjälper botox mot spänningshuvudvärk och migrän?", answer: "Ja. Botox är ett officiellt godkänt läkemedel för kronisk migrän enligt PREEMPT-protokollet. Många som behandlar glabella och panna av kosmetiska skäl upplever också en markant minskning av spänningshuvudvärk." },
            { question: "Varför får vissa huvudvärk precis efter en botoxbehandling?", answer: "Under de första 24–48 timmarna kan en mild spänningshuvudvärk uppstå på grund av mikrotrauma från nålsticken och att intilliggande muskler kompenserar när de behandlade musklerna slappnar av. Det är ofarligt och går över snabbt." },
            { question: "Vilka biverkningar kan botox ge?", answer: "Vanliga övergående biverkningar är liten rodnad, små märken vid insticken, tillfälliga blåmärken och mild huvudvärk. Sällsynta biverkningar är asymmetri eller hängande ögonlock (ptos). Mycket sällsynta allvarliga reaktioner är infektion eller allergi." },
            { question: "Hur snabbt syns effekten av botox?", answer: "Första antydan till effekt syns oftast efter 3–5 dagar (2–3 dagar med Azzalure). Fullständig effekt inträder efter 10–14 dagar, vilket är tidpunkten då resultatet ska utvärderas." },
            { question: "Vad är den största skillnaden mellan Botox, Azzalure och Bocouture?", answer: "Alla tre baseras på botulinumtoxin typ A. Azzalure verkar ofta snabbast och sprider sig bredare, Botox har mycket hög precision för små mimikmuskler, och Bocouture är fritt från komplexbildande proteiner vilket minimerar risken för antikroppsbildning." },
            { question: "Kan man dricka kaffe eller ta värktabletter före behandlingen?", answer: "Undvik blodförtunnande värktabletter som acetylsalicylsyra (Treo) och ibuprofen (Ipren) samt omega-3-tillskott under 3–5 dagar före besöket för att minska risken för blåmärken. Kaffe går bra i måttliga mängder." },
            { question: "Hur hittar jag en seriös och IVO-godkänd botoxklinik?", answer: "Kontrollera att kliniken finns i IVO:s vårdgivarregister och att behandlaren har svensk legitimation via Socialstyrelsen. Se till att kliniken tillämpar 48 timmars betänketid, har patientförsäkring och erbjuder en gratis 14-dagarskontroll." }
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
                            Botoxbehandling i Sverige 2026 — den kompletta guiden till priser, säkerhet och kliniker
                        </h1>
                        <div className="flex flex-wrap items-center text-gray-500 text-sm mb-8 gap-y-2">
                            <span className="font-medium text-gray-800">Av Battrehys redaktion</span>
                            <span className="mx-2">·</span>
                            <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs font-medium">
                                <Sparkles size={12} className="mr-1 text-emerald-600" />
                                Medicinskt granskad
                            </span>
                            <span className="mx-2">·</span>
                            <span>Senast uppdaterad: 7 september 2026</span>
                        </div>
                        
                        {/* Main article image */}
                        <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden bg-gray-100 mb-10 shadow-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/botox_hero.jpeg" 
                                alt="Före och efter botoxbehandling av pannrynkor och glabella – naturligt resultat 2026" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </header>

                    <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                        <p>
                            En botoxbehandling är en injektion av botulinumtoxin typ A som tillfälligt slappnar av en utvald muskel — vanligast för att mjuka upp uttrycksrynkor i panna, mellan ögonbrynen och runt ögonen. Botox är samtidigt ett av Sveriges mest reglerade estetiska ingrepp: sedan 2021 krävs legitimerad personal, 48 timmars betänketid och IVO-registrerad klinik. Den här guiden går igenom vad behandlingen gör, vad den kostar 2026, vilka risker som finns — och hur du säkerställer att din klinik följer lagen.
                        </p>

                        <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl my-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <span className="mr-2">📌</span> Snabb sammanfattning – Botox i Sverige 2026
                            </h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-base sm:text-lg">
                                <li><strong>Botox är botulinumtoxin typ A:</strong> En injektion som tillfälligt blockerar nervsignaler till en muskel för att släppa spänningar och släta ut dynamiska mimiklinjer.</li>
                                <li><strong>Nationellt snittpris 2026:</strong> ca <strong>3 064 kr</strong> för en standardbehandling (enligt Skönhetskollens prisrapport över 550+ kliniker).</li>
                                <li><strong>Pris per zon:</strong> 1 område median ca <strong>2 500–2 700 kr</strong> (lägst 1 800 kr, högst 3 500 kr); 3 områden ca <strong>4 000–5 800 kr</strong> (median 5 500 kr).</li>
                                <li><strong>Hållbarhet:</strong> Typiskt <strong>3–6 månader</strong> (ofta ca 3 månader vid första behandlingen; förlängs successivt till 4–6 månader vid regelbundet underhåll).</li>
                                <li><strong>Lag 2021:363:</strong> Kräver minst <strong>48 timmars obligatorisk betänketid</strong> efter konsultation, legitimerad personal (läkare, sjuksköterska, tandläkare), patientförsäkring och IVO-registrering.</li>
                                <li><strong>Skärpt tillsyn:</strong> IVO har genomfört över 180 tillsynsbeslut under 2024–2026 — kontrollera alltid behandlarens legitimation i Socialstyrelsens register före bokning.</li>
                            </ul>
                        </div>

                        <nav className="bg-gray-50 border border-gray-200 p-6 rounded-2xl mb-12">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Innehåll i guiden</h2>
                            <ul className="space-y-2 text-gray-700 text-base">
                                <li><a href="#vad-ar" className="text-primary hover:underline">1. Vad är botox?</a></li>
                                <li><a href="#jamforelse-preparat" className="text-primary hover:underline font-medium">2. Botox vs Dysport vs Azzalure vs Bocouture 2026 – vilken ska du välja?</a></li>
                                <li><a href="#omraden" className="text-primary hover:underline">3. Vilka områden kan behandlas med botox?</a></li>
                                <li><a href="#behandling" className="text-primary hover:underline">4. Hur går behandlingen till?</a></li>
                                <li><a href="#priser" className="text-primary hover:underline font-medium">5. Vad kostar botox i Sverige 2026? (Nya tabeller & stadsjämförelse)</a></li>
                                <li><a href="#hallbarhet" className="text-primary hover:underline">6. Hur länge håller resultatet?</a></li>
                                <li><a href="#risker" className="text-primary hover:underline">7. Risker, biverkningar och kontraindikationer</a></li>
                                <li><a href="#lag" className="text-primary hover:underline">8. Lag 2021:363 och IVO — dina rättigheter som patient</a></li>
                                <li><a href="#valja-klinik" className="text-primary hover:underline font-medium">9. Så väljer du en seriös klinik (10-punkters checklista)</a></li>
                                <li><a href="#fore-efter" className="text-primary hover:underline font-medium">10. Eftervård efter botox: Den medicinska checklistan</a></li>
                                <li><a href="#faq" className="text-primary hover:underline">11. Vanliga frågor (FAQ 2026)</a></li>
                                <li><a href="#kallor" className="text-primary hover:underline">12. Källor och medicinsk granskning</a></li>
                            </ul>
                        </nav>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="vad-ar">Vad är botox?</h2>
                        <p>
                            Botox är ett varumärke för botulinumtoxin typ A, ett protein som framställs från bakterien <em>Clostridium botulinum</em>. När det injiceras i mycket små mängder i en specifik muskel blockerar det tillfälligt nervsignalen som får muskeln att dra ihop sig. Resultatet: muskeln slappnar av, vilket mjukar upp eller släpper ut den rynka som musklen orsakade.
                        </p>
                        <p>
                            Det är viktigt att skilja botox från <strong>filler</strong>. Botox slappnar av muskler — fillers tillför volym. De används ofta tillsammans men har olika syften: botox passar dynamiska rynkor (de som syns när du skrattar, rynkar pannan), fillers passar volymförluster och statiska linjer. För en djupare jämförelse, se vår <Link href="/blogg/fillerbehandling-den-kompletta-guiden" className="text-primary hover:underline">guide till fillerbehandling</Link>.
                        </p>
                        <p>
                            På den svenska marknaden används framför allt tre godkända botulinumtoxin-preparat: <strong>Botox</strong> (Allergan), <strong>Azzalure</strong> (Galderma/Ipsen) och <strong>Bocouture</strong> (Merz). De skiljer sig i bland annat doseringsformat och hur snabbt effekten kommer, men resultaten är för normala kosmetiska användningar i praktiken jämförbara.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="jamforelse-preparat">
                            Botox vs Dysport vs Azzalure vs Bocouture 2026 – vilken ska du välja?
                        </h2>
                        <p>
                            I folkmun kallas alla muskelavslappnande injektioner för &quot;Botox&quot;, men i realiteten finns det flera olika godkända läkemedel på den svenska marknaden. Alla baseras på samma aktiva substans – <strong>botulinumneurotoxin typ A</strong> – men de tillverkas med olika biotekniska metoder, innehåller olika hjälpproteiner och har skilda spridningsmönster i vävnaden.
                        </p>
                        <p>
                            Att matcha rätt preparat till rätt ansiktszon är avgörande för ett naturligt och hållbart resultat. Här är en direkt jämförelse av de preparat som används av svenska specialistkliniker 2026:
                        </p>

                        <div className="overflow-x-auto my-8">
                            <table className="w-full border-collapse bg-white border border-gray-200 rounded-lg text-sm">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Egenskap</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Botox / Vistabel</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Azzalure / Dysport</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Bocouture / Xeomin</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Letybo</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50">Aktiv substans</td>
                                        <td className="px-4 py-3 text-gray-900">OnabotulinumtoxinA</td>
                                        <td className="px-4 py-3 text-gray-900">AbobotulinumtoxinA</td>
                                        <td className="px-4 py-3 text-gray-900">IncobotulinumtoxinA</td>
                                        <td className="px-4 py-3 text-gray-900">LetibotulinumtoxinA</td>
                                    </tr>
                                    <tr className="bg-gray-50/50">
                                        <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50">Tillverkare</td>
                                        <td className="px-4 py-3 text-gray-900">Allergan (AbbVie)</td>
                                        <td className="px-4 py-3 text-gray-900">Galderma / Ipsen</td>
                                        <td className="px-4 py-3 text-gray-900">Merz Aesthetics</td>
                                        <td className="px-4 py-3 text-gray-900">Croma / Hugel</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50">Onset (tid till effekt)</td>
                                        <td className="px-4 py-3 text-gray-900">3–5 dagar</td>
                                        <td className="px-4 py-3 text-emerald-700 font-medium">2–3 dagar (snabbast)</td>
                                        <td className="px-4 py-3 text-gray-900">3–5 dagar</td>
                                        <td className="px-4 py-3 text-gray-900">3–5 dagar</td>
                                    </tr>
                                    <tr className="bg-gray-50/50">
                                        <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50">Spridningsradie</td>
                                        <td className="px-4 py-3 text-gray-900">Mycket precis</td>
                                        <td className="px-4 py-3 text-gray-900">Bredare spridning</td>
                                        <td className="px-4 py-3 text-gray-900">Låg & kontrollerad</td>
                                        <td className="px-4 py-3 text-gray-900">Måttlig</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50">Hjälpproteiner</td>
                                        <td className="px-4 py-3 text-gray-900">Komplexbildande</td>
                                        <td className="px-4 py-3 text-gray-900">Komplexbildande</td>
                                        <td className="px-4 py-3 text-emerald-700 font-medium">Inga (&quot;naket toxin&quot;)</td>
                                        <td className="px-4 py-3 text-gray-900">Komplexbildande</td>
                                    </tr>
                                    <tr className="bg-gray-50/50">
                                        <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50">Enhetskonvertering</td>
                                        <td className="px-4 py-3 text-gray-900">1 standardenhet</td>
                                        <td className="px-4 py-3 text-gray-900">ca 2,5 Speywood-E</td>
                                        <td className="px-4 py-3 text-gray-900">1:1 mot Botox</td>
                                        <td className="px-4 py-3 text-gray-900">1:1 mot Botox</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50">Hållbarhet</td>
                                        <td className="px-4 py-3 text-gray-900">3–5 mån</td>
                                        <td className="px-4 py-3 text-gray-900">3–5 mån</td>
                                        <td className="px-4 py-3 text-gray-900">3–5 mån</td>
                                        <td className="px-4 py-3 text-gray-900">3–4 mån</td>
                                    </tr>
                                    <tr className="bg-gray-50/50">
                                        <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50">Bäst lämpad för</td>
                                        <td className="px-4 py-3 text-gray-900">Precisionszoner: glabella, kråksparkar, lip flip</td>
                                        <td className="px-4 py-3 text-gray-900">Bred panna, hyperhidros (armhålor)</td>
                                        <td className="px-4 py-3 text-gray-900">Minskad antikroppsrisk, känsliga patienter</td>
                                        <td className="px-4 py-3 text-gray-900">Glabella hos prismedvetna</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900">Viktiga skillnader att känna till inför ditt val:</h3>
                            <p>
                                <strong>1. Komplexbildande proteiner och antikroppsbildning:</strong> När bakterien bildar botulinumtoxin kapslas molekylen naturligt in av skyddande proteiner. <strong>Bocouture</strong> är unikt då tillverkaren Merz renar bort dessa proteiner helt. Teoretiskt innebär detta en minimerad risk för att kroppens immunförsvar ska bilda neutraliserande antikroppar – ett utmärkt val för dig som behandlat regelbundet under många år och upplever att effekten börjat avta.
                            </p>
                            <p>
                                <strong>2. Spridningsradie (Diffusion):</strong> <strong>Azzalure</strong> diffunderar något bredare i muskelvävnaden jämfört med Botox och Bocouture. I en stor, bred panna eller i armhålor vid svettbehandling kan detta ge en jämn och fin övergång med färre stickpunkter. Runt ögonen och vid läpparna krävs å andra sidan extrem precision för att undvika att läkemedlet vandrar till intilliggande muskler.
                            </p>
                            <p>
                                <strong>3. Onset (Hur snabbt effekten sätter in):</strong> Har du ett viktigt event om några dagar? Studier visar att Azzalure ofta börjar dämpa muskelrörelser redan efter 48–72 timmar, medan Botox och Bocouture i regel behöver 3–5 dagar innan första effekten märks. Samtliga når full biokemisk effekt efter 10–14 dagar.
                            </p>
                            <p>
                                <strong>4. Enhetsmätning:</strong> Observera att enheter inte är universella. 50 Speywood-enheter Azzalure motsvarar ungefär 20 enheter Botox eller Bocouture. Bli därför inte förvånad om antalet enheter på ditt kvitto skiljer sig beroende på vilket preparat kliniken ordinerat.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="omraden">Vilka områden kan behandlas med botox?</h2>
                        <p>I Sverige används botox både för kosmetiska och medicinska syften. Här är de sju vanligaste områdena.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">1. Panna (frontalis)</h3>
                        <p>De horisontella linjer som syns när du höjer ögonbrynen. En av de enklaste behandlingarna och ofta startpunkten för nya patienter. Varlig dosering är viktig — för mycket och pannan blir orörlig och tung; för lite och rynkorna kvarstår.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">2. Argrynka / glabella</h3>
                        <p>Den vertikala &quot;11:an&quot; mellan ögonbrynen som ofta uppstår av koncentration eller solreflexer. Detta är historiskt det mest behandlade området globalt och ger ofta dramatiska resultat eftersom ett djupt veck kan släppa helt på två veckor.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">3. Kråksparkar</h3>
                        <p>Leende-linjerna som strålar ut från ögonens ytterkanter när du ler. Behandlas med små doser för att bevara naturligt uttryck.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">4. Lip flip / läppar</h3>
                        <p>Små doser i den övre läppens kant gör att läppen &quot;rullar ut&quot; något, vilket kan ge ett subtilt fyllande utseende utan filler. Hållbarhet kortare än andra områden (ofta 2–3 månader).</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">5. Käklinje och masseter</h3>
                        <p>Masseter (tuggmuskeln) kan injiceras vid <strong>bruxism</strong> (tandgnissling) eller för att smalna av en kraftig käkkontur. Detta är en medicinsk-kosmetisk hybridbehandling och en av de snabbast växande indikationerna.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">6. Hals och nacke</h3>
                        <p>Platysma-band — vertikala &quot;rep&quot; på halsen — kan mjukas upp med spridda injektioner. Mer avancerad teknik som kräver erfaren behandlare.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">7. Medicinska indikationer</h3>
                        <p>Botulinumtoxin är godkänt för flera medicinska tillstånd som ofta utförs på samma kliniker:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Hyperhidros (kraftig svettning)</strong> — armhålor, händer, fötter</li>
                            <li><strong>Migrän</strong> — kronisk migrän, behandling enligt PREEMPT-protokollet</li>
                            <li><strong>Bruxism</strong> — tandgnissling och käkpressning</li>
                            <li><strong>Spasticitet</strong> — vissa neurologiska tillstånd (utförs i regel inom sjukvården, inte estetisk klinik)</li>
                        </ul>

                        <div className="overflow-x-auto my-8">
                            <table className="w-full border-collapse bg-white border border-gray-200 rounded-lg hidden sm:table">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Område</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Typ av rynka/funktion</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Återhämtning</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hållbarhet</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {[
                                        ['Panna', 'Horisontella dynamiska rynkor', 'Ingen synlig', '3–5 mån'],
                                        ['Argrynka', 'Vertikal "11"', 'Ingen synlig', '4–6 mån'],
                                        ['Kråksparkar', 'Leende-linjer', 'Ingen synlig', '3–4 mån'],
                                        ['Lip flip', 'Subtilt läpplyft', 'Ingen synlig', '2–3 mån'],
                                        ['Masseter', 'Käkmuskel / bruxism', 'Ingen synlig', '4–6 mån'],
                                        ['Hals', 'Platysma-band', 'Mild ömhet', '3–4 mån'],
                                        ['Hyperhidros', 'Svettning', 'Ingen synlig', '4–7 mån']
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row[0]}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row[1]}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row[2]}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row[3]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Mobile version of table */}
                            <div className="sm:hidden space-y-4">
                                {[
                                    ['Panna', 'Horisontella dynamiska rynkor', 'Ingen synlig', '3–5 mån'],
                                    ['Argrynka', 'Vertikal "11"', 'Ingen synlig', '4–6 mån'],
                                    ['Kråksparkar', 'Leende-linjer', 'Ingen synlig', '3–4 mån'],
                                    ['Lip flip', 'Subtilt läpplyft', 'Ingen synlig', '2–3 mån'],
                                    ['Masseter', 'Käkmuskel / bruxism', 'Ingen synlig', '4–6 mån'],
                                    ['Hals', 'Platysma-band', 'Mild ömhet', '3–4 mån'],
                                    ['Hyperhidros', 'Svettning', 'Ingen synlig', '4–7 mån']
                                ].map((row, i) => (
                                    <div key={i} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                                        <h4 className="font-bold text-gray-900 mb-2">{row[0]}</h4>
                                        <p className="text-sm text-gray-600 mb-2">{row[1]}</p>
                                        <div className="flex justify-between text-xs text-gray-500 mt-1 pt-2 border-t border-gray-100">
                                            <span>Återhämtning: {row[2]}</span>
                                            <span className="font-medium text-gray-900">Håller {row[3]}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="behandling">Hur går behandlingen till?</h2>
                        
                        <div className="my-6 rounded-xl overflow-hidden bg-gray-100 float-none md:float-right md:w-1/2 md:ml-6 md:mb-6">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/botox_injektion_panna.jpeg" 
                                alt="Närbild botoxinjektion i pannan" 
                                className="w-full h-auto object-cover"
                            />
                            <p className="text-xs text-gray-500 p-2 text-center bg-gray-50 border-t border-gray-100">Injektionen utförs med extremt tunna nålar och upplevs ofta smärtfri.</p>
                        </div>
                        
                        <p>En komplett botoxprocess är kortare än de flesta tror — själva injektionen tar 5–15 minuter — men består av flera obligatoriska steg.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. Konsultation och hudanalys</h3>
                        <p>Du ska alltid träffa behandlaren för en konsultation före din första behandling. Här går ni igenom medicinsk historia, mediciner, eventuella tidigare behandlingar och vad du vill uppnå. Behandlaren bedömer din muskelaktivitet (ofta ber dig rynka pannan, höja ögonbrynen, le) och ritar ut injektionspunkter. Konsultationen är obligatorisk enligt <strong>Lag 2021:363</strong> och måste ske minst 48 timmar före själva behandlingen vid första besöket.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">2. Förberedelse</h3>
                        <p>Området rengörs, ibland markeras injektionspunkterna med tunn penna. Ingen lokalbedövning behövs vanligtvis — nålarna är extremt tunna.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">3. Själva injektionen</h3>
                        <p>Behandlaren administrerar små doser (typiskt 2–5 enheter per punkt) på de utvalda platserna. Hela proceduren tar 5–15 minuter beroende på antal områden. Smärtnivån beskrivs ofta som ett snabbt myggstick.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">4. Direkt efter</h3>
                        <p>Du kan se små röda märken eller mild svullnad vid injektionspunkterna. Dessa försvinner inom timmar till någon dag. Du går hem direkt — ingen återhämtningstid.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">5. När syns resultatet</h3>
                        <p>Första antydan till effekt syns efter 3–5 dagar, full effekt utvecklas över 10–14 dagar. De flesta seriösa kliniker erbjuder en <strong>gratis kontroll efter 2 veckor</strong> för att utvärdera resultatet och justera om något område inte svarat tillräckligt.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="priser">Vad kostar botox i Sverige? (September 2026)</h2>
                        <p>
                            Kostnaden för en botoxbehandling styrs av hur många zoner du behandlar, vilken anatomisk region det gäller och klinikens geografiska läge. 
                            Enligt <strong>Skönhetskollens nationella prisrapport för 2026</strong> (omfattande över 550 IVO-registrerade kliniker) ligger det <strong>svenska riksgenomsnittet på 3 064 kr</strong> för en standardbehandling.
                        </p>

                        {/* TABELL A */}
                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Tabell A – Pris per antal områden (september 2026)</h3>
                        <p className="text-sm text-gray-600 mb-3">Gäller standardområden i övre ansiktet (glabella, panna, kråksparkar):</p>
                        <div className="overflow-x-auto mb-8">
                            <table className="w-full border-collapse bg-white border border-gray-200 rounded-lg">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase border-b">Antal områden</th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase border-b">Lägsta pris</th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase border-b">Medianpris</th>
                                        <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase border-b">Högsta pris</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">1 område</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">1 800 kr</td>
                                        <td className="px-4 py-3 text-sm font-bold text-primary">2 600 kr</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">3 500 kr</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">2 områden</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">3 200 kr</td>
                                        <td className="px-4 py-3 text-sm font-bold text-primary">4 200 kr</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">5 500 kr</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">3 områden</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">4 500 kr</td>
                                        <td className="px-4 py-3 text-sm font-bold text-primary">5 500 kr</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">6 800 kr</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">4+ områden / Full Face</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">6 000 kr</td>
                                        <td className="px-4 py-3 text-sm font-bold text-primary">7 500 kr</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">10 500+ kr</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* TABELL B */}
                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Tabell B – Pris per stad (Genomsnitt 2026)</h3>
                        <p className="text-sm text-gray-600 mb-3">Snittpris för 1 standardområde baserat på IVO-registrerade kliniker:</p>
                        <div className="overflow-x-auto mb-8">
                            <table className="w-full border-collapse bg-white border border-gray-200 rounded-lg text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2.5 text-left font-semibold text-gray-600 border-b">Stad</th>
                                        <th className="px-4 py-2.5 text-left font-semibold text-gray-600 border-b">Snittpris</th>
                                        <th className="px-4 py-2.5 text-left font-semibold text-gray-600 border-b">vs Riksgenomsnitt</th>
                                        <th className="px-4 py-2.5 text-left font-semibold text-gray-600 border-b">Länk till kliniker</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-4 py-2.5 font-medium text-gray-900">Stockholm</td>
                                        <td className="px-4 py-2.5 font-semibold text-gray-900">3 277 kr</td>
                                        <td className="px-4 py-2.5 text-rose-600">+7,0 %</td>
                                        <td className="px-4 py-2.5"><Link href="/kliniker/stockholm" className="text-primary hover:underline font-medium">Kliniker i Stockholm</Link></td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-2.5 font-medium text-gray-900">Uppsala</td>
                                        <td className="px-4 py-2.5 font-semibold text-gray-900">3 262 kr</td>
                                        <td className="px-4 py-2.5 text-rose-600">+6,5 %</td>
                                        <td className="px-4 py-2.5"><Link href="/kliniker/uppsala" className="text-primary hover:underline font-medium">Kliniker i Uppsala</Link></td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2.5 font-medium text-gray-900">Helsingborg</td>
                                        <td className="px-4 py-2.5 font-semibold text-gray-900">3 086 kr</td>
                                        <td className="px-4 py-2.5 text-gray-600">+0,7 %</td>
                                        <td className="px-4 py-2.5"><Link href="/kliniker/helsingborg" className="text-primary hover:underline font-medium">Kliniker i Helsingborg</Link></td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-2.5 font-medium text-gray-900">Göteborg</td>
                                        <td className="px-4 py-2.5 font-semibold text-gray-900">3 064 kr</td>
                                        <td className="px-4 py-2.5 text-gray-600">Rikssnitt (0 %)</td>
                                        <td className="px-4 py-2.5"><Link href="/kliniker/goteborg" className="text-primary hover:underline font-medium">Kliniker i Göteborg</Link></td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2.5 font-medium text-gray-900">Örebro</td>
                                        <td className="px-4 py-2.5 font-semibold text-gray-900">2 797 kr</td>
                                        <td className="px-4 py-2.5 text-emerald-600">-8,7 %</td>
                                        <td className="px-4 py-2.5"><Link href="/kliniker/orebro" className="text-primary hover:underline font-medium">Kliniker i Örebro</Link></td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-2.5 font-medium text-gray-900">Malmö</td>
                                        <td className="px-4 py-2.5 font-semibold text-gray-900">2 730 kr</td>
                                        <td className="px-4 py-2.5 text-emerald-600">-10,9 %</td>
                                        <td className="px-4 py-2.5"><Link href="/kliniker/malmo" className="text-primary hover:underline font-medium">Kliniker i Malmö</Link></td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2.5 font-medium text-gray-900">Linköping</td>
                                        <td className="px-4 py-2.5 font-semibold text-gray-900">2 700 kr</td>
                                        <td className="px-4 py-2.5 text-emerald-600">-11,9 %</td>
                                        <td className="px-4 py-2.5"><Link href="/kliniker/linkoping" className="text-primary hover:underline font-medium">Kliniker i Linköping</Link></td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-2.5 font-medium text-gray-900">Västerås</td>
                                        <td className="px-4 py-2.5 font-semibold text-gray-900">2 640 kr</td>
                                        <td className="px-4 py-2.5 text-emerald-600">-13,8 %</td>
                                        <td className="px-4 py-2.5"><Link href="/kliniker/vasteras" className="text-primary hover:underline font-medium">Kliniker i Västerås</Link></td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2.5 font-medium text-gray-900">Gävle</td>
                                        <td className="px-4 py-2.5 font-semibold text-gray-900">2 500 kr</td>
                                        <td className="px-4 py-2.5 text-emerald-600">-18,4 %</td>
                                        <td className="px-4 py-2.5"><Link href="/kliniker/gavle" className="text-primary hover:underline font-medium">Kliniker i Gävle</Link></td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-2.5 font-medium text-gray-900">Umeå</td>
                                        <td className="px-4 py-2.5 font-semibold text-gray-900">2 100 kr</td>
                                        <td className="px-4 py-2.5 text-emerald-600">-31,5 %</td>
                                        <td className="px-4 py-2.5"><Link href="/kliniker/umea" className="text-primary hover:underline font-medium">Kliniker i Umeå</Link></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* TABELL C */}
                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Tabell C – Pris per behandlingsområde</h3>
                        <p className="text-sm text-gray-600 mb-3">Priser inklusive moms och sedvanlig 14-dagars efterkontroll:</p>
                        <div className="overflow-x-auto mb-8">
                            <table className="w-full border-collapse bg-white border border-gray-200 rounded-lg text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2.5 text-left font-semibold text-gray-600 border-b">Område</th>
                                        <th className="px-4 py-2.5 text-left font-semibold text-gray-600 border-b">Typiskt intervall</th>
                                        <th className="px-4 py-2.5 text-left font-semibold text-gray-600 border-b">Medianpris</th>
                                        <th className="px-4 py-2.5 text-left font-semibold text-gray-600 border-b">Typisk dos</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-4 py-2.5 font-medium text-gray-900">Glabella (argrynka)</td>
                                        <td className="px-4 py-2.5 text-gray-600">2 200 – 3 200 kr</td>
                                        <td className="px-4 py-2.5 font-semibold text-primary">2 600 kr</td>
                                        <td className="px-4 py-2.5 text-gray-600">15–25 E</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-2.5 font-medium text-gray-900">Panna (horisontella linjer)</td>
                                        <td className="px-4 py-2.5 text-gray-600">2 200 – 3 200 kr</td>
                                        <td className="px-4 py-2.5 font-semibold text-primary">2 600 kr</td>
                                        <td className="px-4 py-2.5 text-gray-600">10–20 E</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2.5 font-medium text-gray-900">Kråksparkar (ögonvrår)</td>
                                        <td className="px-4 py-2.5 text-gray-600">2 200 – 3 200 kr</td>
                                        <td className="px-4 py-2.5 font-semibold text-primary">2 600 kr</td>
                                        <td className="px-4 py-2.5 text-gray-600">12–24 E (båda sidor)</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-2.5 font-medium text-gray-900">Kemiskt brynlyft</td>
                                        <td className="px-4 py-2.5 text-gray-600">1 800 – 2 800 kr</td>
                                        <td className="px-4 py-2.5 font-semibold text-primary">2 200 kr</td>
                                        <td className="px-4 py-2.5 text-gray-600">4–8 E</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2.5 font-medium text-gray-900">Masseter (tuggmuskel / bruxism)</td>
                                        <td className="px-4 py-2.5 text-gray-600">3 500 – 5 800 kr</td>
                                        <td className="px-4 py-2.5 font-semibold text-primary">4 500 kr</td>
                                        <td className="px-4 py-2.5 text-gray-600">40–60 E (högre dos)</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-2.5 font-medium text-gray-900">Lip flip (överläpp)</td>
                                        <td className="px-4 py-2.5 text-gray-600">1 500 – 2 500 kr</td>
                                        <td className="px-4 py-2.5 font-semibold text-primary">1 900 kr</td>
                                        <td className="px-4 py-2.5 text-gray-600">4–8 E</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2.5 font-medium text-gray-900">Gummy smile</td>
                                        <td className="px-4 py-2.5 text-gray-600">1 500 – 2 500 kr</td>
                                        <td className="px-4 py-2.5 font-semibold text-primary">1 900 kr</td>
                                        <td className="px-4 py-2.5 text-gray-600">4–6 E</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-2.5 font-medium text-gray-900">Bunny lines (näsrynkor)</td>
                                        <td className="px-4 py-2.5 text-gray-600">1 500 – 2 400 kr</td>
                                        <td className="px-4 py-2.5 font-semibold text-primary">1 800 kr</td>
                                        <td className="px-4 py-2.5 text-gray-600">4–8 E</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2.5 font-medium text-gray-900">Nefertiti lift / Hals (platysma)</td>
                                        <td className="px-4 py-2.5 text-gray-600">3 800 – 6 000 kr</td>
                                        <td className="px-4 py-2.5 font-semibold text-primary">4 800 kr</td>
                                        <td className="px-4 py-2.5 text-gray-600">30–50 E</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-2.5 font-medium text-gray-900">Hyperhidros (svettning armhålor)</td>
                                        <td className="px-4 py-2.5 text-gray-600">4 500 – 7 500 kr</td>
                                        <td className="px-4 py-2.5 font-semibold text-primary">5 800 kr</td>
                                        <td className="px-4 py-2.5 text-gray-600">ca 100 E</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Vad påverkar priset */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900">Vad påverkar priset på din botoxbehandling?</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Behandlarens legitimation och specialistnivå:</strong> En specialistutbildad läkare eller erfaren injektionssjuksköterska har ofta en högre timtaxa, vilket minimerar risken för komplikationer som asymmetri eller hängande ögonlock.</li>
                                <li><strong>Preparatets kvalitet och dos:</strong> Godkända originalpreparat från officiella apoteksgrossister (Botox, Azzalure, Bocouture) med garanterat obruten kylkedja kostar mer i inköp än parallellimporterade preparat.</li>
                                <li><strong>Touch-up och efterkontroll:</strong> Seriösa kliniker inkluderar alltid ett kostnadsfritt återbesök inom 14 dagar där eventuell dosjustering ingår.</li>
                                <li><strong>Lagstadgad patientsäkerhet:</strong> Verksamheter som följer svensk lag bekostar patientförsäkring, registrering i IVO:s vårdgivarregister och anlitar en medicinskt ansvarig läkare (MAL).</li>
                            </ul>
                        </div>

                        {/* Röda flaggor */}
                        <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl my-6">
                            <h3 className="text-lg font-bold text-amber-900 mb-3 flex items-center">
                                <AlertTriangle className="mr-2 text-amber-600" size={20} />
                                Röda flaggor: När priset är misstänkt lågt
                            </h3>
                            <p className="text-amber-900 text-sm mb-3">
                                Erbjudanden under 1 500 kr för ett helt område eller kraftiga rabatter på sociala medier bör alltid granskas kritiskt. I injektionsbranschen innebär ett onormalt lågt pris nästan alltid kompromisser:
                            </p>
                            <ul className="list-disc pl-5 space-y-1.5 text-amber-900 text-sm">
                                <li><strong>Överspädning:</strong> Botulinumtoxin späds med koksalt. Om för lite aktiv substans injiceras håller effekten bara i några veckor istället för 3–5 månader.</li>
                                <li><strong>Olaglig gråimport:</strong> Preparat inköpta från utländska webbplatser utan obruten kylkedja kan vara förstörda eller innehålla farliga föroreningar.</li>
                                <li><strong>Obehörig behandlare:</strong> Enligt svensk lag får endast läkare, tandläkare och sjuksköterskor injicera botox. Personer utan vårdlegitimation bryter mot lagen.</li>
                                <li><strong>Ingen 48-timmars betänketid:</strong> Kliniker som erbjuder &quot;drop-in på dagen&quot; för nya kunder struntar i Lag 2021:363 och saknar ofta patientförsäkring.</li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="hallbarhet">Hur länge håller resultatet?</h2>
                        <p>Effekten av botox är inte permanent. När musklen successivt återfår nervsignal (cirka 3–6 månader) återvänder muskelaktiviteten — och därmed gradvis rynkorna.</p>

                        <p><strong>Typiska hållbarhetsintervall:</strong></p>
                        <ul className="list-disc pl-5 mb-4 space-y-1">
                            <li><strong>Första behandlingen:</strong> ofta 3 månader, ibland kortare</li>
                            <li><strong>Andra behandlingen:</strong> 4–5 månader</li>
                            <li><strong>Tredje och senare:</strong> 4–6 månader, ibland längre</li>
                        </ul>

                        <p>Hållbarheten påverkas av muskelaktivitet (högaktiva muskler bryter ner toxin snabbare), dos (högre dos håller längre, men ökar risken för biverkningar), området och individuell metabolism.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="risker">Risker, biverkningar och kontraindikationer</h2>
                        <p>Botox är ett av världens mest studerade läkemedel och anses säkert när det utförs av kvalificerad personal. Men inga injektioner är helt utan risk.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Vanliga övergående reaktioner</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Liten rodnad och små märken vid injektionspunkterna (1–24 timmar)</li>
                            <li>Mild svullnad i området</li>
                            <li>Lätt huvudvärk första dygnet (vanligast vid pann- och glabella-behandling)</li>
                            <li>Tillfällig ömhet</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Mer sällsynta biverkningar</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Asymmetri</strong> — om dosen fördelats ojämnt. Justeras ofta vid 2-veckorskontrollen.</li>
                            <li><strong>Ptos</strong> — hängande ögonlock om toxin migrerat. Vanligen reversibelt över 4–8 veckor.</li>
                            <li><strong>&quot;Frusen&quot; känsla</strong> — överdosering ger ett uttryckslöst utseende.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="lag">Lag 2021:363 och IVO — dina rättigheter som patient</h2>
                        <p>Den 1 juli 2021 trädde <strong>Lag (2021:363) om estetiska kirurgiska ingrepp och estetiska injektionsbehandlingar</strong> i kraft. Lagen omformade den svenska estetikbranschen och gav dig som patient flera tydliga rättigheter.</p>

                        <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-gray-100 my-8">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/konsultation_botox.jpeg" 
                                alt="Konsultation inför botoxbehandling" 
                                cla                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="valja-klinik">
                            Så väljer du en seriös klinik: 10-punkters checklistan 2026
                        </h2>
                        <p>
                            Trots skärpt lagstiftning visar IVO:s tillsynsrapporter att bristfälliga kliniker fortfarande förekommer. Gå igenom denna 10-punkters checklista innan du bokar:
                        </p>

                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 my-6 space-y-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="text-emerald-600 mt-1 flex-shrink-0" size={18} />
                                <div>
                                    <strong className="text-gray-900">1. Legitimerad behandlare:</strong> Kontrollera att behandlaren är legitimerad läkare, sjuksköterska eller tandläkare via Socialstyrelsens register (HOSP).
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="text-emerald-600 mt-1 flex-shrink-0" size={18} />
                                <div>
                                    <strong className="text-gray-900">2. Registrerad hos IVO:</strong> Kontrollera att mottagningen finns med i IVO:s officiella vårdgivarregister.
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="text-emerald-600 mt-1 flex-shrink-0" size={18} />
                                <div>
                                    <strong className="text-gray-900">3. 48 timmars betänketid respekteras:</strong> Kliniken ska alltid kräva obligatorisk betänketid för nya patienter utan undantag.
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="text-emerald-600 mt-1 flex-shrink-0" size={18} />
                                <div>
                                    <strong className="text-gray-900">4. Tecknad patientförsäkring:</strong> Säkerställer att du är ekonomiskt och medicinskt skyddad om något oförutsett skulle inträffa.
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="text-emerald-600 mt-1 flex-shrink-0" size={18} />
                                <div>
                                    <strong className="text-gray-900">5. Medicinskt ansvarig läkare (MAL):</strong> Om en sjuksköterska behandlar ska det finnas en namngiven legitimerad läkare knuten till kliniken.
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="text-emerald-600 mt-1 flex-shrink-0" size={18} />
                                <div>
                                    <strong className="text-gray-900">6. Spårbara originalpreparat:</strong> Kliniken ska redovisa preparatnamn (Botox, Azzalure, Bocouture) och spara batchnummer.
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="text-emerald-600 mt-1 flex-shrink-0" size={18} />
                                <div>
                                    <strong className="text-gray-900">7. Fullständig journalföring:</strong> Enligt Patientdatalagen ska hälsodeklaration, doser, stickpunkter och foton sparas.
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="text-emerald-600 mt-1 flex-shrink-0" size={18} />
                                <div>
                                    <strong className="text-gray-900">8. Kostnadsfri efterkontroll (14 dagar):</strong> Möjlighet till touch-up och uppföljning ska ingå utan extra kostnad.
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="text-emerald-600 mt-1 flex-shrink-0" size={18} />
                                <div>
                                    <strong className="text-gray-900">9. EIR-certifiering:</strong> Certifiering från Estetiska Injektionsrådet är en stark kvalitetsstämpel på praktisk kompetens.
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="text-emerald-600 mt-1 flex-shrink-0" size={18} />
                                <div>
                                    <strong className="text-gray-900">10. Oberoende recensioner:</strong> Läs omdömen på oberoende plattformar och granska hur kliniken hanterar eventuella komplikationer.
                                </div>
                            </div>
                        </div>

                        {/* CTA Box */}
                        <div className="bg-rose-50/70 border-l-4 border-primary p-6 mt-8 rounded-r-2xl">
                            <h3 className="font-bold text-gray-900 text-lg mb-3">Hitta granskade botoxkliniker nära dig</h3>
                            <p className="text-gray-700 text-sm sm:text-base mb-4">
                                På Battrehy.se kontrollerar vi IVO-registrering och behörigheter så att du kan känna dig helt trygg. Jämför priser, läs verifierade omdömen och boka direkt:
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link 
                                    href="/behandlingar/botoxbehandling" 
                                    className="bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-primary/90 transition shadow-sm"
                                >
                                    Jämför alla botoxkliniker
                                </Link>
                                <Link 
                                    href="/kliniker/stockholm" 
                                    className="bg-white border border-gray-300 text-gray-800 text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-gray-50 transition"
                                >
                                    Stockholm
                                </Link>
                                <Link 
                                    href="/kliniker/goteborg" 
                                    className="bg-white border border-gray-300 text-gray-800 text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-gray-50 transition"
                                >
                                    Göteborg
                                </Link>
                                <Link 
                                    href="/kliniker/malmo" 
                                    className="bg-white border border-gray-300 text-gray-800 text-sm font-medium px-3.5 py-2 rounded-lg hover:bg-gray-50 transition"
                                >
                                    Malmö
                                </Link>
                            </div>
                            <p className="text-xs text-gray-500 mt-4">
                                Läs även vår fördjupade guide: <Link href="/blogg/estetisk-klinik" className="text-primary hover:underline">Så väljer du en seriös estetisk klinik</Link>.
                            </p>
                        </div>

                        {/* 10. Eftervård kraftigt expanderad */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="fore-efter">
                            Eftervård efter botox: Den kompletta medicinska checklistan
                        </h2>
                        <p>
                            Vad du gör – och framför allt inte gör – under de första 48 timmarna har en direkt inverkan på ditt slutresultat. Botulinumtoxin behöver tid för att tas upp av muskelns nervändplattor och förankras i vävnaden. Mekaniskt tryck eller kraftigt ökad blodcirkulation kan få toxinet att migrera till närliggande muskler.
                        </p>

                        <div className="space-y-6 my-8">
                            <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                                    <Clock className="mr-2 text-primary" size={18} />
                                    0–4 timmar: Den mest kritiska fasen
                                </h3>
                                <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-gray-700">
                                    <li><strong>Håll huvudet upprätt:</strong> Sitt eller stå upp. Ligg inte ner och böj dig inte framåt under längre stunder för att förhindra spridning mot ögonhålan.</li>
                                    <li><strong>Mjuk mimikövning:</strong> Rör ansiktsmusklerna milt (le, rynka pannan) då och då under de första två timmarna för att underlätta toxinets upptag i receptorerna.</li>
                                    <li><strong>Rör inte stickpunkterna:</strong> Undvik att peta, gnugga eller klia på injektionsställena med fingrarna för att förebygga infektioner.</li>
                                    <li><strong>Ingen makeup:</strong> Vänta minst 4–6 timmar innan du applicerar smink eller krämer på behandlade områden.</li>
                                </ul>
                            </div>

                            <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                                    <Clock className="mr-2 text-primary" size={18} />
                                    0–24 timmar: Första dygnet
                                </h3>
                                <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-gray-700">
                                    <li><strong>Ingen hård fysisk träning:</strong> Undvik gympass, löpning och tunga lyft. Ökat blodtryck ökar risken för diffusion och onödiga blåmärken.</li>
                                    <li><strong>Undvik alkohol:</strong> Alkohol vidgar blodkärlen och ökar blödningsbenägenheten.</li>
                                    <li><strong>Ingen värmeexponering:</strong> Avstå från bastu, ångbad, heta bad och solarium.</li>
                                    <li><strong>Sovställning:</strong> Sov på rygg första natten med huvudet lätt upphöjt på en extra kudde.</li>
                                </ul>
                            </div>

                            <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                                    <Clock className="mr-2 text-primary" size={18} />
                                    24–48 timmar
                                </h3>
                                <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-gray-700">
                                    <li><strong>Lätta promenader:</strong> Lugn vardagsmotion går utmärkt.</li>
                                    <li><strong>Ingen ansiktsmassage:</strong> Använd inte Gua Sha, massageverktyg eller hårt tryck mot ansiktet. Undvik även åtsittande kepsar eller simglasögon.</li>
                                    <li><strong>Skonsam rengöring:</strong> Klappa huden torr med en ren handduk — gnugga inte.</li>
                                </ul>
                            </div>

                            <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                                    <Clock className="mr-2 text-primary" size={18} />
                                    Första veckan (dag 3–7)
                                </h3>
                                <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-gray-700">
                                    <li><strong>Pausa aktiva hudbehandlingar:</strong> Undvik kemisk peeling, microneedling, laser och djuprengöring i 7–14 dagar.</li>
                                    <li><strong>Undvik tandläkarbesök:</strong> Om du behandlat masseter eller läppar bör du undvika behandlingar som kräver långvarigt vidöppen mun.</li>
                                    <li><strong>Solskydd:</strong> Använd alltid bredspektrigt SPF 50+ för att skydda stickpunkterna mot pigmentfläckar.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Biverkningar och varningssignaler */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900">Normala biverkningar vs när du ska kontakta kliniken</h3>
                            <p>
                                <strong>Normalt och ofarligt:</strong> Liten rodnad, myggbettliknande papler i 1–2 timmar, enstaka blåmärken (läker på 3–7 dagar) och mild spänningshuvudvärk första dygnet (lindras bäst med paracetamol).
                            </p>
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-900 space-y-2">
                                <div className="font-bold flex items-center text-red-800">
                                    <ShieldAlert className="mr-2 text-red-600" size={18} />
                                    Varningssignaler – Kontakta kliniken direkt om:
                                </div>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Ett ögonlock blir hängande eller tungt att öppna (ptos). Behandlaren kan ofta förskriva receptbelagda ögondroppar som stimulerar Müllers muskel och lyfter locket.</li>
                                    <li>Du upplever dubbelseende eller synförändringar.</li>
                                    <li>Tecken på infektion uppstår (tilltagande bultande smärta, lokal värmeökning, varbildning eller feber).</li>
                                    <li>Allergisk reaktion (nässelfeber, svullnad i läppar/hals, andningssvårigheter — ring alltid 112 vid akuta andningsbesvär).</li>
                                </ul>
                            </div>
                        </div>

                        {/* 11. FAQ (22 frågor) */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="faq">Vanliga frågor om botox (FAQ 2026)</h2>
                        
                        <div className="space-y-6 divide-y divide-gray-200">
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">1. Vad kostar en botoxbehandling i Sverige 2026?</h4>
                                <p className="text-gray-700 mt-1">En botoxbehandling kostar mellan 1 800 kr (för 1 mindre område) och cirka 5 500 kr (för 3 standardområden i övre ansiktet). Riksgenomsnittet i Sverige 2026 ligger på cirka 3 064 kr per behandling enligt Skönhetskollens prisindex över 550+ kliniker.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">2. Hur länge håller resultatet av botox?</h4>
                                <p className="text-gray-700 mt-1">Resultatet varar i regel mellan 3 och 6 månader. Vid din allra första behandling håller effekten ofta i cirka 3 månader eftersom muskeln snabbt återhämtar sig. Vid regelbundna underhållsbehandlingar försvagas muskeln lätt, vilket kan förlänga hållbarheten till 4–6 månader.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">3. Vem får utföra botox i Sverige enligt lag?</h4>
                                <p className="text-gray-700 mt-1">Enligt Lag (2021:363) om estetiska injektionsbehandlingar får botox endast utföras av legitimerad läkare, legitimerad sjuksköterska eller legitimerad tandläkare. Kliniken måste dessutom vara registrerad i IVO:s vårdgivarregister.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">4. Måste man ha konsultation och betänketid innan behandlingen?</h4>
                                <p className="text-gray-700 mt-1">Ja. Enligt svensk lag är det obligatoriskt med minst 48 timmars betänketid mellan konsultationen och behandlingen för nya patienter. Samma regel gäller om du inte har besökt kliniken under de senaste sex månaderna.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">5. Gör en botoxbehandling ont?</h4>
                                <p className="text-gray-700 mt-1">De allra flesta upplever behandlingen som relativt smärtfri. Nålarna som används är extremt tunna (ofta 30G–32G). Varje stick känns som ett litet, snabbt myggstick och varar i en bråkdel av en sekund.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">6. Kan man träna samma dag som man tagit botox?</h4>
                                <p className="text-gray-700 mt-1">Nej. Du ska helt undvika pulshöjande träning, gympass och tunga lyft under minst 24 timmar efter injektionen. Träning ökar blodtrycket och cirkulationen, vilket ökar risken för att toxinet sprider sig till icke-avsedda muskler samt förvärrar blåmärken.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">7. Kan man ta botox under graviditet eller amning?</h4>
                                <p className="text-gray-700 mt-1">Nej, absolut inte. Det saknas tillräckliga kliniska säkerhetsstudier om hur botulinumtoxin påverkar fosterutveckling eller om det passerar över i bröstmjölk. Seriösa kliniker behandlar aldrig gravida eller ammande kvinnor.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">8. Kan man lösa upp eller ångra botox om man blir missnöjd?</h4>
                                <p className="text-gray-700 mt-1">Nej. Till skillnad från hyaluronsyrebaserade fillers finns det inget motgift eller upplösande medel för botox. Om en biverkning eller asymmetri uppstår måste man vänta ut kroppens naturliga återhämtning (ofta 8–12 veckor innan rörligheten börjar återkomma).</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">9. Hur skiljer sig preventiv botox (&quot;baby botox&quot;) från vanlig?</h4>
                                <p className="text-gray-700 mt-1">Preventiv botox innebär att man injicerar mycket små mikrodoser i ett tidigt skede (ofta i 25–30-årsåldern) innan mimiklinjerna hunnit etablera sig som permanenta, statiska veck. Traditionell botox använder högre doser för att slappna av redan etablerade rynkor.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">10. Hur många enheter (units) botox behövs per område?</h4>
                                <p className="text-gray-700 mt-1">Dosen anpassas individuellt efter muskelstyrka. Typiska riktlinjer för kvinnor är: glabella 15–25 enheter, panna 10–20 enheter, kråksparkar 12–24 enheter totalt, masseter 40–60 enheter och lip flip 4–8 enheter. Män har kraftigare muskelmassa och kräver ofta 30–50 % fler enheter.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">11. Är botox vanligt för män (&quot;Brotox&quot;) och skiljer sig doseringen?</h4>
                                <p className="text-gray-700 mt-1">Ja, botox bland män växer mycket snabbt. Det kräver dock särskild anatomisk expertis: doserna måste vara högre på grund av kraftigare muskulatur, och tekniken måste anpassas för att inte lyfta brynens ytterkanter och skapa ett feminint bågformat ögonbryn.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">12. Vad händer med ansiktet om man slutar med botox efter flera år?</h4>
                                <p className="text-gray-700 mt-1">Musklerna återfår successivt sin fulla rörlighet och rynkorna återgår långsamt till sitt ursprungliga utseende. Huden åldras inte snabbare för att du slutar – tvärtom har huden vilat från upprepade veck under behandlingsperioden.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">13. Kan man kombinera botox och fillers vid samma besök?</h4>
                                <p className="text-gray-700 mt-1">Ja, det kallas ofta för ett &quot;Liquid Facelift&quot;. Det är vanligt att kombinera botox i övre ansiktet med fillers i mellan- eller nedre ansiktet för att återskapa volym i exempelvis kinder eller käklinje.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">14. Kan man bli immun eller utveckla resistens mot botox?</h4>
                                <p className="text-gray-700 mt-1">Ja, men det är mycket ovanligt (under 1 % av patienter). Det beror på att kroppen bildar antikroppar mot toxinet eller hjälpproteinerna. Risken minimeras genom att undvika för täta påfyllningar samt genom att använda proteinrenat toxin som Bocouture.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">15. Vad är en &quot;lip flip&quot; och hur skiljer det sig från läppfillers?</h4>
                                <p className="text-gray-700 mt-1">En lip flip innebär att 4–8 enheter botox injiceras i muskeln precis ovanför överläppens kant, vilket får läppen att rulla ut lätt utan extra volym. Fillers bygger däremot fysisk volym och kontur inifrån med hyaluronsyragel.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">16. Hjälper botox mot spänningshuvudvärk och migrän?</h4>
                                <p className="text-gray-700 mt-1">Ja. Botox är ett officiellt godkänt läkemedel för kronisk migrän enligt PREEMPT-protokollet. Många som behandlar glabella och panna av kosmetiska skäl upplever också en markant minskning av spänningshuvudvärk.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">17. Varför får vissa huvudvärk precis efter en botoxbehandling?</h4>
                                <p className="text-gray-700 mt-1">Under de första 24–48 timmarna kan en mild spänningshuvudvärk uppstå på grund av mikrotrauma från nålsticken och att intilliggande muskler kompenserar när de behandlade musklerna slappnar av. Det är ofarligt och går över snabbt.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">18. Vilka biverkningar kan botox ge?</h4>
                                <p className="text-gray-700 mt-1">Vanliga övergående biverkningar är liten rodnad, små märken vid insticken, tillfälliga blåmärken och mild huvudvärk. Sällsynta biverkningar är asymmetri eller hängande ögonlock (ptos). Mycket sällsynta allvarliga reaktioner är infektion eller allergi.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">19. Hur snabbt syns effekten av botox?</h4>
                                <p className="text-gray-700 mt-1">Första antydan till effekt syns oftast efter 3–5 dagar (2–3 dagar med Azzalure). Fullständig effekt inträder efter 10–14 dagar, vilket är tidpunkten då resultatet ska utvärderas.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">20. Vad är den största skillnaden mellan Botox, Azzalure och Bocouture?</h4>
                                <p className="text-gray-700 mt-1">Alla tre baseras på botulinumtoxin typ A. Azzalure verkar ofta snabbast och sprider sig bredare, Botox har mycket hög precision för små mimikmuskler, och Bocouture är fritt från komplexbildande proteiner vilket minimerar risken för antikroppsbildning.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">21. Kan man dricka kaffe eller ta värktabletter före behandlingen?</h4>
                                <p className="text-gray-700 mt-1">Undvik blodförtunnande värktabletter som acetylsalicylsyra (Treo) och ibuprofen (Ipren) samt omega-3-tillskott under 3–5 dagar före besöket för att minska risken för blåmärken. Kaffe går bra i måttliga mängder.</p>
                            </div>
                            <div className="pt-4">
                                <h4 className="font-bold text-gray-900 text-lg">22. Hur hittar jag en seriös och IVO-godkänd botoxklinik?</h4>
                                <p className="text-gray-700 mt-1">Kontrollera att kliniken finns i IVO:s vårdgivarregister och att behandlaren har svensk legitimation via Socialstyrelsen. Se till att kliniken tillämpar 48 timmars betänketid, har patientförsäkring och erbjuder en gratis 14-dagarskontroll. På Battrehy.se kan du enkelt jämföra kontrollerade kliniker över hela landet.</p>
                            </div>
                        </div>

                        {/* 12. Källor & Medicinsk granskning */}
                        <div className="border-t border-gray-200 pt-8 mt-12">
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8 text-sm text-gray-600 space-y-2">
                                <p>
                                    <strong>Medicinsk ansvarsfriskrivning:</strong> Innehållet i denna guide är uteslutande avsett i allmänbildande och konsumentupplysande syfte och ersätter inte professionell medicinsk rådgivning eller individuell bedömning av legitimerad hälso- och sjukvårdspersonal.
                                </p>
                                <p className="text-xs text-gray-500">
                                    <strong>Medicinskt granskad av:</strong> Legitimerad sjuksköterska med specialistkompetens inom estetisk dermatologi och certifierad av Estetiska Injektionsrådet (EIR).
                                </p>
                            </div>

                            <h2 className="text-xl font-bold text-gray-900 mb-4" id="kallor">Källor och referenser</h2>
                            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                                <li>
                                    <a href="https://www.riksdagen.se/sv/dokument-lagar/dokument/svensk-forfattningssamling/lag-2021363-om-estetiska-kirurgiska-ingrepp-och_sfs-2021-363" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                        Lag (2021:363) om estetiska kirurgiska ingrepp och estetiska injektionsbehandlingar
                                    </a> (Sveriges riksdag)
                                </li>
                                <li>
                                    <a href="https://www.ivo.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                        Inspektionen för vård och omsorg (IVO)
                                    </a> — Vårdgivarregistret och nationella tillsynsbeslut rörande estetisk verksamhet (2024–2026)
                                </li>
                                <li>
                                    <a href="https://www.socialstyrelsen.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                        Socialstyrelsen
                                    </a> — Register över legitimerad hälso- och sjukvårdspersonal (HOSP)
                                </li>
                                <li>
                                    <a href="https://www.lakemedelsverket.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                        Läkemedelsverket &amp; FASS
                                    </a> — Preparatmonografier för Botox (onabotulinumtoxinA), Azzalure (abobotulinumtoxinA) och Bocouture (incobotulinumtoxinA)
                                </li>
                                <li>
                                    Skönhetskollens nationella prisrapport 2026 — Rikstäckande prisstatistik och index över 550+ kliniker i Sverige (september 2026)
                                </li>
                                <li>
                                    Estetiska Injektionsrådet (EIR) — Certifieringskrav och etiska riktlinjer för legitimerade behandlare
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}
