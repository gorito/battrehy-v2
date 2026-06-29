import csv

file_path = "/Users/goranbillingskog/Documents/Claude/Projects/Webbhosting and backup/clinic_descriptions_output.csv"

empty_count = 0
with open(file_path, "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    print("Columns:", reader.fieldnames)
    for i, row in enumerate(reader):
        desc = row.get("ai_description", "").strip()
        faq = row.get("ai_faq", "").strip()
        meta = row.get("ai_meta", "").strip()
        
        if not desc:
            empty_count += 1
            if empty_count <= 10:
                print(f"Empty desc #{empty_count}: ID={row.get('id')}, Slug={row.get('slug')}")
                print(f"  FAQ length: {len(faq)}, Meta length: {len(meta)}")

print("Total empty descriptions:", empty_count)
