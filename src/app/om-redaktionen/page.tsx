import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Om Battrehys Redaktion | battrehy.se',
    description: 'Läs om hur vi skriver våra guider, våra redaktionella riktlinjer och hur vi säkerställer oberoende och korrekt information.',
};

export default function EditorialPage() {
    return (
        <main className="min-h-screen bg-gray-50 p-4 sm:p-8 pb-24">
            <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">Om Battrehys redaktion</h1>
                
                <div className="prose prose-lg text-gray-700 space-y-6">
                    <p>
                        Välkommen till Battrehys redaktionella sida. Vårt mål är att erbjuda Sveriges mest tillförlitliga, oberoende och heltäckande information om estetiska behandlingar och hudvård.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Våra redaktionella riktlinjer</h2>
                    <p>
                        För att du ska kunna fatta trygga och informerade beslut kring ditt val av behandling och klinik, bygger våra guider och artiklar på tre grundprinciper:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Oberoende:</strong> Vi tar inte emot betalning från kliniker för att gynna vissa behandlingar i våra guider. Vårt innehåll är skrivet med patientens säkerhet i fokus.</li>
                        <li><strong>Faktagranskning:</strong> Information om priser baseras på aggregerad marknadsdata och medianpriser (exempelvis från Skönhetskollen).</li>
                        <li><strong>Medicinsk korrekthet:</strong> Vi strävar efter att återge anatomiska och fysiologiska fakta korrekt och objektivt.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Vi citerar officiella källor</h2>
                    <p>
                        Skönhetsbranschen är sedan 2021 starkt reglerad genom <strong>Lag (2021:363) om estetiska kirurgiska ingrepp och estetiska injektionsbehandlingar</strong>. I alla våra behandlingsguider refererar vi alltid till och bygger våra rekommendationer på officiella, statliga källor:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><a href="https://www.ivo.se/" className="text-primary hover:underline">Inspektionen för vård och omsorg (IVO)</a> — För information om vårdgivarregister och patientsäkerhet.</li>
                        <li><a href="https://www.socialstyrelsen.se/" className="text-primary hover:underline">Socialstyrelsen</a> — För verifiering av yrkeslegitimationer och behörighet.</li>
                        <li><a href="https://www.1177.se/" className="text-primary hover:underline">1177 Vårdguiden</a> — För oberoende patientinformation kring biverkningar och eftervård.</li>
                        <li><a href="https://www.lakemedelsverket.se/" className="text-primary hover:underline">Läkemedelsverket</a> — För godkända preparat (som botulinumtoxin och hyaluronsyra).</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Kontakta oss</h2>
                    <p>
                        Har du upptäckt ett sakfel i någon av våra artiklar, eller har du förslag på ämnen vi borde bevaka? Tveka inte att höra av dig till oss via vår <Link href="/kontakt" className="text-primary hover:underline">kontaktsida</Link>.
                    </p>
                </div>
            </div>
        </main>
    );
}
