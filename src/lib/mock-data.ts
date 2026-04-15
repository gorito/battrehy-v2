import { Clinic, City, Treatment } from './supabase/types';
export * from './supabase/types';

// Mock data for Phase 1 development until Supabase DB is populated

export const MOCK_CITIES: City[] = [
    { id: '1', name: 'Stockholm', slug: 'stockholm', description: 'Skönhetskliniker i Stockholm' },
    { id: '2', name: 'Göteborg', slug: 'goteborg', description: 'Skönhetskliniker i Göteborg' },
    { id: '3', name: 'Malmö', slug: 'malmo', description: 'Skönhetskliniker i Malmö' },
];

export const MOCK_TREATMENTS: Treatment[] = [
    { id: '1', name: 'Botox', slug: 'botox', description: 'Rynkbehandling med Botox' },
    { id: '2', name: 'Fillers', slug: 'fillers', description: 'Volymgivande behandling' },
    { id: '3', name: 'Laser', slug: 'laser', description: 'Hårborttagning och hudföryngring' },
];

export const MOCK_CLINICS: Clinic[] = [
    {
        id: '1',
        name: 'Stockholm Beauty Clinic',
        slug: 'stockholm-beauty-clinic',
        city: 'Stockholm',
        address: 'Sveavägen 10, Stockholm',
        phone: '08-123 45 67',
        website: 'https://example.com',
        booking_url: 'https://bokadirekt.se/places/123',
        description: 'En av Stockholms ledande kliniker inom estetiska behandlingar.',
        tier: 'verified',
        is_verified: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        treatments: [MOCK_TREATMENTS[0], MOCK_TREATMENTS[1]],
    },
    {
        id: '2',
        name: 'Göteborg Estetik',
        slug: 'goteborg-estetik',
        city: 'Göteborg',
        address: 'Avenyn 1, Göteborg',
        description: 'Specialister på laser och hudvård.',
        tier: 'premium',
        is_verified: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        treatments: [MOCK_TREATMENTS[2]],
    },
    {
        id: '3',
        name: 'Malmö Hud & Spa',
        slug: 'malmo-hud-spa',
        city: 'Malmö',
        tier: 'free',
        is_verified: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        treatments: [MOCK_TREATMENTS[0]],
    }
];
