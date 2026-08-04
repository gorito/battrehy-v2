import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SchemaScript } from '@/components/SchemaScript';
import { buildBreadcrumbSchema, buildArticleSchema, buildFAQSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Pigmentfläckar – orsaker, behandling och hur du blir av med dem',
    description: 'Vad hjälper mot pigmentfläckar, hyperpigmentering och melasma? Guide till orsaker, hemmavård, laser/IPL och peeling – plus när en fläck bör visas för läkare.',
    alternates: {
        canonical: 'https://battrehy.se/blogg/pigmentflackar',
    },
    openGraph: {
        title: 'Pigmentfläckar – orsaker, behandling och hur du blir av med dem',
        description: 'Vad hjälper mot pigmentfläckar, hyperpigmentering och melasma? Guide till orsaker, hemmavård, laser/IPL och peeling – plus när en fläck bör visas för läkare.',
        type: 'article',
        locale: 'sv_SE',
        url: 'https://battrehy.se/blogg/pigmentflackar',
        images: [
            {
                url: 'https://battrehy.se/images/blogg/pigmentflackar-hero.webp',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pigmentfläckar – orsaker, behandling och hur du blir av med dem',
        description: 'Vad hjälper mot pigmentfläckar, hyperpigmentering och melasma? Guide till orsaker, hemmavård, laser/IPL och peeling – plus när en fläck bör visas för läkare.',
        images: ['https://battrehy.se/images/blogg/pigmentflackar-hero.webp'],
    }
};

export default function BlogPost() {
    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Hem', url: 'https://battrehy.se' },
            { name: 'Blogg', url: 'https://battrehy.se/blogg' },
            { name: 'Pigmentfläckar', url: 'https://battrehy.se/blogg/pigmentflackar' }
        ]),
        buildArticleSchema({
            headline: "Pigmentfläckar: orsaker och behandlingar som fungerar",
            description: "Vad hjälper mot pigmentfläckar, hyperpigmentering och melasma? Guide till orsaker, hemmavård, laser/IPL och peeling – plus när en fläck bör visas för läkare.",
            datePublished: "2026-07-27T08:00:00+02:00",
            dateModified: "2026-07-27T08:00:00+02:00",
            imageUrl: "https://battrehy.se/images/blogg/pigmentflackar-hero.webp",
            pageUrl: "https://battrehy.se/blogg/pigmentflackar"
        }),
        buildFAQSchema([
            { question: "Vad beror pigmentfläckar på?", answer: "På en överproduktion av melanin, som oftast triggas av UV-strålning, hormoner (som vid melasma) eller inflammation (som märken efter akne). Solen är den vanligaste och viktigaste faktorn." },
            { question: "Kan man bli av med pigmentfläckar helt?", answer: "Ytliga solskador och åldersfläckar går ofta att ljusa upp tydligt eller ta bort med rätt behandling. Melasma är svårare och handlar mer om att dämpa och kontrollera. Solskydd är avgörande för att resultatet ska hålla." },
            { question: "Vad är bästa behandlingen mot pigmentfläckar?", answer: "Det beror på typen. Solskador svarar bra på IPL, pigmentlaser och peeling; PIH på azelainsyra och peeling; melasma på skonsamma program snarare än aggressiv laser. En hudanalys avgör vad som passar." },
            { question: "Fungerar uppljusande hudvård?", answer: "Ja, för ytliga fläckar – ingredienser som C-vitamin, niacinamid, azelainsyra, AHA och retinoider kan jämna ut hudtonen över flera månader, förutsatt att du använder solskydd samtidigt." },
            { question: "Kan laser ta bort pigmentfläckar – och gäller det även melasma?", answer: "Laser och IPL fungerar bra mot ytliga solskador, men vid melasma bör man vara försiktig eftersom aggressiv laser kan förvärra melasma. Där är milda program och strikt solskydd ofta ett bättre val." },
            { question: "Varför kommer melasma tillbaka?", answer: "För att de bakomliggande orsakerna – hormoner och sol – finns kvar. Melasma kan dämpas men återkommer ofta, särskilt utan konsekvent solskydd." },
            { question: "Hur vet jag om en pigmentfläck är farlig och bör visas för läkare?", answer: "Använd ABCDE-regeln: asymmetri, oregelbunden kant, flera färger, diameter över ca 6 mm, och förändring över tid. En fläck som förändras, kliar eller blöder bör alltid bedömas av läkare." },
            { question: "Hur förebygger jag pigmentfläckar?", answer: "Dagligt solskydd är det mest effektiva, kompletterat med hatt och skugga. Antioxidanter som C-vitamin kan ge extra skydd, och att behandla akne tidigt minskar risken för märken." }
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
                            Pigmentfläckar: orsaker och behandlingar som fungerar
                        </h1>
                        <div className="flex items-center text-gray-500 text-sm mb-8">
                            <span className="font-medium">Av Battrehys redaktion</span>
                            <span className="mx-2">·</span>
                            <span>Publicerad juli 2026</span>
                        </div>

                        {/* Main article image - BILD 1 */}
                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 mb-10 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/pigmentflackar-hero.webp" 
                                alt="Kvinna i 40-årsåldern med naturlig hud och lätta solfläckar" 
                                className="w-full h-auto object-cover max-h-[500px]"
                                width={1600}
                                height={893}
                                fetchPriority="high"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">De flesta pigmentfläckar är ofarliga – men envisa. Solskydd är grunden i all behandling.</p>
                        </div>
                    </header>

                    <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                        <p>
                            Pigmentfläckar är ett av de vanligaste hudbesvären – och ett av de mest envisa. De flesta är helt ofarliga, men de kan vara svåra att bli av med, och fel behandling kan ibland göra dem värre. Den här guiden går igenom varför pigmentfläckar uppstår, vad du kan göra själv, vilka professionella behandlingar som fungerar för olika typer – och när en fläck bör visas för läkare. Vi är en oberoende katalog, inte en klinik eller butik, så du får en neutral översikt utan produktförsäljning.
                        </p>

                        <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl my-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Säkerhetsnotis</h2>
                            <p className="text-gray-700 text-sm">
                                De allra flesta pigmentfläckar är ofarliga. Melanaom-medvetenhet (ABCDE-regeln) är dock viktig. En fläck eller ett födelsemärke som <strong>förändras</strong> – i storlek, form eller färg – bör alltid visas för läkare. Mer om det längre ner.
                            </p>
                        </div>

                        <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl my-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Snabb checklista (TL;DR)</h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li><strong>Solen är den största orsaken</strong> – dagligt solskydd är både förebyggande och en del av behandlingen.</li>
                                <li><strong>Hemmavård</strong> med uppljusande ingredienser (C-vitamin, niacinamid, azelainsyra, AHA, retinoider) kan ljusa upp – men tar tid.</li>
                                <li><strong>Professionella behandlingar:</strong> IPL, laser och kemisk peeling – valet beror på typ av fläck.</li>
                                <li><strong>Melasma är svårare</strong> – det återkommer ofta och kan förvärras av aggressiv laser och värme.</li>
                                <li><strong>Mörkare hud</strong> kräver extra försiktighet vid laser och peeling.</li>
                            </ul>
                        </div>

                        <nav className="bg-gray-50 border border-gray-200 p-6 rounded-2xl mb-12">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Innehåll</h2>
                            <ul className="space-y-2 text-gray-700">
                                <li><a href="#vad" className="text-primary hover:underline">1. Vad är pigmentfläckar och varför uppstår de?</a></li>
                                <li><a href="#forebygg" className="text-primary hover:underline">2. Förebygg: solskydd är viktigast</a></li>
                                <li><a href="#hemma" className="text-primary hover:underline">3. Hemmavård: uppljusande ingredienser</a></li>
                                <li><a href="#behandlingar" className="text-primary hover:underline">4. Professionella behandlingar</a></li>
                                <li><a href="#melasma" className="text-primary hover:underline">5. Melasma och mörkare hud – extra försiktighet</a></li>
                                <li><a href="#vard" className="text-primary hover:underline">6. När ska du söka läkare?</a></li>
                                <li><a href="#pris" className="text-primary hover:underline">7. Kostnad och att välja klinik</a></li>
                                <li><a href="#faq" className="text-primary hover:underline">8. Vanliga frågor</a></li>
                                <li><a href="#kallor" className="text-primary hover:underline">9. Källor</a></li>
                            </ul>
                        </nav>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="vad">Vad är pigmentfläckar och varför uppstår de?</h2>
                        <p>
                            Pigmentfläckar beror på att huden bildar för mycket <strong>melanin</strong> – det pigment som ger huden dess färg – på vissa ställen. Överproduktionen triggas oftast av UV-strålning, hormoner eller inflammation. De blir vanligare med åldern och hos den som exponerats mycket för sol, men kan uppstå i alla åldrar. De allra flesta är helt ofarliga och främst ett kosmetiskt bekymmer. Det finns flera olika typer, och eftersom de behandlas olika är det bra att veta vilken du har:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Solskador och åldersfläckar (lentigo solaris)</strong> – bruna, skarpt avgränsade fläckar som byggs upp av års solexponering. Vanliga i ansiktet, på händer och dekolletage. Ofarliga.</li>
                            <li><strong>Melasma</strong> – större, oftast symmetriska bruna partier på kinder, panna och överläpp. Drivs av en kombination av hormoner (graviditet, p-piller) och sol, och är vanligare hos kvinnor. Den svåraste typen att behandla.</li>
                            <li><strong>Postinflammatorisk hyperpigmentering (PIH)</strong> – bruna märken som blir kvar efter akne, eksem eller annan hudirritation. Vanligare och mer långvarig i mörkare hud.</li>
                            <li><strong>Fräknar</strong> – små, ärftligt betingade fläckar som mörknar i solen. Ofarliga.</li>
                        </ul>
                        <p>
                            Gemensamt för de flesta är att <strong>solen förvärrar dem</strong> – vilket är varför solskydd är själva grunden i all behandling.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="forebygg">Förebygg: solskydd är viktigast</h2>
                        <p>
                            Det låter enkelt, men det är sant: <strong>det mest effektiva du kan göra mot pigmentfläckar är att skydda huden mot solen.</strong> UV-strålning både skapar nya fläckar och gör befintliga mörkare – och den motverkar i stort sett all behandling om du inte skyddar dig samtidigt.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Använd ett <strong>brett solskydd (SPF 30–50)</strong> varje dag, året runt.</li>
                            <li>Återapplicera under soliga dagar och komplettera med hatt och skugga.</li>
                            <li>Tänk på att UV-strålning tränger igenom fönster och moln.</li>
                        </ul>
                        <p>
                            Utan konsekvent solskydd kommer även dyra klinikbehandlingar att ge kortvariga resultat. Ser du solskyddet som en investering snarare än ett extra steg blir allt annat mer effektivt.
                        </p>
                        <p>
                            Solskydd är alltså inte bara förebyggande – det är en aktiv del av varje behandling. Ett tips är att lägga ett antioxidantserum (t.ex. C-vitamin) under solskyddet på morgonen; antioxidanter ger ett extra skydd mot den oxidativa stress som solen orsakar. Och kom ihåg att även kortare, vardaglig solexponering – promenaden till jobbet eller lunchen ute – summerar över tid.
                        </p>

                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/pigmentflackar-solskydd.webp" 
                                alt="Kvinna applicerar solskydd i dagsljus" 
                                className="w-full h-auto object-cover max-h-96"
                                width={1600}
                                height={1073}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">Dagligt solskydd är både det bästa förebyggandet och en aktiv del av varje behandling.</p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="hemma">Hemmavård: uppljusande ingredienser</h2>
                        <p>
                            Rätt hudvård kan ljusa upp ytliga pigmentfläckar och jämna ut hudtonen över tid. Effekten kommer gradvis – räkna med flera månader – och står och faller med att du använder solskydd samtidigt. Ingredienser med dokumenterad effekt:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>C-vitamin</strong> – antioxidant som ljusar upp och skyddar; används på morgonen.</li>
                            <li><strong>Niacinamid</strong> – jämnar ut hudton och stärker barriären, skonsam.</li>
                            <li><strong>Azelainsyra</strong> – bra mot både pigment och märken efter akne, tål känslig hud.</li>
                            <li><strong>AHA-syror</strong> (glykol-, mjölksyra) – exfolierar och påskyndar cellförnyelsen.</li>
                            <li><strong>Retinoider</strong> – ökar cellomsättningen och bleker pigment; används på kvällen.</li>
                            <li><strong>Alfa-arbutin, tranexamsyra och kojinsyra</strong> – riktade uppljusande ingredienser.</li>
                        </ul>
                        <p>
                            Ett tips: introducera en aktiv ingrediens i taget, och kombinera inte flera starka samtidigt i början. Vill du bygga en helhet hittar du vår <Link href="/blogg/hudvardsrutin" className="text-primary hover:underline">guide till hudvårdsrutin</Link>. Undvik oreglerade &quot;blekmedel&quot; köpta utomlands eller online – vissa innehåller ämnen som är olagliga i EU och kan skada huden.
                        </p>
                        <p>
                            Ha realistiska förväntningar: uppljusande hudvård arbetar långsamt och i hudens ytligare lager, ofta över three till six månader innan du ser tydlig skillnad. Överdriv inte heller – för mycket syror och exfoliering kan irritera huden och paradoxalt nog trigga <em>mer</em> pigmentering, särskilt i mörkare hud. Börja lugnt, en aktiv i taget, och bygg upp. Tålamod och konsekvens slår nästan alltid snabba, aggressiva kurer – och skonar huden på vägen.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="behandlingar">Professionella behandlingar</h2>
                        <p>
                            När hemmavården inte räcker kan en klinik erbjuda kraftfullare behandlingar. Vilken som passar beror helt på <strong>typ av fläck</strong>, hudton och hur djupt pigmentet sitter:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>IPL (intensivt pulserande ljus)</strong> – effektivt mot ytliga solskador och åldersfläckar. Passar inte melasma, som kan förvärras.</li>
                            <li><strong>Pigmentlaser (t.ex. Q-switched, Pico)</strong> – riktar sig mot pigment; bra mot solskador. Kräver försiktighet vid melasma och mörk hud.</li>
                            <li><strong>Kemisk peeling</strong> (AHA/TCA) – jämnar ton och struktur, bra mot PIH.</li>
                            <li><strong>Cosmelan och liknande depigmenteringsprogram</strong> – kombinerar klinikbehandling med hemmavård; ofta förstahandsval vid melasma.</li>
                            <li><strong>Microneedling</strong> – kan komplettera, särskilt vid PIH.</li>
                        </ul>

                        <div className="overflow-x-auto my-6 border border-gray-200 rounded-xl bg-white">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 text-left font-bold text-gray-900">Typ av fläck</th>
                                        <th scope="col" className="px-4 py-3 text-left font-bold text-gray-900">Vanliga behandlingar</th>
                                        <th scope="col" className="px-4 py-3 text-left font-bold text-gray-900">Bra att veta</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
                                    <tr>
                                        <td className="px-4 py-3 font-semibold text-gray-900">Solskador / åldersfläckar</td>
                                        <td className="px-4 py-3">IPL, pigmentlaser, kemisk peeling</td>
                                        <td className="px-4 py-3">Svarar oftast bra; solskydd avgörande efteråt</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-semibold text-gray-900">Melasma</td>
                                        <td className="px-4 py-3">Cosmelan/peeling, tranexamsyra, mild laser (försiktigt)</td>
                                        <td className="px-4 py-3">Kan förvärras av aggressiv laser/värme; återkommer</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-semibold text-gray-900">PIH (efter akne)</td>
                                        <td className="px-4 py-3">Azelainsyra, kemisk peeling, microneedling</td>
                                        <td className="px-4 py-3">Behandla först den bakomliggande aknen</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-semibold text-gray-900">Fräknar</td>
                                        <td className="px-4 py-3">Vanligtvis ingen behandling behövs</td>
                                        <td className="px-4 py-3">Ofarliga; solskydd om du vill dämpa dem</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            En seriös klinik börjar alltid med en hudanalys och en <strong>testbehandling</strong> på en liten yta innan hela området behandlas – särskilt viktigt vid melasma och mörkare hud. Många av metoderna används även i <Link href="/blogg/anti-aging-behandling" className="text-primary hover:underline">anti-aging- och hudföryngringssyfte</Link>.
                        </p>
                        <p>
                            De flesta pigmentbehandlingar ges i <strong>en serie</strong> (ofta 3–6 gånger) med några veckors mellanrum, och huden kan vara rosa eller tillfälligt mörkare precis efteråt innan pigmentet flagnar bort. <strong>Eftervården är minst lika viktig som behandlingen:</strong> noggrant solskydd och att undvika direkt sol efteråt – annars är risken stor dat fläckarna kommer tillbaka eller att nya bildas.
                        </p>

                        <p className="font-semibold text-gray-900">Vanliga misstag att undvika:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Att behandla utan att samtidigt skydda mot sol – det motverkar hela resultatet.</li>
                            <li>Att välja aggressiv laser mot melasma i tron att starkare är bättre.</li>
                            <li>Att hoppa över testbehandlingen, särskilt i mörkare hud.</li>
                            <li>Att jaga snabba resultat i stället för att följa en plan över tid.</li>
                        </ul>

                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/pigmentflackar-ipl-laser.webp" 
                                alt="Kliniker utför IPL- eller laserbehandling mot pigment, båda med skyddsglasögon" 
                                className="w-full h-auto object-cover max-h-96"
                                width={1600}
                                height={893}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">IPL och pigmentlaser passar bäst mot ytliga solskador – vid melasma krävs försiktighet.</p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="melasma">Melasma och mörkare hud – extra försiktighet</h2>
                        <p>
                            Två situationer förtjänar särskild uppmärksamhet, eftersom fel behandling kan göra mer skada än nytta.
                        </p>
                        <p>
                            <strong>Melasma</strong> är notoriskt svårbehandlad. Den drivs av hormoner och sol, återkommer ofta även efter lyckad behandling, och kan faktiskt <strong>förvärras av aggressiv laser och värme</strong>. Var därför skeptisk mot kliniker som lovar att &quot;ta bort&quot; melasma med laser. Realistisk hantering handlar mer om att dämpa och kontrollera: strikt solskydd, skonsamma uppljusande ingredienser (som tranexamsyra) och eventuellt milda peelingprogram – med tålamod. Många med melasma mår bäst av att se det som något man <em>hanterar</em> löpande, ungefär som en känslig hud, där dagligt solskydd är det viktigaste verktyget och behandlingarna stödjer snarare än forcerar.
                        </p>
                        <p>
                            <strong>Mörkare hudtoner</strong> har mer melanin och därmed högre risk för både PIH och komplikationer som brännskador eller nya pigmentförändringar vid laser och starka peelingar. Det betyder inte että behandling är omöjlig – men att den kräver rätt inställningar och en behandlare med dokumenterad erfarenhet av din hudtyp. Fråga alltid om erfarenhet, och insistera på en testbehandling.
                        </p>

                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/pigmentflackar-melaninrik-hud.webp" 
                                alt="Person med melanin-rik, strålande hud i mjukt ljus" 
                                className="w-full h-auto object-cover max-h-96"
                                width={1600}
                                height={1073}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">Mörkare hud har högre risk för pigmentförändringar – välj en klinik med dokumenterad erfarenhet av din hudtyp.</p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="vard">När ska du söka läkare?</h2>
                        <p>
                            De flesta pigmentfläckar är kosmetiska och ofarliga. Men huden är också där hudcancer syns – därför är det viktigt att kunna skilja en vanlig pigmentfläck från något som bör bedömas medicinskt.
                        </p>
                        <p className="font-semibold text-gray-900">Sök vård (vårdcentral eller hudläkare) om en fläck eller ett födelsemärke:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>A – Asymmetri:</strong> de två halvorna ser olika ut.</li>
                            <li><strong>B – Border:</strong> oregelbunden, taggig eller suddig kant.</li>
                            <li><strong>C – Color:</strong> flera färger eller ojämn färg.</li>
                            <li><strong>D – Diameter:</strong> större än ca 6 mm eller växande.</li>
                            <li><strong>E – Evolving:</strong> förändras över tid, kliar, blöder eller läker inte.</li>
                        </ul>
                        <p className="mt-2">
                            Kort sagt: <strong>en fläck som förändras eller sticker ut från dina andra bör visas för läkare.</strong> Det gäller oavsett om du planerar en kosmetisk behandling eller inte – och en seriös klinik hänvisar dig alltid vidare till vården om de ser något som bör bedömas.
                        </p>

                        <div className="bg-gray-50 border-l-4 border-primary p-6 mt-8 rounded-r-lg">
                            <h3 className="font-bold text-gray-900 mb-2">Hitta en klinik nära dig</h3>
                            <p className="text-gray-700 text-sm sm:text-base">
                                På <strong>battrehy.se</strong> samlar vi estetiska kliniker över hela Sverige och hjälper dig att hitta seriösa mottagningar nära dig. <Link href="/behandlingar/hudvard" className="text-primary hover:underline font-medium">Sök bland estetiska kliniker i din stad</Link> och jämför utbud, behandlingar och kontaktuppgifter på ett ställe.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="pris">Kostnad och att välja klinik</h2>
                        <p>
                            Priset beror på behandling, klinik och hur många gånger som krävs. IPL- och laserbehandlingar ligger ofta på runt 1 000–3 000 kr per gång och ges i serier, medan kemisk peeling kan börja lägre och depigmenteringsprogram som Cosmelan kostar mer eftersom de sträcker sig över tid. Konsultationen är ofta kostnadsfri.
                        </p>
                        <p>
                            Välj en klinik med <strong>legitimerad eller väl utbildad personal</strong>, som är <strong>registrerad hos IVO</strong>, och som erbjuder <strong>konsultation, hudanalys och testbehandling</strong> innan behandling. Var extra noga vid melasma och mörk hud. Läs vår guide <Link href="/blogg/estetisk-klinik" className="text-primary hover:underline font-medium">Så väljer du en seriös estetisk klinik</Link>, och <Link href="/behandlingar/hudvard" className="text-primary hover:underline font-medium">jämför hud- och laserkliniker i din stad</Link> på battrehy.se.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="faq">Vanliga frågor</h2>
                        <div className="space-y-6 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                            <div>
                                <h4 className="font-bold text-gray-900">Vad beror pigmentfläckar på?</h4>
                                <p className="text-gray-700 mt-1">På en överproduktion av melanin, som oftast triggas av UV-strålning, hormoner (som vid melasma) eller inflammation (som märken efter akne). Solen är den vanligaste och viktigaste faktorn.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Kan man bli av med pigmentfläckar helt?</h4>
                                <p className="text-gray-700 mt-1">Ytliga solskador och åldersfläckar går ofta å ljusa upp tydligt eller ta bort med rätt behandling. Melasma är svårare och handlar mer om att dämpa och kontrollera än att bota. Solskydd är avgörande för att resultatet ska hålla.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Vad är bästa behandlingen mot pigmentfläckar?</h4>
                                <p className="text-gray-700 mt-1">Det beror på typen. Solskador svarar bra på IPL, pigmentlaser och peeling; PIH på azelainsyra och peeling; melasma på skonsamma program snarare än aggressiv laser. En hudanalys avgör vad som passar.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Fungerar uppljusande hudvård?</h4>
                                <p className="text-gray-700 mt-1">Ja, för ytliga fläckar – ingredienser som C-vitamin, niacinamid, azelainsyra, AHA och retinoider kan jämna ut hudtonen över flera månader, förutsatt att du använder solskydd samtidigt.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Kan laser ta bort pigmentfläckar – och gäller det även melasma?</h4>
                                <p className="text-gray-700 mt-1">Laser och IPL fungerar bra mot ytliga solskador, men vid melasma bör man vara försiktig eftersom aggressiv laser kan förvärra melasma. Där är milda program och strikt solskydd ofta ett bättre val.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Varför kommer melasma tillbaka?</h4>
                                <p className="text-gray-700 mt-1">För att de bakomliggande orsakerna – hormoner och sol – finns kvar. Melasma kan dämpas men återkommer ofta, särskilt utan konsekvent solskydd.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Hur vet jag om en pigmentfläck är farlig och bör visas för läkare?</h4>
                                <p className="text-gray-700 mt-1">Använd ABCDE-regeln: asymmetri, oregelbunden kant, flera färger, diameter över ca 6 mm, och förändring över tid. En fläck som förändras, kliar eller blöder bör alltid bedömas av läkare.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Hur förebygger jag pigmentfläckar?</h4>
                                <p className="text-gray-700 mt-1">Dagligt solskydd är det mest effektiva, kompletterat med hatt och skugga. Antioxidanter som C-vitamin kan ge extra skydd, och att behandla akne tidigt minskar risken för märken.</p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="kallor">Källor och vidare läsning</h2>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                            <li><a href="https://www.1177.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">1177 Vårdguiden – Lentigo solaris (solfläckar) samt information om hudförändringar och malignt melanom</a></li>
                            <li>Läkemedelsboken / dermatologisk konsensus – hyperpigmentering och melasma</li>
                            <li>Socialstyrelsen och IVO – kompetenskrav och tillsyn för estetiska behandlingar (för klinikval)</li>
                        </ul>

                        <div className="mt-12 text-sm text-gray-500 italic border-t border-gray-200 pt-8">
                            Den här artikeln är framtagen av Battrehys redaktion i informationssyfte och utgör inte medicinsk rådgivning. Rådgör med läkare vid hudförändringar som oroar dig, och med legitimerad personal inför en behandling.
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}
