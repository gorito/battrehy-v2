import { createClient } from '@supabase/supabase-js';
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
    if (!res.ok) {
      console.error(`Failed to fetch image ${url}: status ${res.status}`);
      return null;
    }

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

// Curated high-resolution professional aesthetic clinic and treatment imagery
const CLINIC_IMAGES: Record<string, string> = {
  // Bernau Esthetic: Modern medical aesthetic / microneedling treatment room
  'bernau-esthetic-eskilstuna': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop',
  
  // EC Estetik: Aesthetic injection & facial clinic interior
  'ec-estetik-eskilstuna': 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1200&auto=format&fit=crop',
  
  // Hk Estetik: Luxury aesthetic medicine clinic setup
  'hk-estetik-eskilstuna': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop',
  
  // Glow And Beauty Clinic: Modern laser & skin clinic
  'glow-and-beauty-clinic-eskilstuna': 'https://images.unsplash.com/photo-1512290900672-1f41e57c0e86?q=80&w=1200&auto=format&fit=crop',
  
  // Sara Beauty Clinic: Bright laser and beauty salon room
  'sara-beauty-clinic-eskilstuna': 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=1200&auto=format&fit=crop',
  
  // May Beauty House: Warm, elegant beauty lounge
  'may-beauty-house-eskilstuna': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
  
  // Uniq Hudvård: High-end Master certified skin care studio
  'uniq-hudvard-eskilstuna': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
  
  // I'nnovans Skincare: Organic holistic skin & spa salon
  'innovans-skincare-eskilstuna': 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=1200&auto=format&fit=crop',
  
  // Life Team Sweden AB: Modern clinic laser & skincare facility
  'life-team-sweden-eskilstuna': 'https://images.unsplash.com/photo-1629744360341-399066bfb104?q=80&w=1200&auto=format&fit=crop',
  
  // Salong Style Hår & Brud: Chic styling and skin salon
  'salong-style-har-brud-eskilstuna': 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1200&auto=format&fit=crop',
  
  // Hud Hälsa Jennifer K Wistrand: Relaxing facial therapy room
  'hud-halsa-jennifer-k-wistrand-eskilstuna': 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop',

  // Vianabeautyclinic: Modern aesthetic & skinboosters treatment room
  'vianabeautyclinic-eskilstuna': 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop'
};

async function run() {
  console.log('--- Replacing all placeholder images with premium aesthetic imagery ---\n');

  for (const [slug, imageUrl] of Object.entries(CLINIC_IMAGES)) {
    console.log(`Processing: ${slug}`);
    const publicUrl = await uploadImageToSupabase(imageUrl);
    if (!publicUrl) {
      console.error(`  ✗ Failed to upload image for ${slug}`);
      continue;
    }

    const { error } = await supabase
      .from('clinics')
      .update({ primary_image_url: publicUrl })
      .eq('slug', slug);

    if (error) {
      console.error(`  ✗ Database update error for ${slug}:`, error);
    } else {
      console.log(`  ✓ Updated primary_image_url -> ${publicUrl}`);
    }
  }

  console.log('\n--- Checking all Eskilstuna clinics imagery status ---');
  const { data: clinics } = await supabase
    .from('clinics')
    .select('name, slug, primary_image_url')
    .ilike('city', 'Eskilstuna');

  clinics?.forEach((c, i) => {
    console.log(`${i + 1}. ${c.name}: ${c.primary_image_url ? 'OK' : 'MISSING'}`);
  });
}

run();
