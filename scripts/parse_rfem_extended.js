import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('rfem_page.html', 'utf-8');
const $ = cheerio.load(html);

// We need to find the container holding all members.
// Since the HTML structure seems to be a list of <p> tags, let's just iterate over all paragraphs.

const clinics = [];
let currentClinic = {};

// The structure looks like multiple <p> tags grouped together.
// Example:
// <p><a href="mailto:...">...</a></p>
// <p><a href="http:...">...</a></p>
// <p><span>Clinic Name<br>📍 City</span></p>

// Or they are all inside a specific div. Let's find all text blocks and look for the '📍' symbol as the anchor for each clinic block.
// Then look backwards for the name, website, and email.

const allTextNodes = [];

$('*').each((i, el) => {
    // Only capture elements that don't have children or have br tags, to avoid duplicates from parent elements
    const text = $(el).clone().children().remove().end().text().trim();
    if (text) {
       // allTextNodes.push({ tag: el.tagName, text: text, html: $(el).html() });
    }
});

// An easier way: just regex the raw HTML for the blocks.
// Actually, let's just find the `📍` marker
const parts = html.split('📍');

for (let i = 1; i < parts.length; i++) {
  const cityMatch = parts[i].match(/^\s*([^<]+)/);
  if (!cityMatch) continue;
  const city = cityMatch[1].trim();
  
  // We have the HTML block before this marker. Let's extract the last 1500 characters to find the associated info.
  const blockHTML = parts[i-1].slice(-1500);
  
  // Extract Name (bold text or last text node before the marker)
  let name = "";
  const boldMatch = blockHTML.match(/font-weight:\s*bold[^>]*>([^<]+)(?:<br>)?(?:<\/span>)?(?:<\/p>)?(?:<p[^>]*>)?(?:<span[^>]*>)?$/);
  if (boldMatch) {
    name = boldMatch[1].trim();
  } else {
    const lastText = blockHTML.match(/>([^<]+)(?:<br>|<\/span>|<\/p>|<p[^>]*>|<span[^>]*>|\s)*$/);
    if (lastText && lastText[1].trim()) {
      name = lastText[1].trim();
    }
  }

  // Extract Email
  let email = "";
  const emailMatch = blockHTML.match(/mailto:([^"]+)/i);
  if (emailMatch) {
    email = emailMatch[1].trim();
  } else {
    // fallback plain text email search
    const plainEmail = blockHTML.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i);
    if (plainEmail) email = plainEmail[1].trim();
  }

  // Extract Website
  let website = "";
  const webMatch = blockHTML.match(/href="(https?:\/\/[^"]+)"/i);
  if (webMatch) {
    website = webMatch[1].trim();
  } else {
    // fallback plain text website search (www.)
    const plainWeb = blockHTML.match(/(www\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+)/i);
    if (plainWeb) website = `https://${plainWeb[1].trim()}`;
  }

  // Extract Phone (look for typical Swedish formats: 07x, 08, +46)
  let phone = "";
  const phoneMatch = blockHTML.match(/(?:(?:0|(?:\+|00)46)[ -]?\d{1,2}[ -]?\d{2,3}[ -]?\d{2,3}[ -]?\d{2,3})/);
  if (phoneMatch && !phoneMatch[0].includes('font-size')) {
    // Basic validation to avoid false positives from CSS values
    if (phoneMatch[0].length >= 8) {
       phone = phoneMatch[0].trim();
    }
  }

  clinics.push({
    name,
    city,
    email,
    website,
    phone
  });
}

console.log(`Found ${clinics.length} clinics with extended data`);

// Save as JSON
fs.writeFileSync('rfem_clinics_extended.json', JSON.stringify(clinics, null, 2));

// Save as CSV
const csvLines = ["Name,City,Email,Website,Phone"];
for (const c of clinics) {
    csvLines.push(`"${c.name}","${c.city}","${c.email}","${c.website}","${c.phone}"`);
}
fs.writeFileSync('rfem_extended_data.csv', csvLines.join('\n'));

console.log("Saved to rfem_clinics_extended.json and rfem_extended_data.csv");
