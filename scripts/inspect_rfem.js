import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  console.log("Navigating to URL...");
  await page.goto('https://rfem.se/medlemmar', { waitUntil: 'networkidle2' });
  console.log("Extracting content...");
  const html = await page.content();
  fs.writeFileSync('rfem_page.html', html);
  console.log("Done.");
  await browser.close();
})();
