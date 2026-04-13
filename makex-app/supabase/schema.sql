create table if not exists competition_categories (
  id text primary key,
  name text not null,
  age_group text,
  full_name text not null,
  table_count integer not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists competition_tables (
  id text primary key,
  category_id text not null references competition_categories(id) on delete cascade,
  label text not null,
  short_label text not null,
  created_at timestamptz not null default now()
);

create table if not exists participants (
  id uuid primary key default gen_random_uuid(),
  team_name text not null,
  student_names text[] not null,
  coach_name text,
  parent_name text,
  created_at timestamptz not null default now()
);

create table if not exists passations (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references participants(id) on delete cascade,
  category_id text not null references competition_categories(id),
  table_id text not null references competition_tables(id),
  scheduled_time timestamptz,
  estimated_duration_min integer not null default 8,
  status text not null default 'Scheduled',
  checked_in boolean not null default false,
  actual_start timestamptz,
  actual_end timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  constraint passation_status_check check (status in ('Scheduled', 'Checked-in', 'On Deck', 'Called', 'In Progress', 'Completed', 'Delayed', 'Absent'))
);

create table if not exists judge_assignments (
  id uuid primary key default gen_random_uuid(),
  judge_name text not null,
  table_id text not null references competition_tables(id) on delete cascade,
  created_at timestamptz not null default now()
);

insert into competition_categories (id, name, age_group, full_name, table_count)
values
  ('CAT1', 'Sportswonderland', '4-5 years old', 'Sportswonderland (4-5 years old)', 5),
  ('CAT2', 'Sportswonderland', '6-7 years old', 'Sportswonderland (6-7 years old)', 5),
  ('CAT3', 'Capelli Soccer', 'Open', 'Capelli Soccer', 3),
  ('CAT4', 'Capelli Inspire', '8-9 years old', 'Capelli Inspire (8-9 years old)', 5),
  ('CAT5', 'Capelli Inspire', '10-12 years old', 'Capelli Inspire (10-12 years old)', 5),
  ('CAT6', 'Capelli Starter', '13-15 years old', 'Capelli Starter (13-15 years old)', 5),
  ('CAT7', 'MakeX Inspire', '8-12 years old', 'MakeX Inspire (8-12 years old)', 5),
  ('CAT8', 'MakeX Starter', '11-13 years old', 'MakeX Starter (11-13 years old)', 1)
on conflict (id) do nothing;
