const fs = require('fs');

const data = fs.readFileSync('missing_treatments.json', 'utf8');
const lines = data.split('\n');
const jsonStr = lines[lines.length - 2]; // The output from node script
const missing = JSON.parse(jsonStr);

let markdown = `# Kliniker utan behandlingar (${missing.length} st)\n\n`;
markdown += `Här är en komplett lista över de kliniker som för närvarande saknar behandlingar i databasen. Klicka på länkarna för att gå direkt till redigeringsvyn i adminpanelen.\n\n`;

markdown += `| Kliniknamn | Stad | Bokadirekt | Redigera |\n`;
markdown += `|---|---|---|---|\n`;

missing.forEach(c => {
    const editLink = `[Redigera](https://battrehy.se/admin/kliniker/${c.slug})`;
    const bokadirekt = c.booking_url ? `[Bokadirekt](${c.booking_url})` : `-`;
    markdown += `| **${c.name}** | ${c.city || '-'} | ${bokadirekt} | ${editLink} |\n`;
});

fs.writeFileSync('missing-treatments-artifact.md', markdown);
console.log("Artifact generated.");
