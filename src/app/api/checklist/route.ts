import { NextRequest, NextResponse } from 'next/server';
import { getGBPChecklistForClinic } from '@/lib/supabase/actions/queries';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const clinicId = searchParams.get('clinicId');

    if (!clinicId) {
        return NextResponse.json({ error: 'Missing clinicId parameter' }, { status: 400 });
    }

    try {
        const checklist = await getGBPChecklistForClinic(clinicId);
        return NextResponse.json(checklist);
    } catch (err: any) {
        console.error('Error fetching GBP checklist:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
