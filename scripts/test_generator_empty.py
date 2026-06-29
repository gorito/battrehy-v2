import csv
import anthropic
import os
import sys



api_key = "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"
client = anthropic.Anthropic(api_key=api_key)

input_file = "/Users/goranbillingskog/Documents/Claude/Projects/Webbhosting and backup/clinics_export.csv"

# Load clinics
with open(input_file, "r", encoding="utf-8-sig") as f:
    clinics = list(csv.DictReader(f))

def get_clinic_by_slug(slug):
    for c in clinics:
        if c.get("slug") == slug:
            return c
    return None

def test_clinic(slug):
    clinic = get_clinic_by_slug(slug)
    if not clinic:
        print(f"Clinic with slug '{slug}' not found.")
        return

    print(f"\n--- Testing Clinic: {clinic.get('name')} ({slug}) ---")
    print("Input Data:")
    for k, v in clinic.items():
        if k in ['name', 'city', 'description', 'treatments', 'services', 'certifications/memberships']:
            print(f"  {k}: {repr(v)}")

    # Build prompt
    name    = clinic.get("name", "")
    city    = clinic.get("city", "")
    address = clinic.get("address", "")
    desc    = clinic.get("description", "").strip()
    treats  = clinic.get("treatments", "")
    services = clinic.get("services", "")[:400]
    certs   = clinic.get("certifications/memberships", "").strip()
    cert_line = f"Certifieringar/medlemskap: {certs}" if certs else ""

    prompt = f"""Du är en SEO-copywriter som skriver unika kliniksidor på svenska för katalogwebbplatsen battrehy.se.

Klinikdata:
- Namn: {name}
- Stad: {city}
- Adress: {address}
- Behandlingskategorier: {treats}
- Tjänster (urval): {services}
{cert_line}
- Befintlig beskrivning (ej kopiera direkt): {desc[:500]}

Skriv följande tre sektioner. Använd EXAKT dessa rubriker:

## BESKRIVNING
Skriv en unik redaktionell beskrivning på 130–180 ord på svenska.
Regler:
- Inkludera stadsnamnet och gatuadressen naturligt
- Nämn 3–4 specifika behandlingar från tjänstelistan
- Nämn certifieringar om de finns
- Skriv i tredje person om kliniken
- Inga generiska fraser som "välkommen till oss"
- Inga bullet points

## FAQ
Skriv exakt 3 frågor och svar på svenska. Varje fråga ska vara något en patient faktiskt googlar.
Format:
**Fråga?**
Svar.

## META
Skriv en meta description på max 155 tecken på svenska. Inkludera stadsnamnet och 2 behandlingar.
"""

    try:
        message = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}]
        )
        raw_text = message.content[0].text
        print("\nRaw Output from Claude:")
        print(raw_text)
        
        # Test the parse
        desc_parsed, faq_parsed, meta_parsed = parse_output(raw_text)
        print("\nParsed Output:")
        print("  Description length:", len(desc_parsed))
        print("  FAQ length:", len(faq_parsed))
        print("  Meta length:", len(meta_parsed))
    except Exception as e:
        print("Error during test:", e)

def parse_output(text):
    desc, faq, meta = "", "", ""
    current = None
    lines = text.split("\n")
    for line in lines:
        stripped = line.strip()
        if stripped.startswith("## BESKRIVNING"):
            current = "desc"
        elif stripped.startswith("## FAQ"):
            current = "faq"
        elif stripped.startswith("## META"):
            current = "meta"
        elif current == "desc":
            desc += line + "\n"
        elif current == "faq":
            faq += line + "\n"
        elif current == "meta":
            meta += line + "\n"
    return desc.strip(), faq.strip(), meta.strip()

# Let's test two clinics:
# 1. 7h-clinic-ab (where description was empty but faq/meta existed)
# 2. active-care-sweden (where all were empty)
test_clinic("7h-clinic-ab")
test_clinic("active-care-sweden")
