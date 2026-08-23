# Tranquility Platform

GitHub-first production WebApp for Tranquility Cleaning.

## Engineering principles

- GitHub is the canonical source of truth.
- `main` is the active implementation branch and the branch used for day-to-day development.
- New feature branches are created only when the repository owner explicitly requests isolation.
- The project must remain portable to VS Code and independent hosting.
- Lovable may be used as a secondary visual/deployment environment without becoming the source of truth or introducing code drift.
- Supabase and payment infrastructure remain separated from the public frontend until a dedicated Tranquility environment is provisioned and verified.
- No secrets, customer data, service-role credentials, payment secrets, or production environment files may be committed.

## Current customer experience

Implemented public scope:

- premium responsive Home experience with bespoke Tranquility brand mark and editorial visual system
- complete Services catalog with residential service comparison and add-ons
- dedicated Residential Cleaning service page
- dedicated Commercial Cleaning service page
- four-stage guided residential estimate and service-request workflow
- virtual consultation / custom quote workflow with image validation and local previews
- Dallas-Fort Worth service-area experience
- About / Why Tranquility
- expanded FAQ
- Careers / contractor inquiries
- Contact workflow with direct email preparation
- Privacy and Terms pages
- responsive desktop/mobile navigation and contextual mobile action bar
- route-level SEO metadata, canonical URLs, Open Graph metadata, Twitter metadata, sitemap, robots policy, manifest, favicon, and structured service data
- SPA route focus restoration, skip navigation, reduced-motion support, keyboard focus states, and route error boundaries
- static-host SPA fallback and baseline security headers

## Application boundaries

The frontend intentionally does **not** claim that the following actions have occurred until the supporting infrastructure is connected:

- persisted customer/booking records
- persisted quote submissions
- private property-photo uploads
- payment-method authorization
- card charges
- confirmed appointment scheduling

A dedicated Tranquility Supabase project has not been provisioned. The only Supabase project currently visible through the connected account is unrelated and must not be used for this application.

## Local development

Node 22 is required.

```bash
npm install
npm run dev
```

Quality commands:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run check
```

## Development workflow

```text
main
  ↓
implement
  ↓
quality gate
  ↓
visual QA
  ↓
release
```

GitHub accepting a commit is not the same as a successful production build. A release is not considered verified until lint, tests, TypeScript compilation, and the Vite production build complete successfully in an executable Node 22 environment.

## Repository visibility

The repository is currently public. Do not commit private keys, customer data, production credentials, Supabase service-role keys, Stripe secret keys, webhook secrets, private property media, or environment files.

See `docs/architecture.md`, `docs/business-rules.md`, `docs/backend-contracts.md`, `docs/verification.md`, and `SECURITY.md` before introducing infrastructure changes.
