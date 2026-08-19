import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SchemaScript } from '@/components/SchemaScript';
import { buildBreadcrumbSchema, buildArticleSchema, buildFAQSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Rosacea – symtom, triggers och behandling',
    description: 'Vad är rosacea och vad hjälper mot rodnaden? Guide till symtom, triggers, skonsam hudvård, medicinsk behandling och IPL/laser – och när du bör söka läkare.',
    alternates: {
        canonical: 'https://battrehy.se/blogg/rosacea',
    },
    openGraph: {
        title: 'Rosacea – symtom, triggers och behandling',
        description: 'Vad är rosacea och vad hjälper mot rodnaden? Guide till symtom, triggers, skonsam hudvård, medicinsk behandling och IPL/laser – och när du bör söka läkare.',
        type: 'article',
        locale: 'sv_SE',
        url: 'https://battrehy.se/blogg/rosacea',
        images: [
            {
                url: 'https://battrehy.se/images/blogg/rosacea-hero.webp',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Rosacea – symtom, triggers och behandling',
        description: 'Vad är rosacea och vad hjälper mot rodnaden? Guide till symtom, triggers, skonsam hudvård, medicinsk behandling och IPL/laser – och när du bör söka läkare.',
        images: ['https://battrehy.se/images/blogg/rosacea-hero.webp'],
    }
};

export default function BlogPost() {
    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Hem', url: 'https://battrehy.se' },
            { name: 'Blogg', url: 'https://battrehy.se/blogg' },
            { name: 'Rosacea', url: 'https://battrehy.se/blogg/rosacea' }
        ]),
        buildArticleSchema({
            headline: "Rosacea: symtom, triggers och behandlingar som hjälper",
            description: "Vad är rosacea och vad hjälper mot rodnaden? Guide till symtom, triggers, skonsam hudvård, medicinsk behandling och IPL/laser – och när du bör söka läkare.",
            datePublished: "2026-07-28T08:00:00+02:00",
            dateModified: "2026-07-28T08:00:00+02:00",
            imageUrl: "https://battrehy.se/images/blogg/rosacea-hero.webp",
            pageUrl: "https://battrehy.se/blogg/rosacea"
        }),
        buildFAQSchema([
            { question: "Vad är rosacea?", answer: "En kronisk inflammatorisk hudsjukdom i mittansiktet som ger rodnad, synliga blodkärl och ibland knottror. Den är vanlig, går inte att bota men kan hållas i schack." },
            { question: "Hur skiljer sig rosacea från akne?", answer: "Rosacea ger rodnad, kärl och sveda men inga pormaskar, och sitter centralt i ansiktet. Akne kännetecknas av pormaskar och finnar. Man kan ha båda – låt en läkare avgöra." },
            { question: "Vad hjälper mot rodnaden vid rosacea?", answer: "Mot bestående rodnad och synliga kärl är IPL och vaskulär laser mest effektivt. Rätt hudvård och medicinsk behandling dämpar inflammation och knottror, och solskydd förebygger uppblossning." },
            { question: "Kan man bli av med rosacea helt?", answer: "Nej, rosacea är kronisk och kan inte botas – men den kan ofta kontrolleras väl med rätt kombination av egenvård, medicinsk behandling och eventuellt laser eller IPL." },
            { question: "Vilka triggers bör jag undvika?", answer: "Vanliga triggers är sol, värme, alkohol (särskilt rödvin), stark mat, stress och hård hudvård. De är individuella, så det hjälper att kartlägga vad just du reagerar på." },
            { question: "När ska jag söka läkare?", answer: "Vid återkommande rodnad med knottror, ögonbesvär, eller om egenvård inte räcker. Rosacea bör diagnostiseras av läkare, som också kan skriva ut effektiv behandling." }
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
                            Rosacea: symtom, triggers och behandlingar som hjälper
                        </h1>
                        <div className="flex items-center text-gray-500 text-sm mb-4">
                            <span className="font-medium">Av Battrehys redaktion</span>
                            <span className="mx-2">·</span>
                            <span>Publicerad 28 juli 2026</span>
                        </div>
                        <div className="flex flex-col gap-1 text-gray-500 text-sm mb-8 border-t border-gray-100 pt-4">
                            <div>
                                Granskad av Battrehys redaktion enligt våra <Link href="/om-redaktionen" className="text-primary hover:underline font-medium">redaktionella riktlinjer</Link>.
                            </div>
                            <div>
                                Senast uppdaterad: 28 juli 2026
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 mb-10 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/rosacea-hero.webp" 
                                alt="Person med naturlig, lätt ansiktsrodnad" 
                                className="w-full h-auto object-cover max-h-[500px]"
                                width={1600}
                                height={893}
                                fetchPriority="high"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">Rosacea ger rodnad i mittansiktet – vanligt, kroniskt, men fullt hanterbart.</p>
                        </div>
                    </header>

                    <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                        <p>
                            Rosacea är en vanlig, kronisk hudåkomma som ger rodnad och ibland knottror i ansiktet – och som ofta misstas för akne eller &quot;känslig hud&quot;. Den går inte å bota, men den går att hålla i schack. Den här guiden förklarar symtom och triggers, vilken hudvård som hjälper, vilka medicinska behandlingar som finns, och när IPL och laser kan dämpa rodnaden – samt när du bör söka läkare. Vi är en oberoende katalog, inte en klinik, så du får en neutral översikt.
                        </p>

                        <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl my-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Viktigt:</h2>
                            <p className="text-gray-700 text-sm sm:text-base">
                                Rosacea är en medicinsk hudsjukdom. Den här artikeln är allmän information, inte medicinsk rådgivning. För diagnos och receptbelagd behandling – kontakta läkare eller hudläkare.
                            </p>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl my-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Det viktigaste i korthet (TL;DR)</h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li><strong>Rosacea ger rodnad, synliga blodkärl och ibland knottror</strong> i mittansiktet – men <strong>inga pormaskar</strong> (till skillnad från akne).</li>
                                <li>Den är <strong>kronisk men hanterbar</strong>: identifiera triggers, var snäll mot huden och använd solskydd.</li>
                                <li><strong>Medicinsk behandling</strong> (via läkare) hjälper mot knottror och inflammation.</li>
                                <li><strong>IPL och laser</strong> är effektivast mot <strong>kvarstående rodnad och synliga kärl</strong>.</li>
                                <li><strong>Solen är den vanligaste triggern</strong> – dagligt solskydd är grundläggande.</li>
                            </ul>
                        </div>

                        <nav className="bg-gray-50 border border-gray-200 p-6 rounded-2xl mb-12">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Innehåll</h2>
                            <ul className="space-y-2 text-gray-700">
                                <li><a href="#vad" className="text-primary hover:underline font-medium">1. Vad är rosacea?</a></li>
                                <li><a href="#symtom" className="text-primary hover:underline font-medium">2. Symtom och typer (och rosacea vs akne)</a></li>
                                <li><a href="#triggers" className="text-primary hover:underline font-medium">3. Vad triggar rosacea?</a></li>
                                <li><a href="#hudvard" className="text-primary hover:underline font-medium">4. Skonsam hudvård vid rosacea</a></li>
                                <li><a href="#vard" className="text-primary hover:underline font-medium">5. Medicinsk behandling – när du bör söka vård</a></li>
                                <li><a href="#ipl" className="text-primary hover:underline font-medium">6. IPL och laser mot rodnad och kärl</a></li>
                                <li><a href="#leva" className="text-primary hover:underline font-medium">7. Att leva med rosacea</a></li>
                                <li><a href="#faq" className="text-primary hover:underline font-medium">8. Vanliga frågor</a></li>
                                <li><a href="#kallor" className="text-primary hover:underline font-medium">9. Källor</a></li>
                            </ul>
                        </nav>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="vad">Vad är rosacea?</h2>
                        <p>
                            Rosacea är en kronisk inflammatorisk hudsjukdom som främst drabbar mittansiktet – kinder, näsa, panna och haka. Den börjar ofta som lätt rodnad eller en tendens att lätt bli röd i ansiktet (&quot;flushing&quot;), och kan med tiden utvecklas till bestående rodnad, synliga blodkärl och i vissa fall knottror.
                        </p>
                        <p>
                            Rosacea är vanligast hos vuxna mellan 30 och 50 år och något vanligare hos kvinnor och personer med ljus hud, men den kan drabba alla. Den exakta orsaken är inte helt klarlagd, men immunförsvar, blodkärl och ärftlighet tros spela in. Det är viktigt att veta att rosacea <strong>inte</strong> beror på dålig hygien och <strong>inte</strong> är smittsamt.
                        </p>
                        <p>
                            Rosacea är vanligare än många tror – uppskattningsvis flera procent av vuxna berörs – men den är också underdiagnostiserad, eftersom tidiga symtom lätt avfärdas som &quot;känslig hud&quot; eller att man &quot;rodnar lätt&quot;. Att känna igen den tidigt gör den lättare att hålla i schack.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="symtom">Symtom och typer (och rosacea vs akne)</h2>
                        <p>
                            Rosacea ser olika ut hos olika personer och delas ofta in efter dominerande symtom:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Rodnad och kärl:</strong> ihållande rodnad och synliga, utvidgade blodkärl (telangiektasier).</li>
                            <li><strong>Knottror och utslag:</strong> röda, ibland varfyllda utslag som kan likna finnar.</li>
                            <li><strong>Ögonrosacea:</strong> torra, irriterade eller röda ögon – ska bedömas av läkare.</li>
                            <li><strong>Förtjockad hud (rhinophyma):</strong> ovanligt, syns främst som förtjockad hud på näsan, oftast hos män.</li>
                        </ul>
                        <p>
                            <strong>Rosacea eller akne?</strong> De förväxlas lätt, men skiljer sig åt: rosacea ger rodnad, kärl och sveda men <strong>inga pormaskar</strong>, och sitter centralt i ansiktet. Akne kännetecknas av pormaskar och finnar kopplade till talg och täppta porer. Man kan ha båda samtidigt, vilket är ett skäl att låta en läkare ställa diagnos. (Läs mer i vår guide till <Link href="/blogg/aknebehandling" className="text-primary hover:underline">aknebehandling</Link>.)
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="triggers">Vad triggar rosacea?</h2>
                        <p>
                            En stor del av att leva med rosacea handlar om att känna igen och undvika sina personliga triggers – det som får huden att blossa upp. De vanligaste:
                        </p>

                        <div className="overflow-x-auto w-full border border-gray-200 rounded-xl my-6">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-bold text-gray-900">Trigger</th>
                                        <th className="px-4 py-3 text-left font-bold text-gray-900">Tips</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-gray-700 bg-white">
                                    <tr>
                                        <td className="px-4 py-3 font-semibold">Sol och UV</td>
                                        <td className="px-4 py-3">Dagligt solskydd (gärna mineraliskt), skugga och hatt</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-semibold">Värme, bastu, heta bad</td>
                                        <td className="px-4 py-3">Undvik stark värme; sval miljö</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-semibold">Kyla och vind</td>
                                        <td className="px-4 py-3">Skydda huden med en barriärstärkande kräm</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-semibold">Alkohol (särskilt rödvin)</td>
                                        <td className="px-4 py-3">Begränsa och notera din egen reaktion</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-semibold">Stark, kryddad mat och varma drycker</td>
                                        <td className="px-4 py-3">Identifiera vad just du reagerar på</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-semibold">Stress och sömnbrist</td>
                                        <td className="px-4 py-3">Stresshantering och regelbunden sömn</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-semibold">Hård hudvård (skrubb, alkohol, parfym)</td>
                                        <td className="px-4 py-3">Byt till milda, parfymfria produkter</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            Triggers är individuella – för många hjälper det att föra en enkel dagbok en tid för att se mönster.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="hudvard">Skonsam hudvård vid rosacea</h2>
                        <p>
                            Rosacea-hud är känslig, så mindre är mer. Målet är att stärka hudbarriären och undvika irritation:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Mild, parfymfri rengöring</strong> med ljummet (inte hett) water.</li>
                            <li><strong>Barriärstärkande fuktkräm</strong> med t.ex. ceramider och niacinamid.</li>
                            <li><strong>Azelainsyra</strong> tolereras ofta väl och kan minska både rodnad och knottror.</li>
                            <li><strong>Dagligt solskydd</strong> – mineraliskt (zink/titan) upplevs ofta som skonsammare.</li>
                            <li><strong>Undvik</strong> skrubb, starka syror, alkoholbaserade produkter och till en början starka retinoider.</li>
                        </ul>
                        <p>
                            Introducera nya produkter en i taget och testa på en liten yta först. Vår <Link href="/blogg/hudvardsrutin" className="text-primary hover:underline">guide till hudvårdsrutin</Link> (avsnittet om känslig hud) ger en grund att utgå från.
                        </p>
                        <p>
                            Tänk också på att även &quot;snälla&quot; aktiva ingredienser kan reta rosacea-hud i början – introducera långsamt och backa om huden svider eller blossar upp. Undvik att experimentera med många nya produkter samtidigt, och var extra försiktig under pågående skov.
                        </p>

                        {/* Image 2 */}
                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/rosacea-hudvard.webp" 
                                alt="Person applicerar mild fuktkräm på känslig hud" 
                                className="w-full h-auto object-cover max-h-96"
                                width={1600}
                                height={1073}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">Mild, parfymfri hudvård och dagligt solskydd är grunden vid rosacea.</p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="vard">Medicinsk behandling – när du bör söka vård</h2>
                        <p>
                            Eftersom rosacea är en medicinsk diagnos bör den bedömas av läkare eller hudläkare, särskilt vid knottror, ögonbesvär eller om egenvård inte räcker. Det finns effektiv receptbelagd behandling, och ju tidigare den sätts in desto bättre.
                        </p>
                        <p>
                            Beroende på symtom kan läkare ordinera behandlingar i form av krämer/geler mot inflammation och knottror, läkemedel som tillfälligt drar ihop blodkärlen och dämpar rodnaden, eller tabletter i lågdos med antiinflammatorisk effekt vid mer uttalade besvär. Vid ögonrosacea behövs särskild bedömning. Exakt val är alltid en medicinsk fråga – för en översikt av läkemedel vid rosacea hänvisar vi till 1177 och Läkemedelsboken (se Källor). <strong>Sök vård</strong> om du har återkommande rodnad med knottror, ögonbesvär, eller om besvären påverkar ditt mående.
                        </p>

                        {/* Image 3 */}
                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/rosacea-konsultation.webp" 
                                alt="Hudläkare undersöker ansiktshud vid en konsultation" 
                                className="w-full h-auto object-cover max-h-96"
                                width={1600}
                                height={1073}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">Rosacea bör diagnostiseras av läkare, som kan sätta in effektiv behandling tidigt.</p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="ipl">IPL och laser mot rodnad och kärl</h2>
                        <p>
                            En sak som krämer och tabletter ofta inte kommer åt är <strong>den bestående rodnaden och de synliga blodkärlen</strong>. Där är <strong>IPL (intensivt pulserande ljus)</strong> och <strong>vaskulär laser</strong> förstahandsval: ljuset riktar in sig på de utvidgade kärlen och minskar rodnaden.
                        </p>
                        <p>
                            Det här är den del av rosaceabehandlingen som ofta sker på estetik- eller hudkliniker. Bra att veta:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Behandlingen ges vanligtvis i en <strong>serie</strong> (ofta 3–5 gånger), med underhåll vid behov.</li>
                            <li>Det <strong>botar inte</strong> rosacea, men kan minska rodnad och kärl tydligt.</li>
                            <li>Fungerar bäst i kombination med rätt hemmavård, medicinsk behandling och trigger-koll.</li>
                        </ul>
                        <p>
                            Vaskulär laser och IPL kompletterar alltså den medicinska behandlingen – de ersätter den inte. En seriös klinik samarbetar gärna med din läkares bedömning.
                        </p>
                        <p>
                            <strong>Att välja klinik för IPL/laser:</strong> välj en mottagning med utbildad, erfaren personal och rätt utrustning för kärlbehandling. Hud- och injektionsverksamheter står under IVO:s tillsyn, medan laser och IPL lyder under Strålsäkerhetsmyndigheten – be gärna om att få veta hur kliniken uppfyller kraven. En bra klinik börjar med konsultation och en testbehandling och har realistiska förväntningar. Se vår guide <Link href="/blogg/estetisk-klinik" className="text-primary hover:underline">Så väljer du en seriös estetisk klinik</Link>, och <Link href="/behandlingar/hudterapeut" className="text-primary hover:underline font-medium">jämför hud- och laserkliniker på battrehy.se</Link>.
                        </p>

                        {/* Image 4 */}
                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/rosacea-ipl.webp" 
                                alt="IPL- eller laserbehandling mot ansiktsrodnad på en klinik" 
                                className="w-full h-auto object-cover max-h-96"
                                width={1600}
                                height={893}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">IPL och vaskulär laser är effektivast mot kvarstående rodnad och synliga kärl.</p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="leva">Att leva med rosacea</h2>
                        <p>
                            Rosacea är kronisk, men de allra flesta kan få god kontroll över sina symtom med rätt strategi: känn dina triggers, skydda dig mot sol, håll hudvården mild och konsekvent, och kombinera med medicinsk behandling och eventuellt IPL/laser vid behov. Ha realistiska förväntningar – målet är att dämpa och kontrollera, inte att bli av med rosacean helt. Många upplever att besvären går i skov, med bättre och sämre perioder.
                        </p>
                        <p>
                            Om rodnaden påverkar självkänslan är du inte ensam – prata med din läkare, det finns hjälp att få både medicinskt och för det yttre.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="faq">Vanliga frågor</h2>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-gray-900">Vad är rosacea?</h4>
                                <p className="text-gray-700 mt-1">En kronisk inflammatorisk hudsjukdom i mittansiktet som ger rodnad, synliga blodkärl och ibland knottror. Den är vanlig, går inte att bota men kan hållas i schack.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Hur skiljer sig rosacea från akne?</h4>
                                <p className="text-gray-700 mt-1">Rosacea ger rodnad, kärl och sveda men inga pormaskar, och sitter centralt i ansiktet. Akne kännetecknas av pormaskar och finnar. Man kan ha båda – låt en läkare avgöra.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Vad hjälper mot rodnaden vid rosacea?</h4>
                                <p className="text-gray-700 mt-1">Mot bestående rodnad och synliga kärl är IPL och vaskulär laser mest effektivt. Rätt hudvård och medicinsk behandling dämpar inflammation och knottror, och solskydd förebygger uppblossning.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Kan man bli av med rosacea helt?</h4>
                                <p className="text-gray-700 mt-1">Nej, rosacea är kronisk och kan inte botas – men den kan ofta kontrolleras väl med rätt kombination av egenvård, medicinsk behandling och eventuellt laser/IPL.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Vilka triggers bör jag undvika?</h4>
                                <p className="text-gray-700 mt-1">Vanliga triggers är sol, värme, alkohol (särskilt rödvin), stark mat, stress och hård hudvård. De är individuella, så det hjälper att kartlägga vad just du reagerar på.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">När ska jag söka läkare?</h4>
                                <p className="text-gray-700 mt-1">Vid återkommande rodnad med knottror, ögonbesvär, eller om egenvård inte räcker. Rosacea bör diagnostiseras av läkare, som också kan skriva ut effektiv behandling.</p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="kallor">Källor</h2>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                            <li><a href="https://www.1177.se" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">1177 Vårdguiden</a> – Rosacea (rosaceados)</li>
                            <li><a href="https://www.internetmedicin.se" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Internetmedicin / Läkemedelsboken</a> – rosacea, diagnos och behandling</li>
                            <li>Dermatologisk konsensus – IPL och vaskulär laser vid rodnad och telangiektasier</li>
                        </ul>

                        <div className="mt-12 text-sm text-gray-500 italic border-t border-gray-200 pt-8">
                            Den här artikeln är framtagen av Battrehys redaktion i informationssyfte och utgör inte medicinsk rådgivning. Rosacea är en medicinsk hudsjukdom – rådgör med läkare eller hudläkare för diagnos och behandling.
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}
