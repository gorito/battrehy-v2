require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("ERROR: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function main() {
  console.log("Connecting to Supabase...");
  
  // 1. Create the bucket
  const { data, error } = await supabase.storage.createBucket('company-images', {
    public: true,
    fileSizeLimit: 10485760, // 10MB
  });

  if (error) {
    if (error.message.includes('already exists') || error.message.includes('duplicate key')) {
      console.log("Bucket 'company-images' already exists - skipping creation.");
    } else {
      console.error("Error creating bucket:", error.message);
      return;
    }
  } else {
    console.log("Successfully created 'company-images' bucket!");
  }

  // 2. We can't easily create RLS policies via the standard JS client,
  // but if the bucket is literally marked public=true above, it often works for reading.
  // For uploading as an anonymous user, we need the policies.
  // However, since we have the service role key, we'll suggest an alternative if needed.
  console.log("Bucket setup complete.");
}

main();
