-- Migration: Add treatment_content column to treatments table
ALTER TABLE treatments
ADD COLUMN IF NOT EXISTS treatment_content JSONB;
