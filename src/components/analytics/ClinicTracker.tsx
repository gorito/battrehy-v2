'use client';

import { useEffect, useRef } from 'react';
import { trackClinicEvent } from '@/lib/supabase/actions/analytics';

export default function ClinicTracker({ clinicId }: { clinicId: string }) {
    const hasTracked = useRef(false);

    useEffect(() => {
        if (!hasTracked.current) {
            hasTracked.current = true;
            trackClinicEvent(clinicId, 'view').catch(console.error);
        }
    }, [clinicId]);

    return null; // This component doesn't render anything
}
