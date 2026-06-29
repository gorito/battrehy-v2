import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name || typeof name !== 'string' || !name.trim()) {
      return new Response(JSON.stringify({ error: 'City name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const cityName = name.trim();
    // Simple slug generation: lowercase, replace spaces with hyphens, remove invalid chars
    const slug = cityName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('cities')
      .insert({ name: cityName, slug })
      .select();

    if (error) {
      console.error('Error inserting city:', error);
      return new Response(JSON.stringify({ error: error.message || 'Failed to add city' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('Unexpected error in city POST handler:', e);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
