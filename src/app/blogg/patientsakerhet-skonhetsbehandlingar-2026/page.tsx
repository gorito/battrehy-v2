import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles, ShieldCheck, MapPin, ChevronRight, HelpCircle, FileText } from 'lucide-react';
import { SchemaScript } from '@/components/SchemaScript';
import { buildBreadcrumbSchema, buildArticleSchema, buildFAQSchema, buildHowToSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: {
        absolute: 'Patientsäkerhet vid skönhetsbehandling 2026 | Bättrehy',
    },
    description: 'Tragedin i Helsingfors påminner om patientsäkerhet. Guide till lag 2021:363 i Sverige, 48 h betänketid, IVO-krav och 12 saker att kolla innan du bokar klinik.',
    alternates: {
        canonical: 'https://battrehy.se/blogg/patientsakerhet-skonhetsbehandlingar-2026',
    },
    openGraph: {
        title: 'Patientsäkerhet vid skönhetsbehandling 2026 | Bättrehy',
        description: 'Tragedin i Helsingfors påminner om patientsäkerhet. Guide till lag 2021:363 i Sverige, 48 h betänketid, IVO-krav och 12 saker att kolla innan du bokar klinik.',
        type: 'article',
        locale: 'sv_SE',
        url: 'https://battrehy.se/blogg/patientsakerhet-skonhetsbehandlingar-2026',
        images: [
            {
                url: 'https://battrehy.se/images/blogg/01-hero-patientsakerhet.jpg',
                width: 1200,
                height: 675,
                alt: 'Patientsäkerhet vid skönhetsbehandlingar i Sverige 2026',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Patientsäkerhet vid skönhetsbehandling 2026 | Bättrehy',
        description: 'Tragedin i Helsingfors påminner om patientsäkerhet. Guide till lag 2021:363 i Sverige, 48 h betänketid, IVO-krav och 12 saker att kolla innan du bokar klinik.',
        images: ['https://battrehy.se/images/blogg/01-hero-patientsakerhet.jpg'],
    }
};

export default function PatientSafetyBlogPost() {
    const reviewer = {
        name: undefined as string | undefined,
        credentials: "Legitimerad sjuksköterska med specialistkompetens inom estetisk dermatologi och certifierad av Estetiska Injektionsrådet (EIR)",
        profileUrl: undefined as string | undefined,
    };

    const faqItems = [
        {
            question: "Är fillers och botox farliga i Sverige?",
            answer: "När de utförs av legitimerad hälso- och sjukvårdspersonal (läkare, tandläkare eller sjuksköterska) med CE-märkta originalpreparat och enligt gällande lagstiftning är risken låg. Allvarliga komplikationer är sällsynta, och för hyaluronsyrefillers finns dessutom enzymet hyaluronidas som omedelbart kan lösa upp fillern om en komplikation skulle uppstå."
        },
        {
            question: "Hur vanligt är det med allvarliga skador i Sverige?",
            answer: "Mycket ovanligt jämfört med länder med svagare reglering. Sedan Lag (2021:363) trädde i kraft utövar IVO regelbunden tillsyn. Anmälningar förekommer, men allvarliga och bestående skador är i förhållande till det totala antalet årliga behandlingar sällsynta hos legitimerade kliniker."
        },
        {
            question: "Kan man lita på billiga kliniker eller kampanjpriser?",
            answer: "Nej, extremt låga priser är en av de tydligaste varningssignalerna. Äkta CE-märkta preparat från auktoriserade läkemedelsbolag (som Galderma eller Allergan) och legitimerad personal har fasta kvalitetskostnader. Misstänkt låga priser indikerar ofta parallellimporterade eller förfalskade produkter, utspädda doser eller personal utan svensk legitimation."
        },
        {
            question: "Vad gör jag om något går fel under eller efter behandlingen?",
            answer: "Kontakta kliniken omedelbart. Seriösa kliniker har dygnet-runt-beredskap för akuta komplikationer och medicinskt samarbete med specialistsjukvård. Du har lagstadgad rätt till ersättning genom klinikens patientförsäkring om en vårdskada inträffar, och du kan även anmäla brister till IVO (Inspektionen för vård och omsorg)."
        },
        {
            question: "Är estetiska behandlingar säkrare i Sverige än i Finland?",
            answer: "Sverige har en av Europas striktaste lagstiftningar genom Lag (2021:363), som ställer specifika krav på medicinsk legitimation, 48 timmars obligatorisk betänketid, obligatorisk patientförsäkring och IVO-tillsyn. I Finland och flera andra länder har motsvarande enhetliga lagkrav saknats, vilket ger patienter i Sverige ett betydligt starkare juridiskt och medicinskt skyddsnät."
        },
        {
            question: "Måste jag ha 48 timmars betänketid även för botox och fillers?",
            answer: "Ja, lagen är helt tydlig: för alla nya patienter krävs en obligatorisk konsultation och minst 48 timmars betänketid innan behandlingen får genomföras. Samma regel gäller om det gått mer än sex månader sedan din senaste behandling hos kliniken."
        },
        {
            question: "Kan jag lita på en klinik bara för att den har många följare på Instagram eller TikTok?",
            answer: "Nej, sociala medier är marknadsföring och följarantal speglar inte medicinsk kompetens eller patientsäkerhet. Kontrollera alltid hårda fakta: svensk legitimation via Socialstyrelsens register HOSP, registrering i IVO:s vårdgivarregister samt giltig patientförsäkring."
        }
    ];

    const checklistSteps = [
        {
            name: "1. Är behandlaren legitimerad?",
            text: "Kontrollera att personen har svensk legitimation som läkare, tandläkare eller sjuksköterska via Socialstyrelsens register HOSP. Hudterapeuter eller outbildade personer får inte ge injektioner."
        },
        {
            name: "2. Är kliniken registrerad hos IVO?",
            text: "Alla verksamheter som utför estetiska injektioner eller kirurgi måste vara anmälda och sökbara i IVO:s vårdgivarregister."
        },
        {
            name: "3. Erbjuds minst 48 timmars betänketid?",
            text: "Enligt lag krävs 48 timmars betänketid mellan konsultation och första behandling. Om kliniken pressar dig att behandlas samma dag bryter de mot svensk lag."
        },
        {
            name: "4. Har kliniken tecknad patientförsäkring?",
            text: "Be om bevis på att kliniken har en giltig patientförsäkring (t.ex. via Folksam eller Länsförsäkringar) som ersätter eventuella vårdskador."
        },
        {
            name: "5. Använder de CE-märkta originalprodukter?",
            text: "Kräv att få veta preparatets namn och tillverkare. För fillers: Restylane, Juvéderm, Teosyal, Belotero. För botox: Botox, Azzalure, Bocouture."
        },
        {
            name: "6. Får du se före- och efterbilder från just den behandlaren?",
            text: "Behandlaren ska kunna visa upp egna, oretuscherade resultat – inte enbart generiska marknadsföringsbilder från leverantören."
        },
        {
            name: "7. Finns det en transparent och tydlig prislista?",
            text: "Priset ska vara tydligt angivet inklusive moms, konsultation och eventuell touch-up. Var vaksam mot orimligt låga priser."
        },
        {
            name: "8. Finns Hyalase (hyaluronidas) fysiskt tillgängligt?",
            text: "Vid fillerbehandling med hyaluronsyra är det ett absolut säkerhetskrav att akutenzymet Hyalase finns på plats om ett kärl skulle blockeras."
        },
        {
            name: "9. Hur hanterar kliniken akuta komplikationer?",
            text: "Fråga vilka beredskapsrutiner kliniken har om du får kraftig smärta, blekhet eller infektion efter besöket och hur du når dem utanför kontorstid."
        },
        {
            name: "10. Vad säger oberoende patientrecensioner?",
            text: "Granska oberoende omdömen på Bättrehy.se och Google Reviews för att bilda dig en uppfattning om tidigare patienters erfarenheter."
        },
        {
            name: "11. Känns konsultationen trygg och professionell?",
            text: "Du ska bemötas med lyhördhet och saklig information, utan säljpitchar eller stress. Du har alltid rätt att ångra dig."
        },
        {
            name: "12. Får du skriftlig information om risker och eftervård?",
            text: "Lagen kräver att du får skriftlig dokumentation om potentiella biverkningar och tydliga skötselråd för dagarna efter behandlingen."
        }
    ];

    const schemas = [
        buildBreadcrumbSchema([
            { name: 'Hem', url: 'https://battrehy.se' },
            { name: 'Blogg', url: 'https://battrehy.se/blogg' },
            { name: 'Patientsäkerhet', url: 'https://battrehy.se/blogg/patientsakerhet-skonhetsbehandlingar-2026' }
        ]),
        buildArticleSchema({
            headline: "Efter tragedin i Helsingfors: Så skyddar du dig vid skönhetsbehandlingar i Sverige 2026",
            description: "Tragedin i Helsingfors påminner om patientsäkerhet. Guide till lag 2021:363 i Sverige, 48 h betänketid, IVO-krav och 12 saker att kolla innan du bokar klinik.",
            reviewer: reviewer.name ? {
                name: reviewer.name,
                credentials: reviewer.credentials,
                profileUrl: reviewer.profileUrl,
            } : undefined,
            datePublished: "2026-09-08T08:00:00+02:00",
            dateModified: "2026-09-08T08:00:00+02:00",
            imageUrl: "https://battrehy.se/images/blogg/01-hero-patientsakerhet.jpg",
            pageUrl: "https://battrehy.se/blogg/patientsakerhet-skonhetsbehandlingar-2026"
        }),
        buildHowToSchema({
            name: "Checklista: 12 saker du måste kontrollera innan du bokar skönhetsbehandling",
            description: "En 12-punkters säkerhetskontroll för att skydda dig som patient vid estetiska injektioner och kirurgiska ingrepp enligt lag 2021:363.",
            steps: checklistSteps
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
                            Efter tragedin i Helsingfors: Så skyddar du dig vid skönhetsbehandlingar i Sverige 2026
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
                                src="/images/blogg/01-hero-patientsakerhet.jpg"
                                alt="Patientsäkerhet vid skönhetsbehandlingar i Sverige 2026"
                                className="w-full h-auto object-cover max-h-[550px]"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100">
                                Patientsäkerhet är det enskilt viktigaste vid alla typer av skönhetsbehandlingar.
                            </p>
                        </div>
                    </header>

                    <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                        <p className="text-xl leading-relaxed text-gray-800 mb-6 font-medium">
                            Den 3 september 2026 avled den 27-åriga finländska influencern Olivia Oras efter allvarliga komplikationer i samband med en fettransplantation på en privat skönhetsklinik i Helsingfors. Hon förlorade medvetandet under bedövningen och avled senare på sjukhus. Polisen i Finland har inlett en förundersökning.
                        </p>

                        {/* Utredningsnotis */}
                        <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-4 my-6 text-sm text-gray-600 leading-relaxed italic">
                            Polisens förundersökning pågår fortfarande i skrivande stund, och uppgifter i det finska fallet kan komma att ändras eller kompletteras allteftersom utredningen fortskrider. Våra tankar går till Olivia Oras familj och närstående.
                        </div>

                        <p>
                            Det inträffade är en fruktansvärd tragedi som väckt stark oro i hela Norden. Samtidigt utgör händelsen en allvarlig påminnelse om hur avgörande patientsäkerhet, medicinsk kompetens och strikta rutiner är inom estetisk medicin.
                        </p>
                        <p>
                            På <strong>Bättrehy.se</strong> tar vi detta på största allvar. Den här artikeln syftar inte till att spekulera i den finska händelsen. Dess syfte är att sakligt och tydligt gå igenom <strong>hur du som patient i Sverige skyddar dig</strong> – och hur den svenska lagstiftningen ger dig ett av Europas starkaste skyddsnät.
                        </p>

                        {/* Callout: Kirurgi vs Injektioner */}
                        <div className="bg-amber-50/70 border-l-4 border-amber-500 p-5 rounded-r-2xl my-8">
                            <h3 className="text-lg font-bold text-amber-950 mb-2 flex items-center gap-2">
                                <ShieldAlert className="text-amber-600 w-5 h-5 flex-shrink-0" />
                                Viktig distinktion: Kirurgiska ingrepp vs injektionsbehandlingar
                            </h3>
                            <p className="text-sm text-amber-900 leading-relaxed mb-2">
                                Olivia Oras genomgick en <strong>kirurgisk fettransplantation under bedövning</strong>. Kirurgiska ingrepp innebär alltid helt andra medicinska risker avseende anestesi, cirkulationspåverkan och vävnadstrauma än vanliga icke-kirurgiska skönhetsbehandlingar som botox, fillers, microneedling och hudlaser.
                            </p>
                            <p className="text-sm text-amber-900 leading-relaxed">
                                I Sverige är det framför allt de icke-kirurgiska behandlingarna som flest genomför. Men även vid injektioner existerar risker om kliniken eller behandlaren saknar legitimation, använder undermåliga preparat eller bryter mot gällande lagar.
                            </p>
                        </div>

                        {/* Innehållsförteckning Navigation */}
                        <nav className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Innehåll i denna guide</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <li><a href="#svensk-lag" className="text-primary hover:underline">1. Sverige har striktare regler (Lag 2021:363)</a></li>
                                <li><a href="#checklista" className="text-primary hover:underline font-medium">2. Checklista: 12 saker du måste kontrollera</a></li>
                                <li><a href="#kirurgi-vs-injektioner" className="text-primary hover:underline">3. Kirurgi vs injektioner – när är risken högst?</a></li>
                                <li><a href="#faq" className="text-primary hover:underline font-medium">4. Vanliga frågor om säkerhet (FAQ 2026)</a></li>
                                <li><a href="#kallor" className="text-primary hover:underline">5. Källor & medicinsk granskning</a></li>
                                <li><a href="#kontrollerad-klinik" className="text-primary hover:underline">Så hittar du en kontrollerad klinik</a></li>
                            </ul>
                        </nav>

                        {/* Sektion 1: Lag 2021:363 */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="svensk-lag">
                            1. Sverige har striktare regler – tack vare Lag 2021:363
                        </h2>
                        <p>
                            Sedan den 1 juli 2021 gäller i Sverige <strong>Lag (2021:363) om estetiska kirurgiska ingrepp och estetiska injektionsbehandlingar</strong>. Lagen instiftades av riksdagen efter flera allvarliga incidenter och tillsynsrapporter för att sätta stopp för oseriösa aktörer och garantera patientsäkerheten.
                        </p>
                        <p>
                            Den svenska lagstiftningen ställer betydligt högre krav på behandlaren än vad som gäller i många andra europeiska länder, däribland Finland där motsvarande samlade lagstiftning saknats.
                        </p>

                        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Det viktigaste i lagen för dig som patient</h3>

                        <div className="overflow-x-auto my-6">
                            <table className="w-full border-collapse bg-white border border-gray-200 rounded-xl text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Lagkrav (Lag 2021:363)</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Vad det betyder för din trygghet</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/70">Legitimerad personal</td>
                                        <td className="px-4 py-3 text-gray-800">Endast legitimerad läkare, tandläkare eller sjuksköterska får ge estetiska injektioner (botox och fillers). Kirurgiska ingrepp får endast utföras av specialistläkare inom relevant specialitet.</td>
                                    </tr>
                                    <tr className="bg-gray-50/40">
                                        <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/70">48 timmars betänketid</td>
                                        <td className="px-4 py-3 text-gray-800">Du måste ha minst 48 timmar mellan den obligatoriska konsultationen och själva behandlingen. Drop-in eller impulsbehandlingar är olagliga för nya patienter.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/70">Skriftlig information</td>
                                        <td className="px-4 py-3 text-gray-800">Kliniken måste ge dig skriftlig information om risker, komplikationer, förväntat resultat och exakta eftervårdsinstruktioner före ingreppet.</td>
                                    </tr>
                                    <tr className="bg-gray-50/40">
                                        <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/70">Patientförsäkring</td>
                                        <td className="px-4 py-3 text-gray-800">Verksamheten måste ha en tecknad patientförsäkring som ger dig rätt till ekonomisk ersättning om en vårdskada skulle uppstå.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/70">IVO-registrering</td>
                                        <td className="px-4 py-3 text-gray-800">Kliniken måste vara anmäld till Inspektionen för vård och omsorgs vårdgivarregister och stå under svensk tillsyn.</td>
                                    </tr>
                                    <tr className="bg-gray-50/40">
                                        <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/70">Strikt 18-årsgräns</td>
                                        <td className="px-4 py-3 text-gray-800">Det är förbjudet enligt svensk lag att utföra estetiska injektioner eller kirurgi på personer under 18 år, även med målsmans godkännande.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Sektion 2: Checklista */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="checklista">
                            2. Checklista: 12 saker du måste kolla innan du bokar
                        </h2>
                        <p>
                            Oavsett om du planerar en mindre injektionsbehandling eller överväger ett större ingrepp ska du alltid bocka av följande 12 punkter:
                        </p>

                        {/* Image 02 - Checklista */}
                        <div className="my-8 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/blogg/02-checklista-patientsakerhet.jpg"
                                alt="Checklista – 12 saker att kolla innan du bokar skönhetsbehandling"
                                className="w-full h-auto object-cover max-h-[500px]"
                            />
                            <p className="text-xs text-gray-500 p-3 text-center bg-gray-50 border-t border-gray-100">
                                Checklista för patientsäkerhet – 12 konkreta kontrollpunkter inför varje behandling.
                            </p>
                        </div>

                        {/* 12-punkters visuell lista */}
                        <div className="space-y-4 my-8">
                            {checklistSteps.map((item, idx) => (
                                <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:border-emerald-300 transition-colors">
                                    <div className="flex items-start gap-3.5">
                                        <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <CheckCircle2 size={18} className="text-emerald-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-base mb-1">{item.name}</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl my-6">
                            <p className="text-sm font-semibold text-rose-900">
                                Gyllene regel: Om kliniken inte uppfyller merparten av dessa 12 punkter – eller om du känner dig pressad att boka snabbt – ska du avstå från behandlingen. Din hälsa och trygghet går alltid först.
                            </p>
                        </div>

                        {/* Sektion 3: Kirurgi vs Injektioner */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4" id="kirurgi-vs-injektioner">
                            3. Kirurgi vs injektioner – när är risken högst?
                        </h2>
                        <p>
                            Det är viktigt att ha en nyanserad bild av risker inom estetisk vård. Olika ingrepp har väsentligt skilda risknivåer:
                        </p>

                        <div className="overflow-x-auto my-6">
                            <table className="w-full border-collapse bg-white border border-gray-200 rounded-xl text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Typ av behandling</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Risknivå</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Krav i Sverige</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Kommentar</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/70">Botox & Fillers</td>
                                        <td className="px-4 py-3 text-emerald-700 font-semibold">Låg – Medel</td>
                                        <td className="px-4 py-3 text-gray-800">Lag 2021:363 (leg. vårdpersonal)</td>
                                        <td className="px-4 py-3 text-gray-800">Vanligaste behandlingarna. HA-fillers är reversibla med Hyalase.</td>
                                    </tr>
                                    <tr className="bg-gray-50/40">
                                        <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/70">Microneedling & Laser</td>
                                        <td className="px-4 py-3 text-emerald-700 font-semibold">Låg – Medel</td>
                                        <td className="px-4 py-3 text-gray-800">Varierar efter våglängd/djup</td>
                                        <td className="px-4 py-3 text-gray-800">Kräver gedigen hudterapeututbildning eller medicinsk kompetens.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/70">Trådlyft</td>
                                        <td className="px-4 py-3 text-amber-700 font-semibold">Medel</td>
                                        <td className="px-4 py-3 text-gray-800">Lag 2021:363 (leg. vårdpersonal)</td>
                                        <td className="px-4 py-3 text-gray-800">Mer invasivt ingrepp som fordrar djup anatomisk erfarenhet.</td>
                                    </tr>
                                    <tr className="bg-gray-50/40">
                                        <td className="px-4 py-3 font-semibold text-gray-900 bg-gray-50/70">Fettransplantation & Plastikkirurgi</td>
                                        <td className="px-4 py-3 text-rose-700 font-semibold">Hög</td>
                                        <td className="px-4 py-3 text-gray-800">Specialistkompetens + operationsavdelning</td>
                                        <td className="px-4 py-3 text-gray-800">Samma risknivå som i händelsen i Helsingfors. Kräver narkos/sedationsövervakning.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            Inför ett <strong>kirurgiskt ingrepp</strong> (såsom fettransplantation, fettsugning, bröstoperation, bukplastik eller näsplastik) ska du alltid kräva:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-800">
                            <li>Att kirurgen har svensk <strong>specialistkompetens i plastikkirurgi</strong>.</li>
                            <li>Att operationen utförs på en fullt utrustad operationsavdelning med narkosläkare och återupplivningsutrustning.</li>
                            <li>En omfattande <strong>preoperativ hälsodeklaration</strong> med blodprover och EKG vid behov.</li>
                        </ul>

                        {/* Sektion 4: FAQ */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6" id="faq">
                            4. Vanliga frågor om patientsäkerhet (FAQ 2026)
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

                        {/* Avslutning */}
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                            Avslutning
                        </h2>
                        <p>
                            Olivia Oras tragiska bortgång är en händelse som ingen ska behöva genomlida. Den påminner oss alla om att estetiska behandlingar – hur vanliga de än må ha blivit i samhället – i grunden är medicinska ingrepp som aldrig är riskfria.
                        </p>
                        <p>
                            I Sverige har vi ett regelverk som ger dig som patient konkreta verktyg för att ställa krav och skydda dig. Använd dem: kontrollera legitimationen, kräv 48 timmars betänketid och fråga alltid efter preparat och beredskapsrutiner.
                        </p>
                        <p className="font-semibold text-gray-900">
                            En seriös och kompetent klinik välkomnar dina frågor med öppna armar. Prioritera alltid din egen säkerhet och hälsa framför lockpriser och snabba genvägar.
                        </p>

                        {/* Källor & Medicinsk granskning */}
                        <div className="border-t border-gray-200 pt-8 mt-12" id="kallor">
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8 text-sm text-gray-600 space-y-2">
                                <div className="flex items-center gap-2 font-semibold text-gray-900">
                                    <ShieldCheck size={18} className="text-emerald-600" />
                                    Medicinsk granskning & faktakontroll
                                </div>
                                <p>
                                    Denna artikel är sammanställd och granskad av <strong>Battrehys redaktion</strong> utifrån gällande svensk lagstiftning (Lag 2021:363 om estetiska kirurgiska ingrepp och estetiska injektionsbehandlingar), Socialstyrelsens tillsynsregler och register, IVO:s vårdgivarregister samt officiella uppgifter från finländska myndigheter.
                                </p>
                                <p className="text-xs text-gray-500">
                                    <strong>Medicinsk disclaimer:</strong> Artikeln är avsedd som allmän upplysning och konsumentinformation och ersätter inte personlig medicinsk rådgivning. Rådgör alltid med legitimerad hälso- och sjukvårdspersonal för individuell medicinsk bedömning.
                                </p>
                                <p className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                                    <strong>Källor:</strong> Svensk författningssamling (SFS 2021:363), Inspektionen för vård och omsorg (IVO), Socialstyrelsen, Yle Uutiset, Helsingin Sanomat, polisen i Finland.
                                </p>
                                <p className="text-xs text-gray-500 font-medium">
                                    Senast faktagranskad och publicerad: 8 september 2026.
                                </p>
                            </div>
                        </div>

                        {/* Konsumentvägledning: Hitta kontrollerad klinik */}
                        <div className="border-t border-gray-200 pt-10 mt-10" id="kontrollerad-klinik">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Så hittar du en kontrollerad klinik i Sverige
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                För dig som söker en skönhetsbehandling är det avgörande att själv kontrollera att verksamheten följer lagstiftningen. Via Bättrehy.se kan du söka fram kliniker som uppfyller kraven i <strong>Lag (2021:363)</strong> och har legitimerad hälso- och sjukvårdspersonal.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                Konsumentinformation på plattformen gör det möjligt att:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mb-8 text-gray-700">
                                <li>Verifiera att kliniken har anmält verksamheten och uppfyller lagstadgade krav.</li>
                                <li>Filtrera efter ort, behandlingsform och oberoende patientomdömen.</li>
                                <li>Ta del av saklig information och medicinskt granskade guider om risker, betänketid och eftervård.</li>
                            </ul>

                            {/* CTA Box */}
                            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 my-8 text-center">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Hitta trygga och verifierade kliniker nära dig</h3>
                                <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
                                    Utforska legitimerade behandlare med goda omdömen och kontrollera att kliniken följer alla gällande lagkrav.
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
                                    <Link href="/behandlingar/botoxbehandling" className="bg-white border border-gray-200 hover:border-primary px-3 py-2.5 rounded-xl text-sm font-medium text-gray-800 hover:text-primary transition-colors flex items-center justify-center gap-1">
                                        Botoxkliniker
                                    </Link>
                                    <Link href="/behandlingar/fillerbehandling" className="bg-primary hover:bg-primary/90 px-3 py-2.5 rounded-xl text-sm font-medium text-white transition-colors flex items-center justify-center gap-1 shadow-sm">
                                        Fillerskliniker <ChevronRight size={16} />
                                    </Link>
                                </div>
                                <div className="text-xs text-gray-500 space-y-1">
                                    <p>Läs även våra kompletta guider:</p>
                                    <div className="flex flex-wrap justify-center gap-3">
                                        <Link href="/blogg/fillerbehandling-den-kompletta-guiden" className="text-primary underline font-medium">
                                            Fillersguiden 2026
                                        </Link>
                                        <span>·</span>
                                        <Link href="/blogg/botoxbehandling-den-kompletta-guiden" className="text-primary underline font-medium">
                                            Botoxguiden 2026
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </article>
            </div>
        </main>
    );
}
