import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Användarvillkor | Bättrehy.se',
    description: 'Användarvillkor för Bättrehy.se.',
};

export default function AnvandarvillkorPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="relative py-20 bg-rose-50 overflow-hidden border-b border-rose-100">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-rose-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-3xl" />
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-4 tracking-tight">
                        Användarvillkor
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

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">1. Allmänt</h2>
                        <p className="mb-4">
                            Dessa användarvillkor (“villkoren”) gäller för användning av webbplatsen Bättrehy.se (“tjänsten”), som ägs och drivs av Gorito AB (“vi”, “oss” eller “Bättrehy.se”). Genom att besöka eller använda webbplatsen accepterar du dessa villkor i sin helhet. Om du inte accepterar villkoren ska du inte använda tjänsten.
                        </p>
                        <p className="mb-4">
                            Bättrehy.se är en guide och katalog som hjälper användare att hitta och jämföra estetiska skönhetskliniker i Sverige. Vi är inte en klinik, utför inga behandlingar och är inte part i avtalet mellan användare och kliniker.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">2. Tjänstens syfte och innehåll</h2>
                        <p className="mb-4">Bättrehy.se tillhandahåller:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>En sökbar katalog över skönhetskliniker och estetiska behandlingar i Sverige</li>
                            <li>Informationssidor om olika behandlingstyper</li>
                            <li>Möjlighet att hitta kontaktuppgifter och bokningslänkar till kliniker</li>
                            <li>En blogg med guider och artiklar om skönhet och hudvård</li>
                        </ul>
                        <p className="mb-4">
                            Vi förbehåller oss rätten att när som helst ändra, lägga till eller ta bort innehåll och funktioner utan föregående meddelande.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">3. Klinikprofiler och listad information</h2>
                        <p className="mb-4">
                            Information om kliniker på Bättrehy.se hämtas från offentliga källor eller tillhandahålls direkt av klinikerna. Vi strävar efter att informationen ska vara korrekt och aktuell, men kan inte garantera att all information är fullständig, uppdaterad eller fri från fel.
                        </p>
                        <p className="mb-4">Vi ansvarar inte för:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Felaktig information som tillhandahållits av kliniken själv</li>
                            <li>Förändringar i klinikens utbud, priser eller öppettider</li>
                            <li>Kvaliteten på de behandlingar som kliniker erbjuder</li>
                            <li>Klinikens agerande gentemot användaren</li>
                        </ul>
                        <p className="mb-4">
                            Kliniker som önskar uppdatera eller ta bort sin profil kan kontakta oss på <a href="mailto:info@battrehy.se" className="text-rose-500 hover:underline">info@battrehy.se</a>.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">4. Bokningar och transaktioner</h2>
                        <p className="mb-4">
                            Bättrehy.se förmedlar kontakt till kliniker men hanterar inga bokningar, betalningar eller avtal direkt. Eventuella bokningar sker via klinikens egna bokningssystem eller direktkontakt med kliniken.
                        </p>
                        <p className="mb-4">
                            Avtalsförhållandet vid en bokning uppstår uteslutande mellan dig som användare och den aktuella kliniken. Bättrehy.se är inte part i detta avtal och ansvarar inte för:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Inställda eller ändrade tider</li>
                            <li>Avbokningsregler och avgifter</li>
                            <li>Resultatet av utförda behandlingar</li>
                            <li>Reklamationer eller tvister med kliniken</li>
                        </ul>
                        <p className="mb-4">
                            Vid klagomål mot en klinik ska du i första hand vända dig direkt till kliniken. Vid allvarliga händelser kan du kontakta Inspektionen för vård och omsorg (IVO) på ivo.se.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">5. Immateriella rättigheter</h2>
                        <p className="mb-4">
                            Allt innehåll på Bättrehy.se – inklusive texter, logotyper, grafik, design och kod – ägs av Bättrehy.se eller dess licensgivare och skyddas av upphovsrätt och annan immaterialrättslig lagstiftning.
                        </p>
                        <p className="mb-4">Det är inte tillåtet att:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Kopiera, reproducera eller distribuera innehåll från webbplatsen utan skriftligt tillstånd</li>
                            <li>Använda webbplatsens innehåll i kommersiellt syfte utan godkännande</li>
                            <li>Skrapa eller automatiserat hämta data från webbplatsen</li>
                        </ul>
                        <p className="mb-4">
                            Klinikernas egna logotyper, varumärken och bilder tillhör respektive klinik.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">6. Personuppgifter och integritet</h2>
                        <p className="mb-4">
                            Bättrehy.se behandlar personuppgifter i enlighet med GDPR och svensk dataskyddslagstiftning. Information om hur vi hanterar personuppgifter finns i vår integritetspolicy, som är tillgänglig på <Link href="/integritetspolicy" className="text-rose-500 hover:underline">battrehy.se/integritetspolicy</Link>.
                        </p>
                        <p className="mb-4">
                            Genom att använda tjänsten samtycker du till den behandling av personuppgifter som beskrivs i integritetspolicyn.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">7. Cookies och spårning</h2>
                        <p className="mb-4">
                            Bättrehy.se använder cookies och liknande tekniker för att förbättra upplevelsen på webbplatsen, analysera trafik och optimera innehåll. Du kan hantera dina cookie-inställningar via din webbläsare, men observera att vissa funktioner kan påverkas om cookies inaktiveras.
                        </p>
                        <p className="mb-4">
                            För mer information, se vår cookiepolicy.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">8. Ansvarsbegränsning</h2>
                        <p className="mb-4">
                            Bättrehy.se tillhandahålls i befintligt skick (“as is”) utan garantier av något slag. Vi lämnar inga garantier avseende webbplatsens tillgänglighet, felfrihet eller lämplighet för ett visst ändamål.
                        </p>
                        <p className="mb-4">Bättrehy.se ansvarar inte för:</p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li>Direkta eller indirekta skador som uppstår till följd av användning av tjänsten</li>
                            <li>Skador orsakade av felaktig eller missvisande information på webbplatsen</li>
                            <li>Förlust av data eller avbrott i tjänsten</li>
                            <li>Skador som uppstår i samband med bokningar eller behandlingar hos listade kliniker</li>
                        </ul>
                        <p className="mb-4">
                            Vårt ansvar är under alla omständigheter begränsat till vad som är tillåtet enligt tillämplig svensk lag.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">9. Länkar till tredjepartswebbplatser</h2>
                        <p className="mb-4">
                            Webbplatsen kan innehålla länkar till externa webbplatser, inklusive klinikernas egna hemsidor och bokningssystem. Dessa länkar tillhandahålls enbart för användarens bekvämlighet. Bättrehy.se ansvarar inte för innehållet, integritetsrutinerna eller säkerheten på externa webbplatser.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">10. Ändringar av villkoren</h2>
                        <p className="mb-4">
                            Vi förbehåller oss rätten att när som helst uppdatera eller ändra dessa användarvillkor. Ändringar träder i kraft när de publiceras på webbplatsen. Det är ditt ansvar att regelbundet läsa igenom villkoren. Fortsatt användning av tjänsten efter att ändringar publicerats innebär att du accepterar de uppdaterade villkoren.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">11. Tillämplig lag och tvistelösning</h2>
                        <p className="mb-4">
                            Dessa användarvillkor ska tolkas och tillämpas i enlighet med svensk rätt. Eventuella tvister som uppstår i anslutning till dessa villkor ska i första hand lösas genom förhandling. Om parterna inte kan nå en överenskommelse ska tvisten avgöras av svensk domstol med Stockholms tingsrätt som första instans.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-charcoal-900 mt-12 mb-4">12. Kontaktuppgifter</h2>
                        <p className="mb-4">
                            Vid frågor om dessa användarvillkor, vänligen kontakta oss:
                        </p>
                        
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 my-8">
                            <p className="font-bold text-charcoal-900 mb-4">Bättrehy.se</p>
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
                        Bättrehy.se — Sveriges tryggaste guide för skönhetskliniker
                    </div>
                </div>
            </section>
        </div>
    );
}
