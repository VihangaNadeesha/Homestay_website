# Habaraduwa Family Homestay

A Next.js App Router website for a small Sri Lankan family homestay. It is intentionally image-ready: this repository arrived without property images, so no stock images, fabricated reviews, contact details, or availability have been published.

## Setup

1. Copy `.env.example` to `.env.local` and supply the public Supabase URL/anon key. Keep the service role key server-only.
2. Create a Supabase project and run `supabase/schema.sql` in its SQL editor.
3. Create the first `auth.users` admin through Supabase Auth, then insert its UUID into `profiles` with role `admin`. Admins sign in at `/admin/login`; the session token is held only in an HTTP-only, same-site cookie.
4. Add property images to a **public** storage bucket only after verifying they belong to the property. Store paths and descriptive alt text in `gallery_images`.
5. Run `npm install`, then `npm run dev`.

## Commands

- `npm run dev` – local development
- `npm run typecheck` – strict TypeScript check
- `npm run lint` – lint project files
- `npm run build` – production build

## Deployment

Netlify reads `netlify.toml`. Configure the environment variables in Netlify’s UI; do not commit any secret. The current form endpoint returns a clear service response until Supabase is configured. The app includes a conservative per-instance rate limiter; use a trusted shared rate-limit provider or Supabase Edge Function before opening anonymous inquiries to high traffic.

## Security notes

Admin pages validate the current Supabase user and `profiles.role` on the server. The schema uses RLS default-deny policies and does not publish inquiry data. `SUPABASE_SERVICE_ROLE_KEY` is not used by browser code and must never be prefixed `NEXT_PUBLIC_`.
