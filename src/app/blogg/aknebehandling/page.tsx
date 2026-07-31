import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SchemaScript } from '@/components/SchemaScript';
import { buildBreadcrumbSchema, buildArticleSchema, buildFAQSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Aknebehandling – akne och akneärr, guide 2026',
    description: 'Vilka behandlingar fungerar mot akne och akneärr? Guide till hemmavård, receptbelagt och professionella klinikbehandlingar – och när du bör söka vård.',
    alternates: {
        canonical: 'https://battrehy.se/blogg/aknebehandling',
    },
    openGraph: {
        title: 'Aknebehandling – akne och akneärr, guide 2026',
        description: 'Vilka behandlingar fungerar mot akne och akneärr? Guide till hemmavård, receptbelagt och professionella klinikbehandlingar – och när du bör söka vård.',
        type: 'article',
        locale: 'sv_SE',
        url: 'https://battrehy.se/blogg/aknebehandling',
        images: [
            {
                url: 'https://battrehy.se/images/blogg/aknebehandling-hero.webp',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Aknebehandling – akne och akneärr, guide 2026',
        description: 'Vilka behandlingar fungerar mot akne och akneärr? Guide till hemmavård, receptbelagt och professionella klinikbehandlingar – och när du bör söka vård.',
        images: ['https://battrehy.se/images/blogg/aknebehandling-hero.webp'],
    }
};

export default function BlogPost() {
    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Hem', url: 'https://battrehy.se' },
            { name: 'Blogg', url: 'https://battrehy.se/blogg' },
            { name: 'Aknebehandling', url: 'https://battrehy.se/blogg/aknebehandling' }
        ]),
        buildArticleSchema({
            headline: "Aknebehandling: så behandlar du akne och akneärr",
            description: "Vilka behandlingar fungerar mot akne och akneärr? Guide till hemmavård, receptbelagt och professionella klinikbehandlingar – och när du bör söka vård.",
            datePublished: "2026-07-22T08:00:00+02:00",
            dateModified: "2026-07-22T08:00:00+02:00",
            imageUrl: "https://battrehy.se/images/blogg/aknebehandling-hero.webp",
            pageUrl: "https://battrehy.se/blogg/aknebehandling"
        }),
        buildFAQSchema([
            {
                question: "Vad är bästa behandlingen mot akne?",
                answer: "Det beror på typ och svårighetsgrad. Mild akne svarar ofta på receptfri hemmavård (benzoylperoxid, salicylsyra, azelainsyra), medan måttlig till svår akne kan behöva receptbelagd behandling via läkare. Det finns ingen enda behandling som passar alla."
            },
            {
                question: "Kan man bli av med akneärr helt?",
                answer: "Sällan helt, men de kan ofta förbättras tydligt. Nedsjunkna ärr behandlas med till exempel microneedling, laser, peeling eller subcision, oftast i en serie."
            },
            {
                question: "Vilken behandling är bäst mot akneärr?",
                answer: "Det beror på ärrtypen. Bruna och röda märken svarar på uppljusande hudvård, peeling och IPL/laser, medan nedsjunkna ärr behandlas med microneedling, fraktionerad laser, subcision eller filler. En kombination ger ofta bäst resultat."
            },
            {
                question: "När ska man söka läkare för akne?",
                answer: "Vid måttlig till svår, djup eller cystisk akne, akne som lämnar ärr, eller när receptfri behandling inte hjälpt efter några månader. Även akne som påverkar måendet är skäl att söka vård."
            },
            {
                question: "Hjälper hudvård hemma mot akne?",
                answer: "Ja, vid mild akne. Icke-komedogena produkter med benzoylperoxid, salicylsyra, azelainsyra eller retinoider kan göra stor skillnad – men ge det tid och undvik att kombiner för många starka aktiva samtidigt."
            },
            {
                question: "Kan man behandla aktiv akne och akneärr samtidigt?",
                answer: "Ofta fokuserar man först på att få aknen under kontroll, och behandlar sedan ärren. En hudterapeut eller läkare kan lägga upp ordningen."
            },
            {
                question: "Får man ärr av att klämma finnar?",
                answer: "Att pilla och klämma ökar inflammationen och risken för bestående ärr och märken. Låt bli – och behandla i stället orsaken."
            },
            {
                question: "Hur lång tid tar det innan aknebehandling ger resultat?",
                answer: "De flesta behandlingar behöver tid: receptfri hemmavård 6–8 veckor, receptbelagd behandling ofta ännu längre, och klinikbehandlingar mot ärr ges i serier över flera månader. Snabba resultat är ovanliga."
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
                            Aknebehandling: så behandlar du akne och akneärr
                        </h1>
                        <div className="flex items-center text-gray-500 text-sm mb-8">
                            <span className="font-medium">Av Battrehys redaktion</span>
                            <span className="mx-2">·</span>
                            <span>Publicerad 22 juli 2026</span>
                            <span className="mx-2">·</span>
                            <span>Kategori: Guider</span>
                        </div>

                        {/* Hero Image - BILD 1 */}
                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 mb-10 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/blogg/aknebehandling-hero.webp"
                                alt="Ung vuxen med naturlig, frisk hud i mjukt ljus"
                                className="w-full h-auto object-cover max-h-[500px]"
                                width={1600}
                                height={893}
                                fetchPriority="high"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">
                                Både aktiv akne och akneärr går att förbättra – med rätt behandling och tålamod.
                            </p>
                        </div>
                    </header>

                    <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                        <p>
                            Akne är ett av de vanligaste hudbesvären – och för många sitter märkena kvar långt efter att finnarna läkt. Den goda nyheten är att både aktiv akne och akneärr går att förbättra. Den här guiden går igenom vad som faktiskt fungerar: från hemmavård och receptbelagd behandling till professionella klinikbehandlingar mot ärr – och när du bör söka vård. Vi är en oberoende katalog, inte en klinik, så du får en neutral översikt utan att någon säljer en specifik produkt.
                        </p>

                        {/* Medical Disclaimer Notice Box */}
                        <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl my-6 text-amber-900 text-base">
                            <p className="m-0">
                                <strong>Viktigt:</strong> Den här artikeln är allmän information, inte medicinsk rådgivning. Vid måttlig till svår, djup eller ärrbildande akne – kontakta läkare eller hudläkare för individuell bedömning.
                            </p>
                        </div>

                        {/* TL;DR Box */}
                        <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl my-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Det viktigaste i korthet (TL;DR)</h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-base">
                                <li><strong>Typen av akne styr behandlingen</strong> – mild akne sköts ofta hemma, svårare akne behöver läkare.</li>
                                <li><strong>Hemmavård:</strong> benzoylperoxid, salicylsyra (BHA), azelainsyra och retinoider – introducera ett i taget.</li>
                                <li><strong>Sök läkare</strong> vid måttlig/svår, cystisk eller hormonell akne – då kan receptbelagd behandling behövas.</li>
                                <li><strong>Akneärr behandlas på klinik</strong> (microneedling, laser, peeling, subcision) – de kan förbättras men sällan tas bort helt.</li>
                                <li><strong>Solskydd alltid</strong> – och pilla eller kläm inte, det ökar risken för ärr.</li>
                            </ul>
                        </div>

                        {/* Table of Contents */}
                        <nav className="bg-gray-50 border border-gray-200 p-6 rounded-2xl mb-12">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Innehåll</h2>
                            <ul className="space-y-2 text-gray-700 text-base">
                                <li><a href="#vad" className="text-primary hover:underline">1. Vad är akne och varför uppstår det?</a></li>
                                <li><a href="#hemma" className="text-primary hover:underline">2. Aktiv akne: hemmavård och receptfritt</a></li>
                                <li><a href="#vard" className="text-primary hover:underline">3. När du bör söka vård</a></li>
                                <li><a href="#klinik" className="text-primary hover:underline">4. Professionell aknebehandling på klinik</a></li>
                                <li><a href="#aknearr" className="text-primary hover:underline">5. Akneärr: typer och behandlingar</a></li>
                                <li><a href="#pris" className="text-primary hover:underline">6. Vad kostar aknebehandling?</a></li>
                                <li><a href="#valja" className="text-primary hover:underline">7. Så väljer du klinik</a></li>
                                <li><a href="#faq" className="text-primary hover:underline">8. Vanliga frågor</a></li>
                                <li><a href="#kallor" className="text-primary hover:underline">9. Källor</a></li>
                            </ul>
                        </nav>

                        {/* Section 1 */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="vad">1. Vad är akne och varför uppstår det?</h2>
                        <p>
                            Akne uppstår när hudens talgkörtlar producerar mer talg samtidigt som porerna täpps till av döda hudceller. I den tilltäppta poren trivs hudens naturliga bakterie <em>Cutibacterium acnes</em>, vilket kan leda till inflammation. Resultatet blir allt från pormaskar till inflammerade finnar och, i svårare fall, djupa knölar.
                        </p>
                        <p>Man brukar skilja på olika typer:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Komedoner</strong> – pormaskar, både öppna (svarta) och slutna (vita). Den mildaste formen.</li>
                            <li><strong>Inflammatorisk akne</strong> – röda finnar (papler) och varfyllda finnar (pustler).</li>
                            <li><strong>Djup akne</strong> – ömma knölar (noduli) och cystor som sitter djupt i huden. Den här typen ökar risken för ärr och bör bedömas av läkare.</li>
                        </ul>
                        <p>
                            Akne styrs till stor del av hormoner, vilket är varför den är vanligast i tonåren – men <strong>hormonell akne</strong> drabbar många även i vuxen ålder, ofta längs käklinjen och hakan. Andra faktorer som kan spela in är ärftlighet, vissa läkemedel och stress. Att pilla och klämma förvärrar ofta både inflammationen och risken för ärr.
                        </p>
                        <p>
                            Akne delas vanligtvis in i <strong>mild, måttlig och svår</strong> – en indelning som styr valet av behandling. Den syns oftast i ansiktet, men förekommer även på rygg, bröst och axlar, där talgkörtlarna är många.
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Myter och missförstånd om akne</h3>
                        <p>Några vanliga missuppfattningar är värda att reda ut:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li><strong>&quot;Akne beror på dålig hygien.&quot;</strong> Nej. Överdriven eller hård tvätt kan tvärtom irritera huden och förvärra besvären. Rengör skonsamt, ungefär två gånger om dagen.</li>
                            <li><strong>&quot;Solen läker akne.&quot;</strong> Solen kan tillfälligt dölja rodnad, men förvärrar ofta märken och pigmentering på sikt – och flera aknebehandlingar gör huden solkänslig.</li>
                            <li><strong>&quot;Man växer alltid ifrån akne.&quot;</strong> Många gör det, men vuxenakne är vanligt, särskilt hormonell akne hos kvinnor.</li>
                            <li><strong>&quot;Hemmakurer som tandkräm tar bort finnar.&quot;</strong> Undvik – sådana knep kan irritera och skada hudbarriären utan att hjälpa.</li>
                        </ul>
                        <p>
                            Och kosten? Evidensen är begränsad. För vissa kan mejeriprodukter eller snabba kolhydrater ha betydelse, men det gäller långt ifrån alla, och kost är sällan hela förklaringen.
                        </p>

                        {/* Section 2 */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="hemma">2. Aktiv akne: hemmavård och receptfritt</h2>
                        <p>
                            Vid mild akne kan man ofta komma långt med rätt hemmavård. Nyckeln är att välja <strong>icke-komedogena</strong> (icke portäppande) produkter och att ge behandlingen tid – räkna med flera veckor innan du ser effekt. Vanliga receptfria ingredienser:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li><strong>Benzoylperoxid</strong> – minskar bakterier och inflammation. Effektivt mot inflammatorisk akne, men kan torka ut i början.</li>
                            <li><strong>Salicylsyra (BHA)</strong> – tränger ner i porerna och löser upp talg och döda hudceller.</li>
                            <li><strong>Azelainsyra</strong> – motverkar både finnar och märken efter akne, och är ofta skonsam.</li>
                            <li><strong>Retinoider</strong> – reglerar cellförnyelsen; vissa finns receptfritt, starkare varianter på recept.</li>
                            <li><strong>Niacinamid</strong> – lugnar och stärker hudbarriären.</li>
                        </ul>
                        <p>
                            Undvik att kombinera flera starka aktiva samtidigt i början, och använd alltid <strong>solskydd</strong> dagtid – flera akneingredienser gör huden mer solkänslig, och sol kan dessutom förvärra märken. Vill du bygga en grund hittar du vår <Link href="/blogg/hudvardsrutin" className="text-primary hover:underline font-medium">guide till hudvårdsrutin, inklusive aknebenägen hud</Link>.
                        </p>
                        <p>
                            <strong>Så börjar du utan att irritera huden:</strong> välj en skonsam rengöring, introducera en aktiv ingrediens i taget och lägg till fler först när huden vant sig. Använd en lätt, oljefri fuktkräm även om huden är fet – uttorkad hud kan trigga mer talgproduktion. Ge varje förändring minst sex till åtta veckor innan du bedömer resultatet, och dokumentera gärna med foto. Blir huden kraftigt irriterad, trappa ner och rådgör med en hudterapeut eller läkare.
                        </p>

                        {/* Image 2 */}
                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/blogg/aknebehandling-hemmavard.webp"
                                alt="Person applicerar punktbehandling mot akne på kinden"
                                className="w-full h-auto object-cover max-h-[500px]"
                                width={1600}
                                height={1073}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">
                                Vid mild akne räcker ofta rätt hemmavård – introducera en aktiv ingrediens i taget.
                            </p>
                        </div>

                        {/* Section 3 */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="vard">3. När du bör söka vård</h2>
                        <p>
                            Kontakta läkare eller hudläkare om du har <strong>måttlig till svår akne</strong>, <strong>djupa eller cystiska</strong> utslag, akne som <strong>lämnar ärr</strong>, eller om receptfri behandling inte hjälpt efter några månader. Akne som påverkar måendet är också ett fullgott skäl att söka hjälp – vänta inte för länge, för tidig behandling minskar risken för bestående ärr.
                        </p>
                        <p>
                            Vid behov kan läkare skriva ut receptbelagd behandling. Beroende på typ och svårighetsgrad kan det handla om starkare topikala retinoider, antibiotika (i kur), hormonell behandling för kvinnor, eller – vid svår akne – isotretinoin, som kräver läkaruppföljning. Exakt val och dosering är alltid en medicinsk bedömning; prata med din läkare om vad som passar dig. För en översikt av läkemedel vid akne hänvisar vi till 1177 och Läkemedelsboken (se Källor).
                        </p>
                        <p>
                            Tänk på behandlingen som en trappa: man börjar oftast med det mildaste som kan fungera och trappar upp om det inte räcker. Hur snabbt man går uppåt beror på svårighetsgrad och risken för ärr. Poängen är att inte vänta för länge – ju tidigare måttlig till svår akne behandlas, desto mindre är risken för bestående ärr.
                        </p>

                        {/* Image 3 */}
                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/blogg/aknebehandling-konsultation.webp"
                                alt="Hudläkare bedömer akne vid en konsultation under en lampa"
                                className="w-full h-auto object-cover max-h-[500px]"
                                width={1600}
                                height={1073}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">
                                Vid måttlig till svår eller cystisk akne bör du söka läkare för en individuell bedömning.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="klinik">4. Professionell aknebehandling på klinik</h2>
                        <p>
                            Utöver läkarvård erbjuder hud- och estetikkliniker behandlingar som kan komplettera vid <strong>aktiv akne</strong>:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li><strong>Kemisk peeling</strong> (salicylsyra/AHA) – rengör porer och jämnar hudton.</li>
                            <li><strong>Djuprengöring och portömning</strong> – utförd av hudterapeut.</li>
                            <li><strong>Ljusbehandling (LED/IPL)</strong> – kan minska bakterier och inflammation.</li>
                        </ul>
                        <p>
                            Dessa behandlingar är ett komplement, inte en ersättning för läkarvård vid svår akne. En seriös klinik börjar alltid med en hudanalys och en individuell plan, ofta i kombination med hemmavård. Vid svår eller cystisk akne fungerar klinikbehandlingar bäst när aknen redan är medicinskt under kontroll – en bra klinik är tydlig med vad som är rimligt att förvänta sig och hänvisar vidare till läkare när det behövs.
                        </p>

                        {/* Section 5 */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="aknearr">5. Akneärr: typer och behandlingar</h2>
                        <p>
                            När aknen väl läkt kan den lämna märken – och det är här de flesta professionella behandlingarna kommer in. Det första steget är att förstå vilken sorts märke du har, eftersom behandlingen skiljer sig åt.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li><strong>Röda märken (postinflammatoriskt erytem, PIE)</strong> – rodnad som ofta bleknar av sig själv med tiden.</li>
                            <li><strong>Bruna märken (postinflammatorisk hyperpigmentering, PIH)</strong> – pigmentförändringar, vanligare i mörkare hud.</li>
                            <li><strong>Nedsjunkna (atrofiska) ärr</strong> – de &quot;riktiga&quot; ärren: smala och djupa (ice pick), breda med skarpa kanter (boxcar) eller vågiga (rolling).</li>
                            <li><strong>Upphöjda (hypertrofa) ärr</strong> – vanligare på rygg och bröst.</li>
                        </ul>
                        <p>
                            En viktig grundregel: akneärr går ofta att <strong>förbättra tydligt, men sällan att ta bort helt</strong> – och det krävs oftast en serie behandlingar. Här är vad som brukar användas mot respektive märke:
                        </p>

                        {/* Scar Types Table */}
                        <div className="overflow-x-auto my-6 border border-gray-200 rounded-xl">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 text-left font-bold text-gray-900">Typ av märke</th>
                                        <th scope="col" className="px-4 py-3 text-left font-bold text-gray-900">Vanliga behandlingar</th>
                                        <th scope="col" className="px-4 py-3 text-left font-bold text-gray-900">Bra att veta</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">Röda märken (PIE)</td>
                                        <td className="px-4 py-3 text-gray-700">Tid, solskydd, ev. IPL/laser mot kärl</td>
                                        <td className="px-4 py-3 text-gray-700">Bleknar ofta av sig själv; SPF påskyndar</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">Bruna märken (PIH)</td>
                                        <td className="px-4 py-3 text-gray-700">Uppljusande hudvård (azelainsyra, C-vitamin, AHA, retinoider), kemisk peeling, IPL</td>
                                        <td className="px-4 py-3 text-gray-700">Solskydd helt avgörande</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">Nedsjunkna ärr (atrofiska)</td>
                                        <td className="px-4 py-3 text-gray-700">Microneedling/RF, fraktionerad laser, kemisk peeling, subcision, filler</td>
                                        <td className="px-4 py-3 text-gray-700">Serie krävs; kombination ofta bäst</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">Upphöjda ärr (hypertrofa)</td>
                                        <td className="px-4 py-3 text-gray-700">Kortisoninjektion, laser</td>
                                        <td className="px-4 py-3 text-gray-700">Bedöms individuellt</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            <strong>Solskydd är genomgående avgörande</strong> – både för att märken inte ska mörkna och för att skydda huden efter behandling. För djupare ärr ger en kombination (t.ex. microneedling eller laser plus, vid behov, subcision eller filler) i regel bäst resultat. Många av de här metoderna används även i <Link href="/blogg/anti-aging-behandling" className="text-primary hover:underline font-medium">anti-aging- och hudföryngringssyfte</Link>, och samma kliniker erbjuder ofta båda.
                        </p>
                        <p>
                            <strong>Vad kan du förvänta dig?</strong> De flesta ser en gradvis förbättring över en behandlingsserie, med fortsatt effekt under månaderna efter i takt med att huden bildar nytt kollagen. Tålamod är nyckeln – och att aknen först är under kontroll, annars bildas nya ärr som motverkar resultatet. Har du en <strong>mörkare hudton</strong> krävs särskild försiktighet vid laser och starkare peelingar, eftersom risken för pigmentförändringar är högre. Välj då en klinik med dokumenterad erfarenhet av din hudtyp, och var extra noga med solskydd före och efter behandling.
                        </p>

                        {/* Image 4 */}
                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/blogg/aknebehandling-aknearr.webp"
                                alt="Behandlare utför microneedling mot akneärr på en klient i en klinik"
                                className="w-full h-auto object-cover max-h-[500px]"
                                width={1600}
                                height={893}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">
                                Nedsjunkna akneärr behandlas på klinik med t.ex. microneedling, laser eller peeling – oftast i en serie.
                            </p>
                        </div>

                        {/* Section 6 */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="pris">6. Vad kostar aknebehandling?</h2>
                        <p>
                            Priset varierar med behandling, klinik och hur många gånger som krävs:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li><strong>Konsultationen</strong> är ofta kostnadsfri på estetikkliniker, medan en <strong>läkarundersökning hos hudläkare</strong> kan kosta (ofta i storleksordningen 1 000–1 500 kr).</li>
                            <li><strong>Klinikbehandlingar mot ärr</strong> (microneedling, laser, peeling) ligger vanligtvis på några hundra till några tusen kronor per gång, och ges i <strong>serier om 3–6 behandlingar</strong>.</li>
                            <li><strong>Receptbelagd behandling</strong> hanteras via vården och omfattas i regel av vanliga vårdavgifter och läkemedelsförmån.</li>
                        </ul>
                        <p>
                            Räkna med totalkostnaden för en hel serie snarare än priset per gång. För detaljerade prisspann på enskilda behandlingar, se våra guider till <Link href="/blogg/ansiktsbehandling-den-kompletta-guiden" className="text-primary hover:underline font-medium">ansiktsbehandling</Link> och <Link href="/blogg/anti-aging-behandling" className="text-primary hover:underline font-medium">anti-aging behandling</Link>.
                        </p>

                        {/* Section 7 */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="valja">7. Så väljer du klinik för aknebehandling</h2>
                        <p>
                            För aktiv, svår akne är hudläkare rätt väg. För ärrbehandling och kompletterande hudvård väljer du en seriös estetik- eller hudklinik. Kontrollera att kliniken har <strong>legitimerad personal</strong>, är <strong>registrerad hos IVO</strong>, och att du får en <strong>konsultation och hudanalys</strong> innan behandling. Var skeptisk mot löften om att helt ta bort ärr.
                        </p>
                        <p>
                            Läs vår guide <Link href="/blogg/estetisk-klinik" className="text-primary hover:underline font-medium">Så väljer du en seriös estetisk klinik</Link> för en komplett checklista, och <Link href="/behandlingar/hudvard" className="text-primary hover:underline font-medium">jämför hud- och aknekliniker i din stad</Link> på battrehy.se.
                        </p>

                        {/* Section 8 - FAQ */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="faq">8. Vanliga frågor</h2>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">Vad är bästa behandlingen mot akne?</h4>
                                <p className="text-gray-700 mt-1">Det beror på typ och svårighetsgrad. Mild akne svarar ofta på receptfri hemmavård (benzoylperoxid, salicylsyra, azelainsyra), medan måttlig till svår akne kan behöva receptbelagd behandling via läkare. Det finns ingen enda behandling som passar alla.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">Kan man bli av med akneärr helt?</h4>
                                <p className="text-gray-700 mt-1">Sällan helt, men de kan ofta förbättras tydligt. Nedsjunkna ärr behandlas med t.ex. microneedling, laser, peeling eller subcision, oftast i en serie.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">Vilken behandling är bäst mot akneärr?</h4>
                                <p className="text-gray-700 mt-1">Det beror på ärrtypen. Bruna och röda märken svarar på uppljusande hudvård, peeling och IPL/laser, medan nedsjunkna ärr behandlas med microneedling, fraktionerad laser, subcision eller filler. En kombination ger ofta bäst resultat.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">När ska man söka läkare för akne?</h4>
                                <p className="text-gray-700 mt-1">Vid måttlig till svår, djup eller cystisk akne, akne som lämnar ärr, eller när receptfri behandling inte hjälpt efter några månader. Även akne som påverkar måendet är skäl att söka vård.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">Hjälper hudvård hemma mot akne?</h4>
                                <p className="text-gray-700 mt-1">Ja, vid mild akne. Icke-komedogena produkter med benzoylperoxid, salicylsyra, azelainsyra eller retinoider kan göra stor skillnad – men ge det tid och undvik att kombinera för många starka aktiva samtidigt.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">Kan man behandla aktiv akne och akneärr samtidigt?</h4>
                                <p className="text-gray-700 mt-1">Ofta fokuserar man först på att få aknen under kontroll, och behandlar sedan ärren. En hudterapeut eller läkare kan lägga upp ordningen.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">Får man ärr av att klämma finnar?</h4>
                                <p className="text-gray-700 mt-1">Att pilla och klämma ökar inflammationen och risken för bestående ärr och märken. Låt bli – och behandla i stället orsaken.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg">Hur lång tid tar det innan aknebehandling ger resultat?</h4>
                                <p className="text-gray-700 mt-1">De flesta behandlingar behöver tid: receptfri hemmavård 6–8 veckor, receptbelagd behandling ofta ännu längre, och klinikbehandlingar mot ärr ges i serier över flera månader. Snabba resultat är ovanliga – uthållighet lönar sig.</p>
                            </div>
                        </div>

                        {/* Section 9 - Källor */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="kallor">9. Källor</h2>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                            <li><a href="https://www.1177.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">1177 Vårdguiden</a> – Akne samt Läkemedel vid akne</li>
                            <li><a href="https://lakemedelsboken.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Läkemedelsboken</a> – Akne (acne vulgaris)</li>
                            <li><a href="https://praktiskmedicin.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Praktisk Medicin</a> / dermatologisk konsensus – behandling av akne och akneärr</li>
                            <li><a href="https://www.socialstyrelsen.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Socialstyrelsen</a> och <a href="https://www.ivo.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">IVO</a> – kompetenskrav och tillsyn för estetiska behandlingar (för klinikval)</li>
                        </ul>

                        {/* Directory CTA */}
                        <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6 sm:p-8 my-10 text-center">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Vill du få hjälp med din hud?</h3>
                            <p className="text-gray-600 mb-6 max-w-xl mx-auto text-sm sm:text-base">
                                Jämför certifierade och verifierade hud- och skönhetskliniker i din stad för rådgivning och professionell aknebehandling.
                            </p>
                            <Link
                                href="/behandlingar/hudvard"
                                className="inline-flex items-center justify-center bg-primary text-white font-medium px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
                            >
                                Hitta hudkliniker nära dig
                            </Link>
                        </div>

                        {/* Bottom Disclaimer */}
                        <div className="mt-12 text-sm text-gray-500 italic border-t border-gray-200 pt-8">
                            Den här artikeln är framtagen av Battrehys redaktion i informationssyfte och utgör inte medicinsk rådgivning. Akne är ett medicinskt tillstånd – rådgör med läkare eller legitimerad personal för individuell bedömning och behandling.
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}
