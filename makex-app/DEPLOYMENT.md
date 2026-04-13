# Deployment Guide

This app is intended to be deployed on Vercel with Supabase as the database and realtime backend.

## 1. Install dependencies

From the `makex-app` folder:

```bash
npm install
```

Required packages:
- next
- react
- react-dom
- typescript
- @types/node
- @types/react
- @types/react-dom
- @supabase/supabase-js

## 2. Create a Supabase project

In Supabase:
- create a new project
- open the SQL editor
- run `supabase/schema.sql`

## 3. Add environment variables

Set the following in your local environment and in Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 4. Run locally

```bash
npm run dev
```

Open:
- `/`
- `/admin`
- `/judge`
- `/coach`
- `/live`

## 5. Deploy to Vercel

- import the GitHub repository into Vercel
- set the project root to `makex-app`
- add the environment variables
- deploy

## 6. Event usage

Suggested links after deployment:
- `/admin` for organizers
- `/judge` for judges
- `/coach` for coaches and teachers
- `/live` for parents and venue screens

## Important note

The current pages are still scaffold pages and use static demo data in the UI. The next development phase is to connect all views to Supabase tables so updates are shared live across devices.
