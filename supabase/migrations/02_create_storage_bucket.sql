-- Create the storage bucket for clinic images
insert into storage.buckets (id, name, public)
values ('company-images', 'company-images', true)
on conflict (id) do nothing;

-- Set up security policies for the bucket
-- Allow public access to view images
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'company-images' );

-- Allow anonymous uploads (since we are in Phase 1 admin without full auth)
-- In production with auth, we'd restrict this to authenticated admins
create policy "Allow Anonymous Uploads"
on storage.objects for insert
with check ( bucket_id = 'company-images' );

-- Allow anonymous updates
create policy "Allow Anonymous Updates"
on storage.objects for update
using ( bucket_id = 'company-images' );

-- Allow anonymous deletes
create policy "Allow Anonymous Deletes"
on storage.objects for delete
using ( bucket_id = 'company-images' );
