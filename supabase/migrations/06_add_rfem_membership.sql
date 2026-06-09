-- Add RFEM membership status to clinics
ALTER TABLE public.clinics 
ADD COLUMN is_rfem_member BOOLEAN NOT NULL DEFAULT false;
