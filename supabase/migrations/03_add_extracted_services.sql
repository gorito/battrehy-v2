-- Add extracted_services column to clinics table
ALTER TABLE clinics ADD COLUMN extracted_services text[];

-- Add index for potential future searching
CREATE INDEX idx_clinics_extracted_services ON clinics USING GIN (extracted_services);
