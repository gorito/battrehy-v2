-- Create contact submissions table
CREATE TABLE public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread'
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts from the contact form
CREATE POLICY "Allow anonymous inserts" 
ON public.contact_submissions 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Create policy to allow authenticated dashboard users/service role to select/update
CREATE POLICY "Allow authenticated select"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated update"
ON public.contact_submissions
FOR UPDATE
TO authenticated
USING (true);
