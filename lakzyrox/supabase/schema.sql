create table if not exists public.site_data (
  site_key text primary key default 'lakzyrox',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

create table if not exists public.site_themes (
  site_key text primary key default 'lakzyrox',
  theme jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

create table if not exists public.site_layouts (
  site_key text primary key default 'lakzyrox',
  layout jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

create table if not exists public.published_configurations (
  site_key text primary key default 'lakzyrox',
  config jsonb not null default '{}'::jsonb,
  published_at timestamptz not null default now(),
  published_by uuid references auth.users(id)
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.site_data enable row level security;
alter table public.site_themes enable row level security;
alter table public.site_layouts enable row level security;
alter table public.published_configurations enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

create policy "Admins can read own admin record" on public.admin_users for select to authenticated using (user_id = auth.uid());
create policy "Public can read published configuration" on public.published_configurations for select using (true);
create policy "Admins manage site data" on public.site_data for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage site themes" on public.site_themes for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage site layouts" on public.site_layouts for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage published configuration" on public.published_configurations for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Add approved auth user IDs to admin_users from the Supabase SQL Editor.
-- Revisions remain reserved for the publishing phase.
