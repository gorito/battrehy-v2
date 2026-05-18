'use server';

import { createClient } from '@/lib/supabase/server';

export async function trackClinicEvent(clinicId: string, eventType: 'view' | 'website_click' | 'booking_click') {
    try {
        const supabase = await createClient();
        
        const { error } = await supabase.rpc('increment_clinic_stat', {
            p_clinic_id: clinicId,
            p_stat_type: eventType
        });
        
        if (error) {
            console.error('[Analytics Error]', error);
        }
    } catch (e) {
        console.error('[Analytics Exception]', e);
    }
}

export async function getClinicStats(clinicId: string) {
    try {
        const supabase = await createClient();
        
        // Sum up the stats for this clinic
        const { data, error } = await supabase
            .from('clinic_stats')
            .select('views, website_clicks, booking_clicks')
            .eq('clinic_id', clinicId);
            
        if (error) throw error;
        
        const totals = data.reduce((acc, curr) => ({
            views: acc.views + (curr.views || 0),
            website_clicks: acc.website_clicks + (curr.website_clicks || 0),
            booking_clicks: acc.booking_clicks + (curr.booking_clicks || 0)
        }), { views: 0, website_clicks: 0, booking_clicks: 0 });
        
        return { success: true, data: totals };
    } catch (e) {
        console.error('[Analytics Fetch Exception]', e);
        return { success: false, data: { views: 0, website_clicks: 0, booking_clicks: 0 } };
    }
}
