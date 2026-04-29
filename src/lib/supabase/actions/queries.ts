import { createClient } from '@/lib/supabase/server';
import { Clinic, City, Treatment } from '../types';

export async function getClinics(
    params?: { query?: string; page?: number; limit?: number; locationCity?: string }
): Promise<{ data: Clinic[], count: number }> {
    const supabase = await createClient();
    const page = params?.page || 1;
    const limit = params?.limit || 50;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
        .rpc('search_clinics', {
            p_query: params?.query || '',
            p_location_city: params?.locationCity || ''
        })
        .select(`
            *,
            clinic_treatments (
                treatments (*)
            )
        `, { count: 'exact' });

    const { data, count, error } = await query
        .range(from, to);

    if (error) {
        console.error('Error fetching clinics:', { message: error.message, details: error.details, hint: error.hint, code: error.code, raw: error });
        return { data: [], count: 0 };
    }

    const transformedData = (data as any[]).map(clinic => ({
        ...clinic,
        treatments: clinic.clinic_treatments?.map((ct: any) => ct.treatments) || []
    }));

    return { data: transformedData, count: count || 0 };
}

export async function getFeaturedClinics(limit: number = 12, city?: string): Promise<Clinic[]> {
    const supabase = await createClient();
    
    let query = supabase
        .from('clinics')
        .select(`
            *,
            clinic_treatments (
                treatments (*)
            )
        `);

    if (city) {
        query = query.ilike('city', city);
    }

    const { data, error } = await query
        // tier starts with v (verified), p (premium), or f (free)
        // descending order puts them in exact priority order v > p > f
        .order('tier', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching featured clinics:', error);
        return [];
    }

    return (data as any[]).map(clinic => ({
        ...clinic,
        treatments: clinic.clinic_treatments?.map((ct: any) => ct.treatments) || []
    }));
}

export async function getClinicBySlug(slug: string): Promise<Clinic | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('clinics')
        .select(`
            *,
            clinic_treatments (
                treatments (*)
            ),
            clinic_images (*)
        `)
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching clinic by slug:', error);
        return null;
    }

    return {
        ...data,
        treatments: data.clinic_treatments?.map((ct: any) => ct.treatments) || [],
        images: data.clinic_images?.sort((a: any, b: any) => a.sort_order - b.sort_order) || []
    };
}

export async function getCities(): Promise<City[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('cities')
        .select('*')
        .order('name');

    if (error) {
        console.error('Error fetching cities:', error);
        return [];
    }
    return data;
}

export async function getCityBySlug(slug: string): Promise<City | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('cities')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching city by slug:', error);
        return null;
    }
    return data;
}

export async function getUniqueCities(): Promise<string[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('clinics')
        .select('city');
        
    if (error || !data) {
        console.error('Error fetching unique cities:', error);
        return [];
    }
    
    const uniqueCities = [...new Set(data.map(d => d.city))]
        .filter(Boolean)
        .sort((a, b) => a!.localeCompare(b!));
        
    return uniqueCities as string[];
}

export async function getCityClinicCounts(): Promise<Record<string, number>> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('clinics')
        .select('city');

    if (error || !data) return {};

    const counts: Record<string, number> = {};
    data.forEach(c => {
        if (c.city) {
            counts[c.city] = (counts[c.city] || 0) + 1;
        }
    });
    return counts;
}

export async function getTreatments(): Promise<Treatment[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('treatments')
        .select('*')
        .order('name');

    if (error) {
        console.error('Error fetching treatments:', error);
        return [];
    }
    return data;
}

export async function getTreatmentBySlug(slug: string): Promise<Treatment | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('treatments')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching treatment:', error);
        return null;
    }
    return data;
}

export async function getAdminStats() {
    const supabase = await createClient();
    const [total, premium, unverified] = await Promise.all([
        supabase.from('clinics').select('*', { count: 'exact', head: true }),
        supabase.from('clinics').select('*', { count: 'exact', head: true }).eq('tier', 'premium'),
        supabase.from('clinics').select('*', { count: 'exact', head: true }).eq('is_verified', false)
    ]);

    return {
        total: total.count || 0,
        premium: premium.count || 0,
        unverified: unverified.count || 0
    };
}
