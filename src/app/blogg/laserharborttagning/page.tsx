import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SchemaScript } from '@/components/SchemaScript';
import { buildBreadcrumbSchema, buildArticleSchema, buildFAQSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Laserhårborttagning – så fungerar det, pris och resultat',
    description: 'Hur fungerar laserhårborttagning, hur många behandlingar behövs och vad kostar det? Guide till resultat, hud- och hårtyper, säkerhet och nya lagkrav (SSM 2026).',
    alternates: {
        canonical: 'https://battrehy.se/blogg/laserharborttagning',
    },
    openGraph: {
        title: 'Laserhårborttagning – så fungerar det, pris och resultat',
        description: 'Hur fungerar laserhårborttagning, hur många behandlingar behövs och vad kostar det? Guide till resultat, hud- och hårtyper, säkerhet och nya lagkrav (SSM 2026).',
        type: 'article',
        locale: 'sv_SE',
        url: 'https://battrehy.se/blogg/laserharborttagning',
        images: [
            {
                url: 'https://battrehy.se/images/blogg/laserharborttagning-hero.webp',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Laserhårborttagning – så fungerar det, pris och resultat',
        description: 'Hur fungerar laserhårborttagning, hur många behandlingar behövs och vad kostar det? Guide till resultat, hud- och hårtyper, säkerhet och nya lagkrav (SSM 2026).',
        images: ['https://battrehy.se/images/blogg/laserharborttagning-hero.webp'],
    }
};

export default function BlogPost() {
    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Hem', url: 'https://battrehy.se' },
            { name: 'Blogg', url: 'https://battrehy.se/blogg' },
            { name: 'Laserhårborttagning', url: 'https://battrehy.se/blogg/laserharborttagning' }
        ]),
        buildArticleSchema({
            headline: "Laserhårborttagning: så fungerar det, pris och att välja klinik",
            description: "Hur fungerar laserhårborttagning, hur många behandlingar behövs och vad kostar det? Guide till resultat, hud- och hårtyper, säkerhet och nya lagkrav (SSM 2026).",
            datePublished: "2026-07-27T08:00:00+02:00",
            dateModified: "2026-07-27T08:00:00+02:00",
            imageUrl: "https://battrehy.se/images/blogg/laserharborttagning-hero.webp",
            pageUrl: "https://battrehy.se/blogg/laserharborttagning"
        }),
        buildFAQSchema([
            { question: "Är laserhårborttagning permanent?", answer: "Den ger permanent hårreduktion – en varaktig och ofta kraftig minskning av hårväxten. Enstaka hår kan komma tillbaka, särskilt vid hormonell hårväxt, och underhållsbehandlingar kan behövas." },
            { question: "Hur många behandlingar behövs?", answer: "Vanligtvis 6–10 behandlingar med några veckors mellanrum, eftersom håret växer i cykler och lasern biter bäst på hår i tillväxtfas." },
            { question: "Vad kostar laserhårborttagning?", answer: "Det beror på område och klinik – från ett par hundra kronor för överläpp till några tusen för större områden per gång. Paket sänker oftast styckpriset. Räkna med totalkostnaden för hela serien." },
            { question: "Fungerar laser på ljust, grått eller rött hår?", answer: "Dåligt, eftersom sådant hår innehåller lite melanin för lasern att rikta in sig på. Där kan andra metoder vara mer aktuella – rådgör med en klinik." },
            { question: "Fungerar laser på mörk hud?", answer: "Ja, men det kräver rätt lasertyp (ofta Nd:YAG) och en erfaren behandlare, eftersom risken för pigmentförändringar och brännskador annars är högre." },
            { question: "Gör det ont?", answer: "De flesta upplever ett snärtande obehag, ofta dämpat av kylning. Bedövningskräm kan användas vid behov." },
            { question: "Vad ska jag kontrollera innan jag bokar?", answer: "Att kliniken är anmäld till Strålsäkerhetsmyndigheten, har utbildad personal, gör en konsultation och testbehandling, och ger realistiska löften." }
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
                            Laserhårborttagning: så fungerar det, pris och att välja klinik
                        </h1>
                        <div className="flex items-center text-gray-500 text-sm mb-8">
                            <span className="font-medium">Av Battrehys redaktion</span>
                            <span className="mx-2">·</span>
                            <span>Publicerad 27 juli 2026</span>
                        </div>
                        
                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 mb-10 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/laserharborttagning-hero.webp" 
                                alt="Kliniker utför laserhårborttagning på en klients ben, båda med skyddsglasögon" 
                                className="w-full h-auto object-cover max-h-[500px]"
                                width={1600}
                                height={893}
                                fetchPriority="high"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">Laserhårborttagning ger permanent hårreduktion – men kräver en serie behandlingar och rätt kompetens.</p>
                        </div>
                    </header>

                    <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                        <p>
                            Laserhårborttagning är ett av de mest efterfrågade estetiska ingreppen – och ett av dem där det är svårast att jämföra kliniker och priser. Den här guiden förklarar hur laser (och IPL) faktiskt fungerar, hur många behandlingar du behöver, vad det kostar, vilka hud- och hårtyper som svarar bäst, och hur du väljer en klinik som är trygg – inklusive de nya reglerna från Strålsäkerhetsmyndigheten som gäller sedan 2026. Vi är en oberoende katalog, inte en klinik, så du får en neutral översikt.
                        </p>

                        <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl my-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Det viktigaste i korthet (TL;DR)</h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li><strong>Laser förstör hårsäcken via värme</strong> – därför krävs <strong>flera behandlingar</strong> (håret växer i cykler).</li>
                                <li>Räkna med <strong>6–10 behandlingar</strong> och tala om <strong>permanent hårreduktion</strong>, inte 100 % borttagning.</li>
                                <li>Fungerar <strong>bäst på mörkt hår och ljusare hud</strong>; mörk hud kräver rätt lasertyp (Nd:YAG), och ljust/grått/rött hår svarar dåligt.</li>
                                <li><strong>Pris</strong> sätts per område eller i paket och varierar kraftigt.</li>
                                <li><strong>Nytt 2026:</strong> kliniker som använder laser/IPL för hårborttagning ska vara anmälda till Strålsäkerhetsmyndigheten (SSM) och uppfylla kompetenskrav.</li>
                            </ul>
                        </div>

                        <nav className="bg-gray-50 border border-gray-200 p-6 rounded-2xl mb-12">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Innehåll</h2>
                            <ul className="space-y-2 text-gray-700">
                                <li><a href="#sa-fungerar" className="text-primary hover:underline">1. Så fungerar laserhårborttagning</a></li>
                                <li><a href="#antal" className="text-primary hover:underline">2. Antal behandlingar och resultat</a></li>
                                <li><a href="#hudtyp" className="text-primary hover:underline">3. Vilka hud- och hårtyper fungerar bäst?</a></li>
                                <li><a href="#pris" className="text-primary hover:underline">4. Områden och pris</a></li>
                                <li><a href="#sakerhet" className="text-primary hover:underline">5. Gör det ont? Biverkningar och säkerhet</a></li>
                                <li><a href="#hemma" className="text-primary hover:underline">6. Hemma-IPL vs behandling på klinik</a></li>
                                <li><a href="#klinik" className="text-primary hover:underline">7. Att välja klinik – och de nya lagkraven</a></li>
                                <li><a href="#faq" className="text-primary hover:underline">8. Vanliga frågor</a></li>
                                <li><a href="#kallor" className="text-primary hover:underline">9. Källor</a></li>
                            </ul>
                        </nav>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="sa-fungerar">Så fungerar laserhårborttagning</h2>
                        <p>
                            Laserhårborttagning bygger på en enkel princip: laserljuset absorberas av <strong>melaninet</strong> (pigmentet) i håret, omvandlas till värme och skadar hårsäcken så att håret slutar växa – eller växer tillbaka tunnare och långsammare. Eftersom ljuset söker sig till pigment fungerar metoden bäst när håret är mörkare än den omgivande huden.
                        </p>
                        <p><strong>Laser eller IPL?</strong> Båda använder ljus mot samma mål, men skiljer sig åt:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Laser</strong> avger ett fokuserat ljus med en enda våglängd. Det gör behandlingen mer riktad och ofta effektivare.</li>
                            <li><strong>IPL (intensivt pulserande ljus)</strong> avger ett bredare ljusspektrum. Det är ofta billigare och kan fungera bra, men är mindre precist.</li>
                        </ul>
                        <p>
                            En viktig sak att förstå är att håret växer i <strong>cykler</strong>, och lasern biter bäst på hår som är i sin aktiva tillväxtfas. Eftersom bara en del av håren är i den fasen samtidigt kan ingen enskild behandling ta allt – därför behövs en serie.
                        </p>
                        <p>
                            Vilket är då bäst, laser eller IPL? Det finns inget enkelt svar – en väl inställd IPL i kompetenta händer kan ge fina resultat, medan en laser med fel inställning inte gör det. Utrustningen spelar roll, men behandlarens kunskap och att tekniken passar din hud- och hårtyp betyder oftast mer än själva maskinnamnet.
                        </p>

                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/laserharborttagning-narbild.webp" 
                                alt="Närbild på ett laserhandstycke mot hud" 
                                className="w-full h-auto object-cover max-h-96"
                                width={1600}
                                height={1073}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">Laserljuset absorberas av pigmentet i håret och värmer upp hårsäcken.</p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="antal">Antal behandlingar och resultat</h2>
                        <p>
                            De flesta behöver <strong>6–10 behandlingar</strong> for ett bra resultat, med några veckors mellanrum (ofta 4–8 veckor beroende på område). Efter avslutad serie kan enstaka <strong>underhållsbehandlingar</strong> behövas då och då.
                        </p>
                        <p>
                            Ett vanlig missförstånd är att laser ger 100 % permanent hårfrihet. Den korrekta termen är <strong>permanent hårreduktion</strong>: en varaktig, ofta kraftig minskning av hårväxten, men enstaka hårstrån kan komma tillbaka – särskilt vid hormonellt driven hårväxt. En seriös klinik lovar därför reduktion och realistiska resultat, inte mirakel.
                        </p>
                        <p>
                            Hur många behandlingar just du behöver beror på flera saker: <strong>område</strong> (grövre hår på t.ex. bikini och armhålor kan behöva fler), <strong>hår- och hudtyp</strong> (kontrasten mellan hår och hud), och om hårväxten är <strong>hormonellt driven</strong> (t.ex. vid PCOS), vilket kan kräva fler behandlingar och underhåll. Du ser oftast en tydlig minskning redan efter de första gångerna, men det är hela serien som ger det varaktiga resultatet.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="hudtyp">Vilka hud- och hårtyper fungerar bäst?</h2>
                        <p>Eftersom lasern riktar in sig på pigment spelar kontrasten mellan hår och hud stor roll:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Bäst resultat:</strong> mörkt hår och ljusare hud – hög kontrast, tydligt mål for lasern.</li>
                            <li><strong>Kräver rätt teknik:</strong> mörkare hudtoner, där en <strong>Nd:YAG-laser</strong> oftast är säkrast eftersom den minskar risken för brännskador och pigmentförändringar.</li>
                            <li><strong>Svarar dåligt:</strong> ljust, grått, vitt och rött hår innehåller lite melanin och är svårt att behandla med laser.</li>
                        </ul>
                        <p>
                            Vanliga lasertyper är <strong>diodlaser</strong> (fungerar för de flesta), <strong>Alexandrite</strong> (ljus hud) och <strong>Nd:YAG</strong> (mörk hud). En bra klinik väljer teknik och inställning efter just din hud och hårtyp – och gör alltid ett testområde först vid osäkerhet.
                        </p>

                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/laserharborttagning-morkhud.webp" 
                                alt="Laserhårborttagning på melanin-rik, mörkare hud i en klinik" 
                                className="w-full h-auto object-cover max-h-96"
                                width={1600}
                                height={893}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">Mörkare hud kan behandlas – men kräver rätt lasertyp (ofta Nd:YAG) och en erfaren behandlare.</p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="pris">Områden och pris</h2>
                        <p>
                            Priset beror på områdets storlek, klinik och om du köper enstaka behandlingar eller paket. Nästan alla kliniker säljer <strong>paket</strong> (t.ex. 6 behandlingar), vilket blir billigare per gång. Nedan är ungefärliga prisspann per behandling – räkna med totalkostnaden för en hel serie.
                        </p>

                        <div className="overflow-x-auto my-6 border border-gray-200 rounded-xl">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Område</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ungefärligt pris/behandling</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Typiskt antal</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-sm sm:text-base">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Överläpp</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">300–600 kr</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">6–8</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Armhålor</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">400–800 kr</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">6–8</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Bikinilinje</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">500–1 200 kr</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">6–8</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Underben</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">1 000–2 500 kr</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">6–10</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Hela ben</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">1 500–3 500 kr</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">6–10</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Rygg / bröst</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">1 000–2 500 kr</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">6–10</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-gray-500 italic mt-1">* Ungefärliga priser i Sverige; paketpris sänker ofta styckpriset betydligt.</p>

                        <p>
                            Priset påverkas av områdets storlek, klinikens utrustning och läge, samt hur många behandlingar som ingår. Var lite skeptisk mot extrempriser: ovanligt billiga erbjudanden kan betyda äldre utrustning eller mindre erfaren personal, medan det dyraste inte automatiskt är det bästa. Fråga alltid vad som ingår (antal behandlingar, eventuell konsultation och testområde) så att du kan jämföra äpplen med äpplen.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="sakerhet">Gör det ont? Biverkningar och säkerhet</h2>
                        <p>
                            De flesta beskriver känslan som ett snärtande gummiband mot huden. Det är oftast fullt uthärdligt, och många maskiner har inbyggd kylning som dämpar obehaget. Bedövningskräm kan användas vid känsliga områden.
                        </p>
                        <p>
                            Vanliga, övergående biverkningar är <strong>rodnad och lätt svullnad</strong> timmarna efter behandlingen. Mer sällsynta men allvarligare reaktioner – som blåsor, brännskador eller pigmentförändringar – förekommer framför allt vid <strong>fel inställningar, solbränd hud eller mörk hud som behandlas med olämplig laser</strong>. Därför är kompetensen på kliniken avgörande.
                        </p>
                        <p>
                            Undvik sol och solariesolande före och efter behandling, och tänk på att laser inte görs över tatueringar eller vissa födelsemärken. Berätta alltid om mediciner (vissa gör huden ljuskänslig), hudsjukdomar eller graviditet, så att kliniken kan bedöma om behandlingen är lämplig. Ögonskydd ska alltid användas.
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Så förbereder du dig – och sköter huden efteråt</h3>
                        <p>Rätt förberedelse påverkar både resultat och säkerhet:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Raka</strong> området ett dygn innan (rakhår behövs, men själva hårstrået i hudytan ska vara kort). <strong>Plocka, vaxa eller epilera inte</strong> mellan behandlingarna – lasern behöver håret kvar i hårsäcken för att fungera.</li>
                            <li><strong>Undvik sol, solarium och självbruna</strong> i ett par veckor före och efter; solbränd eller mörknad hud ökar risken för biverkningar.</li>
                            <li>Kom <strong>osminkad</strong> och utan parfymerade produkter på området.</li>
                        </ul>
                        <p className="mt-4">
                            Efter behandlingen kan huden vara röd och varm några timmar. Undvik då bastu, träning, heta bad och sol det närmaste dygnet, och använda <strong>solskydd</strong> på behandlade områden som exponeras för sol. Håret som behandlats faller ofta av under de följande en–två veckorna – klämm eller plocka inte, låt det lossna av sig självt.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="hemma">Hemma-IPL vs behandling på klinik</h2>
                        <p>
                            Det finns många IPL-apparater för hemmabruk. De är byggda med lägre energi, vilket gör dem säkrare att använda själv – men också långsammare och svagare än klinikens utrustning, och de kräver tålamod och regelbundenhet. De passar bäst för dig med mörkt hår och ljus hud, och är olämpliga för mörk hud eller ljust hår.
                        </p>
                        <p>
                            På klinik får du starkare utrustning, en professionell bedömning av hud och hårtyp, och möjlighet att justera inställningarna – vilket ofta ger snabbare och mer tillförlitliga resultat. För större eller känsliga områden, eller om du har mörkare hud, är klinik oftast det tryggare valet.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="klinik">Att välja klinik – och de nya lagkraven</h2>
                        <p>
                            Historiskt har laserhårborttagning varit förvånansvärt oreglerat – vem som helst har kunnat köpa en maskin och börja behandla. <strong>Det ändrades 2026.</strong> Sedan den 4 maj 2026 gäller Strålsäkerhetsmyndighetens föreskrifter (SSMFS 2026:1), som innebär att verksamheter som använder starka lasrar och IPL för bland annat hårborttagning ska <strong>anmäla sin verksamhet till Strålsäkerhetsmyndigheten (SSM)</strong> och uppfylla krav på kompetens och säkerhet.
                        </p>
                        <p>
                            Det gör det lättare för dig att välja rätt. Kontrollera att kliniken:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>är <strong>anmäld till Strålsäkerhetsmyndigheten</strong> och följer de nya reglerna,</li>
                            <li>har <strong>utbildad och erfaren personal</strong> som kan din hud- och hårtyp,</li>
                            <li>gör en <strong>konsultation, hälsodeklaration och testbehandling</strong> innan de sätter igång,</li>
                            <li>ger dig realistiska förväntningar och tydlig prisinformation.</li>
                        </ul>
                        <p className="mt-4">
                            Notera att laserhårborttagning inte omfattas av lagen om estetiska injektioner och kirurgi (2021:363) eller IVO:s tillsyn på samma sätt som botox och fillers – det är i stället <strong>Strålsäkerhetsmyndigheten</strong> som är tillsynsmyndighet för laser och IPL. Vill du ha en generell checklista för att bedöma en klinik, läs vår guide <Link href="/blogg/estetisk-klinik" className="text-primary hover:underline font-medium">Så väljer du en seriös estetisk klinik</Link>.
                        </p>

                        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 my-8 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/blogg/laserharborttagning-konsultation.webp" 
                                alt="Hudterapeut konsulterar en klient inför laserhårborttagning" 
                                className="w-full h-auto object-cover max-h-96"
                                width={1600}
                                height={1073}
                                loading="lazy"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100 m-0">En seriös klinik börjar med konsultation, hälsodeklaration och testbehandling.</p>
                        </div>

                        <div className="bg-gray-50 border-l-4 border-primary p-6 mt-8 rounded-r-lg">
                            <h3 className="font-bold text-gray-900 mb-2">Hitta en klinik nära dig</h3>
                            <p className="text-gray-700 text-sm sm:text-base mb-4">
                                På <strong>battrehy.se</strong> samlar vi kliniker som utför hårborttagning med laser och IPL i hela Sverige. Hitta och jämför verifierade kliniker i ditt område.
                            </p>
                            <Link href="/behandlingar/laser-harborttagning" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary hover:bg-rose-600 transition-colors">
                                Hitta kliniker för laserhårborttagning
                            </Link>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="faq">Vanliga frågor</h2>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-gray-900">Är laserhårborttagning permanent?</h4>
                                <p className="text-gray-700 mt-1">Den ger permanent hårreduktion – en varaktig och ofta kraftig minskning av hårväxten. Enstaka hår kan komma tillbaka, särskilt vid hormonell hårväxt, och underhållsbehandlingar kan behövas.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Hur många behandlingar behövs?</h4>
                                <p className="text-gray-700 mt-1">Vanligtvis 6–10 behandlingar med några veckors mellanrum, eftersom håret växer i cykler och lasern biter bäst på hår i tillväxtfas.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Vad kostar laserhårborttagning?</h4>
                                <p className="text-gray-700 mt-1">Det beror på område och klinik – från ett par hundra kronor för överläpp till några tusen för större områden per gång. Paket sänker oftast styckpriset. Räkna med totalkostnaden för hela serien.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Fungerar laser på ljust, grått eller rött hår?</h4>
                                <p className="text-gray-700 mt-1">Dåligt, eftersom sådant hår innehåller lite melanin för lasern att rikta in sig på. Där kan andra metoder vara mer aktuella – rådgör med en klinik.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Fungerar laser på mörk hud?</h4>
                                <p className="text-gray-700 mt-1">Ja, men det kräver rätt lasertyp (ofta Nd:YAG) och en erfaren behandlare, eftersom risken för pigmentförändringar och brännskador annars är högre.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Gör det ont?</h4>
                                <p className="text-gray-700 mt-1">De flesta upplever ett snärtande obehag, ofta dämpat av kylning. Bedövningskräm kan användas vid behov.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Vad ska jag kontrollera innan jag bokar?</h4>
                                <p className="text-gray-700 mt-1">Att kliniken är anmäld till Strålsäkerhetsmyndigheten, har utbildad personal, gör en konsultation och testbehandling, och ger realistiska löften.</p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="kallor">Källor</h2>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                            <li><a href="https://www.stralsakerhetsmyndigheten.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Strålsäkerhetsmyndigheten (SSM) – SSMFS 2026:1 om laser och intensivt pulserande ljus (IPL)</a></li>
                            <li><a href="https://www.1177.se/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">1177 Vårdguiden – hudvård och information inför estetiska behandlingar</a></li>
                            <li>Dermatologisk konsensus – laserbaserad hårborttagning, metod och säkerhet</li>
                        </ul>

                        <div className="mt-12 text-sm text-gray-500 italic border-t border-gray-200 pt-8">
                            Den här artikeln är framtagen av Battrehys redaktion i informationssyfte och utgör inte medicinsk rådgivning. Rådgör med en legitimerad eller utbildad behandlare inför en behandling.
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}
