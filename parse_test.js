const cheerio = require('cheerio');
(async () => {
  const res = await fetch('https://www.bokadirekt.se/places/skinrenew-sussies-styling-team-25278', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const html = await res.text();
  const $ = cheerio.load(html);
  
  let found = false;
  $('script').each((i, el) => {
    const text = $(el).html();
    if (text && text.includes('window.__PRELOADED_STATE__ = {')) {
      const jsonStart = text.indexOf('{');
      const jsonStr = text.substring(jsonStart);
      const data = JSON.parse(jsonStr);
      
      const place = data.place;
      const rawServices = new Set();
      if (place && place.services) {
          place.services.forEach(cat => {
              if (cat.services) {
                  cat.services.forEach(s => rawServices.add(s.name));
              }
          });
      }
      console.log('Parsed Services:', Array.from(rawServices).slice(0, 10));
      found = true;
    }
  });
  if (!found) console.log("Did not find __PRELOADED_STATE__");
})();
