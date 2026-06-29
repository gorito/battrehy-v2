const fs = require('fs');

async function main() {
    try {
        const res = await fetch('https://www.shr.nu/salongsok', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const html = await res.text();
        fs.writeFileSync('scripts/shr_salongsok_full.html', html);
        console.log("Saved page HTML. Size:", html.length);
    } catch (e) {
        console.error(e);
    }
}
main();
