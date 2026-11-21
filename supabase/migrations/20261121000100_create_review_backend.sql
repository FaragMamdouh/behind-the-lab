-- Behind the Lab: public submission backend.
-- Public visitors can read approved supervisor profiles and published reviews only.
-- All review writes go through the submit-review Edge Function; no direct client INSERT is granted.

create table if not exists public.supervisors (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null check (char_length(name) between 2 and 180),
  academic_title text not null default 'Academic supervisor',
  institution text not null check (char_length(institution) between 2 and 180),
  country text not null check (char_length(country) between 2 and 100),
  department text not null default '',
  research_field text not null default 'Not specified',
  institution_url text,
  interests text[] not null default '{}',
  profile_initials text not null default '?',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.supervisor_reviews (
  id uuid primary key default gen_random_uuid(),
  supervisor_id uuid not null references public.supervisors(id) on delete cascade,
  degree_level text not null check (degree_level in ('Master''s', 'PhD')),
  relationship text not null check (relationship in ('Primary supervisor', 'Co-supervisor', 'Thesis advisor', 'Other mentoring role')),
  institution text not null,
  department text not null default '',
  supervision_period text not null,
  category_ratings jsonb not null default '{}'::jsonb check (jsonb_typeof(category_ratings) = 'object'),
  overall_rating smallint not null check (overall_rating between 1 and 5),
  title text not null check (char_length(title) between 5 and 120),
  body text not null check (char_length(body) between 60 and 5000),
  recommendation text not null check (recommendation in ('yes', 'no', 'unsure')),
  status text not null default 'pending' check (status in ('pending', 'published', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists supervisors_status_name_idx
  on public.supervisors (status, name);
create index if not exists supervisor_reviews_supervisor_status_created_idx
  on public.supervisor_reviews (supervisor_id, status, created_at desc);

alter table public.supervisors enable row level security;
alter table public.supervisor_reviews enable row level security;

revoke all on table public.supervisors from anon, authenticated;
revoke all on table public.supervisor_reviews from anon, authenticated;
grant select on table public.supervisors to anon, authenticated;
grant select on table public.supervisor_reviews to anon, authenticated;

drop policy if exists "Public can read approved supervisors" on public.supervisors;
create policy "Public can read approved supervisors"
  on public.supervisors for select to anon, authenticated
  using (status = 'approved');

drop policy if exists "Public can read published reviews" on public.supervisor_reviews;
create policy "Public can read published reviews"
  on public.supervisor_reviews for select to anon, authenticated
  using (
    status = 'published'
    and exists (
      select 1 from public.supervisors s
      where s.id = supervisor_id and s.status = 'approved'
    )
  );

-- Deliberately no anon/authenticated INSERT, UPDATE, or DELETE policies.
-- The service-role-only Edge Function creates pending records. Moderators approve them in Supabase.
