import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const geminiKey = process.env.GEMINI_API_KEY;
const genAI = geminiKey ? new GoogleGenerativeAI(geminiKey) : null;

async function testGemini() {
    if (!genAI) {
        console.error("Missing GEMINI_API_KEY in .env.local");
        return;
    }

    const testClinic = "Skin Shape Klinik";
    const messyText = `
    VÄLKOMMEN TILL OSS! NYHET! Vi har flyttat till nya lokaler! 
    Kolla in vår Icoone Laser! Boka tid här. Vi är bäst i Västerås på hudvård. 
    Legitimerad personal med 10 års erfarenhet. Vi erbjuder allt från Botox till Ansiktsbehandling. 
    Öppet 10-18 varje dag. Kontakta oss för en gratis konsultation! 
    Läs mer på vår blogg. Följ oss på Instagram @skinshape.
    `;

    console.log("🚀 Testing Gemini Refinement...");
    console.log("-----------------------------------");
    console.log("RAW TEXT IN:");
    console.log(messyText.trim());
    console.log("-----------------------------------");

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const prompt = `
        Du är en professionell copywriter för den exklusiva klinikguiden Bättrehy.se.
        Transformera råtexten nedan till en informativ, inbjudande beskrivning i tredje person.
        Skriv på svenska. Håll det professionellt. Ingen säljslang.
        
        VIKTIGT: Använd DUBBLA RADBRYTNINGAR mellan stycken för maximal läsbarhet.

        KLINIKNAMN: ${testClinic}
        RÅTEXT:
        """
        ${messyText}
        """

        Svara ENDAST med beskrivningen (ca 100 ord).
        `;

        const result = await model.generateContent(prompt);
        const response = result.response.text().trim();
        
        console.log("REFINED TEXT OUT:");
        console.log(response);
        console.log("-----------------------------------");
        console.log("✨ Test Complete!");
    } catch (e) {
        console.error("Test failed:", e);
    }
}

testGemini();
