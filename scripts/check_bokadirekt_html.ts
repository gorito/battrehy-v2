async function main() {
    const res = await fetch('https://www.bokadirekt.se/places/lasercenter-14578', { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    console.log(html.includes('Om företaget'));
}
main();
