import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SchemaScript } from '@/components/SchemaScript';
import { buildBreadcrumbSchema, buildArticleSchema, buildFAQSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Hudvårdsrutin – steg för steg för din hudtyp',
    description: 'Så bygger du en hudvårdsrutin som fungerar: rätt ordning morgon och kväll, ingredienser för din hudtyp, och när professionell hudvård gör större skillnad.',
    alternates: {
        canonical: 'https://battrehy.se/blogg/hudvardsrutin',
    },
    openGraph: {
        title: 'Hudvårdsrutin – steg för steg för din hudtyp',
        description: 'Så bygger du en hudvårdsrutin som fungerar: rätt ordning morgon och kväll, ingredienser för din hudtyp, och när professionell hudvård gör större skillnad.',
        type: 'article',
        locale: 'sv_SE',
        url: 'https://battrehy.se/blogg/hudvardsrutin',
        images: [
            {
                url: 'https://battrehy.se/images/blogg/hudvardsrutin-hero.webp',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Hudvårdsrutin – steg för steg för din hudtyp',
        description: 'Så bygger du en hudvårdsrutin som fungerar: rätt ordning morgon och kväll, ingredienser för din hudtyp, och när professionell hudvård gör större skillnad.',
        images: ['https://battrehy.se/images/blogg/hudvardsrutin-hero.webp'],
    }
};

export default function BlogPost() {
    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Hem', url: 'https://battrehy.se' },
            { name: 'Blogg', url: 'https://battrehy.se/blogg' },
            { name: 'Hudvårdsrutin', url: 'https://battrehy.se/blogg/hudvardsrutin' }
        ]),
        buildArticleSchema({
            headline: "Hudvårdsrutin: så bygger du en rutin som fungerar – steg för steg",
            description: "Så bygger du en hudvårdsrutin som fungerar: rätt ordning morgon och kväll, ingredienser för din hudtyp, och när professionell hudvård gör större skillnad.",
            datePublished: "2026-07-22T08:00:00+02:00",
            dateModified: "2026-07-22T08:00:00+02:00",
            imageUrl: "https://battrehy.se/images/blogg/hudvardsrutin-hero.webp",
            pageUrl: "https://battrehy.se/blogg/hudvardsrutin"
        }),
        buildFAQSchema([
            {
                question: "I vilken ordning ska jag göra min hudvårdsrutin?",
                answer: "Från tunnast till tjockast: rengöring, eventuell toner, serum, ögonkräm, fuktkräm och – på morgonen – solskydd sist. Aktiva serum läggs före fuktkrämen."
            },
            {
                question: "Behöver jag alla steg, eller räcker en enkel rutin?",
                answer: "En enkel rutin räcker långt. Rengöring, fuktkräm och solskydd är grunden; aktiva ingredienser är ett komplement du lägger till efter behov."
            },
            {
                question: "När ska man använda retinol respektive syror?",
                answer: "På kvällen, eftersom de kan göra huden mer solkänslig. Börja ett par kvällar i veckan och trappa upp gradvis, och undvik att använda dem samtidigt i början."
            },
            {
                question: "Behöver jag solskydd varje dag – även vintern och inomhus?",
                answer: "UV-strålning påverkar huden året runt, så dagligt solskydd rekommenderas. Behovet är störst utomhus och vid sol och snö."
            },
            {
                question: "Hur lång tid tar det innan man ser resultat?",
                answer: "Räkna med flera veckor till månader för de flesta ingredienser – retinoider visar ofta effekt först efter 3–6 månaders regelbunden användning."
            },
            {
                question: "Hur skiljer sig en hudvårdsrutin för torr, fet och känslig hud?",
                answer: "Torr hud behöver mer fukt och barriärstöd, fet hud gynnas av lättare produkter och BHA, och känslig hud mår bäst av en enkel, parfymfri rutin."
            },
            {
                question: "Hur ofta ska man exfoliera?",
                answer: "För de flesta räcker 1–3 gånger i veckan. Överexfoliering skadar hudbarriären – mindre är ofta mer."
            },
            {
                question: "När räcker inte hemmavård – behöver jag professionell hudvård?",
                answer: "Vid akne eller ärr, pigmentfläckar, djupare rynkor eller uttalad slapphet gör professionella behandlingar större skillnad. Då kan det vara värt att boka en konsultation på en seriös klinik."
            }
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
                            Hudvårdsrutin: så bygger du en rutin som fungerar – steg för steg
                        </h1>
                        <div className="flex items-center text-gray-500 text-sm mb-8">
                            <span className="font-medium">Av Battrehys redaktion</span>
                            <span className="mx-2">·</span>
                            <span>Publicerad 22 juli 2026</span>
                        </div>
                        
                        {/* Main article image - BILD 1 */}
                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 mb-10 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/hudvardsrutin-hero.webp" 
                                alt="Kvinna applicerar fuktkräm i ett ljust, minimalistiskt badrum" 
                                className="w-full h-auto object-cover max-h-[500px]"
                                width={1600}
                                height={893}
                                fetchPriority="high"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">En enkel men konsekvent rutin slår nästan alltid en avancerad som du inte orkar hålla.</p>
                        </div>
                    </header>

                    <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                        <p>
                            Det finns oändligt med hudvårdsråd – och ännu fler produkter. Men en hudvårdsrutin som fungerar behöver varken vara dyr eller komplicerad. Den här guiden visar dig grunderna: rätt ordning morgon och kväll, vad de viktigaste ingredienserna faktiskt gör, och hur du anpassar rutinen efter just din hudtyp. Vi är en oberoende katalog, inte en butik – så här får du råd på ingrediensnivå utan att någon försöker sälja en specifik produkt.
                        </p>

                        <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl my-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Det viktigaste i korthet (TL;DR)</h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li><strong>Grunden räcker långt:</strong> rengöring, fukt och solskydd (SPF) på morgonen.</li>
                                <li><strong>Färre men rätt produkter</strong> slår ett fullt badrumsskåp.</li>
                                <li><strong>SPF på morgonen, retinol och syror på kvällen.</strong></li>
                                <li><strong>Introducera aktiva ingredienser gradvis</strong> för att undvika irritation.</li>
                                <li><strong>Anpassa efter din hudtyp</strong> – samma rutin passar inte alla.</li>
                                <li><strong>Hemmavård tar dig långt</strong> – professionell hudvård gör större skillnad vid specifika problem.</li>
                            </ul>
                        </div>

                        <nav className="bg-gray-50 border border-gray-200 p-6 rounded-2xl mb-12">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Innehåll</h2>
                            <ul className="space-y-2 text-gray-700">
                                <li><a href="#vad" className="text-primary hover:underline">1. Vad är en hudvårdsrutin – och varför spelar ordningen roll?</a></li>
                                <li><a href="#grundrutin" className="text-primary hover:underline">2. Grundrutinen steg för steg (morgon & kväll)</a></li>
                                <li><a href="#ingredienser" className="text-primary hover:underline">3. Nyckelingredienser och vad de gör</a></li>
                                <li><a href="#hudtyp" className="text-primary hover:underline">4. Anpassa rutinen efter din hudtyp</a></li>
                                <li><a href="#alder" className="text-primary hover:underline">5. Anpassa efter ålder och behov</a></li>
                                <li><a href="#misstag" className="text-primary hover:underline">6. Vanliga misstag</a></li>
                                <li><a href="#professionell" className="text-primary hover:underline">7. Hemmavård vs professionell hudvård</a></li>
                                <li><a href="#faq" className="text-primary hover:underline">8. Vanliga frågor</a></li>
                                <li><a href="#kallor" className="text-primary hover:underline">9. Källor</a></li>
                            </ul>
                        </nav>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="vad">Vad är en hudvårdsrutin – och varför spelar ordningen roll?</h2>
                        <p>
                            En hudvårdsrutin är helt enkelt de steg du gör regelbundet för att hålla huden ren, återfuktad och skyddad. Poängen är inte att göra så mycket som möjligt, utan att göra rätt saker konsekvent.
                        </p>
                        <p>
                            Ordningen spelar roll eftersom produkterna behöver kunna tränga in i huden. Grundprincipen är <strong>tunnast till tjockast</strong> – vattenbaserade produkter (som serum) före oljebaserade (som krämer). En vanlig ordning är:
                        </p>
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl font-medium text-center text-gray-900 my-4">
                            Rengöring → (toner) → serum → ögonkräm → fuktkräm → (ansiktsolja) → solskydd (endast morgon)
                        </div>
                        <p>
                            Tänk också på att morgon och kväll har olika syften: <strong>morgonen handlar om att skydda</strong> huden mot dagen (antioxidanter och solskydd), medan <strong>kvällen handlar om att reparera</strong> (rengöra bort dagen och använda aktiva ingredienser som retinol).
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="grundrutin">Grundrutinen steg för steg (morgon & kväll)</h2>
                        <p>
                            Du behöver inte alla steg. En enklare rutin ger nästan alltid bättre resultat än en avancerad som du inte orkar hålla.
                        </p>
                        
                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Morgon</h3>
                        <ul className="list-decimal pl-5 space-y-2">
                            <li><strong>Rengöring:</strong> en skonsam rengöring, eller bara vatten om huden är torr eller känslig.</li>
                            <li><strong>Antioxidant-serum (valfritt):</strong> t.ex. C-vitamin, som skyddar mot fria radikaler.</li>
                            <li><strong>Fuktkräm:</strong> återfuktar och stärker hudbarriären.</li>
                            <li><strong>Solskydd (SPF):</strong> det enskilt viktigaste steget, varje dag.</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Kväll</h3>
                        <ul className="list-decimal pl-5 space-y-2">
                            <li><strong>Rengöring:</strong> ta bort smink, solskydd och smuts. Dubbelrengöring (olja + rengöring) kan behövas om du använt smink eller vattenfast SPF.</li>
                            <li><strong>Aktiv ingrediens (valfritt):</strong> t.ex. retinol eller en exfolierande syra, några kvällar i veckan.</li>
                            <li><strong>Fuktkräm:</strong> gärna något rikare på kvällen.</li>
                        </ul>
                        <p>
                            En nybörjarrutin kan bestå av bara rengöring, fuktkräm och SPF. Bygg på med aktiva ingredienser först när grunden sitter.
                        </p>

                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/hudvardsrutin-produkter.webp" 
                                alt="Enkla, oetiketterade hudvårdsprodukter uppställda: rengöring, serum, fuktkräm och solskydd" 
                                className="w-full h-auto object-cover max-h-96"
                                width={1600}
                                height={1073}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">Grunden: rengöring, fukt och solskydd – bygg på med aktiva ingredienser efter behov.</p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="ingredienser">Nyckelingredienser och vad de gör</h2>
                        <p>
                            I stället för att fastna vid varumärken, lär dig känna igen ingredienserna – då kan du välja produkter som passar din hud och budget:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Solskydd (SPF):</strong> skyddar mot UV-strålning, den största orsaken till för tidigt åldrande och pigmentförändringar. Viktigast av allt.</li>
                            <li><strong>Retinoider (vitamin A):</strong> bäst dokumenterade mot fina linjer, ojämn ton och struktur. Receptbelagda (tretinoin) är starkast; retinol finns receptfritt. Används på kvällen.</li>
                            <li><strong>AHA/BHA-syror:</strong> exfolierar kemiskt. AHA (glykol-, mjölksyra) jämnar ton och struktur; BHA (salicylsyra) rengör porer och passar fet/aknebenägen hud.</li>
                            <li><strong>Niacinamid (B3):</strong> stärker hudbarriären, jämnar ton och balanserar talg. Mångsidig och skonsam.</li>
                            <li><strong>C-vitamin:</strong> antioxidant som ger lyster och skydd; används på morgonen.</li>
                            <li><strong>Hyaluronsyra:</strong> binder fukt och ger en fylligare, mjukare hud.</li>
                            <li><strong>Peptider:</strong> stödjer hudens struktur och spänst.</li>
                        </ul>
                        <p>
                            <strong>Tumregel:</strong> kombinera inte flera starka aktiva samtidigt (t.ex. retinol + syra + C-vitamin samma kväll) i början – det ökar risken för irritation.
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Så introducerar du aktiva ingredienser gradvis</h3>
                        <p>
                            Det vanligaste misstaget är att börja med allt på en gång. Introducera i stället en aktiv ingrediens i taget, och ge huden tid att vänja sig:
                        </p>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li><strong>Vecka 1–2:</strong> etablera grunden – rengöring, fuktkräm och solskydd, varje dag.</li>
                            <li><strong>Vecka 3–4:</strong> lägg till en antioxidant på morgonen (t.ex. C-vitamin).</li>
                            <li><strong>Vecka 5–6:</strong> introducera en exfolierande syra eller retinol på kvällen, 2 kvällar i veckan.</li>
                            <li><strong>Därefter:</strong> trappa långsamt upp frekvensen om huden mår bra.</li>
                        </ol>
                        <p>
                            Använd alltid solskydd dagtid när du använder syror eller retinoider, eftersom huden blir mer solkänslig. Får du ihållande rodnad, sveda eller fjällning – ta ett par dagars paus och gå ner i frekvens. Lite pirr i början är normalt, men huden ska inte vara irriterad hela tiden.
                        </p>

                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/hudvardsrutin-serum.webp" 
                                alt="Närbild på serum som droppas från en glaspipett på fingertopparna" 
                                className="w-full h-auto object-cover max-h-96"
                                width={1600}
                                height={1073}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">Introducera en aktiv ingrediens i taget och ge huden tid att vänja sig.</p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="hudtyp">Anpassa rutinen efter din hudtyp</h2>
                        <p>
                            Det här är kärnan i en rutin som faktiskt fungerar: <strong>samma produkter passar inte alla.</strong> Känn igen din hudtyp och utgå från den.
                        </p>
                        <p>
                            Ett enkelt sätt att bedöma din hudtyp: tvätta ansiktet med en mild rengöring, vänta en timme utan att applicera något, och känn efter. Spänner och fjällar huden är den torr; glänser den (särskilt i T-zonen) är den fet eller kombinerad; känns den lugn och balanserad är den normal. Kom också ihåg att hudtypen kan förändras med årstid, hormoner och ålder – en rutin får gärna justeras över tid. Är du osäker kan en hudterapeut hjälpa dig att bedöma huden.
                        </p>

                        <div className="space-y-8 mt-6">
                            <div className="border-l-4 border-primary pl-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Torr hud</h3>
                                <p className="mb-2">Känns stram, kan fjälla och sakna lyster. Fokus: fukt och barriär.</p>
                                <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                                    <li><strong>Nyckelingredienser:</strong> hyaluronsyra, ceramider, rikare fuktkräm, milda oljor.</li>
                                    <li><strong>Undvik:</strong> starka skummande rengöringar och överdriven exfoliering som torkar ut ytterligare.</li>
                                    <li><strong>Tips:</strong> rengör skonsamt (gärna krämrengöring) och lås in fukt direkt efter tvätt.</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-primary pl-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Fet och oljig hud</h3>
                                <p className="mb-2">Glänser, särskilt i T-zonen, och kan ha förstorade porer. Fokus: balansera talg utan att torka ut.</p>
                                <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                                    <li><strong>Nyckelingredienser:</strong> niacinamid, salicylsyra (BHA), lätta gel-baserade fuktkrämer.</li>
                                    <li><strong>Undvik:</strong> att hoppa över fuktkräm (uttorkad hud kan producera mer talg) och tunga, täta krämer.</li>
                                    <li><strong>Tips:</strong> en oljefri fuktkräm och BHA några gånger i veckan gör stor skillnad.</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-primary pl-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Kombinerad hud</h3>
                                <p className="mb-2">Fet T-zon men torrare kinder. Fokus: anpassa efter zon.</p>
                                <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                                    <li><strong>Nyckelingredienser:</strong> niacinamid, lätt fuktkräm, punktvis rikare där det behövs.</li>
                                    <li><strong>Undvik:</strong> att behandla hela ansiktet som om det vore en enda hudtyp.</li>
                                    <li><strong>Tips:</strong> du kan använda olika produkter på olika områden ("multi-masking"-tänk).</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-primary pl-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Känslig hud</h3>
                                <p className="mb-2">Reagerar lätt med rodnad, sveda eller klåda. Fokus: enkelhet och barriär.</p>
                                <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                                    <li><strong>Nyckelingredienser:</strong> ceramider, niacinamid, lugnande fuktkräm; bakuchiol som skonsammare alternativ till retinol.</li>
                                    <li><strong>Undvik:</strong> parfym, många aktiva samtidigt och tvära produktbyten. Testa alltid nya produkter på en liten yta först.</li>
                                    <li><strong>Tips:</strong> färre steg är bättre – en mild rengöring, en fuktkräm och SPF räcker långt.</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-primary pl-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Mogen hud</h3>
                                <p className="mb-2">Torrare, tunnare och med fler linjer i takt med att kollagenet minskar. Fokus: fukt, barriär och stimulerande aktiva.</p>
                                <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                                    <li><strong>Nyckelingredienser:</strong> retinoider, peptider, hyaluronsyra, rikare fuktkräm och SPF.</li>
                                    <li><strong>Undvik:</strong> uttorkande produkter och att glömma solskyddet.</li>
                                    <li><strong>Tips:</strong> introducera retinoider gradvis och bygg upp fukten runt omkring.</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-primary pl-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Aknebenägen hud</h3>
                                <p className="mb-2">Återkommande finnar och orenheter, ofta även efter tonåren. Fokus: hålla porer rena utan att irritera.</p>
                                <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                                    <li><strong>Nyckelingredienser:</strong> salicylsyra (BHA), niacinamid, icke-komedogena (icke-portäppande) produkter; retinoider mot både akne och ärr.</li>
                                    <li><strong>Undvik:</strong> att övertorka huden och att peta på finnar.</li>
                                    <li><strong>Tips:</strong> var tålmodig – och sök vård för svårare akne, som kan behöva receptbelagd behandling.</li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">Exempel på enkla rutiner</h3>
                        <p>Använd dessa som utgångspunkt och justera efter hur huden svarar:</p>
                        <ul className="space-y-4">
                            <li>
                                <strong>Torr eller mogen hud:</strong>
                                <br />
                                <span className="text-gray-600 text-sm">
                                    <em>Morgon:</em> skonsam rengöring → hyaluronsyra-serum → rik fuktkräm → SPF.
                                    <br />
                                    <em>Kväll:</em> krämrengöring → retinol (2 kvällar/vecka) → rik fuktkräm.
                                </span>
                            </li>
                            <li>
                                <strong>Fet eller aknebenägen hud:</strong>
                                <br />
                                <span className="text-gray-600 text-sm">
                                    <em>Morgon:</em> gel-rengöring → niacinamid-serum → oljefri fuktkräm → SPF.
                                    <br />
                                    <em>Kväll:</em> gel-rengöring → BHA/salicylsyra (2–3 ggr/vecka) → lätt fuktkräm.
                                </span>
                            </li>
                            <li>
                                <strong>Känslig hud:</strong>
                                <br />
                                <span className="text-gray-600 text-sm">
                                    <em>Morgon:</em> skölj med vatten eller mild rengöring → lugnande fuktkräm med ceramider → SPF.
                                    <br />
                                    <em>Kväll:</em> mild rengöring → fuktkräm; introducera eventuella aktiva mycket försiktigt.
                                </span>
                            </li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="alder">Anpassa efter ålder och behov</h2>
                        <p>Huden förändras med åren, och rutinen kan följa med:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>20-tal:</strong> Grunden – rengöring, fukt och framför allt solskydd. Förebyggande är den mest effektiva anti-aging du kan göra.</li>
                            <li><strong>30-tal:</strong> Lägg gärna till antioxidanter (C-vitamin) och eventuellt retinol för att möta de första linjerna.</li>
                            <li><strong>40-tal:</strong> Mer fukt och regelbunden användning av retinoider; peptider kan komplettera.</li>
                            <li><strong>50+ år:</strong> Fokus på barriär, fukt och mildare men konsekvent användning av aktiva. Solskydd förblir lika viktigt.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="misstag">Vanliga misstag</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Att hoppa över solskyddet:</strong> UV-strålning är den största orsaken till för tidigt åldrande – SPF varje dag är oförhandlingsbart.</li>
                            <li><strong>För många aktiva samtidigt:</strong> Att blanda retinol, syror och C-vitamin utan invänjning irriterar huden.</li>
                            <li><strong>Att byta produkter för ofta:</strong> De flesta ingredienser behöver flera veckors konsekvent användning innan resultat syns.</li>
                            <li><strong>Överdriven exfoliering:</strong> För mycket peeling bryter ner hudbarriären och ger känslig, irriterad hud.</li>
                            <li><strong>Orealistiska förväntningar:</strong> Hudvård kan förbättra mycket, men vissa problem kräver professionell hjälp.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="professionell">Hemmavård vs professionell hudvård – när räcker inte rutinen?</h2>
                        <p>
                            En bra hemmarutin är grunden för frisk hud – men den har sina gränser. När hemmavården inte räcker kan <strong>professionell hudvård</strong> göra betydligt större skillnad, eftersom kliniker kan använda starkare produkter, medicinska peelingar och apparatbehandlingar (som laser och microneedling) som inte finns för hemmabruk. En hudterapeut eller läkare kan dessutom göra en ordentlig hudanalys och lägga upp en plan som kombinerar behandling på kliniken med rätt hemmavård – ofta det som ger bäst och mest hållbart resultat.
                        </p>

                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/hudvardsrutin-professionell.webp" 
                                alt="Hudterapeut gör en professionell hudanalys av en klient under en lampa" 
                                className="w-full h-auto object-cover max-h-96"
                                width={1600}
                                height={893}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">När hemmavården inte räcker gör en professionell hudanalys och behandling större skillnad.</p>
                        </div>

                        <p>Överväg professionell hjälp om du har:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Akne och akneärr</strong> som inte svarar på hemmavård – läs mer i vår guide till <Link href="/blogg/ansiktsbehandling-den-kompletta-guiden" className="text-primary hover:underline">ansiktsbehandling</Link>.</li>
                            <li><strong>Pigmentfläckar och solskador</strong> – kan behandlas med t.ex. peeling eller laser.</li>
                            <li><strong>Fina linjer och rynkor</strong> – se vår guide till <Link href="/blogg/anti-aging-behandling" className="text-primary hover:underline">anti-aging behandling</Link>, och vid mimikrynkor <Link href="/blogg/botoxbehandling-den-kompletta-guiden" className="text-primary hover:underline">botox</Link> eller <Link href="/blogg/fillerbehandling-den-kompletta-guiden" className="text-primary hover:underline">fillers</Link> för volym.</li>
                            <li><strong>Uttalad slapphet eller andra bekymmer</strong> där du vill ha en professionell bedömning.</li>
                        </ul>

                        <div className="bg-gray-50 border-l-4 border-primary p-6 my-8 rounded-r-lg">
                            <h3 className="font-bold text-gray-900 mb-2">Hitta rätt behandling</h3>
                            <p className="text-gray-700 text-sm sm:text-base">
                                På <strong>Battrehy.se</strong> samlar vi legitimerade kliniker i hela landet. <Link href="/behandlingar/hudvard" className="text-primary hover:underline font-medium">Hitta och jämför hudvårdsbehandlingar nära dig</Link>.
                            </p>
                        </div>

                        <p>
                            Injektioner och laser kräver alltid legitimerad personal och en klinik registrerad hos IVO. Innan du bokar, läs vår guide <Link href="/blogg/estetisk-klinik" className="text-primary hover:underline font-medium">Så väljer du en seriös estetisk klinik</Link>.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="faq">Vanliga frågor</h2>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">I vilken ordning ska jag göra min hudvårdsrutin?</h4>
                                <p className="text-gray-700 mt-1">Från tunnast till tjockast: rengöring, eventuell toner, serum, ögonkräm, fuktkräm och – på morgonen – solskydd sist. Aktiva serum läggs före fuktkrämen.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">Behöver jag alla steg, eller räcker en enkel rutin?</h4>
                                <p className="text-gray-700 mt-1">En enkel rutin räcker långt. Rengöring, fuktkräm och solskydd är grunden; aktiva ingredienser är ett komplement du lägger till efter behov.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">När ska man använda retinol respektive syror?</h4>
                                <p className="text-gray-700 mt-1">På kvällen, eftersom de kan göra huden mer solkänslig. Börja ett par kvällar i veckan och trappa upp gradvis, och undvik att använda dem samtidigt i början.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">Behöver jag solskydd varje dag – även vintern och inomhus?</h4>
                                <p className="text-gray-700 mt-1">UV-strålning påverkar huden året runt, så dagligt solskydd rekommenderas. Behovet är störst utomhus och vid sol och snö.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">Hur lång tid tar det innan man ser resultat?</h4>
                                <p className="text-gray-700 mt-1">Räkna med flera veckor till månader för de flesta ingredienser – retinoider visar ofta effekt först efter 3–6 månaders regelbunden användning.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">Hur skiljer sig en hudvårdsrutin för torr, fet och känslig hud?</h4>
                                <p className="text-gray-700 mt-1">Torr hud behöver mer fukt och barriärstöd, fet hud gynnas av lättare produkter och BHA, och känslig hud mår bäst av en enkel, parfymfri rutin.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">Hur ofta ska man exfoliera?</h4>
                                <p className="text-gray-700 mt-1">För de flesta räcker 1–3 gånger i veckan. Överexfoliering skadar hudbarriären – mindre är ofta mer.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">När räcker inte hemmavård – behöver jag professionell hudvård?</h4>
                                <p className="text-gray-700 mt-1">Vid akne eller ärr, pigmentfläckar, djupare rynkor eller uttalad slapphet gör professionella behandlingar större skillnad. Då kan det vara värt att boka en konsultation på en seriös klinik.</p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="kallor">Källor</h2>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                            <li><a href="https://www.1177.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">1177 Vårdguiden</a> – om hudtyper och grundläggande hudvård</li>
                            <li><a href="https://www.lakemedelsverket.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Läkemedelsverket</a> / dermatologisk konsensus – retinoider, solskydd (SPF) och exfolierande syror</li>
                            <li><a href="https://www.socialstyrelsen.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Socialstyrelsen</a> och <a href="https://www.ivo.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">IVO</a> – kompetenskrav och tillsyn för estetiska behandlingar (för professionell hudvård/klinikval)</li>
                        </ul>

                        <div className="mt-12 text-sm text-gray-500 italic border-t border-gray-200 pt-8">
                            Den här artikeln är framtagen av Battrehys redaktion i informationssyfte och utgör inte medicinsk rådgivning. Rådgör alltid med legitimerad personal vid hudbesvär eller inför en behandling.
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}
