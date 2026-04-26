-- Run in Supabase SQL editor if migrations are not applied automatically.
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  role text not null default '',
  location text not null default '',
  category text not null,
  featured boolean not null default false,
  initials text not null default '',
  created_at timestamptz not null default now(),
  constraint testimonials_category_check check (
    category in ('Interior Design', 'Architecture & Construction')
  )
);

create index if not exists testimonials_category_idx on public.testimonials (category);
create index if not exists testimonials_featured_idx on public.testimonials (category, featured desc);

alter table public.testimonials enable row level security;

-- Service role (used by API routes) bypasses RLS; add policies if using anon on client.
-- For public read on site, either use service role in Route Handlers (current pattern) or:
-- create policy "public read testimonials" on public.testimonials for select using (true);

comment on table public.testimonials is 'Client testimonials; filtered by category for Interior vs Construction site pages.';
