-- Add AI-generated content columns to the clinics table
ALTER TABLE clinics
ADD COLUMN IF NOT EXISTS ai_description TEXT,
ADD COLUMN IF NOT EXISTS ai_faq TEXT,
ADD COLUMN IF NOT EXISTS ai_meta TEXT;
