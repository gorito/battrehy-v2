import fs from 'fs';

const html = fs.readFileSync('rfem_page.html', 'utf-8');

const clinicRegex = />([^<]+)<\/span><\/p><p[^>]*><span[^>]*>📍\s*([^<]+)<\/span>/g;
const clinicRegex2 = /<span[^>]*font-weight:\s*bold[^>]*>([^<]+)<\/span><\/p><p[^>]*><span[^>]*>📍\s*([^<]+)<\/span>/g;
const clinicRegex3 = /<span[^>]*font-weight:\s*bold[^>]*>([^<]+)<br><\/span>📍\s*([^<]+)<\/span>/g;

// A more robust way using regex to find all "📍"
const clinics = [];

// Split by 📍
const parts = html.split('📍');

for (let i = 1; i < parts.length; i++) {
  const cityMatch = parts[i].match(/^\s*([^<]+)/);
  if (!cityMatch) continue;
  const city = cityMatch[1].trim();
  
  // Backtrack to find the clinic name (usually in a bold tag right before)
  const before = parts[i-1];
  // Looking for something like >Clinic Name</span></p><p... or >Clinic Name<br></span>
  // Let's just find the last text block that is bold or before the city
  
  const boldMatch = before.match(/font-weight:\s*bold[^>]*>([^<]+)(?:<br>)?(?:<\/span>)?(?:<\/p>)?(?:<p[^>]*>)?(?:<span[^>]*>)?$/);
  if (boldMatch) {
    clinics.push({ name: boldMatch[1].trim(), city });
  } else {
    // try another pattern: last text node before
    const lastText = before.match(/>([^<]+)(?:<br>|<\/span>|<\/p>|<p[^>]*>|<span[^>]*>|\s)*$/);
    if (lastText && lastText[1].trim()) {
      clinics.push({ name: lastText[1].trim(), city });
    }
  }
}

console.log(`Found ${clinics.length} clinics`);
fs.writeFileSync('rfem_clinics.json', JSON.stringify(clinics, null, 2));

