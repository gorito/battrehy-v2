import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import * as fs from 'fs';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function escapeCsvValue(val: any): string {
    if (val === null || val === undefined) {
        return '""';
    }
    let str = String(val);
    str = str.replace(/"/g, '""');
    return `"${str}"`;
}

interface Salon {
    name: string;
    address: string;
    phone: string;
    therapists: string;
}

async function scrapePage(page: number): Promise<Salon[]> {
    const url = `https://www.shr.nu/salongsok?searchstring=%20&page=${page}`;
    const res = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch page ${page}: ${res.statusText}`);
    }

    const html = await res.text();
    const $ = cheerio.load(html);
    const salons: Salon[] = [];

    $('table.sticky-enabled tbody tr').each((_, el) => {
        const tds = $(el).find('td');
        if (tds.length >= 4) {
            const name = $(tds[0]).text().trim();
            const address = $(tds[1]).text().trim();
            const phone = $(tds[2]).text().trim();
            const therapists = $(tds[3]).text().trim();
            if (name) {
                salons.push({ name, address, phone, therapists });
            }
        }
    });

    return salons;
}

async function main() {
    console.log("Starting SHR registry scrape...");
    
    // First, let's find out how many pages we need by fetching page 0
    const firstPageUrl = `https://www.shr.nu/salongsok?searchstring=%20&page=0`;
    const res = await fetch(firstPageUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    const infoText = $('.bp-results-info').text().trim(); // e.g. "1110 sökresultat för:"
    const match = infoText.match(/(\d+)/);
    
    let totalResults = 1110;
    if (match) {
        totalResults = parseInt(match[1], 10);
    }
    
    const resultsPerPage = 10;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    console.log(`Total members: ${totalResults}, Total pages to scrape: ${totalPages}`);

    const allSalons: Salon[] = [];

    for (let p = 0; p < totalPages; p++) {
        process.stdout.write(`Fetching page ${p + 1}/${totalPages}... `);
        try {
            const salons = await scrapePage(p);
            allSalons.push(...salons);
            console.log(`Success! Found ${salons.length} salons.`);
        } catch (e: any) {
            console.log(`Failed! Error: ${e.message}`);
            // Retry once
            await delay(1000);
            try {
                process.stdout.write(`Retrying page ${p + 1}/${totalPages}... `);
                const salons = await scrapePage(p);
                allSalons.push(...salons);
                console.log(`Success on retry!`);
            } catch (retryErr: any) {
                console.log(`Failed on retry! Skipping page. Error: ${retryErr.message}`);
            }
        }
        await delay(100); // Polite rate limiting
    }

    console.log(`\nScrape complete. Total salons scraped: ${allSalons.length}`);

    // Generate CSV
    const headers = ["name", "address", "phone", "therapists"];
    const csvRows = [headers.join(",")];
    allSalons.forEach(s => {
        csvRows.push([
            escapeCsvValue(s.name),
            escapeCsvValue(s.address),
            escapeCsvValue(s.phone),
            escapeCsvValue(s.therapists)
        ].join(","));
    });

    const csvContent = "\uFEFF" + csvRows.join("\n");
    const outputPath = resolve(process.cwd(), '../shr_members_registry.csv');
    fs.writeFileSync(outputPath, csvContent, 'utf8');
    
    console.log(`\n✨ Successfully saved SHR registry to: ${outputPath}`);
}

main().catch(console.error);
