const fs = require('fs');

const data = fs.readFileSync('missing_treatments.json', 'utf8');
const lines = data.split('\n');
const jsonStr = lines[lines.length - 2]; 
const missing = JSON.parse(jsonStr);

let csv = '\uFEFF'; // BOM for Excel UTF-8
csv += 'Kliniknamn,Stad,Bokadirekt,Redigera\n';

missing.forEach(c => {
    const name = `"${(c.name || '').replace(/"/g, '""')}"`;
    const city = `"${(c.city || '').replace(/"/g, '""')}"`;
    const bokadirekt = c.booking_url ? `"${c.booking_url}"` : `""`;
    const editLink = `"https://battrehy.se/admin/kliniker/${c.slug}"`;
    csv += `${name},${city},${bokadirekt},${editLink}\n`;
});

fs.writeFileSync('missing-treatments.csv', csv);
console.log("CSV generated.");
