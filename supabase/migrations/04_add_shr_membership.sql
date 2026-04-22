-- Add SHR membership status to clinics
ALTER TABLE public.clinics 
ADD COLUMN is_shr_member BOOLEAN NOT NULL DEFAULT false;
