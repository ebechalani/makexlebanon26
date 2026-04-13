# Supabase Setup

Use these values locally and in Vercel environment variables.

## Public client variables

Create a file named `.env.local` inside `makex-app` with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://szssmzxmxdoowgfyhekh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Your current Supabase project URL is:
- `https://szssmzxmxdoowgfyhekh.supabase.co`

## Notes

- The **publishable key** is the public frontend key and is used here as `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Do **not** put the PostgreSQL password or service role key into frontend environment variables.
- Do **not** commit `.env.local` to Git.

## SQL to run in Supabase

Run these files in the Supabase SQL editor:

1. `supabase/schema.sql`
2. `supabase/judge_admin_handoff.sql`

## Vercel

When importing the repo into Vercel:
- set the project root to `makex-app`
- add the same two environment variables there
- deploy
