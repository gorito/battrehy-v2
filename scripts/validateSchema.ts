// scripts/validateSchema.ts
// Run: npx ts-node scripts/validateSchema.ts

import { createClient } from '@supabase/supabase-js'

// Need dotenv to load env vars for scripts
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Simple slugify fallback in case path aliases don't work in ts-node
function slugifyCity(name: string): string {
    if (!name) return '';
    return name.toLowerCase()
        .replace(/å/g, 'a')
        .replace(/ä/g, 'a')
        .replace(/ö/g, 'o')
        .replace(/[^a-z0-9]/g, '-');
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
const BASE_URL = 'https://battrehy.se'

async function validatePage(url: string): Promise<{ url: string; valid: boolean; errors: string[] }> {
  const res = await fetch(
    `https://validator.schema.org/validate?uri=${encodeURIComponent(url)}&output=json`
  )
  const data = await res.json() as any
  const errors = data?.errors?.map((e: any) => e.message) ?? []
  return { url, valid: errors.length === 0, errors }
}

async function run() {
  // Fetch a sample of clinic slugs from Supabase
  const { data: clinics } = await supabase
    .from('clinics')
    .select('slug, city')
    .limit(50) // increase for full run; reduce for spot-checks

  if (!clinics) {
    console.log("No clinics found or missing environment variables.");
    return;
  }

  const urls = clinics.map(c => `${BASE_URL}/kliniker/${slugifyCity(c.city)}/${c.slug}/`)

  const results = await Promise.allSettled(
    urls.map(url => validatePage(url))
  )

  const failures = results
    .filter(r => r.status === 'fulfilled' && !r.value.valid)
    .map(r => (r as PromiseFulfilledResult<any>).value)

  console.log(`\n✅ Passed: ${results.length - failures.length}`)
  console.log(`❌ Failed: ${failures.length}`)

  if (failures.length > 0) {
    console.log('\nFailed pages:')
    failures.forEach(f => {
      console.log(`\n  ${f.url}`)
      f.errors.forEach((e: string) => console.log(`    - ${e}`))
    })
    process.exit(1) // fail CI if errors found
  }
}

run()
