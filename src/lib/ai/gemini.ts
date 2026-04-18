import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

/**
 * Refines a raw clinic description into professional, directory-ready Swedish.
 * Uses Gemini 1.5 Flash for speed and cost-effectiveness.
 */
export async function refineClinicDescription(rawText: string, clinicName: string): Promise<string> {
    if (!genAI || !rawText || rawText.length < 50) {
        return rawText;
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
        Du är en professionell copywriter och SEO-specialist för den exklusiva klinikguiden Bättrehy.se.
        Ditt uppdrag är att transformera den bifogade råtexten från en kliniks hemsida till en välskriven, informativ och inbjudande beskrivning som rankar högt på Google.

        SEO & STRUKTUR:
        1. Första meningen är viktig för SEO! Den SKA innehålla Kliniknamnet (${clinicName}), staden den ligger i, och dess främsta specialitet.
           Exempel: "Klinik X i Stockholm är en ledande expert på avancerade hudbehandlingar och estetisk kirurgi."
        2. Skriv på svenska i tredje person.
        3. Dela upp texten i 2-3 korta, lättlästa stycken. ANVÄND DUBBLA RADBRYTNINGAR MELLAN STYCKEN för maximal läsbarhet.
        4. Inkorporera naturligt nyckelord som "legitimerad personal", "trygghet", "resultat" och namnen på de behandlingar som nämns i råtexten.

        KVALITET & SPRÅK:
        5. Korrigera strikt alla meningsbyggnadsfel eller saknad punktuation som finns i råtexten.
        6. Ta bort säljiga utropstecken, "BOKA TID"-knappar, "Klicka här" eller "Välkommen till vår hemsida".
        7. Håll en ton som är professionell, medicinskt trovärdig men ändå varm.

        KLINIKNAMN: ${clinicName}
        RÅTEXT FRÅN HEMSIDA:
        """
        ${rawText}
        """

        Svara ENDAST med den färdiga beskrivningen.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text.trim() || rawText;
    } catch (error) {
        console.error("Gemini refinement failed:", error);
        return rawText;
    }
}
