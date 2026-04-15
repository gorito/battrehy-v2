-- Bättrehy.se Phase 1 Schema

-- Tiers ENUM
CREATE TYPE listing_tier AS ENUM ('free', 'premium', 'verified');

-- 1. Clinics Table
CREATE TABLE public.clinics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    city TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    website TEXT,
    booking_url TEXT,
    description TEXT,
    tier listing_tier NOT NULL DEFAULT 'free',
    primary_image_url TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    
    CONSTRAINT clinics_name_city_key UNIQUE (name, city)
);

-- 2. Clinic Images Table (Gallery)
CREATE TABLE public.clinic_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    sort_order INTEGER DEFAULT 0
);

-- 3. Cities Table (For SEO and taxonomy)
CREATE TABLE public.cities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Treatments Table (For SEO and taxonomy)
CREATE TABLE public.treatments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Clinic Treatments (Junction)
CREATE TABLE public.clinic_treatments (
    clinic_id UUID NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
    treatment_id UUID NOT NULL REFERENCES public.treatments(id) ON DELETE CASCADE,
    PRIMARY KEY (clinic_id, treatment_id)
);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER clinics_updated_at
BEFORE UPDATE ON public.clinics
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- Note: RLS policies can be added depending on the exact admin access strategy.
-- Since Phase 1 uses an admin area without clinic owner logins, we can handle auth via a strict admin-only mechanism.
