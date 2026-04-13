# MakeX Live Competition App

This folder contains the online scaffold for the MakeX national competition management system.

## Main roles

- Admin: create schedules, assign category and table, edit and finalize passations
- Judge: see assigned table and update queue state
- Coach: follow only their teams
- Public/Parents: live board showing now, next, and prepare

## Competition categories

- Sportswonderland (4-5 years old) — 5 tables
- Sportswonderland (6-7 years old) — 5 tables
- Capelli Soccer — 3 tables
- Capelli Inspire (8-9 years old) — 5 tables
- Capelli Inspire (10-12 years old) — 5 tables
- Capelli Starter (13-15 years old) — 5 tables
- MakeX Inspire (8-12 years old) — 5 tables
- MakeX Starter (11-13 years old) — 1 table

## Planned stack

- Next.js app deployed on Vercel
- Supabase for database, auth, and realtime
- Role-based views: `/admin`, `/judge`, `/coach`, `/live`

## Next steps

1. Install dependencies
2. Create Supabase project
3. Run the SQL in `supabase/schema.sql`
4. Add environment variables from `.env.example`
5. Deploy to Vercel

## Current status

This is the initial hosted scaffold. The local MVP logic already exists in ChatGPT canvas and will be migrated into this app in the next commits.
