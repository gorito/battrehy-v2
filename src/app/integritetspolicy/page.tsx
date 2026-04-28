import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Integritetspolicy | Bättrehy.se',
    description: 'Integritetspolicy för Bättrehy.se.',
};

export default function IntegritetspolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="relative py-20 bg-rose-50 overflow-hidden border-b border-rose-100">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-rose-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-3xl" />
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-4 tracking-tight">
                        Integritetspolicy
                    </h1>
                    <p className="text-gray-500 text-sm font-medium">
                        Senast uppdaterad: april 2026
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-gray-600 leading-relaxed space-y-6">
                    <p className="font-bold text-charcoal-900 text-lg">Bättrehy.se</p>
                    <p className="mb-4">
                        Din integritet är viktig för oss. Denna integritetspolicy förklarar hur Battrehy.se (“vi”, “oss”), som drivs av Gorito AB, samlar in, använder och skyddar dina personuppgifter när du besöker vår webbplats <Link href="/" className="text-rose-500 hover:underline">battrehy.se</Link> (“tjänsten”).
                    </p>
                    <p className="mb-4">
                        Vi behandlar personuppgifter i enlighet med EU:s dataskyddsförordning (GDPR) samt övrig tillämplig svensk dataskyddslagstiftning.
                    </p>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">1. Personuppgiftsansvarig</h2>
                        <p className="mb-4">Personuppgiftsansvarig för behandlingen av dina uppgifter är:</p>
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-4">
                            <p className="font-bold text-charcoal-900 mb-4">Battrehy.se (Gorito AB)</p>
                            <ul className="space-y-3 text-sm">
                                <li className="flex gap-2">
                                    <strong className="text-charcoal-900 w-24">E-post:</strong> 
                                    <a href="mailto:info@battrehy.se" className="text-rose-500 hover:underline">info@battrehy.se</a>
                                </li>
                                <li className="flex gap-2">
                                    <strong className="text-charcoal-900 w-24">Webbplats:</strong> 
                                    <Link href="/" className="text-rose-500 hover:underline">battrehy.se</Link>
                                </li>
                                <li className="flex gap-2">
                                    <strong className="text-charcoal-900 w-24">Adress:</strong> 
                                    <span>Stockholm, Sverige</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">2. Vilka personuppgifter samlar vi in?</h2>
                        <p className="mb-4">Vi samlar in personuppgifter i följande situationer:</p>
                        
                        <h3 className="text-lg font-bold text-charcoal-900 mt-6 mb-2">2.1 När du besöker webbplatsen</h3>
                        <p className="mb-2">Via cookies och analysverktyg samlar vi automatiskt in teknisk information, såsom:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>IP-adress (anonymiserad)</li>
                            <li>Webbläsare och enhetstyp</li>
                            <li>Vilka sidor du besöker och hur länge</li>
                            <li>Hur du hittade till webbplatsen (hänvisningskälla)</li>
                        </ul>

                        <h3 className="text-lg font-bold text-charcoal-900 mt-6 mb-2">2.2 När du kontaktar oss</h3>
                        <p className="mb-2">Om du skickar ett meddelande via kontaktformuläret eller e-post samlar vi in:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Namn</li>
                            <li>E-postadress</li>
                            <li>Innehållet i ditt meddelande</li>
                        </ul>

                        <h3 className="text-lg font-bold text-charcoal-900 mt-6 mb-2">2.3 När du är klinik och ansluter dig till tjänsten</h3>
                        <p className="mb-2">Om du registrerar en klinik på Battrehy.se samlar vi in:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Klinikens namn, adress och kontaktuppgifter</li>
                            <li>Namn och e-postadress på kontaktpersonen</li>
                            <li>Information om behandlingar och tjänster</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">3. Hur använder vi dina personuppgifter?</h2>
                        <p className="mb-4">Vi använder dina personuppgifter för följande ändamål:</p>

                        <h3 className="text-lg font-bold text-charcoal-900 mt-6 mb-2">3.1 Driva och förbättra tjänsten</h3>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>För att visa webbplatsen korrekt i din webbläsare</li>
                            <li>För att analysera användningsmönster och förbättra upplevelsen</li>
                            <li>För att upptäcka och åtgärda tekniska problem</li>
                        </ul>

                        <h3 className="text-lg font-bold text-charcoal-900 mt-6 mb-2">3.2 Kommunikation</h3>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>För att svara på förfrågningar och meddelanden</li>
                            <li>För att skicka viktig information om tjänsten till anslutna kliniker</li>
                        </ul>

                        <h3 className="text-lg font-bold text-charcoal-900 mt-6 mb-2">3.3 Rättslig grund för behandlingen</h3>
                        <p className="mb-2">Vi behandlar dina personuppgifter med stöd av följande rättsliga grunder enligt GDPR:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li><strong>Berättigat intresse</strong> – för webbplatsanalys och förbättring av tjänsten</li>
                            <li><strong>Avtal</strong> – när du som klinik ansluter dig till tjänsten</li>
                            <li><strong>Samtycke</strong> – för icke-nödvändiga cookies (lämnas via cookie-banner)</li>
                            <li><strong>Rättslig förpliktelse</strong> – vid eventuell bokföring eller lagstadgad rapportering</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">4. Cookies och spårning</h2>
                        <p className="mb-4">
                            Battrehy.se använder cookies – små textfiler som lagras i din webbläsare – för att förbättra din upplevelse och analysera trafiken på webbplatsen.
                        </p>

                        <h3 className="text-lg font-bold text-charcoal-900 mt-6 mb-2">4.1 Typer av cookies vi använder</h3>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li><strong>Nödvändiga cookies</strong> – krävs för att webbplatsen ska fungera korrekt. Dessa kan inte stängas av.</li>
                            <li><strong>Analytiska cookies</strong> – hjälper oss förstå hur besökare använder sajten (t.ex. Google Analytics).</li>
                            <li><strong>Preferenscookies</strong> – sparar dina inställningar och val på webbplatsen.</li>
                        </ul>

                        <h3 className="text-lg font-bold text-charcoal-900 mt-6 mb-2">4.2 Hantera cookies</h3>
                        <p className="mb-4">
                            Du kan när som helst ändra dina cookie-inställningar via din webbläsares inställningar eller via vår cookie-banner. Observera att inaktivering av vissa cookies kan påverka webbplatsens funktionalitet.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">5. Delning av personuppgifter</h2>
                        <p className="mb-4">Vi säljer aldrig dina personuppgifter till tredje part. Vi kan dela uppgifter med:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li><strong>Tekniska leverantörer</strong> som hjälper oss driva tjänsten (t.ex. webbhotell, analysverktyg) – dessa agerar som personuppgiftsbiträden och behandlar uppgifter enbart på våra instruktioner</li>
                            <li><strong>Myndigheter</strong> – om vi är skyldiga enligt lag att lämna ut uppgifter</li>
                        </ul>
                        <p className="mb-4">
                            Vi överför inte personuppgifter till länder utanför EU/EES utan att säkerställa att lämpliga skyddsåtgärder är på plats.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">6. Hur länge sparar vi dina uppgifter?</h2>
                        <p className="mb-4">Vi sparar dina personuppgifter så länge som nödvändigt för det ändamål de samlades in:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li><strong>Kontaktförfrågningar</strong> – upp till 24 månader efter avslutat ärende</li>
                            <li><strong>Klinikuppgifter</strong> – så länge kliniken är listad på tjänsten, plus upp till 12 månader</li>
                            <li><strong>Analysdata (cookies)</strong> – enligt respektive verktygs policy, vanligtvis 13–26 månader</li>
                        </ul>
                        <p className="mb-4">
                            När uppgifterna inte längre behövs raderas eller anonymiseras de.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">7. Dina rättigheter enligt GDPR</h2>
                        <p className="mb-4">Som registrerad person har du följande rättigheter:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li><strong>Rätt till tillgång</strong> – du kan begära ett utdrag av de uppgifter vi har om dig</li>
                            <li><strong>Rätt till rättelse</strong> – du kan begära att felaktiga uppgifter korrigeras</li>
                            <li><strong>Rätt till radering</strong> – du kan under vissa omständigheter begära att dina uppgifter raderas (“rätten att bli bortglömd”)</li>
                            <li><strong>Rätt till begränsning</strong> – du kan begära att behandlingen av dina uppgifter begränsas</li>
                            <li><strong>Rätt till dataportabilitet</strong> – du kan begära att få ut dina uppgifter i ett strukturerat format</li>
                            <li><strong>Rätt att invända</strong> – du kan invända mot behandling som grundas på berättigat intresse</li>
                            <li><strong>Rätt att återkalla samtycke</strong> – om behandlingen grundas på samtycke kan du när som helst återkalla det</li>
                        </ul>
                        <p className="mb-4">
                            För att utöva någon av dina rättigheter, kontakta oss på <a href="mailto:info@battrehy.se" className="text-rose-500 hover:underline">info@battrehy.se</a>. Vi återkommer vanligtvis inom 30 dagar.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">8. Klagomål till tillsynsmyndigheten</h2>
                        <p className="mb-4">
                            Om du anser att vi behandlar dina personuppgifter på ett felaktigt sätt har du rätt att lämna in ett klagomål till Integritetsskyddsmyndigheten (IMY):
                        </p>
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-4">
                            <p className="font-bold text-charcoal-900 mb-4">Integritetsskyddsmyndigheten (IMY)</p>
                            <ul className="space-y-3 text-sm">
                                <li className="flex gap-2">
                                    <strong className="text-charcoal-900 w-24">Webbplats:</strong> 
                                    <a href="https://imy.se" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">imy.se</a>
                                </li>
                                <li className="flex gap-2">
                                    <strong className="text-charcoal-900 w-24">E-post:</strong> 
                                    <a href="mailto:imy@imy.se" className="text-rose-500 hover:underline">imy@imy.se</a>
                                </li>
                                <li className="flex gap-2">
                                    <strong className="text-charcoal-900 w-24">Telefon:</strong> 
                                    <span>08-657 61 00</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">9. Säkerhet</h2>
                        <p className="mb-4">
                            Vi vidtar lämpliga tekniska och organisatoriska åtgärder för att skydda dina personuppgifter mot obehörig åtkomst, förlust eller förstörelse. Webbplatsen använder SSL-kryptering (HTTPS) för all kommunikation.
                        </p>
                        <p className="mb-4">
                            Trots våra åtgärder kan vi inte garantera absolut säkerhet för datatransmission över internet.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">10. Ändringar av denna policy</h2>
                        <p className="mb-4">
                            Vi kan komma att uppdatera denna integritetspolicy. När vi gör väsentliga ändringar uppdaterar vi datumet längst upp i dokumentet. Vi rekommenderar att du regelbundet läser igenom policyn. Fortsatt användning av tjänsten efter att ändringar publicerats innebär att du accepterar den uppdaterade policyn.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">11. Kontakta oss</h2>
                        <p className="mb-4">
                            Har du frågor om denna integritetspolicy eller hur vi hanterar dina personuppgifter? Kontakta oss gärna:
                        </p>
                        
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 my-8">
                            <p className="font-bold text-charcoal-900 mb-4">Battrehy.se (Gorito AB)</p>
                            <ul className="space-y-3 text-sm">
                                <li className="flex gap-2">
                                    <strong className="text-charcoal-900 w-24">E-post:</strong> 
                                    <a href="mailto:info@battrehy.se" className="text-rose-500 hover:underline">info@battrehy.se</a>
                                </li>
                                <li className="flex gap-2">
                                    <strong className="text-charcoal-900 w-24">Webbplats:</strong> 
                                    <Link href="/" className="text-rose-500 hover:underline">battrehy.se</Link>
                                </li>
                                <li className="flex gap-2">
                                    <strong className="text-charcoal-900 w-24">Adress:</strong> 
                                    <span>Stockholm, Sverige</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-gray-100 text-center italic text-gray-500 font-medium pb-16">
                        Battrehy.se — Sveriges tryggaste guide för skönhetskliniker
                    </div>
                </div>
            </section>
        </div>
    );
}
