# LakzyRox

A lightweight HTML, CSS, JavaScript, Netlify, and Supabase foundation for a remotely controlled website.

## Phase 1

- Public site shell at `/`
- Separate Supabase Auth admin shell at `/admin`
- Default configuration fallback when Supabase is unavailable
- Separate `site_data`, `site_themes`, `site_layouts`, and `published_configurations` tables
- RLS enabled in `supabase/schema.sql`
- No service-role key or password is stored in frontend code

## Setup

1. Create a free Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL Editor.
3. Create an admin user in Supabase Authentication.
4. Copy the project URL and public anon key into `js/config.js`.
5. Deploy the folder to Netlify.

The editor, publishing workflow, revisions, realtime updates, page builder, and custom code sandbox are reserved for later phases.
