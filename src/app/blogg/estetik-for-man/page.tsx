import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SchemaScript } from '@/components/SchemaScript';
import { buildBreadcrumbSchema, buildArticleSchema, buildFAQSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Hudvård och estetiska behandlingar för män: en komplett guide (2026)',
    description: 'Hudvård och estetiska behandlingar för män: enkel hudvårdsrutin, botox och fillers med naturligt resultat, hår och hud – och hur du väljer rätt klinik.',
    alternates: {
        canonical: 'https://battrehy.se/blogg/estetik-for-man',
    },
    openGraph: {
        title: 'Hudvård och estetiska behandlingar för män: en komplett guide (2026)',
        description: 'Hudvård och estetiska behandlingar för män: enkel hudvårdsrutin, botox och fillers med naturligt resultat, hår och hud – och hur du väljer rätt klinik.',
        type: 'article',
        locale: 'sv_SE',
        url: 'https://battrehy.se/blogg/estetik-for-man',
        images: [
            {
                url: 'https://battrehy.se/images/blogg/estetik-for-man-hero.webp',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Hudvård och estetiska behandlingar för män: en komplett guide (2026)',
        description: 'Hudvård och estetiska behandlingar för män: enkel hudvårdsrutin, botox och fillers med naturligt resultat, hår och hud – och hur du väljer rätt klinik.',
        images: ['https://battrehy.se/images/blogg/estetik-for-man-hero.webp'],
    }
};

export default function BlogPost() {
    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Hem', url: 'https://battrehy.se' },
            { name: 'Blogg', url: 'https://battrehy.se/blogg' },
            { name: 'Hudvård och estetik för män', url: 'https://battrehy.se/blogg/estetik-for-man' }
        ]),
        buildArticleSchema({
            headline: "Hudvård och estetiska behandlingar för män",
            description: "Hudvård och estetiska behandlingar för män: enkel hudvårdsrutin, botox och fillers med naturligt resultat, hår och hud – och hur du väljer rätt klinik.",
            datePublished: "2026-07-28T08:00:00+02:00",
            dateModified: "2026-07-28T08:00:00+02:00",
            imageUrl: "https://battrehy.se/images/blogg/estetik-for-man-hero.webp",
            pageUrl: "https://battrehy.se/blogg/estetik-for-man"
        }),
        buildFAQSchema([
            { question: "Är estetiska behandlingar vanliga bland män?", answer: "Ja, och det ökar. Allt fler män väljer både hudvård och behandlingar som botox och fillers, oftast med målet att se piggare och mer utvilade ut – inte förändrade." },
            { question: "Är botox annorlunda för män?", answer: "Principen är densamma, men män behöver ofta en högre dos eftersom ansiktsmusklerna är starkare. Placering och dosering anpassas efter din anatomi och ditt mål." },
            { question: "Ser fillers och botox naturligt ut på män?", answer: "Ja, när de utförs av en skicklig behandlare med måttfull dosering. Målet är en definierad men naturlig look, inte ett \"gjort\" ansikte." },
            { question: "Vilken hudvård behöver män?", answer: "Grunden är rengöring, fuktkräm och solskydd, gärna kompletterat med retinol. Anpassa efter din hudtyp och var noga med att lugna huden efter rakning." },
            { question: "Vad kan man göra åt håravfall?", answer: "Alternativen sträcker sig från receptbelagda läkemedel och PRP till hårtransplantation. Vilket som passar beror på grad och orsak – rådgör med en klinik med erfarenhet av hår." },
            { question: "Hur väljer jag rätt klinik som man?", answer: "Välj en klinik med erfarenhet av manlig estetik, legitimerad personal (och IVO-registrering för injektioner), tydlig konsultation och realistiska löften." }
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
                            Hudvård och estetiska behandlingar för män
                        </h1>
                        <div className="flex items-center text-gray-500 text-sm mb-8">
                            <span className="font-medium">Av Battrehys redaktion</span>
                            <span className="mx-2">·</span>
                            <span>Publicerad 28 juli 2026</span>
                        </div>
                        
                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 mb-10 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/estetik-for-man-hero.webp" 
                                alt="Välvårdad man i 30-årsåldern med naturlig, frisk hud" 
                                className="w-full h-auto object-cover max-h-[500px]"
                                width={1600}
                                height={893}
                                fetchPriority="high"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">Allt fler män investerar i hud och utseende – oftast med målet att se piggare ut, inte förändrade.</p>
                        </div>
                    </header>

                    <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                        <p>
                            Fler män än någonsin bryr sig om sin hud och sitt utseende – och utbudet av behandlingar som riktar sig till män växer snabbt. Men vad är egentligen värt att lägga tid och pengar på? Den här guiden går igenom grunderna i hudvård för män, de vanligaste estetiska behandlingarna (botox, fillers, laser och mer), vad som är särskilt för just män – och hur du väljer en seriös klinik. Vi är en oberoende katalog, inte en klinik, så du får en neutral översikt.
                        </p>

                        <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl my-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Det viktigaste i korthet (TL;DR)</h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li><strong>Börja med grunden:</strong> en enkel hudvårdsrutin (rengöring, fukt, solskydd) gör mest skillnad över tid.</li>
                                <li><strong>Botox för män</strong> (&quot;brotox&quot;) kräver ofta högre dos – manliga muskler är starkare.</li>
                                <li><strong>Fillers</strong> används för naturlig förstärkning av käklinje och haka, inte för att förändra dig.</li>
                                <li><strong>Naturligt resultat</strong> är regel – de flesta män vill se piggare ut, inte &quot;gjorda&quot;.</li>
                                <li>Injektioner ska utföras av <strong>legitimerad personal</strong>; välj klinik med omsorg.</li>
                            </ul>
                        </div>

                        <nav className="bg-gray-50 border border-gray-200 p-6 rounded-2xl mb-12">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Innehåll</h2>
                            <ul className="space-y-2 text-gray-700">
                                <li><a href="#varfor" className="text-primary hover:underline">1. Estetik för män – varför nu?</a></li>
                                <li><a href="#hudvard" className="text-primary hover:underline">2. Grundläggande hudvård för män</a></li>
                                <li><a href="#botox" className="text-primary hover:underline">3. Botox för män</a></li>
                                <li><a href="#fillers" className="text-primary hover:underline">4. Fillers och &quot;masculine contouring&quot;</a></li>
                                <li><a href="#har" className="text-primary hover:underline">5. Hår och skägg</a></li>
                                <li><a href="#andra" className="text-primary hover:underline">6. Andra vanliga behandlingar – och vad som passar vilket mål</a></li>
                                <li><a href="#klinik" className="text-primary hover:underline">7. Att välja klinik</a></li>
                                <li><a href="#faq" className="text-primary hover:underline">8. Vanliga frågor</a></li>
                                <li><a href="#kallor" className="text-primary hover:underline">9. Källor</a></li>
                            </ul>
                        </nav>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="varfor">Estetik för män – varför nu?</h2>
                        <p>
                            Estetiska behandlingar har länge betraktats som något främst för kvinnor, men den bilden håller på att lösas upp. Allt fler män söker sig till kliniker – dels för hudvård och föryngring, dels för subtila justeringar som en mer definierad käklinje eller mindre trötta ögon. Drivkrafterna är ofta desamma som för alla andra: att se pigg, frisk och utvilad ut.
                        </p>
                        <p>
                            Två saker är utmärkande för hur män närmar sig estetik. Det första är <strong>kravet på naturliga resultat</strong> – de allra flesta män vill inte se behandlade ut, utan som en piggare version av sig själva. Det andra är <strong>effektivitet</strong>: icke-invasiva behandlingar med kort återhämtning passar en vardag som inte tillåter långa avbrott. Med rätt förväntningar och en seriös klinik är det fullt möjligt att uppnå just det.
                        </p>
                        <p>
                            Intresset för icke-kirurgiska behandlingar bland män har ökat stadigt de senaste åren, och kliniker rapporterar allt fler manliga kunder. Samtidigt är många män nya i sammanhanget och vill kunna läsa på i lugn och ro innan de bokar – därför den här guiden.
                        </p>

                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/estetik-for-man-portratt.webp" 
                                alt="Välvårdad man med melanin-rik hud" 
                                className="w-full h-auto object-cover max-h-96"
                                width={1600}
                                height={1073}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">Estetik och hudvård för män är för alla – oavsett ålder och hudton.</p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="hudvard">Grundläggande hudvård för män</h2>
                        <p>
                            Den bästa och billigaste &quot;anti-aging&quot; som finns är en konsekvent hudvårdsrutin – och den behöver inte vara komplicerad. Mäns hud är i genomsnitt något tjockare och fetare än kvinnors, och daglig rakning kan irritera och torka ut. En bra grundrutin:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Rengöring</strong> morgon och kväll med en skonsam produkt.</li>
                            <li><strong>Fuktkräm</strong> som återfuktar utan att kännas tung.</li>
                            <li><strong>Solskydd (SPF)</strong> varje dag – den enskilt viktigaste åtgärden mot för tidigt åldrande.</li>
                            <li><strong>Retinol</strong> på kvällen om du vill jobba mot linjer och ojämn hudton (introducera gradvis).</li>
                            <li><strong>Rakning:</strong> raka i hårets riktning, använd rakgel och en lugnande, alkoholfri produkt efteråt för att minska irritation.</li>
                        </ul>
                        <p className="mt-4">
                            Vill du ha en steg-för-steg-genomgång som passar alla hudtyper hittar du vår <Link href="/blogg/hudvardsrutin" className="text-primary hover:underline font-medium">kompletta guide till hudvårdsrutin</Link>. Rätt hemmavård är dessutom grunden som gör att eventuella klinikbehandlingar håller bättre.
                        </p>
                        <p>
                            Vanliga misstag att undvika: att hoppa över solskyddet (den vanligaste orsaken till för tidigt åldrande), att tvätta ansitet för hårt eller för ofta (kan öka både fett och irritation), och att använda starkt parfymerade rakvatten som torkar ut huden. Börja enkelt med tre steg – rengöring, fukt och SPF – och lägg till mer först när grunden sitter.
                        </p>

                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/estetik-for-man-hudvard.webp" 
                                alt="Man applicerar fuktkräm i ett minimalistiskt badrum" 
                                className="w-full h-auto object-cover max-h-96"
                                width={1600}
                                height={1073}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">Grunden för män: rengöring, fukt och solskydd – enkelt och konsekvent slår avancerat.</p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="botox">Botox för män</h2>
                        <p>
                            Botox (botulinumtoxin) slappnar av de muskler som skapar rörelserynkor – typiskt pannlinjer, bekymmersrynkan mellan ögonbrynen och kråksparkar. För män finns några skillnader värda att känna till:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Högre dos.</strong> Mäns ansiktsmuskler är ofta starkare och tätare, så det krävs vanligtvis mer botulinumtoxin för samma effekt.</li>
                            <li><strong>Käkmuskeln (masseter).</strong> Botox i tuggmuskeln kan användas för att slappna av spända käkar (och vid tandgnissling), och påverkar även ansiktsformen.</li>
                            <li><strong>Svettning (hyperhidros).</strong> Botox mot kraftig svettning i armhålor eller handflator är en vanlig, medicinskt förankrad användning som många män uppskattar.</li>
                        </ul>
                        <p className="mt-4">
                            Effekten håller i regel tre till fyra månader. Läs mer i vår <Link href="/blogg/botoxbehandling-den-kompletta-guiden" className="text-primary hover:underline font-medium">kompletta guide till botoxbehandling</Link>. En skicklig behandlare doserar så att du behåller ditt naturliga uttryck – inte ett &quot;fruset&quot; ansikte. Behandlingen tar bara några minuter, kräver ingen egentlig återhämtning och ger synlig effekt inom några dagar. Många män börjar dessutom i förebyggande syfte med små doser, för att bromsa att linjerna sätter sig, snarare än att vänta tills de blivit djupa.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="fillers">Fillers och &quot;masculine contouring&quot;</h2>
                        <p>
                            Fillers med hyaluronsyra återställer volym och förstärker konturer. Hos män handlar det oftast om att <strong>förstärker det som redan finns</strong> snarare än att förändra – en tydligare käklinje, en starkare haka eller att fylla ut trötta, insjunkna partier under ögonen. Det kallas ibland &quot;masculine contouring&quot;.
                        </p>
                        <p>
                            Nyckeln är måttfullhet: målet är en definierad men naturlig profil, inte ett överbehandlat utseende. Fillers och botox kombineras ofta, eftersom de gör olika saker (volym respektive muskelavslappning). Mer i vår <Link href="/blogg/fillerbehandling-den-kompletta-guiden" className="text-primary hover:underline font-medium">guide till fillerbehandling</Link>.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="har">Hår och skägg</h2>
                        <p>
                            Hår är ett av de vanligaste estetiska bekymren hos män. Vid <strong>håravfall</strong> (androgen alopeci) finns allt från receptbelagda läkemedel och PRP-behandlingar som stödjer hårväxten, till hårtransplantation för mer permanenta resultat. Vill du täta ett ojämnt <strong>skägg</strong> erbjuder vissa kliniker behandlingar för det, och skäggtransplantation förekommer.
                        </p>
                        <p>
                            Det här är ett område där det är extra viktigt att ha realistiska förväntningar och välja en klinik med dokumenterad erfarenhet – resultaten och metoderna varierar stort.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="andra">Andra vanliga behandlingar – och vad som passar vilket mål</h2>
                        <p>
                            Utöver injektioner finns en rad behandlingar som är populära bland män: <strong>laserhårborttagning</strong> (rygg, nacke, bröst), <strong>hudföryngring</strong> med microneedling och laser, behandling av <strong>pigmentfläckar och solskador</strong>, samt <strong>fettreducerande</strong> behandlingar mot till exempel dubbelhaka. Använd tabellen för att snabbt se vad som brukar passa vilket mål:
                        </p>

                        <div className="overflow-x-auto my-6 border border-gray-200 rounded-xl">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Mål / besvär</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Vanliga behandlingar</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-sm sm:text-base">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Trött, glåmig hud</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">Hudvårdsrutin, kemisk peeling, microneedling</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Rörelserynkor (panna, ögonbryn)</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">Botox</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Otydlig käklinje eller haka</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">Fillers (masculine contouring)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Trötta ögon, mörka ringar</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">Skinboosters, filler, rätt hudvård</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Kraftig svettning</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">Botox mot hyperhidros</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Oönskad hårväxt (rygg, nacke)</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">Laserhårborttagning</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Håravfall</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">PRP, läkemedel, hårtransplantation</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Dubbelhaka</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">Fettreducerande behandlingar</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-4">
                            För djupdykningar, se våra guider till <Link href="/blogg/anti-aging-behandling" className="text-primary hover:underline font-medium">anti-aging och hudföryngring</Link> och <Link href="/blogg/laserharborttagning" className="text-primary hover:underline font-medium">laserhårborttagning</Link>.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="klinik">Att välja klinik</h2>
                        <p>
                            Samma principer gäller för män som för alla andra – med ett tillägg: välj en behandlare som har <strong>erfarenhet av manlig anatomi och estetik</strong>, eftersom mål och dosering skiljer sig. Kontrollera att:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>injektionsbehandlingar utförs av <strong>legitimerad läkare, tandläkare eller sjuksköterska</strong>, och att kliniken är registrerad hos <strong>IVO</strong>,</li>
                            <li>du får en <strong>konsultation</strong> där behandlaren förstår ditt mål (naturligt resultat),</li>
                            <li>kliniken är tydlig med pris, risker och realistiska förväntningar.</li>
                        </ul>
                        <p className="mt-4">
                            (För laserbehandlingar är det Strålsäkerhetsmyndigheten, inte IVO, som är tillsynsmyndighet.) Läs vår guide <Link href="/blogg/estetisk-klinik" className="text-primary hover:underline font-medium">Så väljer du en seriös estetisk klinik</Link> för en komplett checklista, och <Link href="/behandlingar/hudvard" className="text-primary hover:underline font-medium">jämför kliniker på battrehy.se</Link>.
                        </p>
                        <p>
                            <strong>Vad kostar det?</strong> Priset varierar med behandling och klinik: en botoxbehandling ligger ofta på ett par tusen kronor per område och fillers något mer per spruta, medan hudvårdsbehandlingar och laser prissätts per gång eller i paket. Konsultationen är ofta kostnadsfri. Se till totalkostnaden – särskilt för behandlingar som ges i serie – och kom ihåg att billigast sällan är tryggast när det gäller injektioner.
                        </p>

                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/estetik-for-man-klinik.webp" 
                                alt="Manlig klient i konsultation hos en behandlare på en klinik" 
                                className="w-full h-auto object-cover max-h-96"
                                width={1600}
                                height={1073}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">En bra klinik har erfarenhet av manlig anatomi och siktar på ett naturligt resultat.</p>
                        </div>

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
                                <h4 className="font-bold text-gray-900">Är estetiska behandlingar vanliga bland män?</h4>
                                <p className="text-gray-700 mt-1">Ja, och det ökar. Allt fler män väljer både hudvård och behandlingar som botox och fillers, oftast med målet att se piggare och mer utvilade ut – inte förändrade.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Är botox annorlunda för män?</h4>
                                <p className="text-gray-700 mt-1">Principen är densamma, men män behöver ofta en högre dos eftersom ansiktsmusklerna är starkare. Placering och dosering anpassas efter din anatomi och ditt mål.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Ser fillers och botox naturligt ut på män?</h4>
                                <p className="text-gray-700 mt-1">Ja, när de utförs av en skicklig behandlare med måttfull dosering. Målet är en definierad men naturlig look, inte ett &quot;gjort&quot; ansikte.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Vilken hudvård behöver män?</h4>
                                <p className="text-gray-700 mt-1">Grunden är rengöring, fuktkräm och solskydd, gärna kompletterat med retinol. Anpassa efter din hudtyp och var noga med att lugna huden efter rakning.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Vad kan man göra åt håravfall?</h4>
                                <p className="text-gray-700 mt-1">Alternativen sträcker sig från receptbelagda läkemedel och PRP till hårtransplantation. Vilket som passar beror på grad och orsak – rådgör med en klinik med erfarenhet av hår.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Hur väljer jag rätt klinik som man?</h4>
                                <p className="text-gray-700 mt-1">Välj en klinik med erfarenhet av manlig estetik, legitimerad personal (och IVO-registrering för injektioner), tydlig konsultation och realistiska löften.</p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="kallor">Källor</h2>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                            <li>Socialstyrelsen – Lag (2021:363) om estetiska kirurgiska ingrepp och estetiska injektionsbehandlingar (kompetenskrav)</li>
                            <li>IVO – tillsyn av estetiska injektions- och kirurgibehandlingar; Strålsäkerhetsmyndigheten – laser/IPL</li>
                            <li>1177 Vårdguiden – hudvård och hudens åldrande</li>
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
