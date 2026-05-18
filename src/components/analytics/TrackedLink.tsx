'use client';

import { trackClinicEvent } from '@/lib/supabase/actions/analytics';
import React, { ReactNode } from 'react';

type TrackedLinkProps = {
    clinicId: string;
    eventType: 'website_click' | 'booking_click';
    href: string;
    className?: string;
    children: ReactNode;
};

export default function TrackedLink({ clinicId, eventType, href, className, children }: TrackedLinkProps) {
    const handleClick = () => {
        // Track the event in the background, don't wait for it
        trackClinicEvent(clinicId, eventType).catch(console.error);
    };

    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={className}
            onClick={handleClick}
        >
            {children}
        </a>
    );
}
