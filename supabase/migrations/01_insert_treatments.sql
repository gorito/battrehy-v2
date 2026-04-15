-- 1. Lägg till kolumnen 'image_url' i tabellen 'treatments' om den inte redan finns
ALTER TABLE public.treatments 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 2. Uppdatera eller Skapa de 9 behandlingarna
INSERT INTO public.treatments (name, slug, description, image_url)
VALUES 
  (
    'Estetisk klinik', 
    'estetisk-klinik', 
    NULL, 
    'https://uxuhmizabvduptruonnr.supabase.co/storage/v1/object/public/company-images/services/service-1772657469675.jpg'
  ),
  (
    'Skönhetsklinik', 
    'skonhetsklinik', 
    NULL, 
    'https://uxuhmizabvduptruonnr.supabase.co/storage/v1/object/public/company-images/services/service-1772657588418.jpg'
  ),
  (
    'Anti-aging behandling', 
    'anti-aging-behandling', 
    NULL, 
    'https://uxuhmizabvduptruonnr.supabase.co/storage/v1/object/public/company-images/services/service-1772657612167.jpg'
  ),
  (
    'Microneedling', 
    'microneedling', 
    NULL, 
    'https://uxuhmizabvduptruonnr.supabase.co/storage/v1/object/public/company-images/services/service-1772658399811.jpg'
  ),
  (
    'Dermal fillers', 
    'dermal-fillers', 
    NULL, 
    'https://uxuhmizabvduptruonnr.supabase.co/storage/v1/object/public/company-images/services/service-1772659142964.jpg'
  ),
  (
    'Ansiktsbehandling', 
    'ansiktsbehandling', 
    NULL, 
    'https://uxuhmizabvduptruonnr.supabase.co/storage/v1/object/public/company-images/services/service-1772659164120.jpg'
  ),
  (
    'Hudvård', 
    'hudvard', 
    NULL, 
    'https://uxuhmizabvduptruonnr.supabase.co/storage/v1/object/public/company-images/services/service-1772659207920.jpg'
  ),
  (
    'Botoxbehandling', 
    'botoxbehandling', 
    'Botoxbehandling är en av Sveriges mest populära estetiska behandlingar – ett snabbt och effektivt sätt att mjuka upp rynkor och fina linjer för ett fräschare och mer ungdomligt utseende.', 
    'https://uxuhmizabvduptruonnr.supabase.co/storage/v1/object/public/company-images/services/service-1772655639712.jpg'
  ),
  (
    'Laserbehandling', 
    'laserbehandling', 
    'Laserbehandling är en skonsam och effektiv metod för att behandla pigmentfläckar, rynkor och ojämn hudton – med synliga resultat redan efter första behandlingen.', 
    'https://uxuhmizabvduptruonnr.supabase.co/storage/v1/object/public/company-images/services/service-1772657406085.png'
  )
ON CONFLICT (slug) 
DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url;
