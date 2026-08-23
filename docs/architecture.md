# Tranquility Platform Architecture

## Current milestone

The repository is GitHub-first and builder-portable. The current implementation is a frontend foundation using React, TypeScript, Vite, Tailwind CSS, and shadcn-compatible conventions.

No production database, authentication, payment processing, customer persistence, or image persistence is enabled yet. UI that references those future capabilities must not imply data has been stored or payments have been processed.

## Source of truth

- Canonical source: GitHub repository
- Default production branch: `main`
- Active integration branch: `development`
- Local development: standard Node.js + npm + VS Code compatible
- Lovable: secondary development/deployment environment only; it must not become the only place the source can be maintained

## Planned infrastructure boundaries

### Browser
- Marketing pages
- Booking and quote forms
- Client-side schema validation
- Stripe Elements / hosted payment collection only after server-side Stripe setup exists
- No privileged credentials

### Supabase
- PostgreSQL for business records
- Auth only if/when customer/admin login is approved
- Row Level Security enabled intentionally for all exposed tables
- Private Storage bucket for quote/property media
- Signed URL access for authorized staff
- Edge Functions for privileged integrations and webhook-safe workflows where appropriate

### Stripe
- Browser receives publishable key only
- Secret key lives only in privileged server/Edge Function environment
- SetupIntent for card-on-file workflow
- PaymentIntent / webhook-driven payment state
- Raw card data never enters Supabase

## Planned data domains

- customers
- customer_properties
- service_types
- service_addons
- pricing_rules
- quotes
- quote_media
- bookings
- booking_addons
- payments
- audit_logs

Database implementation will be migration-driven after pricing and workflow requirements are approved.
