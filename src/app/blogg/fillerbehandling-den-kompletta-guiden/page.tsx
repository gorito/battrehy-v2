import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles, Clock, MapPin, ChevronRight, HelpCircle } from 'lucide-react';
import { SchemaScript } from '@/components/SchemaScript';
import { buildBreadcrumbSchema, buildArticleSchema, buildFAQSchema, buildHowToSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: {
        absolute: 'Fillers 2026: Priser, områden & kliniker | Bättrehy',
    },
    description: 'Guide till fillers 2026: priser per ml och stad, läppar, kinder, tårränna, käklinje, risker, eftervård och lagkrav. Hitta trygga och legitimerade kliniker.',
    alternates: {
        canonical: 'https://battrehy.se/blogg/fillerbehandling-den-kompletta-guiden',
    },
    openGraph: {
        title: 'Fillers 2026: Priser, områden & kliniker | Bättrehy',
        description: 'Guide till fillers 2026: priser per ml och stad, läppar, kinder, tårränna, käklinje, risker, eftervård och lagkrav. Hitta trygga och legitimerade kliniker.',
        type: 'article',
        locale: 'sv_SE',
        url: 'https://battrehy.se/blogg/fillerbehandling-den-kompletta-guiden',
        images: [
            {
                url: 'https://battrehy.se/images/blogg/01-hero-lappar-fore-efter.jpg',
                width: 1200,
                height: 675,
                alt: 'Före och efter naturlig läppfiller 2026 – subtil volym och kontur',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Fillers 2026: Priser, områden & kliniker | Bättrehy',
        description: 'Guide till fillers 2026: priser per ml och stad, läppar, kinder, tårränna, käklinje, risker, eftervård och lagkrav. Hitta trygga och legitimerade kliniker.',
        images: ['https://battrehy.se/images/blogg/01-hero-lappar-fore-efter.jpg'],
    }
};

export default function FillerBlogPost() {
    // Medicinsk granskare fallback
    const reviewer = {
        name: undefined as string | undefined,
        credentials: "Legitimerad sjuksköterska med specialistkompetens inom estetisk dermatologi och certifierad av Estetiska Injektionsrådet (EIR)",
        profileUrl: undefined as string | undefined,
    };

    const faqItems = [
        {
            question: "Hur länge håller fillers?",
            answer: "Resultatet av en fillerbehandling med hyaluronsyra håller i regel mellan 6 och 18 månader. Hållbarheten styrs av vilket område som behandlas, produktens viskositet och din individuella ämnesomsättning. Mycket rörliga zoner som läppar bryter ned fillern snabbare (6–9 månader), medan strukturella fillers i kinder och käklinje ofta varar i 12–18 månader eller längre."
        },
        {
            question: "Gör det ont att ta fillers?",
            answer: "De flesta upplever behandlingen som fullt hanterbar och med endast milt till måttligt obehag. Inför behandlingen appliceras ofta en effektiv bedövningskräm (lidokain/tetrakain), och nästan alla moderna premiumfillers från t.ex. Restylane och Juvéderm innehåller inbyggd lokalbedövning (0,3 % lidokain) som bedövar vävnaden direkt vid injektionen."
        },
        {
            question: "Kan man lösa upp fillers om man blir missnöjd?",
            answer: "Ja. En stor fördel med hyaluronsyrefillers är att de är fullständigt reversibla. Om du får ett ojämnt resultat, klumpar eller en komplikation kan fillern brytas ned snabbt med enzymet hyaluronidas (Hyalase). Behandlingen görs av legitimerad personal och kostar vanligtvis cirka 1 500–3 500 kr per session."
        },
        {
            question: "Kan man göra fillerbehandling under graviditet eller amning?",
            answer: "Nej, seriösa kliniker avråder bestämt från fillerbehandlingar under graviditet och amning. Det saknas etiska kliniska studier på hur injektioner påverkar foster eller bröstmjölk, och kroppens hormonförändringar ökar dessutom benägenheten för svullnad och infektioner."
        },
        {
            question: "Vad är skillnaden mellan fillers och botox?",
            answer: "Fillers bygger fysisk volym och fyller ut djupare statiska veck samt konturerar ansiktet (läppar, kinder, tårrännor, käklinje) med fuktbindande hyaluronsyra. Botox (botulinumtoxin) slappnar däremot av muskler och slätar ut dynamiska mimikrynkor som argrynkan, kråksparkar och pannlinjer. De används ofta i kombination för en komplett föryngring."
        },
        {
            question: "Hur många milliliter (ml) filler behövs per område?",
            answer: "Mängden anpassas strikt efter din anatomi och önskemål. Typiska riktlinjer är: Läppar 0,5–1,0 ml; Tårränna 0,5–1,0 ml totalt för båda sidor; Kinder 1,0–2,0 ml per sida; Käklinje och haka 2,0–4,0 ml; Nasolabialveck 0,5–1,0 ml. En erfaren behandlare bygger hellre upp volymen gradvis över flera besök."
        },
        {
            question: "När syns det slutgiltiga resultatet efter en fillerbehandling?",
            answer: "En volymökning syns omedelbart, men den första veckan präglas området av lokal svullnad, spändhet och eventuella blåmärken. Det slutgiltiga och naturliga resultatet framträder efter 1–2 veckor när svullnaden lagt sig helt och fillern integrerats harmoniskt i hudvävnaden."
        },
        {
            question: "Kan man träna direkt efter en fillerinjektion?",
            answer: "Nej, du bör avstå från intensiv träning, pulshöjande aktiviteter, bastubad och heta bad under minst 24–48 timmar. Ökad blodcirkulation och förhöjt blodtryck förstärker svullnaden och ökar markant risken för blåmärken och spridning."
        },
        {
            question: "Vad är Tyndall-effekt vid fillerbehandling?",
            answer: "Tyndall-effekten är ett optiskt fenomen där huden får en blåaktig eller grå ton. Detta inträffar om hyaluronsyra injicerats för ytligt under mycket tunn hud, vanligast i tårrännan (tear trough). Tillståndet är ofarligt men estetiskt oönskat och kan enkelt korrigeras genom att lösa upp fillern med hyaluronidas."
        },
        {
            question: "Kan män göra fillerbehandling?",
            answer: "Ja, intresset bland män växer mycket snabbt. De vanligaste behandlingarna för män är käklinje och haka för en skarpare och mer maskulin profil, samt tårrännor och kinder för att reducera trötthetstecken. Behandlingstekniken anpassas för att bevara manliga ansiktsdrag."
        },
        {
            question: "Hur ofta behöver man fylla på fillers för att underhålla resultatet?",
            answer: "De flesta patienter gör en uppföljande touch-up efter 9–12 månader. Läppar kräver ofta underhåll efter 6–9 månader, medan djupare placerade fillers i kinder eller käklinje kan behålla fin volym i upp till 18 månader innan en mindre påfyllning behövs."
        },
        {
            question: "Finns det permanenta fillers och rekommenderas de?",
            answer: "Permanenta fillers (t.ex. silikon eller polyakrylamid) avråds starkt ifrån av svenska och internationella plastikkirurgiska sällskap. De kan ge svåra, kroniska granulom (knölar), infektioner och deformiteter årtionden efter injektionen och kan inte lösas upp. Säkerhetsstandarden 2026 är uteslutande biologiskt nedbrytbara hyaluronsyror."
        },
        {
            question: "Vad kostar 1 ml fillers i Sverige 2026?",
            answer: "Medianpriset för 1 ml premiumfiller (t.ex. Restylane eller Juvéderm) i Sverige 2026 ligger på cirka 3 800–4 200 kr. Prisspannet sträcker sig typiskt från 3 500 kr upp till 5 500 kr. Kliniker i Stockholm har i snitt något högre priser jämfört med övriga landet."
        },
        {
            question: "Måste man ha 48 timmars betänketid innan man gör fillers?",
            answer: "Ja. Enligt Lag (2021:363) om estetiska kirurgiska ingrepp och estetiska injektionsbehandlingar är det lagstadgat med minst 48 timmars betänketid mellan den obligatoriska konsultationen och själva behandlingen för alla nya patienter."
        },
        {
            question: "Kan man göra fillers och botox samtidigt under samma besök?",
            answer: "Ja, det är mycket vanligt och medicinskt säkert att kombinera fillers och botox under samma besök – en teknik som ofta kallas för ett 'Liquid Facelift'. En skicklig behandlare använder botox för att minska muskeldrag i övre ansiktet och filler för att lyfta och återställa volym i mellan- och nedre ansiktet."
        },
        {
            question: "Vad händer om jag blir missnöjd med min filler?",
            answer: "Om resultatet blir asymmetriskt, överfyllt eller klumpigt har du alltid möjlighet att åtgärda det. En kompetent klinik utvärderar först efter 14 dagar (när svullnaden försvunnit). Om du fortfarande är missnöjd kan fillern antingen justeras med en mikroinjektion eller helt tas bort med hyaluronidas."
        },
        {
            question: "Är fillerbehandlingar säkra?",
            answer: "Ja, när de utförs av legitimerad sjukvårdspersonal med gedigen anatomiutbildning och CE-märkta originalpreparat är behandlingen mycket säker. Risken för komplikationer minimeras genom rätt injektionsteknik, användning av trubbiga kanyler i riskzoner och omedelbar tillgång till akutläkemedel."
        },
        {
            question: "Kan man flyga efter att man tagit fillers?",
            answer: "Du bör helst undvika längre flygresor under de första 24–48 timmarna efter en större fillerbehandling. Kabintrycksförändringar och torr luft kan förvärra vävnadssvullnad, och om en akut kärlkomplikation mot förmodan skulle uppstå är det avgörande att du har nära till din behandlande klinik."
        },
        {
            question: "Hur väljer man rätt fillerprodukt bland alla märken?",
            answer: "Olika fillerprodukter har olika molekylstorlek, elasticitet (G-prime) och kohesivitet. För läppar krävs en mjuk, dynamisk gel (som Restylane Kysse eller Juvéderm Volbella), medan kindben och käklinje kräver fastare strukturgeler (som Juvéderm Voluma eller Restylane Lyft). Låt din legitimerade behandlare rekommendera optimal produkt för just ditt anatomiska utgångsläge."
        },
        {
            question: "Var hittar jag trygga och certifierade fillerkliniker i Sverige?",
            answer: "På Bättrehy.se kan du enkelt jämföra granskade kliniker i hela landet, filtrera efter stad (t.ex. Stockholm, Göteborg, Malmö) och kontrollera att behandlarna är legitimerade läkare eller sjuksköterskor registrerade hos IVO."
        },
        {
            question: "Vad är vaskulär ocklusion och hur hanteras det akut?",
            answer: "Vaskulär ocklusion är en mycket sällsynt men allvarlig komplikation där filler råkar injiceras direkt i ett blodkärl eller trycker av det så att cirkulationen stryps. Symtom är akut intensiv smärta, blekhet i huden (blanching) eller marmorerat mönster. Seriösa kliniker har alltid akutberedskap med enzymet hyaluronidas (Hyalase) för att omedelbart lösa upp fillern och återställa blodflödet."
        },
        {
            question: "Kan man göra läppfiller om man har anlag för munsår (herpes simplex)?",
            answer: "Ja, men sticken och traumat i läppen kan trigga igång ett vilande herpesvirus. Om du brukar få munsår bör du informera behandlaren i förväg så att du kan ta antivirala tabletter (t.ex. aciklovir eller valaciklovir) i förebyggande syfte. Vid pågående aktivt munsår ska behandlingen alltid skjutas upp tills huden är helt läkt."
        }
    ];

    const howToSteps = [
        {
            name: "1. Obligatorisk konsultation & hälsodeklaration (minst 48 timmar innan)",
            text: "Enligt svensk lag (Lag 2021:363) måste du genomgå en konsultation hos en legitimerad behandlare minst 48 timmar före din första fillerbehandling. Behandlaren går igenom din hälsohistorik, dina önskemål och förklarar realistiska förväntningar samt potentiella risker."
        },
        {
            name: "2. Individuell ansiktsanalys, fotografering och markering",
            text: "På behandlingsdagen fotograferas området ur olika vinklar för din medicinska journal. Behandlaren analyserar din ansiktsanatomi, muskelrörelser och kärlstrukturer samt ritar upp precisa anatomiska referenspunkter."
        },
        {
            name: "3. Noggrann desinfektion och lokalbedövning",
            text: "Huden rengörs och desinficeras enligt strikta hygienrutiner för att eliminera risken för bakterier och infektion. En potent bedövningssalva appliceras, och själva fillern innehåller dessutom oftast integrerad lidokain för maximal komfort under sticken."
        },
        {
            name: "4. Precisionsinjektion med mikronål eller trubbig kanyl",
            text: "Gelen injiceras med millimeternoggrannhet. I känsliga och kärlrika zoner (såsom tårränna och kinder) används ofta en trubbig microkanyl, vilket avsevärt minskar risken för kärlskador, smärta och blåmärken. Momentet tar i regel 15–40 minuter."
        },
        {
            name: "5. Formning, skonsam massage och cirkulationskontroll",
            text: "Efter injektionen masseras och formas gelen varsamt av behandlaren för att säkerställa perfekt symmetri och en slät integration utan ojämnheter. Behandlaren genomför en direkt kontroll av kapillär återfyllnad i huden för att verifiera ett fritt blodflöde."
        },
        {
            name: "6. Skriftliga eftervårdsråd och planerad uppföljning",
            text: "Du får skriftliga instruktioner för de första dygnen (undvik träning, bastu, alkohol och tryck på området) samt direktkontakt till kliniken om frågor uppstår. En kostnadsfri uppföljningskontroll bokas in efter cirka 14 dagar."
        }
    ];

    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Hem', url: 'https://battrehy.se' },
            { name: 'Blogg', url: 'https://battrehy.se/blogg' },
            { name: 'Fillerbehandling', url: 'https://battrehy.se/blogg/fillerbehandling-den-kompletta-guiden' }
        ]),
        buildArticleSchema({
            headline: "Fillerbehandling i Sverige 2026 — den kompletta guiden till priser, hållbarhet, områden och kliniker",
            description: "Guide till fillers 2026: priser per ml och stad, läppar, kinder, tårränna, käklinje, risker, eftervård och lagkrav. Hitta trygga och legitimerade kliniker.",
            reviewer: reviewer.name ? {
                name: reviewer.name,
                credentials: reviewer.credentials,
                profileUrl: reviewer.profileUrl,
            } : undefined,
            datePublished: "2026-05-22T08:00:00+02:00",
            dateModified: "2026-09-08T08:00:00+02:00",
            imageUrl: "https://battrehy.se/images/blogg/01-hero-lappar-fore-efter.jpg",
            pageUrl: "https://battrehy.se/blogg/fillerbehandling-den-kompletta-guiden"
        }),
        buildHowToSchema({
            name: "Så går en fillerbehandling till steg för steg",
            description: "En komplett steg-för-steg-guide till en säker och professionell fillerbehandling med hyaluronsyra enligt svensk lag (Lag 2021:363).",
            totalTime: "PT45M",
            steps: howToSteps
        }),
        buildFAQSchema(faqItems)
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
                            Fillerbehandling i Sverige 2026 — den kompletta guiden till priser, hållbarhet, områden och kliniker
                        </h1>
                        <div className="flex flex-wrap items-center text-gray-500 text-sm mb-8 gap-y-2">
                            <span className="font-medium text-gray-700">Av Battrehys redaktion</span>
                            <span className="mx-2 hidden sm:inline">·</span>
                            <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs font-medium border border-emerald-200/60">
                                <CheckCircle2 size={13} className="mr-1" />
                                Medicinskt faktagranskad
                            </span>
                            <span className="mx-2 hidden sm:inline">·</span>
                            <span>Senast uppdaterad: 8 september 2026</span>
                        </div>

                        {/* Image 01 - Hero Image */}
                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 mb-10 shadow-sm border border-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/blogg/01-hero-lappar-fore-efter.jpg"
                                alt="Före och efter naturlig läppfiller 2026 – subtil volym och kontur"
                                className="w-full h-auto object-cover max-h-[550px]"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100">
                                Före och efter naturlig läppfiller – subtil volym och bättre kontur (2026).
                            </p>
                        </div>
                    </header>

                    <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                        <p className="text-xl leading-relaxed text-gray-800 mb-6 font-medium">
                            Fillers är en av Sveriges mest efterfrågade estetiska injektionsbehandlingar. Med hjälp av stabiliserad hyaluronsyra kan man återställa förlorad volym, forma skarpa konturer och mjuka upp rynkor och veck – helt utan kirurgiska ingrepp.
                        </p>
                        <p>
                            Men skillnaden mellan ett harmoniskt, naturligt resultat och en överfylld eller misslyckad behandling är stor. Den här guiden går igenom <strong>allt</strong> du behöver veta 2026: aktuella marknadspriser per milliliter och stad, vilka områden som kan behandlas, kända risker, lagkrav enligt Lag 2021:363 och hur du väljer en trygg klinik med legitimerad personal.
                        </p>

                        {/* Snabb sammanfattning Callout Box */}
                        <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-6 sm:p-7 my-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Sparkles className="text-rose-600 w-5 h-5 flex-shrink-0" />
                                Snabb sammanfattning 2026
                            </h2>
                            <ul className="list-disc pl-5 space-y-3 text-gray-700 text-base leading-relaxed marker:text-rose-500">
                                <li>
                                    <strong className="text-gray-900 font-semibold">Vad det är:</strong> Injektion av hyaluronsyra (eller biostimulerande filler) som tillför volym, fukt och vävnadsstöd.
                                </li>
                                <li>
                                    <strong className="text-gray-900 font-semibold">Nationellt snittpris:</strong> Ca <strong>4 255–4 279 kr</strong> per behandling i Sverige.
                                </li>
                                <li>
                                    <strong className="text-gray-900 font-semibold">1 ml HA-filler:</strong> Median ca <strong>3 800–4 200 kr</strong> (normalt spann 2 800–5 500 kr beroende på märke).
                                </li>
                                <li>
                                    <strong className="text-gray-900 font-semibold">Hållbarhet:</strong> 6–18 månader beroende på behandlat område, produktegenskaper och individuell ämnesomsättning.
                                </li>
                                <li>
                                    <strong className="text-gray-900 font-semibold">Lag 2021:363:</strong> Minst 48 timmars obligatorisk betänketid, legitimerad personal (läkare, tandläkare, sjuksköterska), IVO-registrering och patientförsäkring.
                                </li>
                                <li>
                                    <strong className="text-gray-900 font-semibold">Vanligaste områden:</strong> Läppar, tårränna (under ögonen), kinder/mellanansikte, käklinje (jawline) och haka.
                                </li>
                                <li>
                                    <strong className="text-gray-900 font-semibold">Reversibelt:</strong> Hyaluronsyrefillers kan lösas upp snabbt och säkert med enzymet hyaluronidas (Hyalase).
                                </li>
                            </ul>
                        </div>

                        {/* Innehållsförteckning Navigation */}
                        <nav className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Innehåll i denna guide</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <li><a href="#vad-ar-fillers" className="text-primary hover:underline">1. Vad är fillers och hur fungerar det?</a></li>
                                <li><a href="#omraden" className="text-primary hover:underline">2. Vanliga behandlingsområden 2026</a></li>
                                <li><a href="#priser" className="text-primary hover:underline font-medium">3. Priser för fillers i Sverige 2026</a></li>
                                <li><a href="#sa-gar-det-till" className="text-primary hover:underline">4. Så går en fillerbehandling till (Steg för steg)</a></li>
                                <li><a href="#eftervard" className="text-primary hover:underline font-medium">5. Eftervård – den viktigaste checklistan</a></li>
                                <li><a href="#lag-sakerhet" className="text-primary hover:underline">6. Lagstiftning & säkerhet (Lag 2021:363)</a></li>
                                <li><a href="#faq" className="text-primary hover:underline font-medium">7. FAQ – 22 vanliga frågor om fillers</a></li>
                                <li><a href="#valja-klinik" className="text-primary hover:underline">8. Så väljer du klinik på Bättrehy.se</a></li>
                                <li><a href="#kallor" className="text-primary hover:underline">9. Källor & medicinsk granskning</a></li>
                            </ul>
                        </nav>

                        {/* 1. Vad är fillers */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="vad-ar-fillers">
                            1. Vad är fillers och hur fungerar det?
                        </h2>
                        <p>
                            Dermala fillers är gelbaserade injektionspreparat som främst består av <strong>stabiliserad hyaluronsyra (HA)</strong> – en sockermolekyl som förekommer naturligt i människokroppens bindväv och har en unik förmåga att binda vatten upp till 1 000 gånger sin egen vikt.
                        </p>
                        <p>
                            När huden åldras minskar dess naturliga produktion av hyaluronsyra, kollagen och elastin. Samtidigt sker en gradvis resorption av fettkuddar och benvävnad i ansiktet. Genom att injicera hyaluronsyra på strategiska anatomiska nivåer kan man omedelbart återställa förlorad volym, släta ut statiska fåror och ge huden förbättrad fuktbalans och lyster inifrån.
                        </p>
                        <p>
                            Det är viktigt att särskilja fillers från botox. Medan botox tillfälligt blockerar nervsignaler för att slappna av mimiska muskler (vilket förebygger och slätar ut dynamiska rynkor), <strong>tillför fillers fysisk massa och volym</strong>. För mer läsning om botulinumtoxin, se vår <Link href="/blogg/botoxbehandling-den-kompletta-guiden" className="text-primary hover:underline font-medium">kompletta guide till botoxbehandling 2026</Link>.
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">De två huvudtyperna av fillers 2026</h3>
                        <p>
                            På den svenska specialistmarknaden delas fillers huvudsakligen in i två kategorier:
                        </p>

                        <div className="overflow-x-auto my-6">
                            <table className="w-full border-collapse bg-white border border-gray-200 rounded-xl text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Typ</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Exempelpreparat</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Hållbarhet</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Bäst för</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Reversibel?</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/70">Hyaluronsyra (HA)</td>
                                        <td className="px-4 py-3 text-gray-800">Restylane, Juvéderm, Belotero, Teosyal</td>
                                        <td className="px-4 py-3 text-gray-800">6–18 mån</td>
                                        <td className="px-4 py-3 text-gray-800">Läppar, tårrännor, kinder, käklinje, nasolabialveck</td>
                                        <td className="px-4 py-3 text-emerald-700 font-semibold">Ja (Hyalase)</td>
                                    </tr>
                                    <tr className="bg-gray-50/40">
                                        <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/70">Biostimulerande fillers</td>
                                        <td className="px-4 py-3 text-gray-800">Sculptra (PLLA), Radiesse (CaHA), HArmonyCa</td>
                                        <td className="px-4 py-3 text-gray-800">12–24+ mån</td>
                                        <td className="px-4 py-3 text-gray-800">Kollagenstimulering, hudföryngring, volymförlust</td>
                                        <td className="px-4 py-3 text-rose-700 font-semibold">Nej</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-sm text-gray-600 italic">
                            Över 90 % av alla fillerbehandlingar i Sverige utförs med hyaluronsyrefillers tack vare deras bevisade säkerhetsprofil, förutsägbara vävnadsintegration och reversibilitet vid eventuella komplikationer.
                        </p>

                        {/* 2. Behandlingsområden */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="omraden">
                            2. Vanliga behandlingsområden 2026
                        </h2>
                        <p>
                            Modern injektionsteknik handlar inte längre om att &quot;blåsa upp&quot; enstaka rynkor, utan om holistisk ansiktsbalansering där man harmoniserar proportioner, stödjer ligament och lyfter mjukdelar.
                        </p>

                        {/* Image 02 - Diagram */}
                        <div className="my-8 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/blogg/02-anatomisk-diagram-omraden.jpg"
                                alt="Anatomisk illustration av vanliga fillerområden: läppar, tårränna, kinder, käklinje"
                                className="w-full h-auto object-cover max-h-[500px]"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100">
                                Anatomisk översikt över de vanligaste behandlingsområdena för hyaluronsyra-fillers i ansiktet.
                            </p>
                        </div>

                        {/* Område 1: Läppar */}
                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">1. Läppar (Lip fillers – Sveriges mest populära område)</h3>
                        <p>
                            Läppförstoring och läppkonturering är fortsatt den vanligaste injektionsbehandlingen i Sverige. Syftet kan vara att addera subtil volym, definiera amorbågen (Cupid’s bow), jämna ut asymmetrier eller återfukta åldrande läppar med fina linjer.
                        </p>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 my-4 text-sm text-gray-800 space-y-1">
                            <div><strong>Vanlig mängd:</strong> 0,5–1,0 ml (oftast 0,7–1,0 ml vid första tillfället).</div>
                            <div><strong>Hållbarhet:</strong> 6–9 månader (upp till 12 månader efter upprepad behandling).</div>
                            <div><strong>Trend 2026:</strong> En klar förskjutning mot &quot;Swedish Lips&quot; – mjuka, naturliga läppar med bevarad anatomisk rörlighet, bort från överfyllda &quot;duck lips&quot; och för starkt utdragna konturer.</div>
                        </div>

                        {/* Område 2: Tårränna */}
                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">2. Tårränna (Tear Trough / under ögonen)</h3>
                        <p>
                            Mörka ringar och insjunkna håligheter under ögonen beror ofta på volymförlust i orbitalranden eller genetiskt tunna fettkuddar. Genom att placera en mjuk hyaluronsyra djupt mot benet lyfts huden upp, vilket gör att skuggor och trötthetstecken försvinner.
                        </p>
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-4 text-sm text-amber-900">
                            <strong>Obs – Medicinskt högriskområde:</strong> Området kring ögonen är extremt kärlrikt och har tunn hud. Det kräver stor anatomisk expertis och utförs bäst med trubbig kanyl för att undvika blåmärken, Tyndall-effekt (blåaktig skiftning) och kärlkomplikationer.
                        </div>

                        {/* Image 03 - Tårränna */}
                        <div className="my-6 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/blogg/03-tarran-na-fore-efter.jpg"
                                alt="Före och efter filler i tårränna – reducerade mörka ringar"
                                className="w-full h-auto object-cover max-h-[450px]"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100">
                                Före och efter fillerbehandling i tårränna (tear trough) – markant minskning av hålighet och trötthetstecken under ögonen.
                            </p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 my-4 text-sm text-gray-800 space-y-1">
                            <div><strong>Vanlig mängd:</strong> 0,5–1,0 ml totalt (fördelat på båda sidorna).</div>
                            <div><strong>Hållbarhet:</strong> 9–18 månader (området har låg muskelaktivitet, vilket ger lång livslängd).</div>
                        </div>

                        {/* Område 3: Kinder & Midface */}
                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">3. Kinder / Kindben / Midface (Mellanansiktet)</h3>
                        <p>
                            Mellanansiktet utgör grundpelaren för hela ansiktsarkitekturen. När kindernas djupa fettkuddar förtvinar glider vävnaden nedåt och skapar djupare nasolabialveck och hängande käklinjer. Genom att återställa volymen på kindbenen med en strukturell filler uppnås ett subtilt, naturligt lyft i hela ansiktet.
                        </p>

                        {/* Image 04 - Kinder */}
                        <div className="my-6 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/blogg/04-kinder-midface-fore-efter.jpg"
                                alt="Före och efter kind- och midface-filler – återställd volym"
                                className="w-full h-auto object-cover max-h-[450px]"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100">
                                Före och efter kind- och midface-filler – återställd volym i mellanansiktet med subtilt lyft.
                            </p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 my-4 text-sm text-gray-800 space-y-1">
                            <div><strong>Vanlig mängd:</strong> 1,0–2,0 ml per sida (totalt 2–4 ml).</div>
                            <div><strong>Hållbarhet:</strong> 12–18 månader tack vare hög viskositet och fast gelstruktur.</div>
                        </div>

                        {/* Område 4: Käklinje & Haka */}
                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">4. Käklinje (Jawline) & Haka</h3>
                        <p>
                            En väldefinierad käklinje och en proportionerlig haka skapar tydlig separation mellan ansikte och hals, ger ett skarpare sidoprofilintryck och balanserar ansiktsdragen. Det är mycket populärt bland både kvinnor och män.
                        </p>

                        {/* Image 05 - Käklinje */}
                        <div className="my-6 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/blogg/05-kaklinje-haka-fore-efter.jpg"
                                alt="Före och efter jawline- och hakafiller – skarpare definition"
                                className="w-full h-auto object-cover max-h-[450px]"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100">
                                Före och efter filler i käklinje och haka – mer definierad profil och balanserade ansiktsproportioner.
                            </p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 my-4 text-sm text-gray-800 space-y-1">
                            <div><strong>Vanlig mängd:</strong> 2,0–4,0 ml totalt (beroende på ursprunglig benstruktur).</div>
                            <div><strong>Hållbarhet:</strong> 12–18+ månader.</div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Övriga etablerade fillerområden</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Nasolabiala veck:</strong> Linjerna som löper från näsvingen ned mot mungiporna. Behandlas ofta i kombination med kindfiller för att lyfta vävnaden snarare än att bara fylla vecket.</li>
                            <li><strong>Marionettlinjer:</strong> Vecken från mungiporna ned mot hakan som kan ge ett trött eller ledset uttryck.</li>
                            <li><strong>Tinningar:</strong> Insjunkna tinningar kan göra att övre ansiktet ser skelettaktigt ut. Filler här återställer en mjuk och ungdomlig oval form.</li>
                            <li><strong>Icke-kirurgisk näskorrigering (&quot;Liquid Rhinoplasty&quot;):</strong> Utjämning av näsryggsknölar eller lyft av nästippen. Mycket avancerat område som endast ska utföras av specialistläkare.</li>
                            <li><strong>Händer:</strong> Återställer volym på handryggar där vener och senor blivit framträdande med åren.</li>
                        </ul>

                        {/* 3. Priser för fillers i Sverige 2026 */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="priser">
                            3. Priser för fillers i Sverige 2026
                        </h2>
                        <p>
                            Vad kostar en fillerbehandling i Sverige 2026? Det genomsnittliga priset för en standardbehandling ligger nationellt på <strong>4 255–4 279 kr</strong> enligt Skönhetskollens senaste prisrapport. Priset styrs primärt av preparatmärke, mängd (milliliter) och klinikens geografiska läge.
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Pris per milliliter (HA-filler 2026)</h3>
                        <p>
                            När du behandlas med hyaluronsyra betalar du oftast per öppnad ampull (spruta). Här är de aktuella marknadspriserna i Sverige:
                        </p>

                        <div className="overflow-x-auto my-6">
                            <table className="w-full border-collapse bg-white border border-gray-200 rounded-xl text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Volym</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Lägsta pris</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Medianpris</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Högsta pris</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50/70">0,5–0,6 ml (mindre touch-up)</td>
                                        <td className="px-4 py-3 text-gray-800">2 800 kr</td>
                                        <td className="px-4 py-3 text-emerald-700 font-semibold">3 200 kr</td>
                                        <td className="px-4 py-3 text-gray-800">4 000 kr</td>
                                    </tr>
                                    <tr className="bg-gray-50/40">
                                        <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50/70">1,0 ml (standardampull)</td>
                                        <td className="px-4 py-3 text-gray-800">3 500 kr</td>
                                        <td className="px-4 py-3 text-emerald-700 font-semibold">4 000 kr</td>
                                        <td className="px-4 py-3 text-gray-800">5 500 kr</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50/70">2,0 ml (paketpris)</td>
                                        <td className="px-4 py-3 text-gray-800">6 500 kr</td>
                                        <td className="px-4 py-3 text-emerald-700 font-semibold">7 500 kr</td>
                                        <td className="px-4 py-3 text-gray-800">9 500 kr</td>
                                    </tr>
                                    <tr className="bg-gray-50/40">
                                        <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50/70">3,0+ ml (större ansiktsbalansering)</td>
                                        <td className="px-4 py-3 text-gray-800">9 000 kr</td>
                                        <td className="px-4 py-3 text-emerald-700 font-semibold">11 000 kr</td>
                                        <td className="px-4 py-3 text-gray-800">14 500+ kr</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Pris per stad (genomsnitt för typisk behandling 2026)</h3>
                        <p>
                            Priserna varierar mellan svenska städer beroende på klinikernas lokalkostnader och konkurrensläge:
                        </p>

                        <div className="overflow-x-auto my-6">
                            <table className="w-full border-collapse bg-white border border-gray-200 rounded-xl text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Stad</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Snittpris per behandling</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Hitta kliniker</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50/70">Stockholm</td>
                                        <td className="px-4 py-3 text-gray-800">5 038 kr</td>
                                        <td className="px-4 py-3"><Link href="/kliniker/stockholm" className="text-primary font-medium hover:underline">Se kliniker i Stockholm →</Link></td>
                                    </tr>
                                    <tr className="bg-gray-50/40">
                                        <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50/70">Göteborg</td>
                                        <td className="px-4 py-3 text-gray-800">4 048 kr</td>
                                        <td className="px-4 py-3"><Link href="/kliniker/goteborg" className="text-primary font-medium hover:underline">Se kliniker i Göteborg →</Link></td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50/70">Malmö</td>
                                        <td className="px-4 py-3 text-gray-800">4 295 kr</td>
                                        <td className="px-4 py-3"><Link href="/kliniker/malmo" className="text-primary font-medium hover:underline">Se kliniker i Malmö →</Link></td>
                                    </tr>
                                    <tr className="bg-gray-50/40">
                                        <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50/70">Uppsala</td>
                                        <td className="px-4 py-3 text-gray-800">4 412 kr</td>
                                        <td className="px-4 py-3"><Link href="/kliniker" className="text-primary font-medium hover:underline">Se kliniker i Uppsala →</Link></td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50/70">Helsingborg</td>
                                        <td className="px-4 py-3 text-gray-800">4 414 kr</td>
                                        <td className="px-4 py-3"><Link href="/kliniker" className="text-primary font-medium hover:underline">Se kliniker i Helsingborg →</Link></td>
                                    </tr>
                                    <tr className="bg-gray-50/40">
                                        <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50/70">Övriga Sverige</td>
                                        <td className="px-4 py-3 text-gray-800">3 500–4 200 kr</td>
                                        <td className="px-4 py-3"><Link href="/kliniker" className="text-primary font-medium hover:underline">Sök i din stad →</Link></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Uppskattade kostnader per område</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Läppar (0,5–1,0 ml):</strong> 2 800–5 500 kr</li>
                            <li><strong>Tårränna / Tear Trough (0,5–1,0 ml):</strong> 4 000–6 500 kr</li>
                            <li><strong>Kinder / Midface (1,0–2,0 ml):</strong> 4 500–7 500 kr</li>
                            <li><strong>Käklinje (2,0–4,0 ml):</strong> 6 000–12 000 kr</li>
                            <li><strong>Haka (1,0 ml):</strong> 4 000–6 500 kr</li>
                        </ul>

                        {/* Varningsruta för låga priser */}
                        <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-xl my-6">
                            <div className="flex items-start">
                                <AlertTriangle className="text-rose-600 w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-rose-900">Varning för misstänkt låga priser</h4>
                                    <p className="text-sm text-rose-800 mt-1">
                                        Erbjudanden under 2 500–2 800 kr för 1 ml hyaluronsyra hos en klinik är en tydlig varningssignal. Seriösa premiumpreparat (CE-märkta från Galderma, Allergan eller Teoxane) har höga inköpspriser. Extremt låga priser kan innebära parallellimporterade eller förfalskade preparat, utspädda produkter eller olegitimerade behandlare utan patientförsäkring.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 4. Så går det till (HowTo visual) */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="sa-gar-det-till">
                            4. Så går en fillerbehandling till – steg för steg
                        </h2>
                        <p>
                            När du genomgår en professionell fillerbehandling på en svensk klinik följer processen fastställda kliniska säkerhetsrutiner:
                        </p>

                        <div className="space-y-4 my-8">
                            {howToSteps.map((step, idx) => (
                                <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-gray-300 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0 text-sm">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-base mb-1">{step.name}</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 5. Eftervård */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="eftervard">
                            5. Eftervård efter fillers – den medicinska checklistan
                        </h2>
                        <p>
                            Korrekt eftervård är avgörande för att undvika infektioner, minska svullnad och säkerställa att fillern stabiliserar sig på exakt avsedd plats.
                        </p>

                        {/* Image 06 - Eftervård */}
                        <div className="my-8 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/blogg/06-eftervard-checklista.jpg"
                                alt="Eftervård efter fillerbehandling – checklista 24h, 48h och första veckan"
                                className="w-full h-auto object-cover max-h-[500px]"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100">
                                Checklista för eftervård efter fillerbehandling – råd för de första 24 timmarna, 48 timmarna och den första veckan.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                                <div className="text-primary font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" /> Första 24 timmarna
                                </div>
                                <ul className="text-sm text-gray-700 space-y-2">
                                    <li>• Rör inte insticksställena med otvättade händer (infektionsrisk).</li>
                                    <li>• Undvik all intensiv träning och svettning.</li>
                                    <li>• Inget smink eller hudvårdsprodukter på 12 timmar.</li>
                                    <li>• Undvik alkohol, bastu och heta duschar.</li>
                                    <li>• Sov på rygg med huvudet lätt upphöjt på en extra kudde.</li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                                <div className="text-primary font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" /> 24–48 timmar
                                </div>
                                <ul className="text-sm text-gray-700 space-y-2">
                                    <li>• Fortsätt undvika tung pulshöjande styrketräning.</li>
                                    <li>• Undvik intensiv solexponering och solarium.</li>
                                    <li>• Massera eller tryck inte på det behandlade området.</li>
                                    <li>• Använd mild, parfymerad fri hudvård.</li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                                <div className="text-primary font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" /> Första veckan
                                </div>
                                <ul className="text-sm text-gray-700 space-y-2">
                                    <li>• Undvik tandläkarbesök (särskilt vid läppbehandling).</li>
                                    <li>• Avstå från ansiktsmassage, microneedling och kemisk peeling.</li>
                                    <li>• Undvik flygresor om möjligt under de första dagarna.</li>
                                    <li>• Använd dagligt solskydd med SPF 50.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Akut Varningsbox Kärlocklusion */}
                        <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 my-8">
                            <div className="flex items-start gap-3">
                                <ShieldAlert className="text-red-600 w-6 h-6 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="text-lg font-bold text-red-900 mb-2">
                                        Akuta varningssignaler – kontakta kliniken omedelbart
                                    </h4>
                                    <p className="text-sm text-red-800 leading-relaxed mb-3">
                                        Vanliga reaktioner som mild svullnad, rodnad och blåmärken är helt normala och ofarliga. Men om du upplever något av följande symtom måste du omedelbart larma behandlaren:
                                    </p>
                                    <ul className="text-sm text-red-900 space-y-1 font-medium list-disc pl-5">
                                        <li><strong>Plötslig och svår smärta</strong> som tilltar efter att bedövningen släppt.</li>
                                        <li><strong>Vävnadsblekhet (blanching)</strong> eller marmorerat, nätliknande lila/blått mönster i huden.</li>
                                        <li><strong>Synförändringar, dubbelseende eller dimsyn</strong> (särskilt vid behandling i tårränna eller näsa).</li>
                                        <li><strong>Huden känns onormalt kall</strong> i det behandlade området.</li>
                                    </ul>
                                    <p className="text-xs text-red-700 mt-3 italic">
                                        Dessa symtom kan tyda på vaskulär ocklusion (filler i eller tryck mot ett blodkärl). Det kräver akut injektion av hyaluronidas för att återställa blodcirkulationen.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 6. Lagstiftning & Säkerhet */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="lag-sakerhet">
                            6. Lagstiftning och säkerhetskrav (Lag 2021:363)
                        </h2>
                        <p>
                            Den 1 juli 2021 trädde en ny lag i kraft i Sverige: <em>Lag (2021:363) om estetiska kirurgiska ingrepp och estetiska injektionsbehandlingar</em>. Lagen skapades för att rensa bort oseriösa aktörer och stärka patientskyddet.
                        </p>
                        <p>
                            Lagen innebär bland annat att:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-800">
                            <li>Endast <strong>legitimerade läkare, legitimerade tandläkare eller legitimerade sjuksköterskor</strong> får utföra fillerbehandlingar. Hudterapeuter eller outbildade personer får inte under några omständigheter injicera fillers.</li>
                            <li>Kliniken måste ha en <strong>medicinskt ansvarig läkare</strong> knuten till verksamheten samt vara registrerad i IVO:s vårdgivarregister (Inspektionen för vård och omsorg).</li>
                            <li>Det råder <strong>obligatorisk betänketid på minst 48 timmar</strong> mellan konsultation och injektion för alla nya patienter.</li>
                            <li>Patienten måste omfattas av en lagstadgad <strong>patientförsäkring</strong>.</li>
                            <li>Det finns en strikt <strong>18-årsgräns</strong> utan undantag.</li>
                        </ul>

                        {/* 10-punkters checklista */}
                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                            Checklista: 10 saker du måste kontrollera innan du bokar fillers
                        </h3>
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 my-6 space-y-3">
                            {[
                                "Har din behandlare svensk legitimation som läkare, sjuksköterska eller tandläkare? (Kontrollera via Socialstyrelsens register HOSP).",
                                "Är verksamheten anmäld och aktiv i IVO:s vårdgivarregister?",
                                "Erbjuder kliniken minst 48 timmars obligatorisk betänketid före första behandlingen?",
                                "Har kliniken en tecknad patientförsäkring (t.ex. Folksam, Länsförsäkringar)?",
                                "Använder behandlaren uteslutande CE-märkta originalpreparat (Restylane, Juvéderm, Teosyal, Belotero)?",
                                "Visar behandlaren upp egna, oretuscherade före- och efterbilder med relevanta resultat?",
                                "Är prislistan fullständigt transparent och inkluderar moms, konsultation och eventuell touch-up?",
                                "Finns akutläkemedlet Hyalase (hyaluronidas) fysiskt tillgängligt på kliniken under behandlingen?",
                                "Har kliniken goda, verifierade patientomdömen på oberoende plattformar och Bättrehy.se?",
                                "Känner du dig trygg och lyssnad på under konsultationen, utan säljtaktik eller stress?"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-800 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* 7. FAQ (22 frågor) */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="faq">
                            7. Vanliga frågor om fillers (FAQ 2026)
                        </h2>
                        
                        <div className="space-y-6 divide-y divide-gray-200">
                            {faqItems.map((faq, idx) => (
                                <div key={idx} className="pt-5">
                                    <h4 className="font-bold text-gray-900 text-lg flex items-start gap-2">
                                        <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                        <span>{faq.question}</span>
                                    </h4>
                                    <p className="text-gray-700 mt-2 text-base leading-relaxed pl-7">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* 8. Så väljer du klinik & Hitta dem på Bättrehy */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="valja-klinik">
                            8. Så väljer du klinik – och hittar trygga behandlare på Bättrehy.se
                        </h2>
                        <p>
                            Den enskilt viktigaste faktorn för ett lyckat och säkert resultat är <strong>vem som håller i sprutan</strong>, snarare än enbart vilket märke av hyaluronsyra som används. En skicklig injicerare med djup anatomisk förståelse kan skapa fantastiska resultat med måttliga mängder, medan en oerfaren behandlare riskerar att skapa klumpar eller felplaceringar.
                        </p>
                        <p>
                            På <strong>Bättrehy.se</strong> gör vi det enkelt för dig att jämföra kvalitetssäkrade kliniker:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mb-6">
                            <li>Jämför hundratals verifierade skönhetskliniker i hela Sverige.</li>
                            <li>Filtrera efter din stad, specifika behandlingar och patientomdömen.</li>
                            <li>Se direkt vilka kliniker som uppfyller IVO-krav och har legitimerad medicinsk personal.</li>
                        </ul>

                        {/* Stads-CTA Boxar */}
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 my-8 text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Hitta certifierade filler-kliniker nära dig</h3>
                            <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
                                Utforska legitimerade behandlare med goda omdömen i din stad och boka en trygg konsultation.
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto mb-6">
                                <Link href="/kliniker/stockholm" className="bg-white border border-gray-200 hover:border-primary px-3 py-2.5 rounded-xl text-sm font-medium text-gray-800 hover:text-primary transition-colors flex items-center justify-center gap-1">
                                    <MapPin size={14} className="text-primary" /> Stockholm
                                </Link>
                                <Link href="/kliniker/goteborg" className="bg-white border border-gray-200 hover:border-primary px-3 py-2.5 rounded-xl text-sm font-medium text-gray-800 hover:text-primary transition-colors flex items-center justify-center gap-1">
                                    <MapPin size={14} className="text-primary" /> Göteborg
                                </Link>
                                <Link href="/kliniker/malmo" className="bg-white border border-gray-200 hover:border-primary px-3 py-2.5 rounded-xl text-sm font-medium text-gray-800 hover:text-primary transition-colors flex items-center justify-center gap-1">
                                    <MapPin size={14} className="text-primary" /> Malmö
                                </Link>
                                <Link href="/kliniker" className="bg-white border border-gray-200 hover:border-primary px-3 py-2.5 rounded-xl text-sm font-medium text-gray-800 hover:text-primary transition-colors flex items-center justify-center gap-1">
                                    <MapPin size={14} className="text-primary" /> Alla städer
                                </Link>
                                <Link href="/behandlingar/fillerbehandling" className="col-span-2 sm:col-span-2 bg-primary hover:bg-primary/90 px-3 py-2.5 rounded-xl text-sm font-medium text-white transition-colors flex items-center justify-center gap-1 shadow-sm">
                                    Alla fillerkliniker i Sverige <ChevronRight size={16} />
                                </Link>
                            </div>
                            <p className="text-xs text-gray-500">
                                Vill du även läsa om muskelavslappnande rynkbehandlingar? Se vår <Link href="/blogg/botoxbehandling-den-kompletta-guiden" className="text-primary underline">stora botoxguide 2026</Link>.
                            </p>
                        </div>

                        {/* 9. Sammanfattning */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                            Sammanfattning
                        </h2>
                        <p>
                            Fillerbehandling med hyaluronsyra är en skonsam, mångsidig och vetenskapligt beprövad metod för att återskapa ungdomlig volym och harmoniska ansiktsdrag. Men det är ett medicinskt hantverk som fordrar stor respekt.
                        </p>
                        <p>
                            Genom att prioritera legitimerad medicinsk kompetens framför lägsta pris, ställa krav på CE-märkta preparat och alltid genomföra den obligatoriska betänketiden på 48 timmar lägger du grunden för en trygg upplevelse och ett resultat du kan glädjas åt länge.
                        </p>

                        {/* Källor & Medicinsk faktagranskning */}
                        <div className="border-t border-gray-200 pt-8 mt-12" id="kallor">
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8 text-sm text-gray-600 space-y-2">
                                <div className="flex items-center gap-2 font-semibold text-gray-900">
                                    <CheckCircle2 size={18} className="text-emerald-600" />
                                    Medicinsk granskning & faktakontroll
                                </div>
                                <p>
                                    Denna artikel är sammanställd och granskad av <strong>Battrehys redaktion</strong> utifrån gällande svensk lagstiftning (Lag 2021:363 om estetiska kirurgiska ingrepp och estetiska injektionsbehandlingar), Socialstyrelsens tillsynsregler, IVO:s vårdgivarregister samt rekommendationer från Estetiska Injektionsrådet (EIR).
                                </p>
                                <p className="text-xs text-gray-500">
                                    <strong>Medicinsk disclaimer:</strong> Texten är avsedd för allmän information och folkupplysning och ersätter inte professionell medicinsk rådgivning. Rådgör alltid med en legitimerad läkare, sjuksköterska eller tandläkare för individuell medicinsk bedömning före injektionsbehandling.
                                </p>
                                <p className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                                    <strong>Källor:</strong> Svensk författningssamling (SFS 2021:363), Inspektionen för vård och omsorg (IVO), Socialstyrelsen, Skönhetskollens nationella prisindex september 2026, Estetiska Injektionsrådet, Galderma/Restylane kliniska produktmonografier, Allergan/Juvéderm säkerhetsdata.
                                </p>
                                <p className="text-xs text-gray-500 font-medium">
                                    Senast faktagranskad och uppdaterad: 8 september 2026.
                                </p>
                            </div>
                        </div>

                    </div>
                </article>
            </div>
        </main>
    );
}
