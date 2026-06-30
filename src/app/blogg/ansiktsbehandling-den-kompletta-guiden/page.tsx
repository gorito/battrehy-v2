import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SchemaScript } from '@/components/SchemaScript';
import { buildBreadcrumbSchema, buildArticleSchema, buildFAQSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Ansiktsbehandling: Den kompletta guiden 2026',
    description: 'En komplett guide till 8 typer av ansiktsbehandlingar, priser från 500 till 9000 kr, och tips på hur du väljer rätt behandling för din hud.',
    alternates: {
        canonical: 'https://battrehy.se/blogg/ansiktsbehandling-den-kompletta-guiden',
    },
    openGraph: {
        title: 'Ansiktsbehandling: Den kompletta guiden 2026',
        description: 'En komplett guide till 8 typer av ansiktsbehandlingar, priser från 500 till 9000 kr, och tips på hur du väljer rätt behandling för din hud.',
        type: 'article',
        locale: 'sv_SE',
        url: 'https://battrehy.se/blogg/ansiktsbehandling-den-kompletta-guiden',
        images: [
            {
                url: 'https://battrehy.se/images/blogg/ansiktsbehandling.jpeg',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ansiktsbehandling: Den kompletta guiden 2026',
        description: 'En komplett guide till 8 typer av ansiktsbehandlingar, priser från 500 till 9000 kr, och tips på hur du väljer rätt behandling för din hud.',
        images: ['https://battrehy.se/images/blogg/ansiktsbehandling.jpeg'],
    }
};

export default function BlogPost() {
    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Hem', url: 'https://battrehy.se' },
            { name: 'Blogg', url: 'https://battrehy.se/blogg' },
            { name: 'Ansiktsbehandling', url: 'https://battrehy.se/blogg/ansiktsbehandling-den-kompletta-guiden' }
        ]),
        buildArticleSchema({
            headline: "Ansiktsbehandling: Den kompletta guiden 2026 — typer, priser och så väljer du rätt klinik",
            description: "Allt om ansiktsbehandlingar i Sverige 2026: typer, priser, vilken passar din hud och hur du väljer en seriös klinik.",
            datePublished: "2026-05-01T08:00:00+02:00",
            dateModified: "2026-06-06T08:00:00+02:00",
            imageUrl: "https://battrehy.se/images/blogg/ansiktsbehandling.jpeg",
            pageUrl: "https://battrehy.se/blogg/ansiktsbehandling-den-kompletta-guiden"
        }),
        buildFAQSchema([
            { question: "Hur ofta ska jag gå på ansiktsbehandling?", answer: "Hudens cellförnyelse tar cirka 28 dagar, så de flesta hudterapeuter rekommenderar en behandling var fjärde till åttonde vecka för bästa resultat. Vid akuta hudproblem kan tätare behandlingar (varannan vecka) under en period rekommenderas; för underhåll räcker ofta sex till åtta veckors mellanrum." },
            { question: "Vad är skillnaden mellan en ansiktsbehandling hemma och på klinik?", answer: "En proffsbehandling använder utrustning, produktkoncentrationer och tekniker som inte är tillgängliga för konsumenter — exempelvis medicinsk peeling, microneedling-apparater och HIFU-ultraljud. Behandlingen utförs av utbildad personal som anpassar protokollet efter din specifika hud." },
            { question: "Vad kostar en ansiktsbehandling i Sverige?", answer: "Priserna varierar mellan cirka 600 kr för en enkel klassisk behandling till nära 9 000 kr för avancerade behandlingar som HIFU. Median för en standard ansiktsbehandling ligger på cirka 1 100 kr. Stockholm tenderar ligga 16 procent över rikssnitt; mindre orter ofta lägre." },
            { question: "Hur länge håller resultatet?", answer: "Det beror på typ av behandling. En klassisk ansiktsbehandling ger en omedelbar effekt som håller två till fyra veckor. Kemisk peeling och microneedling ger längre resultat (tre till sex månader). HIFU kan ge resultat upp till tolv till arton månader." },
            { question: "Är ansiktsbehandlingar säkra under graviditet?", answer: "Vissa behandlingar — klassisk rengöring, lugnande masker, manuell extraktion — är generellt säkra under graviditet. Andra avråds: medicinsk peeling med starka syror, retinol-baserade behandlingar, IPL och laser, samt vissa apparatbehandlingar. Konsultera alltid din kliniker och vid osäkerhet din barnmorska innan bokning." },
            { question: "Vilken ansiktsbehandling är bäst för akne?", answer: "Vid aktiv akne rekommenderas ofta en kombination av kemisk peeling med BHA (salicylsyra), djuprengörande behandling och LED-ljusterapi (blått ljus mot bakterier). Microneedling kan hjälpa mot ärr efter akne men avråds vid aktiv inflammation." },
            { question: "Måste kliniken vara registrerad hos IVO?", answer: "Kliniker som utför vissa estetiska behandlingar — såsom injektioner och kirurgiska ingrepp — måste enligt Lag (2021:363) vara registrerade i IVOs vårdgivarregister och ha legitimerad personal. För renodlade ansiktsbehandlingar utan injektioner eller invasiva ingrepp är reglerna mer flexibla, men välj alltid klinik med legitimerad hudterapeut, sjuksköterska eller läkare." }
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
                            Ansiktsbehandling: Den kompletta guiden 2026 — typer, priser och så väljer du rätt klinik
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
                                src="/images/blogg/ansiktsbehandling.jpeg" 
                                alt="Professionell ansiktsbehandling på klinik" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </header>

                    <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                        <p>
                            En ansiktsbehandling är en professionell hudvårdsbehandling som utförs av en utbildad terapeut för att rengöra, exfoliera och förbättra hudens kondition. Men med åtta vanliga behandlingstyper, priser från 500 till nästan 9 000 kronor och hundratals kliniker att välja mellan, är det lätt att gå vilse. Den här guiden går igenom varje vanlig behandling, vad den faktiskt gör, vad den kostar i Sverige 2026 — och hur du undviker de fallgropar som kan göra att resultatet (och din hud) blir lidande.
                        </p>

                        <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl my-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Snabb sammanfattning</h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li><strong>Åtta vanliga typer</strong> av ansiktsbehandling: klassisk, djuprengörande, kemisk peeling, microneedling, HydraFacial, HIFU, mikrodermabrasion och LED-ljusterapi</li>
                                <li><strong>Prisspann:</strong> 500 kr för en enklare peeling till nära 9 000 kr för avancerad HIFU. Median för en standard ansiktsbehandling: cirka 1 100 kr</li>
                                <li><strong>Välj behandling efter ditt hudbehov</strong> — inte efter trender. Akne, pigmentering och åldrande hud kräver olika angreppssätt</li>
                                <li><strong>Kliniken ska ha legitimerad personal</strong> och tydlig konsultation innan första behandlingen</li>
                                <li><strong>Underhåll var 4–8 vecka</strong> ger bäst långsiktigt resultat — hudens cellförnyelse tar cirka 28 dagar</li>
                            </ul>
                        </div>

                        <nav className="bg-gray-50 border border-gray-200 p-6 rounded-2xl mb-12">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Innehåll</h2>
                            <ul className="space-y-2 text-gray-700">
                                <li><a href="#vad-ar" className="text-primary hover:underline">1. Vad är en ansiktsbehandling?</a></li>
                                <li><a href="#typer" className="text-primary hover:underline">2. De 8 vanligaste typerna av ansiktsbehandlingar</a></li>
                                <li><a href="#vilken" className="text-primary hover:underline">3. Vilken ansiktsbehandling passar dig?</a></li>
                                <li><a href="#priser" className="text-primary hover:underline">4. Vad kostar en ansiktsbehandling i Sverige?</a></li>
                                <li><a href="#valja-klinik" className="text-primary hover:underline">5. Så väljer du rätt klinik</a></li>
                                <li><a href="#risker" className="text-primary hover:underline">6. Risker, biverkningar och kontraindikationer</a></li>
                                <li><a href="#fore-efter" className="text-primary hover:underline">7. Före och efter behandling</a></li>
                                <li><a href="#faq" className="text-primary hover:underline">8. Vanliga frågor</a></li>
                                <li><a href="#kallor" className="text-primary hover:underline">9. Källor</a></li>
                            </ul>
                        </nav>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="vad-ar">Vad är en ansiktsbehandling?</h2>
                        <p>
                            En ansiktsbehandling är en hudvårdsbehandling som utförs på klinik eller salong, vanligtvis av en hudterapeut, hudterapist, sjuksköterska eller läkare. Behandlingen är djupare och mer specialiserad än det du själv kan göra hemma — proffsbehandlingar använder utrustning, koncentrationer och tekniker som inte är tillgängliga för konsumenter.
                        </p>
                        <p>
                            Skillnaden mot din rutin hemma handlar om tre saker: <strong>djup</strong>, <strong>anpassning</strong> och <strong>resultat</strong>. En kvalificerad terapeut analyserar din hud, identifierar specifika problem (torrhet, akne, pigmentering, åldrande, förstorade porer) och väljer rätt kombination av rengöring, exfoliering och näring. Hemvård är viktigt mellan besöken — men det är professionella behandlingar som ger märkbara förändringar i hudens textur, ton och kondition.
                        </p>
                        <p>
                            I Sverige utförs ansiktsbehandlingar i regel av legitimerad personal eller utbildade hudterapeuter. Vid vissa avancerade behandlingar — såsom medicinsk peeling, microneedling eller injektioner — krävs medicinsk legitimation enligt Lag (2021:363) om estetiska kirurgiska ingrepp och estetiska injektionsbehandlingar.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="typer">De 8 vanligaste typerna av ansiktsbehandlingar</h2>
                        <p>Det finns dussintals varianter, men dessa åtta typer täcker mer än 90 procent av allt som erbjuds på svenska kliniker idag.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">1. Klassisk ansiktsbehandling</h3>
                        <p>Grundbehandlingen som de flesta börjar med. Innehåller rengöring, ångning, manuell extraktion av pormaskar, peeling, mask och en avslutande fuktighetskräm. Tar 45–90 minuter, ger en omedelbar fräschör och är en bra introduktion till professionell hudvård.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Bäst för:</strong> alla hudtyper, regelbundet underhåll, första besöket på en ny klinik</li>
                            <li><strong>Pris:</strong> 895–1 795 kr (median ~1 100 kr)</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">2. Djuprengörande ansiktsbehandling</h3>
                        <p>Liknar klassisk men med större fokus på portömning och djuprengöring. Inkluderar ofta längre ångbehandling, mer intensiv extraktion och en lerbaserad eller aktivkolsbaserad mask. Tar 50–75 minuter.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Bäst för:</strong> fet och blandhud, akne, förstorade porer, frekventa pormaskar</li>
                            <li><strong>Pris:</strong> 900–1 595 kr (median ~1 200 kr)</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">3. Kemisk peeling (AHA, BHA, TCA)</h3>
                        <p>En kontrollerad applicering av syror — alfa-hydroxisyror (AHA), beta-hydroxisyror (BHA) eller trikloräsyrasyra (TCA) — som löser upp döda hudceller och stimulerar förnyelse. Lätta peelings ger ingen synlig fjällning; medeldjupa peelings (BioRePeel, PRX-T33, Neostrata) kan ge två till fem dagars rodnad. Tar 20–45 minuter.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Bäst för:</strong> ojämn hudton, fina linjer, akne-ärr, pigmentfläckar, mattare hudkondition</li>
                            <li><strong>Pris:</strong> 500–1 995 kr (median ~1 145 kr)</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mt-12 mb-4">4. Microneedling (collagen induction therapy)</h3>
                        
                        <div className="my-6 rounded-xl overflow-hidden bg-gray-100 float-none md:float-right md:w-1/2 md:ml-6 md:mb-6">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/microneedling_treatment.jpeg" 
                                alt="Microneedling behandling på klinik" 
                                className="w-full h-auto object-cover"
                            />
                            <p className="text-xs text-gray-500 p-2 text-center bg-gray-50 border-t border-gray-100">Microneedling används ofta för att behandla ojämn hudtextur och ärr.</p>
                        </div>
                        
                        <p>Tunna nålar skapar mikroskopiska sår i huden, vilket triggar kroppens naturliga reparation och stimulerar kollagen- och elastinproduktion. Använder enheter som SkinPen eller Dermapen. Tar 40–60 minuter och kräver ofta lokalbedövningskräm.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 clear-none">
                            <li><strong>Bäst för:</strong> ärr (akne, kirurgi), förlorad hudfasthet, fina linjer, ojämn textur</li>
                            <li><strong>Pris:</strong> 1 500–4 500 kr (median ~2 400 kr). Kur 3-pack: 5 000–13 200 kr (sparar cirka 15–24 procent)</li>
                        </ul>
                        <div className="clear-both"></div>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">5. HydraFacial</h3>
                        <div className="my-6 rounded-xl overflow-hidden bg-gray-100 float-none md:float-left md:w-1/2 md:mr-6 md:mb-6">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/hydrafacial_behandling.jpeg" 
                                alt="HydraFacial behandling på klinik" 
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <p>En patenterad behandling med en specialdesignad apparat som samtidigt rengör, exfolierar och tillför serum med ett vakuumsystem. Tre nivåer är vanliga: Signature (basic), Deluxe (med boostar) och Platinum (premium). Tar 30–60 minuter och kräver ingen återhämtning.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 clear-none">
                            <li><strong>Bäst för:</strong> snabb fräschör inför event, alla hudtyper, mild ojämnhet</li>
                            <li><strong>Pris:</strong> 1 400–3 300 kr (median ~1 795 kr)</li>
                        </ul>
                        <div className="clear-both"></div>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">6. HIFU (high-intensity focused ultrasound)</h3>
                        <p>Ultraljud som penetrerar djupt i huden — upp till SMAS-skiktet — och stimulerar kollagenproduktion. Marknadsförs ofta som "icke-kirurgiskt ansiktslyft". Tar 75–140 minuter med mild rodnad efteråt. Resultatet utvecklas över tre till sex månader och håller tolv till arton månader.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Bäst för:</strong> lätt slapp hud, käklinje, hals, ögonbryn — främst från 35 års ålder</li>
                            <li><strong>Pris:</strong> 1 900–8 900 kr (median ~4 995 kr). Mycket bred prisspridning beroende på utrustningens generation och antal "skottlinjer"</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">7. Mikrodermabrasion</h3>
                        <p>Mekanisk exfoliering med diamantspets eller kristallpartiklar som slipar bort hudens översta lager. Tar 40–75 minuter, ingen återhämtning. En del kliniker fasar ut behandlingen till förmån för HydraFacial.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Bäst för:</strong> matt hud, mild pigmentering, mild ojämn textur</li>
                            <li><strong>Pris:</strong> 1 000–2 595 kr (median ~1 495 kr)</li>
                        </ul>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">8. LED-ljusterapi</h3>
                        <p>Smalbandsljus i specifika våglängder som påverkar huden olika. Rött ljus (cirka 630 nm) stimulerar kollagen och dämpar inflammation; blått ljus (cirka 415 nm) verkar antibakteriellt mot aknebakterier. Tar 20–45 minuter, smärtfritt.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Bäst för:</strong> akne (blått), åldrande och inflammation (rött), efter andra behandlingar</li>
                            <li><strong>Pris:</strong> 99–895 kr (median ~695 kr). Ofta tillägg till annan behandling för 200–500 kr</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="vilken">Vilken ansiktsbehandling passar dig?</h2>
                        <p>Den enskilt vanligaste frågan på en första konsultation. Här är hur en hudterapeut typiskt resonerar — utgå alltid från ditt största hudbekymmer.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Akne och orenheter</h3>
                        <p>Aktiv akne behöver två saker: minskning av bakterier och kontroll av talgproduktion. <strong>Djuprengörande ansiktsbehandling</strong> öppnar och rensar porerna. <strong>Kemisk peeling med BHA (salicylsyra)</strong> löser upp talg djupt nere i porerna. <strong>Blått LED-ljus</strong> dödar aknebakterier (P. acnes). Kombineras ofta som en serie över 4–8 veckor. Microneedling <strong>avråds vid aktiv inflammation</strong> men kan användas mot aknearr när huden är lugn.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Pigmentfläckar och ojämn hudton</h3>
                        <p>Solskador, hormonell pigmentering (melasma) eller post-inflammatorisk pigmentering kräver tålamod. <strong>Kemisk peeling med AHA eller TCA</strong> är förstaval. <strong>Microneedling med tillägg av tranexamsyra eller vitamin C</strong> kan komplettera. <strong>IPL</strong> (intense pulsed light) erbjuds av specialiserade kliniker. Sol-undvikande och dagligt SPF 50 är nödvändigt — annars kommer pigmenteringen tillbaka.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Åldrande hud, fina linjer och förlorad fasthet</h3>
                        <p>Detta är ett område där flera behandlingar samverkar. <strong>Microneedling</strong> stimulerar kollagen i en serie om 3–4 behandlingar. <strong>HIFU</strong> ger djupare lyft över längre tid. <strong>Kemisk peeling</strong> förbättrar ytstrukturen. För <strong>dynamiska rynkor</strong> (panna, ögonbryn) erbjuder kliniker ofta injektioner — läs vår <Link href="/blogg/botoxbehandling-den-kompletta-guiden" className="text-primary hover:underline">guide till botoxbehandling</Link>.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Torr och känslig hud</h3>
                        <p>Mild rengöring och fokus på fukt. <strong>Klassisk ansiktsbehandling</strong> med hyaluronsyra-mask. <strong>HydraFacial</strong> är skonsam och ger omedelbar fukt. <strong>LED rött ljus</strong> dämpar inflammation. Undvik aggressiva peelings och microneedling under aktiv eksem-fas.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Förstorade porer</h3>
                        <p>Permanent förmindrade porer är inte realistiskt — porerna är genetiskt bestämda. Men du kan minska deras synlighet markant. <strong>Kemisk peeling med BHA</strong> rensar ur. <strong>Mikrodermabrasion</strong> eller <strong>HydraFacial</strong> förfinar ytan. Regelbunden underhållsrutin med retinoid hemma ger bäst långtidseffekt.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="priser">Vad kostar en ansiktsbehandling i Sverige?</h2>
                        <p>Priserna varierar dramatiskt beroende på behandlingstyp, klinikens läge och utrustningens generation. Tabellen nedan baseras på publicerade prislistor från 13 svenska kliniker (2025–2026).</p>

                        <div className="overflow-x-auto my-8">
                            <table className="w-full border-collapse bg-white border border-gray-200 rounded-lg hidden sm:table">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Behandling</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lägsta (kr)</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Median (kr)</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Högsta (kr)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {[
                                        ['Klassisk ansiktsbehandling', '895', '1 095', '1 795'],
                                        ['Djuprengörande ansiktsbehandling', '900', '1 200', '1 595'],
                                        ['Kemisk peeling (AHA/BHA)', '500', '1 145', '1 995'],
                                        ['Microneedling', '1 500', '2 400', '4 500'],
                                        ['HydraFacial', '1 400', '1 795', '3 300'],
                                        ['HIFU', '1 900', '4 995', '8 900'],
                                        ['Mikrodermabrasion', '1 000', '1 495', '2 595'],
                                        ['LED-ljusterapi', '99', '695', '895']
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
                            {/* Mobile version of table */}
                            <div className="sm:hidden space-y-4">
                                {[
                                    ['Klassisk ansiktsbehandling', '895', '1 095', '1 795'],
                                    ['Djuprengörande', '900', '1 200', '1 595'],
                                    ['Kemisk peeling', '500', '1 145', '1 995'],
                                    ['Microneedling', '1 500', '2 400', '4 500'],
                                    ['HydraFacial', '1 400', '1 795', '3 300'],
                                    ['HIFU', '1 900', '4 995', '8 900'],
                                    ['Mikrodermabrasion', '1 000', '1 495', '2 595'],
                                    ['LED-ljusterapi', '99', '695', '895']
                                ].map((row, i) => (
                                    <div key={i} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                                        <h4 className="font-bold text-gray-900 mb-2">{row[0]}</h4>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Median:</span>
                                            <span className="font-medium text-gray-900">{row[2]} kr</span>
                                        </div>
                                        <div className="flex justify-between text-xs mt-1 text-gray-400">
                                            <span>Min: {row[1]} kr</span>
                                            <span>Max: {row[3]} kr</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Skillnader mellan städer</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Stockholm:</strong> cirka 16 procent över rikssnitt för standardbehandlingar; 20–34 procent över för apparatkrävande behandlingar (microneedling, HydraFacial, HIFU)</li>
                            <li><strong>Göteborg:</strong> cirka 8 procent under rikssnitt</li>
                            <li><strong>Malmö:</strong> cirka 16 procent under rikssnitt; särskilt fördelaktigt för kemisk peeling</li>
                            <li><strong>Mindre orter:</strong> brett spann, men ofta lägre — exempelvis HIFU från 1 900 kr i Eskilstuna mot 5 000–8 900 kr i Stockholm</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="valja-klinik">Så väljer du rätt klinik</h2>
                        
                        <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-gray-100 my-8">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/konsultation_hudterapeut.jpeg" 
                                alt="Konsultation hos hudterapeut" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        <p>Att hitta en seriös klinik handlar om mer än pris och avstånd. Här är en checklista som professionella i branschen skulle använda själva.</p>

                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Säkerhetscheck — sju punkter</h3>
                        <ol className="list-decimal pl-5 space-y-3">
                            <li><strong>Personalens kompetens.</strong> Är behandlaren legitimerad sjuksköterska, läkare, hudterapeut eller hudterapist? Vid avancerade medicinska behandlingar (medicinsk peeling, injektioner, microneedling) krävs medicinsk legitimation.</li>
                            <li><strong>IVO-registrering.</strong> Kliniker som utför estetiska kirurgiska ingrepp eller injektioner ska finnas i Inspektionen för vård och omsorgs vårdgivarregister.</li>
                            <li><strong>Tydlig konsultation.</strong> En seriös klinik gör en hudanalys och föreslår behandlingsplan innan något bokas.</li>
                            <li><strong>Skriftlig information.</strong> Du ska få information om risker, biverkningar och vad du ska tänka på före och efter behandling.</li>
                            <li><strong>Patientförsäkring.</strong> Kliniken ska ha försäkring som täcker eventuella skador.</li>
                            <li><strong>Recensioner och dokumentation.</strong> Läs flera oberoende källor. Be att få se före och efter-bilder från klinikens egen verksamhet.</li>
                            <li><strong>Eftervård och uppföljning.</strong> Hur kontaktar du kliniken om något inte känns bra efter behandlingen?</li>
                        </ol>

                        <div className="bg-gray-50 border-l-4 border-primary p-6 mt-8 rounded-r-lg">
                            <h3 className="font-bold text-gray-900 mb-2">Hitta en klinik nära dig</h3>
                            <p className="text-gray-700 text-sm sm:text-base">
                                På Battrehy.se hittar du över 500 hudvårdskliniker över hela Sverige. Du kan filtrera efter behandlingstyp, stad och kundbetyg, jämföra utbud och boka direkt — eller läsa om varje kliniks specialisering innan du tar kontakt. <Link href="/behandlingar/ansiktsbehandling" className="text-primary hover:underline font-medium">Hitta kliniker för ansiktsbehandling här</Link>.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base mt-2">
                                För injektionsbehandlingar mot rynkor, se vår <Link href="/blogg/botoxbehandling-den-kompletta-guiden" className="text-primary hover:underline font-medium">guide till botoxbehandling</Link>. För återskapande av volym, läs vår <Link href="/blogg/fillerbehandling-den-kompletta-guiden" className="text-primary hover:underline font-medium">guide till fillerbehandling</Link>. Letar du efter en estetisk klinik mer generellt? Besök <Link href="/kliniker" className="text-primary hover:underline font-medium">vår klinikkatalog</Link>.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base mt-2">
                                Vill du veta mer om hur du gör ett tryggt val? Läs vår guide: <Link href="/blogg/estetisk-klinik" className="text-primary hover:underline font-medium">Så väljer du en seriös estetisk klinik</Link>.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="risker">Risker, biverkningar och kontraindikationer</h2>
                        <p>Alla professionella ansiktsbehandlingar är överlag säkra när de utförs av kvalificerad personal — men inga behandlingar är helt utan risk.</p>
                        
                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">När du inte bör boka behandling</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Aktiv eksem, rosacea i flare-up eller herpes/munsår</li>
                            <li>Pågående isotretinoin-behandling (Roaccutan): vänta minst 6 månader</li>
                            <li>Graviditet (avstå från medicinska peelings, retinol-baserade behandlingar och vissa apparatbehandlingar)</li>
                            <li>Akut solbränna eller intensiv solexponering senaste 1–2 veckor</li>
                            <li>Pacemaker eller metallimplantat i området vid HIFU eller RF</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="fore-efter">Före och efter behandling — så förbereder du dig</h2>
                        
                        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">Eftervård (de första 48–72 timmarna)</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Sol och SPF:</strong> undvik direkt sol; använd alltid bredspektrum SPF 30–50 dagligen</li>
                            <li><strong>Makeup:</strong> vänta minst 12 timmar efter klassisk; 24–48 timmar efter peeling eller microneedling</li>
                            <li><strong>Träning, bastu och pool:</strong> undvik 24–72 timmar (svett kan irritera nybehandlad hud)</li>
                            <li><strong>Hudvårdsrutin:</strong> kliniken ger specifika råd. Generellt — milda produkter, ingen syra, ingen retinol förrän huden är lugn</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="faq">Vanliga frågor</h2>
                        
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-gray-900">Hur ofta ska jag gå på ansiktsbehandling?</h4>
                                <p className="text-gray-700 mt-1">Hudens cellförnyelse tar cirka 28 dagar, så de flesta hudterapeuter rekommenderar en behandling var fjärde till åttonde vecka för bästa resultat.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Vad är skillnaden mellan en ansiktsbehandling hemma och på klinik?</h4>
                                <p className="text-gray-700 mt-1">En proffsbehandling använder utrustning, produktkoncentrationer och tekniker som inte är tillgängliga för konsumenter. Hemvård är viktigt mellan besöken men kan inte ersätta professionella behandlingar för specifika problem.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Är ansiktsbehandlingar säkra under graviditet?</h4>
                                <p className="text-gray-700 mt-1">Vissa behandlingar är säkra (rengöring, lugnande masker). Andra avråds (medicinsk peeling, retinol, apparater). Konsultera alltid din kliniker.</p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="kallor">Källor och vidare läsning</h2>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                            <li><a href="https://www.ivo.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Inspektionen för vård och omsorg (IVO)</a> — vårdgivarregister och regulatorisk information</li>
                            <li><a href="https://www.riksdagen.se/sv/dokument-lagar/dokument/svensk-forfattningssamling/lag-2021363-om-estetiska-kirurgiska-ingrepp-och_sfs-2021-363" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Lag (2021:363) om estetiska kirurgiska ingrepp och estetiska injektionsbehandlingar</a></li>
                            <li><a href="https://www.1177.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">1177 Vårdguiden</a> — patientinformation</li>
                            <li>Prisdata från 13 svenska kliniker, samlat maj 2026</li>
                        </ul>
                    </div>
                </article>
            </div>
        </main>
    );
}
