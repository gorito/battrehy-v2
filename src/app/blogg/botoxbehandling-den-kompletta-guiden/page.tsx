import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Botoxbehandling i Sverige 2026: Den kompletta guiden',
    description: 'En komplett guide till botoxbehandling i Sverige 2026. Läs om priser, risker, säkerhet, IVO-lagstiftning och hur du väljer rätt klinik.',
    alternates: {
        canonical: 'https://battrehy.se/blogg/botoxbehandling-den-kompletta-guiden',
    },
    openGraph: {
        title: 'Botoxbehandling i Sverige 2026: Den kompletta guiden',
        description: 'En komplett guide till botoxbehandling i Sverige 2026. Läs om priser, risker, säkerhet, IVO-lagstiftning och hur du väljer rätt klinik.',
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
        title: 'Botoxbehandling i Sverige 2026: Den kompletta guiden',
        description: 'En komplett guide till botoxbehandling i Sverige 2026. Läs om priser, risker, säkerhet, IVO-lagstiftning och hur du väljer rätt klinik.',
        images: ['https://battrehy.se/images/blogg/botox_hero.jpeg'],
    }
};

export default function BotoxBlogPost() {
    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Hem',
                item: 'https://battrehy.se'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blogg',
                item: 'https://battrehy.se/blogg'
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: 'Botoxbehandling',
                item: 'https://battrehy.se/blogg/botoxbehandling-den-kompletta-guiden'
            }
        ]
    };

    return (
        <main className="min-h-screen bg-white p-4 sm:p-8 pb-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": "Botoxbehandling i Sverige 2026 — den kompletta guiden till priser, säkerhet och kliniker",
                        "description": "Allt om botoxbehandling i Sverige 2026: priser, säkerhet, IVO-regler, områden och hur du väljer en seriös klinik.",
                        "author": { "@type": "Organization", "name": "Battrehys redaktion", "url": "https://battrehy.se/om-redaktionen" },
                        "publisher": { "@type": "Organization", "name": "Battrehy", "url": "https://battrehy.se" },
                        "datePublished": "2026-05-01T08:00:00+02:00",
                        "dateModified": "2026-06-06T08:00:00+02:00",
                        "inLanguage": "sv-SE",
                        "image": "https://battrehy.se/images/blogg/botox_hero.jpeg",
                        "mainEntityOfPage": { "@type": "WebPage", "@id": "https://battrehy.se/blogg/botoxbehandling-den-kompletta-guiden" }
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            { "@type": "Question", "name": "Vad kostar en botoxbehandling i Sverige?", "acceptedAnswer": { "@type": "Answer", "text": "En botoxbehandling i Sverige kostar typiskt mellan 1 800 kr (ett område) och 5 000 kr (3 områden). Nationellt snitt 3 088 kr enligt Skonhetskollens 2026-data. Stockholmskliniker ligger något över snittet, mindre orter ofta något under." } },
                            { "@type": "Question", "name": "Hur länge håller botox?", "acceptedAnswer": { "@type": "Answer", "text": "Effekten håller typiskt 3–6 månader. Första behandlingen ger ofta kortare effekt; med upprepade behandlingar kan effekten förlängas till 4–6 månader. Faktorer som påverkar är muskelaktivitet, dos, område och individuell metabolism." } },
                            { "@type": "Question", "name": "Vem får utföra botox i Sverige?", "acceptedAnswer": { "@type": "Answer", "text": "Enligt Lag 2021:363 måste botoxbehandlingar utföras av legitimerad sjuksköterska, läkare eller tandläkare. Kliniken måste finnas i IVO:s vårdgivarregister. Du har rätt att be om legitimationsbevis och kontrollera registreringen själv." } },
                            { "@type": "Question", "name": "Måste man ha konsultation innan första botoxbehandlingen?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Lagen kräver minst 48 timmars betänketid mellan konsultation och första behandling. Konsultationen ska innehålla hudanalys, genomgång av medicinsk historia och skriftlig information om risker och pris." } },
                            { "@type": "Question", "name": "Vilka biverkningar kan botox ge?", "acceptedAnswer": { "@type": "Answer", "text": "Vanliga övergående biverkningar är liten rodnad, små märken efter injektionspunkter och mild huvudvärk första dygnet. Mer sällsynt: tillfällig asymmetri, hängande ögonlock (ptos) eller en frusen känsla. Mycket sällsynta allvarliga reaktioner inkluderar allergisk reaktion." } },
                            { "@type": "Question", "name": "Hur snabbt syns effekten av botox?", "acceptedAnswer": { "@type": "Answer", "text": "Första antydan till effekt kan synas efter 3–5 dagar. Full effekt utvecklas över 10–14 dagar. Många kliniker erbjuder en gratis kontroll 2 veckor efter behandlingen för eventuell justering." } },
                            { "@type": "Question", "name": "Kan botox förebygga rynkor?", "acceptedAnswer": { "@type": "Answer", "text": "Preventiv botox — små doser i tidiga 30-årsåldern för att förhindra dynamiska rynkor — har blivit allt vanligare. Studier antyder att det kan fördröja djupa linjer, men beslutet bör tas med legitimerad personal baserat på individuella muskel- och hudmönster." } },
                            { "@type": "Question", "name": "Hur hittar jag en seriös botoxklinik i Sverige?", "acceptedAnswer": { "@type": "Answer", "text": "Börja med att kontrollera att kliniken finns i IVO:s vårdgivarregister (ivo.se) och att den som utför behandlingen är legitimerad (kontrollera via socialstyrelsen.se). Be om transparenta priser, läs flera oberoende recensioner och kräv konsultation med 48 timmars betänketid." } }
                        ]
                    })
                }}
            />
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
                        <div className="flex items-center text-gray-500 text-sm mb-8">
                            <span className="font-medium">Av Battrehys redaktion</span>
                            <span className="mx-2">·</span>
                            <span>Uppdaterad maj 2026</span>
                        </div>
                        
                        {/* Main article image */}
                        <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden bg-gray-100 mb-10">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/botox_hero.jpeg" 
                                alt="Botoxbehandling utförs av legitimerad personal" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </header>

                    <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                        <p>
                            En botoxbehandling är en injektion av botulinumtoxin typ A som tillfälligt slappnar av en utvald muskel — vanligast för att mjuka upp uttrycksrynkor i panna, mellan ögonbrynen och runt ögonen. Botox är samtidigt ett av Sveriges mest reglerade estetiska ingrepp: sedan 2021 krävs legitimerad personal, 48 timmars betänketid och IVO-registrerad klinik. Den här guiden går igenom vad behandlingen gör, vad den kostar 2026, vilka risker som finns — och hur du säkerställer att din klinik följer lagen.
                        </p>

                        <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl my-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Snabb sammanfattning</h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li><strong>Botox är botulinumtoxin typ A</strong> — en injektion som tillfälligt blockerar nervsignaler till en muskel</li>
                                <li><strong>Sju vanliga områden</strong> behandlas: panna, glabella (argrynka), kråksparkar, lip flip, masseter, hals, samt medicinska indikationer (svettningar, migrän, bruxism)</li>
                                <li><strong>Pris:</strong> 1-områdesbehandling median 2 500 kr, 3 områden cirka 4 000 kr; nationellt snitt 3 088 kr</li>
                                <li><strong>Effekten håller</strong> typiskt 3–6 månader</li>
                                <li><strong>Lag 2021:363</strong> kräver 48 timmars betänketid, legitimerad personal, patientförsäkring och IVO-registrering</li>
                                <li><strong>IVO 2024:</strong> 86 kliniker inspekterades, 180+ tillsynsbeslut fattades — klinikvetting är inte överdrivet</li>
                            </ul>
                        </div>

                        <nav className="bg-gray-50 border border-gray-200 p-6 rounded-2xl mb-12">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Innehåll</h2>
                            <ul className="space-y-2 text-gray-700">
                                <li><a href="#vad-ar" className="text-primary hover:underline">1. Vad är botox?</a></li>
                                <li><a href="#omraden" className="text-primary hover:underline">2. Vilka områden kan behandlas med botox?</a></li>
                                <li><a href="#behandling" className="text-primary hover:underline">3. Hur går behandlingen till?</a></li>
                                <li><a href="#priser" className="text-primary hover:underline">4. Vad kostar botox i Sverige?</a></li>
                                <li><a href="#hallbarhet" className="text-primary hover:underline">5. Hur länge håller resultatet?</a></li>
                                <li><a href="#risker" className="text-primary hover:underline">6. Risker, biverkningar och kontraindikationer</a></li>
                                <li><a href="#lag" className="text-primary hover:underline">7. Lag 2021:363 och IVO — dina rättigheter</a></li>
                                <li><a href="#valja-klinik" className="text-primary hover:underline">8. Så väljer du en seriös klinik</a></li>
                                <li><a href="#fore-efter" className="text-primary hover:underline">9. Före och efter behandling</a></li>
                                <li><a href="#faq" className="text-primary hover:underline">10. Vanliga frågor</a></li>
                                <li><a href="#kallor" className="text-primary hover:underline">11. Källor</a></li>
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

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="omraden">Vilka områden kan behandlas med botox?</h2>
                        <p>I Sverige används botox både för kosmetiska och medicinska syften. Här är de sju vanligaste områdena.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">1. Panna (frontalis)</h3>
                        <p>De horisontella linjer som syns när du höjer ögonbrynen. En av de enklaste behandlingarna och ofta startpunkten för nya patienter. Varlig dosering är viktig — för mycket och pannan blir orörlig och tung; för lite och rynkorna kvarstår.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">2. Argrynka / glabella</h3>
                        <p>Den vertikala "11:an" mellan ögonbrynen som ofta uppstår av koncentration eller solreflexer. Detta är historiskt det mest behandlade området globalt och ger ofta dramatiska resultat eftersom ett djupt veck kan släppa helt på två veckor.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">3. Kråksparkar</h3>
                        <p>Leende-linjerna som strålar ut från ögonens ytterkanter när du ler. Behandlas med små doser för att bevara naturligt uttryck.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">4. Lip flip / läppar</h3>
                        <p>Små doser i den övre läppens kant gör att läppen "rullar ut" något, vilket kan ge ett subtilt fyllande utseende utan filler. Hållbarhet kortare än andra områden (ofta 2–3 månader).</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">5. Käklinje och masseter</h3>
                        <p>Masseter (tuggmuskeln) kan injiceras vid <strong>bruxism</strong> (tandgnissling) eller för att smalna av en kraftig käkkontur. Detta är en medicinsk-kosmetisk hybridbehandling och en av de snabbast växande indikationerna.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">6. Hals och nacke</h3>
                        <p>Platysma-band — vertikala "rep" på halsen — kan mjukas upp med spridda injektioner. Mer avancerad teknik som kräver erfaren behandlare.</p>

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

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="priser">Vad kostar botox i Sverige?</h2>
                        <p>Priserna varierar med antal behandlade områden, klinikens läge och behandlarens erfarenhet. Tabellen nedan baseras på publicerade prislistor från 11 svenska kliniker (2025–2026), valideret mot Skonhetskollens nationella snitt på <strong>3 088 kr</strong> över 555+ kliniker.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Pris per antal områden</h3>
                        <div className="overflow-x-auto mb-8">
                            <table className="w-full border-collapse bg-white border border-gray-200 rounded-lg">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Antal områden</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Lägsta (kr)</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Median (kr)</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Högsta (kr)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr><td className="px-4 py-3 text-sm">1 område</td><td className="px-4 py-3 text-sm">1 800</td><td className="px-4 py-3 font-medium text-gray-900">2 500</td><td className="px-4 py-3 text-sm">3 500</td></tr>
                                    <tr className="bg-gray-50"><td className="px-4 py-3 text-sm">2 områden</td><td className="px-4 py-3 text-sm">2 800</td><td className="px-4 py-3 font-medium text-gray-900">3 200</td><td className="px-4 py-3 text-sm">4 500</td></tr>
                                    <tr><td className="px-4 py-3 text-sm">3 områden (övre ansikte)</td><td className="px-4 py-3 text-sm">3 200</td><td className="px-4 py-3 font-medium text-gray-900">4 000</td><td className="px-4 py-3 text-sm">5 000</td></tr>
                                    <tr className="bg-gray-50"><td className="px-4 py-3 text-sm">Hela ansikte / 4+ områden</td><td className="px-4 py-3 text-sm">4 500</td><td className="px-4 py-3 font-medium text-gray-900">5 500</td><td className="px-4 py-3 text-sm">7 000+</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Skillnader mellan städer</h3>
                        <p>Stockholm-premium är mindre än många tror. Skillnaden mellan Stockholm och Malmö ligger ofta på 300–500 kr för en standardbehandling — inte de 20–30 procent som ibland antas. Premium-kliniker som Akademikliniken är prissatta i den övre delen av spannet och drar upp Stockholms snitt.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Stockholm:</strong> medianer ofta 5–10 procent över riksgenomsnitt</li>
                            <li><strong>Göteborg:</strong> ungefär riksgenomsnitt</li>
                            <li><strong>Malmö:</strong> ofta 5–10 procent under riksgenomsnitt</li>
                            <li><strong>Mindre orter:</strong> stor variation, ofta lägre</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Vad ska ingå i priset</h3>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Konsultation</strong> (eller minst en uppfräschning vid återbesök)</li>
                            <li><strong>Behandlingen</strong> med tydligt specificerad mängd</li>
                            <li><strong>Gratis kontroll och justering</strong> inom 2 veckor</li>
                            <li><strong>Patientförsäkring</strong> (lagstadgat)</li>
                        </ul>

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
                            <li><strong>"Frusen" känsla</strong> — överdosering ger ett uttryckslöst utseende.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="lag">Lag 2021:363 och IVO — dina rättigheter som patient</h2>
                        <p>Den 1 juli 2021 trädde <strong>Lag (2021:363) om estetiska kirurgiska ingrepp och estetiska injektionsbehandlingar</strong> i kraft. Lagen omformade den svenska estetikbranschen och gav dig som patient flera tydliga rättigheter.</p>

                        <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-gray-100 my-8">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/konsultation_botox.jpeg" 
                                alt="Konsultation inför botoxbehandling" 
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <ol className="list-decimal pl-5 space-y-3 my-6">
                            <li><strong>48 timmars betänketid.</strong> Vid din första behandling måste det gå minst 48 timmar mellan konsultation och själva behandlingen.</li>
                            <li><strong>Legitimerad personal.</strong> Botox får endast utföras av legitimerad sjuksköterska, läkare eller tandläkare.</li>
                            <li><strong>IVO-registrerad klinik.</strong> Kliniker som utför estetiska injektioner ska finnas i IVO:s vårdgivarregister.</li>
                            <li><strong>Patientförsäkring.</strong> Kliniken är skyldig att ha försäkring som täcker eventuella skador.</li>
                            <li><strong>18-årsgräns.</strong> Estetiska injektioner får inte utföras på personer under 18 år.</li>
                        </ol>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="valja-klinik">Så väljer du en seriös klinik</h2>
                        <p>Att hitta en seriös botoxklinik innebär att kontrollera IVO-registrering, behandlarens legitimation och klinikens recensioner. Du har rätt till en ordentlig konsultation och skriftlig information. Undvik kliniker som stressar fram ett beslut.</p>

                        <div className="bg-gray-50 border-l-4 border-primary p-6 mt-8 rounded-r-lg">
                            <h3 className="font-bold text-gray-900 mb-4">Hitta en klinik nära dig</h3>
                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                <div className="md:w-1/3 w-full rounded-xl overflow-hidden bg-gray-200 aspect-video flex-shrink-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img 
                                        src="/images/blogg/estetisk_klinik_exterior.jpeg" 
                                        alt="Estetisk klinik exteriör" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="md:w-2/3 w-full">
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        På Battrehy.se hittar du över 500 hudvårdskliniker över hela Sverige. Du kan filtrera efter behandlingstyp, stad och kundbetyg, jämföra utbud och boka direkt. <Link href="/behandlingar/botoxbehandling" className="text-primary hover:underline font-medium">Hitta kliniker för botoxbehandling här</Link>.
                                    </p>
                                    <p className="text-gray-700 text-sm sm:text-base mt-2">
                                        Vill du veta mer om hur du gör ett tryggt val? Läs vår guide: <Link href="/blogg/estetisk-klinik" className="text-primary hover:underline font-medium">Så väljer du en seriös estetisk klinik</Link>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="fore-efter">Före och efter behandling — så förbereder du dig</h2>
                        
                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Första 4 timmarna efter</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Sitt eller stå upp — ligg inte ner. Detta minskar risken för toxinmigration.</li>
                            <li>Massera <strong>inte</strong> området.</li>
                            <li>Undvik makeup på injektionspunkterna första timmen.</li>
                            <li>Du kan röra ansiktet normalt — animera musklerna lugnt så toxin tas upp jämnt.</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Första 24–48 timmar</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Ingen träning, bastu eller varma bad</strong> — ökat blodflöde kan förflytta toxin.</li>
                            <li><strong>Ingen lång flygning</strong>.</li>
                            <li><strong>Inga ansiktsbehandlingar</strong>.</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Första 2 veckorna</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Resultatet utvecklas successivt — bli inte orolig om det inte syns dag 3.</li>
                            <li>Boka 2-veckorskontrollen om kliniken erbjuder den.</li>
                            <li>Vid asymmetri eller område som inte svarat — det justeras vid 2-veckorskontrollen, inte tidigare.</li>
                        </ul>
                        
                        <p className="mt-4">
                            För djuprengöring av huden, se vår <Link href="/blogg/ansiktsbehandling-den-kompletta-guiden" className="text-primary hover:underline">guide till ansiktsbehandling</Link>.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="faq">Vanliga frågor</h2>
                        
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-gray-900">Vad kostar en botoxbehandling i Sverige?</h4>
                                <p className="text-gray-700 mt-1">En botoxbehandling i Sverige kostar typiskt mellan 1 800 kr (ett område) och 5 000 kr (3 områden eller hela övre ansiktet). Nationellt snitt ligger på 3 088 kr enligt Skonhetskollens 2026-data. Stockholmskliniker ligger något över snittet, mindre orter ofta något under. Många kliniker erbjuder paketpriser med integrerad uppföljning.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Hur länge håller botox?</h4>
                                <p className="text-gray-700 mt-1">Effekten håller typiskt 3–6 månader. Första behandlingen ger ofta kortare effekt (cirka 3 månader); med upprepade behandlingar kan effekten förlängas till 4–6 månader. Faktorer som påverkar är muskelaktivitet, dos, område och individuell metabolism.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Vem får utföra botox i Sverige?</h4>
                                <p className="text-gray-700 mt-1">Enligt Lag 2021:363 måste botoxbehandlingar utföras av legitimerad sjuksköterska, läkare eller tandläkare. Kliniken måste finnas i IVO:s vårdgivarregister. Du har rätt att be om legitimationsbevis innan behandling och kontrollera registreringen själv via socialstyrelsen.se eller ivo.se.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Måste man ha konsultation innan första botoxbehandlingen?</h4>
                                <p className="text-gray-700 mt-1">Ja. Lagen kräver minst 48 timmars betänketid mellan konsultation och första behandling. Konsultationen ska innehålla hudanalys, genomgång av medicinsk historia och skriftlig information om risker och pris. Var skeptisk mot kliniker som vill boka direkt utan konsultation — det är ett tecken på att lagen inte följs.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Vilka biverkningar kan botox ge?</h4>
                                <p className="text-gray-700 mt-1">Vanliga övergående biverkningar är liten rodnad, små märken efter injektionspunkter och mild huvudvärk första dygnet. Mer sällsynt: tillfällig asymmetri, hängande ögonlock (ptos) eller en "frusen" känsla. Mycket sällsynta allvarliga reaktioner inkluderar allergisk reaktion. Kontakta kliniken vid svårare biverkningar eller om något inte avtar inom 48 timmar.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Hur snabbt syns effekten av botox?</h4>
                                <p className="text-gray-700 mt-1">Första antydan till effekt kan synas efter 3–5 dagar. Full effekt utvecklas över 10–14 dagar. Många kliniker erbjuder en gratis kontroll 2 veckor efter behandlingen för eventuell justering om resultatet är ojämnt eller om något område inte svarat tillräckligt.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Kan botox förebygga rynkor?</h4>
                                <p className="text-gray-700 mt-1">Preventiv botox — små doser i tidiga 30-årsåldern för att förhindra dynamiska rynkor från att etableras — har blivit allt vanligare. Studier antyder att det kan fördröja utvecklingen av djupa linjer, men beslutet att starta tidigt bör diskuteras med legitimerad personal baserat på dina individuella muskel- och hudmönster.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Hur hittar jag en seriös botoxklinik i Sverige?</h4>
                                <p className="text-gray-700 mt-1">Börja med att kontrollera att kliniken finns i IVO:s vårdgivarregister (ivo.se) och att den som utför behandlingen är legitimerad (kontrollera via socialstyrelsen.se). Be om transparenta priser, läs flera oberoende recensioner och kräv en konsultation med 48 timmars betänketid före behandling. På Battrehy.se hittar du över 500 hudvårdskliniker du kan filtrera och jämföra.</p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="kallor">Källor och vidare läsning</h2>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                            <li><a href="https://www.ivo.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Inspektionen för vård och omsorg (IVO)</a> — vårdgivarregister och regulatorisk information</li>
                            <li><a href="https://www.riksdagen.se/sv/dokument-lagar/dokument/svensk-forfattningssamling/lag-2021363-om-estetiska-kirurgiska-ingrepp-och_sfs-2021-363" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Lag (2021:363) om estetiska kirurgiska ingrepp och estetiska injektionsbehandlingar</a></li>
                            <li><a href="https://www.socialstyrelsen.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Socialstyrelsen</a> — yrkeslegitimationer och kontroll</li>
                            <li><a href="https://www.lakemedelsverket.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Läkemedelsverket</a> — godkända botulinumtoxin-preparat</li>
                            <li><a href="https://www.1177.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">1177 Vårdguiden</a> — patientinformation</li>
                            <li>IVO:s nationella inspektionsrapport om estetiska behandlingar, november 2024</li>
                            <li>Skönhetskollens nationella prisindex 2026 — 3 088 kr genomsnitt över 555+ svenska kliniker</li>
                        </ul>
                    </div>
                </article>
            </div>
        </main>
    );
}
