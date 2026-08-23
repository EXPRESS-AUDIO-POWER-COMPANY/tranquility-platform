# Security Policy

## Secrets

Never commit Supabase service-role keys, Stripe secret keys, webhook secrets, private credentials, or production environment files.

Only explicitly public browser configuration may use `VITE_*` variables. A `VITE_*` variable is shipped to the browser and must be treated as public.

## Database

When Supabase is introduced:
- enable RLS on every browser-accessible table
- prefer least-privilege policies
- enforce authorization server-side/database-side, not by hidden UI controls
- use migration files for schema and policy changes

## Uploads

Quote/property photos must be private by default, validated for MIME type and size, and exposed only through authorization-controlled or signed access.

## Payments

Raw payment-card data must never be stored by this repository or Supabase. Use Stripe-hosted/Stripe Elements collection and verified webhooks.
