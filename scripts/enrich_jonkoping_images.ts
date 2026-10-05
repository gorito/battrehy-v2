import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import { randomUUID } from 'crypto';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadImageToSupabase(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) return null;

    const buffer = await res.arrayBuffer();
    const contentType = res.headers.get('content-type') || 'image/jpeg';
    let ext = 'jpg';
    if (contentType.includes('png')) ext = 'png';
    else if (contentType.includes('webp')) ext = 'webp';

    const filePath = `clinics/${randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from('company-images')
      .upload(filePath, buffer, {
        contentType,
        upsert: true
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('company-images')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (err: any) {
    console.error('Error fetching/uploading image:', err?.message);
    return null;
  }
}

async function scrapeImageForClinic(websiteUrl?: string, bookingUrl?: string): Promise<string | null> {
  const urlsToTry = [websiteUrl, bookingUrl].filter(Boolean) as string[];

  for (const targetUrl of urlsToTry) {
    try {
      const res = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        signal: AbortSignal.timeout(7000)
      });
      if (!res.ok) continue;

      const html = await res.text();
      const $ = cheerio.load(html);

      let img = $('meta[property="og:image"]').attr('content') ||
                $('meta[name="twitter:image"]').attr('content') ||
                $('meta[property="og:image:secure_url"]').attr('content');

      if (!img) {
        // Look for hero images or large banner images
        const firstImg = $('img[src*="header"], img[src*="banner"], img[src*="hero"], img[src*="clinic"], img[src*="salon"], img[src*="salong"]').first().attr('src');
        if (firstImg) img = firstImg;
      }

      if (img) {
        if (img.startsWith('//')) {
          img = 'https:' + img;
        } else if (img.startsWith('/')) {
          const origin = new URL(targetUrl).origin;
          img = origin + img;
        }
        // Exclude generic placeholders
        if (!img.includes('default') && !img.includes('placeholder') && !img.includes('favicon') && !img.includes('pixel')) {
          return img;
        }
      }
    } catch {
      // Continue to next URL
    }
  }

  return null;
}

// Curated high quality clinic & salon interior/treatment photos as fallbacks if website blocked scraping
const BEAUTY_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512290900672-1f5586616212?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=1200&auto=format&fit=crop'
];

async function main() {
  console.log('Fetching clinics in Jönköping / Huskvarna...');
  const { data: clinics, error } = await supabase
    .from('clinics')
    .select('id, name, website, booking_url, primary_image_url')
    .or('city.ilike.Jönköping,city.ilike.Huskvarna');

  if (error || !clinics) {
    console.error('Error fetching clinics:', error);
    return;
  }

  let fallbackIdx = 0;

  for (const c of clinics) {
    console.log(`\nProcessing: ${c.name}`);
    if (c.primary_image_url) {
      console.log(`  ✓ Already has image: ${c.primary_image_url}`);
      continue;
    }

    let rawImg = await scrapeImageForClinic(c.website, c.booking_url);
    if (rawImg) {
      console.log(`  -> Found scraped image: ${rawImg}`);
    } else {
      rawImg = BEAUTY_FALLBACK_IMAGES[fallbackIdx % BEAUTY_FALLBACK_IMAGES.length];
      fallbackIdx++;
      console.log(`  -> Using premium beauty studio photo: ${rawImg}`);
    }

    const hostedUrl = await uploadImageToSupabase(rawImg);
    if (hostedUrl) {
      await supabase
        .from('clinics')
        .update({ primary_image_url: hostedUrl })
        .eq('id', c.id);
      console.log(`  ✓ Uploaded to Supabase Storage: ${hostedUrl}`);
    } else {
      console.error(`  ✗ Failed to upload image for ${c.name}`);
    }
  }

  console.log('\nAll clinics in Jönköping processed for images!');
}

main();
