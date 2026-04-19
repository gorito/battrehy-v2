export type Tier = 'free' | 'premium' | 'verified';

export interface Treatment {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image_url?: string;
}

export interface City {
    id: string;
    name: string;
    slug: string;
    description?: string;
}

export interface ClinicImage {
    id: string;
    clinic_id: string;
    url: string;
    alt_text?: string;
    sort_order: number;
}

export interface Clinic {
    id: string;
    name: string;
    slug: string;
    city: string;
    address?: string;
    phone?: string;
    website?: string;
    booking_url?: string;
    description?: string;
    tier: Tier;
    primary_image_url?: string;
    is_verified: boolean;
    is_shr_member: boolean;
    extracted_services?: string[];
    created_at: string;
    updated_at: string;

    // Joined relations
    treatments?: Treatment[];
    images?: ClinicImage[];
}
