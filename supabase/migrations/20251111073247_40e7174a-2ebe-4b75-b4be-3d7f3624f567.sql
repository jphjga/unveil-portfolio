-- Add screenshots array column to projects table
ALTER TABLE public.projects 
ADD COLUMN screenshots text[] DEFAULT '{}';

COMMENT ON COLUMN public.projects.screenshots IS 'Array of URLs for additional project screenshots';