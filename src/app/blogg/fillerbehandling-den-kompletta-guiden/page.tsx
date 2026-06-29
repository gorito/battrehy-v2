import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Fillerbehandling 2026: priser, hållbarhet & guide | Battrehy',
    description: 'Allt om fillerbehandling i Sverige 2026: områden, priser, hållbarhet, IVO-regler och hur du väljer en seriös klinik. Expertguide.',
    alternates: {
        canonical: 'https://battrehy.se/blogg/fillerbehandling-den-kompletta-guiden',
    },
    openGraph: {
        title: 'Fillerbehandling 2026: priser, hållbarhet & guide',
        description: 'Allt om fillerbehandling i Sverige 2026: områden, priser, hållbarhet, IVO-regler och hur du väljer en seriös klinik.',
        type: 'article',
        locale: 'sv_SE',
        url: 'https://battrehy.se/blogg/fillerbehandling-den-kompletta-guiden',
        images: [
            {
                url: 'https://battrehy.se/images/blogg/fillerbehandling-hero.jpeg',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Fillerbehandling 2026: priser, hållbarhet & guide',
        description: 'Allt om fillerbehandling i Sverige 2026: områden, priser och säkerhet.',
        images: ['https://battrehy.se/images/blogg/fillerbehandling-hero.jpeg'],
    }
};

export default function FillerBlogPost() {
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
                name: 'Fillerbehandling',
                item: 'https://battrehy.se/blogg/fillerbehandling-den-kompletta-guiden'
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
                        "headline": "Fillerbehandling i Sverige 2026 — den kompletta guiden till priser, hållbarhet och säkerhet",
                        "description": "Allt om fillerbehandling i Sverige 2026: områden, priser, hållbarhet, IVO-regler och hur du väljer en seriös klinik.",
                        "author": { "@type": "Organization", "name": "Battrehys redaktion", "url": "https://battrehy.se/om-redaktionen" },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Battrehy",
                            "url": "https://battrehy.se"
                        },
                        "datePublished": "2026-05-22T08:00:00+02:00",
                        "dateModified": "2026-06-06T08:00:00+02:00",
                        "inLanguage": "sv-SE",
                        "image": "https://battrehy.se/images/blogg/fillerbehandling-hero.jpeg",
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "https://battrehy.se/blogg/fillerbehandling-den-kompletta-guiden"
                        }
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
                            {
                                "@type": "Question", "name": "Vad kostar en fillerbehandling i Sverige?",
                                "acceptedAnswer": { "@type": "Answer", "text": "En milliliter HA-filler kostar typiskt 3 500–4 500 kr (median 3 800 kr). Läppfiller från 2 800 kr för 0,5 ml; större områden som käklinje och kinder kostar 4 500–6 000 kr per behandling. Stockholmskliniker ligger 10–15 procent över rikssnitt." }
                            },
                            {
                                "@type": "Question", "name": "Hur länge håller filler?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Mjukare HA-fillers i läppar och tårränna håller 6–9 månader. Tvärbundna HA-fillers i kinder, käke och haka håller 12–18 månader. Faktorer som påverkar är områdets rörlighet, filler-typ och individuell metabolism." }
                            },
                            {
                                "@type": "Question", "name": "Går det att lösa upp filler?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Ja — hyaluronsyra-filler kan lösas upp med enzymet hyaluronidas. Upplösningen sker inom timmar och kostar typiskt 2 000–2 500 kr per session. Andra typer av filler (Radiesse, Sculptra) är inte reversibla på samma sätt." }
                            },
                            {
                                "@type": "Question", "name": "Vem får utföra filler i Sverige?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Enligt Lag 2021:363 måste fillerbehandlingar utföras av legitimerad sjuksköterska, läkare eller tandläkare. Kliniken måste finnas i IVO:s vårdgivarregister." }
                            },
                            {
                                "@type": "Question", "name": "Vilka biverkningar kan filler ge?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Vanliga övergående biverkningar är svullnad, blåmärken och tillfällig asymmetri som avtar inom 2 veckor. Mer sällsynt: knutar under huden eller infektion. Mycket sällsynt men allvarligt är vaskulär ocklusion (filler i blodkärl)." }
                            },
                            {
                                "@type": "Question", "name": "Vad är vaskulär ocklusion?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Vaskulär ocklusion uppstår när filler injiceras in i ett blodkärl och blockerar blodflödet. Det är mycket sällsynt men allvarligt — kan i värsta fall leda till vävnadsdöd eller, vid behandling nära ögat, synpåverkan. En kompetent behandlare förebygger detta genom kanylteknik och tillgång till hyaluronidas på kliniken." }
                            },
                            {
                                "@type": "Question", "name": "Vad är skillnaden mellan filler och botox?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Filler tillför volym där huden förlorat sin egen — används för läppar, kinder, tårränna och käke. Botox slappnar av muskler och används mot dynamiska rynkor som pannlinjer och kråksparkar. De används ofta tillsammans men löser olika problem." }
                            },
                            {
                                "@type": "Question", "name": "Hur hittar jag en seriös filler-klinik?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Kontrollera IVO-registrering på ivo.se, behandlarens legitimation på socialstyrelsen.se, fråga vilket filler-märke som används, kontrollera att hyaluronidas finns direkt tillgängligt, be om transparent pris och kräv 48 timmars betänketid för första behandling." }
                            }
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
                            Fillerbehandling i Sverige 2026 — den kompletta guiden till priser, hållbarhet och säkerhet
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
                                src="/images/blogg/fillerbehandling-hero.jpeg"
                                alt="Professionell fillerbehandling utförs av legitimerad personal"
                                className="w-full h-full object-cover"
                            />
                            <p className="text-xs text-gray-500 p-2 text-center bg-gray-50 border-t border-gray-100">
                                Filler ger ofta omedelbart resultat, men kompetensskillnaden mellan behandlare är stor — och valet av klinik är minst lika viktigt som valet av filler-typ.
                            </p>
                        </div>
                    </header>

                    <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                        <p className="text-xl leading-relaxed text-gray-800 mb-8 font-medium">
                            En fillerbehandling är en injektion av en gel — vanligast hyaluronsyra — som tillför volym där huden förlorat sin egen. Resultatet syns direkt och behandlingen tar oftast under 30 minuter. Men kompetensskillnaden mellan kliniker är stor, och fel utförd kan filler ge allt från ojämn estetik till sällsynta men allvarliga komplikationer. Den här guiden går igenom vilka områden som behandlas, vad det kostar 2026, hur länge resultatet håller, och — det viktigaste — hur du väljer en klinik där behandlingen är både snygg och säker.
                        </p>

                        <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl my-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Snabb sammanfattning</h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li><strong>Filler är vanligen hyaluronsyra (HA)</strong> — en gel som tillför volym och kan lösas upp igen om resultatet inte blev som du tänkt</li>
                                <li><strong>Åtta vanliga områden</strong> behandlas: läppar, tårränna, kinder, käklinje, haka, näsa, marionettlinjer och tinningar</li>
                                <li><strong>Pris:</strong> 1 ml HA-filler kostar typiskt 3 500–4 500 kr (median 3 800 kr); läppfiller från 2 800 kr; större paket sparar 15–25%</li>
                                <li><strong>Hållbarhet:</strong> mjukare HA-fillers 6–9 månader, tvärbundna 12–18 månader</li>
                                <li><strong>HA-filler kan lösas upp med hyaluronidas</strong> (2 000–2 500 kr per session) — en av de största skillnaderna mot andra typer av filler</li>
                                <li><strong>Lag 2021:363:</strong> 48 timmars betänketid, legitimerad personal, IVO-registrering — samma regler som botox</li>
                            </ul>
                        </div>

                        <nav className="bg-gray-50 border border-gray-200 p-6 rounded-xl my-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Innehåll</h2>
                            <ol className="list-decimal pl-5 space-y-2 text-primary font-medium">
                                <li><a href="#vad-ar" className="hover:underline">Vad är fillerbehandling?</a></li>
                                <li><a href="#omraden" className="hover:underline">Vilka områden behandlas med filler?</a></li>
                                <li><a href="#behandling" className="hover:underline">Hur går behandlingen till?</a></li>
                                <li><a href="#priser" className="hover:underline">Vad kostar filler i Sverige?</a></li>
                                <li><a href="#hallbarhet" className="hover:underline">Hur länge håller resultatet?</a></li>
                                <li><a href="#risker" className="hover:underline">Risker, biverkningar och reversibilitet</a></li>
                                <li><a href="#lag" className="hover:underline">Lag 2021:363 och IVO — dina rättigheter</a></li>
                                <li><a href="#valja-klinik" className="hover:underline">Så väljer du en seriös klinik</a></li>
                                <li><a href="#fore-efter" className="hover:underline">Före och efter behandling</a></li>
                                <li><a href="#faq" className="hover:underline">Vanliga frågor</a></li>
                                <li><a href="#kallor" className="hover:underline">Källor</a></li>
                            </ol>
                        </nav>

                        <h2 id="vad-ar" className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-24">Vad är fillerbehandling?</h2>
                        <p>
                            En fillerbehandling är en icke-kirurgisk injektion där en gelartad substans förs in i huden för att skapa volym, jämna ut linjer eller forma konturer. Den absolut vanligaste typen av filler i Sverige är <strong>hyaluronsyra (HA)</strong> — en naturlig molekyl som finns i huden och som binder vatten. När den injiceras tillför den både volym och fukt.
                        </p>
                        <p>
                            Det är viktigt att skilja filler från botox. <strong>Filler tillför volym</strong> där huden förlorat sin egen — exempelvis i läppar, kinder eller tårränna. <strong>Botox slappnar av muskler</strong> och används mot dynamiska rynkor som pannlinjer och kråksparkar. De används ofta tillsammans i en behandlingsplan, men löser olika problem. För mer om botox, läs vår <Link href="/blogg/botoxbehandling-den-kompletta-guiden" className="text-primary hover:underline">guide till botoxbehandling</Link>.
                        </p>
                        <p>
                            Det finns andra typer av filler — kalciumhydroxylapatit (Radiesse), poly-L-mjölksyra (Sculptra) — men de är mindre vanliga i Sverige och <strong>kan inte lösas upp på samma sätt som HA-filler</strong>. Mer om reversibiliteten längre ner.
                        </p>
                        <p>
                            På den svenska marknaden dominerar fyra varumärken: <strong>Restylane</strong> (Galderma, svenskutvecklat i Uppsala), <strong>Juvederm</strong> (Allergan), <strong>Teosyal</strong> (Teoxane) och <strong>Belotero</strong> (Merz). I en granskning av 11 svenska kliniker (maj 2026) använder cirka 75 procent Restylane och 67 procent Juvederm — många kliniker har båda och väljer brand efter område.
                        </p>

                        <h2 id="omraden" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">Vilka områden behandlas med filler?</h2>
                        <p>I Sverige används filler både för diskreta korrigeringar och mer omfattande konturförändringar. Här är de åtta vanligaste områdena.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">1. Läppar</h3>
                        <div className="my-6 rounded-xl overflow-hidden bg-gray-100 float-none md:float-right md:w-1/2 md:ml-6 md:mb-6">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/blogg/lappfiller-narbild.jpeg"
                                alt="Närbild av kvinnas naturligt utseende läppar — subtilt resultat av läppfiller"
                                className="w-full h-auto object-cover"
                            />
                            <p className="text-xs text-gray-500 p-2 text-center bg-gray-50 border-t border-gray-100">Trend 2026: subtila resultat och naturlig kontur — inte "Russian lips" eller överfyllda volymer.</p>
                        </div>
                        <p>Det mest sökta filler-området i Sverige. HA-filler i läpparna kan ge volym, definiera kontur eller korrigera asymmetri. Mängden bestämmer resultatet: en halv milliliter (0,5 ml) ger en mycket subtil förändring; en hel milliliter en tydlig men fortfarande naturlig fyllighet. Subtilitet är trend 2026 — "Russian lips" och stora volymer är på väg ut.</p>
                        <div className="clear-both"></div>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">2. Tårränna (under ögonen)</h3>
                        <p>Den mörka hålighet som kan bildas mellan ögonlocket och kindbenet — ger ett trött uttryck även när du är utvilad. Tårränna är ett av de mer <strong>tekniskt krävande områdena</strong>. Det ligger nära viktiga blodkärl och bör endast utföras av erfaren behandlare. Använd kanyl istället för nål för att minska risk för vaskulär ocklusion.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">3. Kinder och kindben</h3>
                        <p>Filler kan återställa volym som naturligt minskar med åldern eller skapa skarpare kindbenslinje hos yngre. Behandlingen lyfter dessutom huden i mellanansiktet något, vilket kan minska nasolabiala veck indirekt.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">4. Käklinje och haka</h3>
                        <p>Ett snabbväxande område, både för kvinnor (definiera käke, balansera mot kindben) och män (kraftigare käkkontur). Käklinjen kräver ofta större mängd filler (2–4 ml) eftersom området är större och har tjockare hud.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">5. Marionettlinjer och nasolabiala veck</h3>
                        <p>Vecken som löper från mungipan ner mot hakan (marionettlinjer) eller från näsan ner mot mungipan (nasolabiala). Filler tillför volym där huden fallit ihop och mjukar upp linjen utan att maska den helt.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">6. Icke-kirurgisk näskorrigering (näsfiller)</h3>
                        <p>Filler i näsryggen kan rätta ut en knöl, lyfta nästippen eller balansera asymmetri — utan kirurgi. Ett av de mest <strong>högrisk-områdena</strong> anatomiskt: blodkärlen i näsan är ändkärl, vilket gör vaskulär ocklusion särskilt allvarlig här. Välj erfaren behandlare som har hyaluronidas direkt tillgängligt.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">7. Tinningar</h3>
                        <p>Volym i tinningarna kan motverka det "insjunkna" utseendet som uppstår när fettfacken i området minskar. Subtil men ofta märkbart föryngrande.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">8. Händer</h3>
                        <p>Filler i händerna kan föryngra genom att maskera ådror och senor. Mindre vanligt än ansiktsbehandlingar och något dyrare per session.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Områdes-snabbköp</h3>
                        <div className="overflow-x-auto my-8">
                            <table className="w-full border-collapse bg-white border border-gray-200 rounded-lg">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Område</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Typisk mängd</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Median pris (kr)</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hållbarhet</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {[
                                        ['Läppar', '0,5–1 ml', '3 800', '6–9 mån'],
                                        ['Tårränna', '0,5–1 ml per sida', '4 500', '9–12 mån'],
                                        ['Kinder', '1–2 ml', '4 500', '12–18 mån'],
                                        ['Käklinje', '2–4 ml', '5 000', '12–18 mån'],
                                        ['Haka', '1–2 ml', '4 500', '12–18 mån'],
                                        ['Näsa', '0,3–0,7 ml', '4 500', '9–18 mån'],
                                        ['Marionettlinjer', '1 ml', '4 000', '9–12 mån'],
                                        ['Tinningar', '1–2 ml', '4 000', '12–18 mån']
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row[0]}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row[1]}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{row[2]}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row[3]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <h2 id="behandling" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">Hur går behandlingen till?</h2>
                        <p>En komplett fillerbehandling tar typiskt 30–60 minuter inklusive konsultation och förberedelse. Själva injektionen är ofta över på 10–20 minuter.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. Konsultation och hudanalys</h3>
                        <p>Före din första behandling ska du alltid träffa behandlaren för en konsultation. Enligt <strong>Lag 2021:363</strong> måste det gå minst 48 timmar mellan konsultation och behandling vid första besöket. Konsultationen ska omfatta medicinsk historia, eventuella mediciner, allergier, tidigare estetiska behandlingar och vad du vill uppnå.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">2. Bedövning</h3>
                        <p>De flesta kliniker använder lokalbedövningskräm (EMLA, Maxilene) som appliceras 20–30 minuter före behandlingen. Vid läppfiller kompletterar vissa kliniker med blockad — en injektion av bedövningsmedel som dövar nerven som försörjer läpparna helt. Diskutera detta med din behandlare före.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">3. Själva injektionen — kanyl eller nål</h3>
                        <div className="my-6 rounded-xl overflow-hidden bg-gray-100 float-none md:float-left md:w-1/2 md:mr-6 md:mb-6">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/blogg/verktyg-filler-kanyl.jpeg"
                                alt="Sterilt klinikbricka med kanyl, spruta och övrigt material för fillerbehandling"
                                className="w-full h-auto object-cover"
                            />
                            <p className="text-xs text-gray-500 p-2 text-center bg-gray-50 border-t border-gray-100">Kanyl (trubbig, böjlig) används ofta i högrisk-områden som tårränna och näsa — den minskar risken att stinga genom ett blodkärl.</p>
                        </div>
                        <p>Behandlaren använder antingen en tunn nål eller en <strong>kanyl</strong> (en trubbig, böjlig version). Kanyl används ofta i högrisk-områden som tårränna och näsa eftersom den minskar risken att stinga genom ett blodkärl. Hela proceduren tar 10–20 minuter beroende på antal områden.</p>
                        <div className="clear-both"></div>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">4. Direkt efter</h3>
                        <p>Du kan se omedelbar svullnad och små märken vid injektionspunkterna. Detta är normalt — slutligt resultat utvecklas över 2 veckor när svullnaden gått ner och fillern integrerat sig med vävnaden.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">5. Uppföljning</h3>
                        <p>De flesta seriösa kliniker bjuder på en gratis kontroll 2 veckor efter behandlingen. Då kan eventuell asymmetri justeras och du och behandlaren utvärderar slutresultatet tillsammans.</p>

                        <h2 id="priser" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">Vad kostar filler i Sverige?</h2>
                        <p>Priserna baseras på publicerade prislistor från 11 svenska kliniker (maj 2026). Filler prissätts antingen <strong>per milliliter</strong> (vanligast för Restylane, Juvederm) eller <strong>per område</strong> (där behandlaren bestämmer mängd efter konsultation).</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Pris per milliliter (HA-filler)</h3>
                        <div className="overflow-x-auto mb-8">
                            <table className="w-full border-collapse bg-white border border-gray-200 rounded-lg">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Volym</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Lägsta (kr)</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Median (kr)</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Högsta (kr)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr><td className="px-4 py-3 text-sm">0,5–0,6 ml</td><td className="px-4 py-3 text-sm">2 800</td><td className="px-4 py-3 font-medium text-gray-900">2 900</td><td className="px-4 py-3 text-sm">3 500</td></tr>
                                    <tr className="bg-gray-50"><td className="px-4 py-3 text-sm">1 ml</td><td className="px-4 py-3 text-sm">3 500</td><td className="px-4 py-3 font-medium text-gray-900">3 800</td><td className="px-4 py-3 text-sm">4 500</td></tr>
                                    <tr><td className="px-4 py-3 text-sm">2 ml</td><td className="px-4 py-3 text-sm">5 900</td><td className="px-4 py-3 font-medium text-gray-900">6 900</td><td className="px-4 py-3 text-sm">8 500</td></tr>
                                    <tr className="bg-gray-50"><td className="px-4 py-3 text-sm">3 ml</td><td className="px-4 py-3 text-sm">8 500</td><td className="px-4 py-3 font-medium text-gray-900">9 900</td><td className="px-4 py-3 text-sm">10 500</td></tr>
                                    <tr><td className="px-4 py-3 text-sm">4 ml</td><td className="px-4 py-3 text-sm">10 500</td><td className="px-4 py-3 font-medium text-gray-900">12 500</td><td className="px-4 py-3 text-sm">13 000</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Hyaluronidas (filler-upplösning)</h3>
                        <p>Om du inte är nöjd med ditt resultat — eller om en komplikation uppstår — kan HA-filler lösas upp med enzymet hyaluronidas. En session kostar <strong>2 000–2 500 kr</strong> för första behandlingen och oftast mindre för uppföljning. Detta är en av de största skillnaderna mot andra typer av filler. Mer om reversibilitet i risk-sektionen.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Skillnader mellan städer</h3>
                        <p>Stockholm-premium är mindre än många tror — cirka 10–15 procent över rikssnitt. Större kedjor (Akademikliniken) använder ofta enhetlig nationell prissättning. Smärre orter (Örebro, Västerås, Norrköping) ligger 10–15 procent under Stockholm.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Vad ska ingå i priset</h3>
                        <p>Ett bra pris innehåller <strong>konsultation, behandling, eventuell touch-up vid 2 veckors-kontrollen och hyaluronidas vid komplikation</strong>. Vissa kliniker debiterar konsultation separat (300–600 kr); andra bjuder på den. Fråga alltid om touch-up-policyn innan du bokar.</p>

                        <h2 id="hallbarhet" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">Hur länge håller resultatet?</h2>
                        <p>Hållbarheten beror på filler-typ, område och din egen metabolism.</p>

                        <p><strong>Mjukare HA-fillers</strong> (Restylane Vital, Belotero Soft, Teosyal Redensity) håller <strong>6–9 månader</strong>. Används i områden som behöver subtil volym: läppar, tårränna, fina linjer.</p>

                        <p><strong>Tvärbundna HA-fillers</strong> (Juvederm Voluma, Restylane Lyft, Teosyal Ultra Deep) håller <strong>12–18 månader</strong>. Används där struktur och hållbarhet är viktigare: kinder, käke, haka.</p>

                        <p>Andra faktorer som påverkar:</p>
                        <ul className="list-disc pl-5 mb-4 space-y-1">
                            <li><strong>Områdets rörlighet</strong> — läpparna rör sig konstant och bryter ner filler snabbare än kindbenet</li>
                            <li><strong>Din ämnesomsättning</strong> — yngre och mer atletiska personer tenderar att bryta ner filler snabbare</li>
                            <li><strong>Filler-mängd</strong> — större volymer kan hålla något längre proportionellt</li>
                        </ul>

                        <p>Många väljer att underhålla sina filler-behandlingar i serie: full behandling vid år 0, sedan touch-up med mindre mängd vid 9–12 månader för att hålla resultatet konsistent.</p>

                        <h2 id="risker" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">Risker, biverkningar och reversibilitet</h2>
                        <p>Filler är överlag säkert när det utförs av legitimerad personal, men inga injektioner är helt utan risk. Här är vad du behöver veta — från det vanligaste till det allvarligaste, plus reversibiliteten som är HA-fillerns unika fördel.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Vanliga övergående reaktioner</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Svullnad och blåmärken</strong> vid injektionspunkterna (1–7 dagar)</li>
                            <li><strong>Tillfällig asymmetri</strong> under första 2 veckor (slutligt resultat efter 14 dagar)</li>
                            <li><strong>Mild ömhet eller känslighet</strong> i området</li>
                            <li><strong>Klumpighet under huden</strong> som ofta jämnas ut med mild massage</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Mer sällsynta biverkningar</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Knutar eller noduler</strong> under huden — kan ofta lösas upp med hyaluronidas</li>
                            <li><strong>Granulom</strong> (inflammatorisk reaktion) — sällsynt med moderna HA-fillers</li>
                            <li><strong>Infektion</strong> — mycket sällsynt vid steril teknik</li>
                            <li><strong>Allergisk reaktion</strong> — sällsynt men möjligt</li>
                        </ul>

                        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mt-8 rounded-r-lg">
                            <h3 className="font-bold text-orange-900 mb-2">Vaskulär ocklusion — den allvarligaste risken</h3>
                            <p className="text-orange-900">
                                <strong>Vaskulär ocklusion</strong> uppstår när filler injiceras in i ett blodkärl och blockerar blodflödet. Det är mycket sällsynt men allvarligt. Tidiga tecken: <strong>plötslig stark smärta, blekhet eller blå-vit missfärgning</strong>, ibland följt av mörka fläckar timmar efteråt. I värsta fall — om det inte hanteras snabbt — kan vävnaden runt det blockerade området dö. Vid behandling nära ögat (näsa, panna, tårränna) finns i extrema fall risk för synpåverkan.
                            </p>
                            <p className="text-orange-900 mt-2">
                                En kompetent behandlare <strong>förebygger detta genom att</strong> använda kanyl i högrisk-områden, aspirera (dra tillbaka sprutan kort) före injektion, känna till blodkärlsanatomin, och ha <strong>hyaluronidas direkt tillgängligt på kliniken</strong> för att kunna lösa upp filler omedelbart om något skulle hända. Fråga alltid om dessa rutiner innan du bokar.
                            </p>
                        </div>

                        <div className="bg-green-50 border-l-4 border-green-500 p-6 mt-8 rounded-r-lg">
                            <h3 className="font-bold text-green-900 mb-2">Reversibilitet — HA-fillerns unika fördel</h3>
                            <p className="text-green-900">
                                Hyaluronsyra-filler kan <strong>lösas upp med hyaluronidas</strong>, ett enzym som bryter ner HA-molekylen. Detta är en av de största skillnaderna mot andra typer av filler (Radiesse, Sculptra) som inte är reversibla på samma sätt.
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-1 text-green-900">
                                <li><strong>Om du inte gillar resultatet</strong> kan kliniken lösa upp fillern inom 24–48 timmar</li>
                                <li><strong>Vid komplikationer</strong> (knutar, ocklusion, oönskat utseende) finns en räddningsväg</li>
                                <li><strong>Försök en mindre mängd först</strong> — du kan alltid lägga till mer, men det är tryggt att veta att du kan reversera</li>
                            </ul>
                            <p className="text-green-900 mt-2">
                                En hyaluronidas-session kostar typiskt <strong>2 000–2 500 kr</strong> och effekten syns inom timmar. Detta är <strong>den enskilt största psykologiska och praktiska försäkringen</strong> vid HA-filler.
                            </p>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Kontraindikationer</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Graviditet och amning</strong> — säkerheten är inte fastställd</li>
                            <li><strong>Aktiv infektion eller hudåkomma</strong> i området</li>
                            <li><strong>Vissa autoimmuna sjukdomar</strong> — diskutera med din behandlare</li>
                            <li><strong>Pågående antibiotikabehandling</strong></li>
                            <li><strong>Känd allergi</strong> mot HA eller hjälpämnen (lidokain i många fillers)</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">När du ska söka vård</h3>
                        <p>Sök omedelbart vård eller kontakta kliniken om du upplever <strong>plötslig stark smärta, blekhet eller missfärgning</strong> av huden, kraftig svullnad som inte avtar inom 48 timmar, <strong>synförändringar</strong>, eller tecken på infektion. Vid uteblivet svar från kliniken, vänd dig till <a href="https://www.1177.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">1177 Vårdguiden</a> eller akutmottagning.</p>

                        <h2 id="lag" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">Lag 2021:363 och IVO — dina rättigheter som patient</h2>
                        <p>Den 1 juli 2021 trädde lagen om estetiska kirurgiska ingrepp och estetiska injektionsbehandlingar i kraft. Reglerna gäller filler precis som för botox.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Dina lagstadgade rättigheter</h3>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li><strong>48 timmars betänketid</strong> mellan konsultation och första behandling</li>
                            <li><strong>Legitimerad personal</strong> — sjuksköterska, läkare eller tandläkare med specialistkompetens</li>
                            <li><strong>IVO-registrerad klinik</strong> — sök på <a href="https://www.ivo.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ivo.se</a></li>
                            <li><strong>Patientförsäkring</strong> — obligatorisk för alla kliniker som utför injektioner</li>
                            <li><strong>Skriftlig information</strong> om risker, biverkningar och pris</li>
                            <li><strong>18-årsgräns</strong> — estetiska injektioner får inte utföras på minderåriga</li>
                        </ol>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">IVO 2024 — den nationella inspektionen</h3>
                        <p>I november 2024 publicerade IVO en granskning av estetikbranschen som visade att <strong>86 kliniker</strong> inspekterades, <strong>180+ tillsynsbeslut</strong> fattades, <strong>cirka 40 anmälningar gick till åklagare</strong> och <strong>12 kliniker fick verksamhetsförbud</strong>. Regeringen har avsatt 28 miljoner kronor för fortsatt tillsyn under 2025 och framåt.</p>
                        <p>För dig som patient betyder det: kontrollera klinikens IVO-registrering och behandlarens legitimation innan du bokar. Det tar 3 minuter och är värt det. Mer detaljer om lagen och IVO-tillsynen finns i vår <Link href="/blogg/botoxbehandling-den-kompletta-guiden" className="text-primary hover:underline">kompletta guide till botoxbehandling</Link>.</p>

                        <h2 id="valja-klinik" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">Så väljer du en seriös klinik</h2>
                        <p>Filler är ett område där kompetensskillnaden mellan behandlare är enorm. Här är vad du ska kontrollera innan du bokar.</p>

                        <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-gray-100 my-8">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/blogg/konsultation-filler.jpeg"
                                alt="Konsultation infor fillerbehandling med legitimerad sjuksköterska"
                                className="w-full h-full object-cover"
                            />
                            <p className="text-xs text-gray-500 p-2 text-center bg-gray-50 border-t border-gray-100">En seriös klinik går igenom hela behandlingsplanen, visar dig områden i spegel och låter dig ta tid på dig att fatta beslut.</p>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">IVO-checklistan — sju punkter</h3>
                        <ol className="list-decimal pl-5 space-y-3">
                            <li><strong>IVO-registrering</strong> — kliniken finns i vårdgivarregistret på ivo.se</li>
                            <li><strong>Legitimerad behandlare</strong> — sjuksköterska, läkare eller tandläkare. Kontrollera via <a href="https://www.socialstyrelsen.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">socialstyrelsen.se</a></li>
                            <li><strong>Hyaluronidas på plats</strong> — en seriös klinik har alltid filler-upplösningsmedel direkt tillgängligt</li>
                            <li><strong>Kanylteknik</strong> i högrisk-områden (tårränna, näsa) — fråga vilken teknik som används</li>
                            <li><strong>Skriftlig information</strong> om behandling, risker och pris — inte bara muntligt</li>
                            <li><strong>Patientförsäkring</strong> — kliniken ska ha försäkring som täcker eventuella skador</li>
                            <li><strong>2-veckors uppföljning</strong> — gratis kontroll bör ingå för att utvärdera och eventuellt justera resultat</li>
                        </ol>

                        <div className="bg-gray-50 border-l-4 border-primary p-6 mt-8 rounded-r-lg">
                            <h3 className="font-bold text-gray-900 mb-4">Hitta en klinik nära dig</h3>
                            <p className="text-gray-700 text-sm sm:text-base">
                                På Battrehy.se hittar du över 500 hudvårdskliniker över hela Sverige. Du kan filtrera efter behandlingstyp, stad och kundbetyg, jämföra utbud och boka direkt — eller verifiera klinikens IVO-registrering och behandlarens legitimation innan du tar kontakt. <Link href="/kliniker?behandling=fillerbehandling" className="text-primary hover:underline font-medium">Hitta kliniker för fillerbehandling här</Link>.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base mt-2">
                                För injektioner mot rynkor som inte är fillerbaserade, läs vår <Link href="/blogg/botoxbehandling-den-kompletta-guiden" className="text-primary hover:underline font-medium">kompletta guide till botoxbehandling</Link>. För renodlade ansiktsbehandlingar utan injektioner, se vår <Link href="/blogg/ansiktsbehandling-den-kompletta-guiden" className="text-primary hover:underline font-medium">guide till ansiktsbehandling</Link>.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base mt-2">
                                Vill du veta mer om hur du gör ett tryggt val? Läs vår guide: <Link href="/blogg/estetisk-klinik" className="text-primary hover:underline font-medium">Så väljer du en seriös estetisk klinik</Link>.
                            </p>
                        </div>

                        <h2 id="fore-efter" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">Före och efter behandling</h2>
                        
                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">24 timmar innan</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Undvik <strong>blodförtunnande mediciner</strong> (acetylsalicylsyra, ibuprofen) om möjligt — minskar blåmärken</li>
                            <li>Undvik alkohol kvällen innan</li>
                            <li>Undvik kosttillskott som ökar blodflödet (fiskolja, vitlök, ginkgo, vitamin E)</li>
                            <li>Drick mer vatten — välhydrerad hud reagerar lugnare</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Dagen för behandlingen</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Kom utan makeup om möjligt</li>
                            <li>Berätta om alla mediciner och kosttillskott du tar</li>
                            <li>Räkna med att vara hemma resten av dagen — svullnad kan kvarstå några timmar</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Första 24–48 timmarna</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Ingen träning, bastu eller varma bad</strong> — ökat blodflöde kan öka svullnad</li>
                            <li><strong>Ingen massage</strong> av området första 48 timmarna (om inte behandlaren specifikt instruerat)</li>
                            <li><strong>Sov gärna lätt upphöjd</strong> första natten för att minska svullnad</li>
                            <li><strong>Använd is</strong> (genom tunt tyg, inte direkt) första timmarna vid svullnad</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Första 2 veckorna</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Svullnad och små blåmärken är normalt och försvinner gradvis</li>
                            <li><strong>Slutligt resultat utvecklas över 14 dagar</strong> — bedöm inte resultatet förrän efter 2 veckor</li>
                            <li>Boka 2-veckorskontrollen om kliniken erbjuder den</li>
                            <li>Vid asymmetri eller ojämnhet efter 14 dagar: justering kan göras vid kontrollen</li>
                        </ul>

                        <h2 id="faq" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">Vanliga frågor</h2>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-gray-900">Vad kostar en fillerbehandling i Sverige?</h4>
                                <p className="text-gray-700 mt-1">En milliliter HA-filler kostar typiskt 3 500–4 500 kr (median 3 800 kr). Läppfiller från 2 800 kr för 0,5 ml; större områden som käklinje och kinder kostar 4 500–6 000 kr per behandling. Stockholmskliniker ligger 10–15 procent över rikssnitt. Många kliniker erbjuder paketpriser där 3–4 ml ger 15–25 procents rabatt jämfört med styckpris.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Hur länge håller filler?</h4>
                                <p className="text-gray-700 mt-1">Mjukare HA-fillers i läppar och tårränna håller 6–9 månader. Tvärbundna HA-fillers i kinder, käke och haka håller 12–18 månader. Faktorer som påverkar är områdets rörlighet, filler-typ och individuell metabolism.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Går det att lösa upp filler?</h4>
                                <p className="text-gray-700 mt-1">Ja — hyaluronsyra-filler kan lösas upp med enzymet hyaluronidas. Detta är en av de största fördelarna med HA-filler jämfört med andra typer. Upplösningen sker inom timmar och kostar typiskt 2 000–2 500 kr per session. Andra typer av filler (Radiesse, Sculptra) är inte reversibla på samma sätt.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Vem får utföra filler i Sverige?</h4>
                                <p className="text-gray-700 mt-1">Enligt Lag 2021:363 måste fillerbehandlingar utföras av legitimerad sjuksköterska, läkare eller tandläkare. Kliniken måste finnas i IVO:s vårdgivarregister. Du kan kontrollera klinikens registrering på ivo.se och behandlarens legitimation på socialstyrelsen.se.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Vilka biverkningar kan filler ge?</h4>
                                <p className="text-gray-700 mt-1">Vanliga övergående biverkningar är svullnad, blåmärken och tillfällig asymmetri som avtar inom 2 veckor. Mer sällsynt: knutar under huden eller infektion. Mycket sällsynt men allvarligt är vaskulär ocklusion (filler i blodkärl) — därför är det avgörande att välja en erfaren behandlare som har hyaluronidas direkt tillgängligt.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Vad är vaskulär ocklusion?</h4>
                                <p className="text-gray-700 mt-1">Vaskulär ocklusion uppstår när filler injiceras in i ett blodkärl och blockerar blodflödet. Det är mycket sällsynt men allvarligt — kan i värsta fall leda till vävnadsdöd eller, vid behandling nära ögat, synpåverkan. En kompetent behandlare förebygger detta genom kanylteknik i högrisk-områden, aspiration före injektion, och tillgång till hyaluronidas direkt på kliniken för omedelbar hantering.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Vad är skillnaden mellan filler och botox?</h4>
                                <p className="text-gray-700 mt-1">Filler tillför volym där huden förlorat sin egen — används för läppar, kinder, tårränna och käke. Botox slappnar av muskler och används mot dynamiska rynkor som pannlinjer och kråksparkar. De används ofta tillsammans men löser olika problem. För mer om botox, läs vår kompletta guide till botoxbehandling.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Hur hittar jag en seriös filler-klinik?</h4>
                                <p className="text-gray-700 mt-1">Kontrollera IVO-registrering på ivo.se, behandlarens legitimation på socialstyrelsen.se, fråga vilket filler-märke som används (de etablerade i Sverige är Restylane, Juvederm, Belotero och Teosyal), kontrollera att hyaluronidas finns direkt tillgängligt, be om transparent pris och kräv 48 timmars betänketid för första behandling. På Battrehy.se hittar du över 500 hudvårdskliniker du kan filtrera och jämföra.</p>
                            </div>
                        </div>

                        <h2 id="kallor" className="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-24">Källor och vidare läsning</h2>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                            <li><a href="https://www.ivo.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Inspektionen för vård och omsorg (IVO)</a> — vårdgivarregister och regulatorisk information</li>
                            <li><a href="https://www.riksdagen.se/sv/dokument-lagar/dokument/svensk-forfattningssamling/lag-2021363-om-estetiska-kirurgiska-ingrepp-och_sfs-2021-363" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Lag (2021:363) om estetiska kirurgiska ingrepp och estetiska injektionsbehandlingar</a></li>
                            <li>IVO:s nationella inspektionsrapport om estetiska behandlingar, november 2024</li>
                            <li><a href="https://www.socialstyrelsen.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Socialstyrelsen</a> — yrkeslegitimationer och kontroll</li>
                            <li><a href="https://www.lakemedelsverket.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Läkemedelsverket</a> — godkända HA-filler-produkter</li>
                            <li><a href="https://www.1177.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">1177 Vårdguiden</a> — patientinformation</li>
                            <li>Prisdata från 11 svenska kliniker, samlat maj 2026</li>
                        </ul>
                    </div>
                </article>
            </div>
        </main>
    );
}
