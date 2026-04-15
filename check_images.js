const cheerio = require('cheerio');
(async () => {
    try {
        const res = await fetch('https://www.bokadirekt.se/places/isy-beauty-clinic-norrkoping-4221', {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const html = await res.text();
        const $ = cheerio.load(html);
        
        console.log('og:image:', $('meta[property="og:image"]').attr('content'));
        
        $('script').each((_, el) => {
            const text = $(el).html();
            if (text && text.includes('window.__PRELOADED_STATE__ = {')) {
                const jsonStart = text.indexOf('{');
                const jsonEnd = text.lastIndexOf('}') + 1;
                const data = JSON.parse(text.substring(jsonStart, jsonEnd));
                const place = data?.place;
                console.log('place.images:', place?.images?.map(i => i.url));
                console.log('place.gallery:', place?.gallery);
                console.log('place.logo:', place?.logo);
                console.log('place.hero:', place?.hero);
            }
        });
    } catch(e) {}
})();
