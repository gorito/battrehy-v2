import * as cheerio from 'cheerio';

async function inspect(name: string, url: string) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    console.log(`\n=== ${name} (${url}) ===`);
    $('a').each((_, el) => {
      const href = $(el).attr('href');
      const text = $(el).text().replace(/\s+/g, ' ').trim();
      if (href && (href.includes('boka') || href.includes('bokadirekt') || href.includes('boka-direkt') || text.toLowerCase().includes('boka'))) {
        console.log(`  -> [${text}] ${href}`);
      }
    });
  } catch (err: any) {
    console.error(`Error inspecting ${name}:`, err.message);
  }
}

async function run() {
  await inspect('Uniq Hudvård', 'https://www.uniqhud.se');
  await inspect('Ulrikas Hudvård', 'https://www.ulrikashudvard.com');
  await inspect('I\'nnovans Skincare', 'https://innovansskincare.se');
  await inspect('Maral\'s Beauty Clinic', 'https://maralsbeautyclinic.se');
  await inspect('Mn Klinik', 'https://mnklinik.se');
  await inspect('S Derma Clinic', 'https://www.sdermaclinic.se');
  await inspect('Glow & Beauty', 'http://www.glownbeauty.se');
}

run();
