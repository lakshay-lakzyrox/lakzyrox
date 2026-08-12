-- LAKZYROX Supabase setup
-- Run this once in Supabase SQL Editor.
-- Your existing video table is kept; missing columns are added safely.

alter table public.video add column if not exists title text;
alter table public.video add column if not exists thumbnail_url text;
alter table public.video add column if not exists video_url text;
alter table public.video add column if not exists platform text;
alter table public.video add column if not exists category text;
alter table public.video add column if not exists short text;
alter table public.video add column if not exists description text;
alter table public.video add column if not exists caption text;
alter table public.video add column if not exists hashtags text;
alter table public.video add column if not exists published boolean not null default true;
alter table public.video add column if not exists sort_order integer not null default 0;

-- Public visitors can read videos.
drop policy if exists "Enable read access for all users" on public.video;
create policy "Enable read access for all users"
on public.video
for select
to public
using (true);

-- Only signed-in users can manage videos.
drop policy if exists "Admin can insert videos" on public.video;
create policy "Admin can insert videos"
on public.video
for insert
to authenticated
with check (true);

drop policy if exists "Admin can update videos" on public.video;
create policy "Admin can update videos"
on public.video
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Admin can delete videos" on public.video;
create policy "Admin can delete videos"
on public.video
for delete
to authenticated
using (true);
