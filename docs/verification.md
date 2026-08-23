# Verification Record

## Current state

The active development surface is `main`. The premium customer WebApp, booking estimator, virtual quote experience, service-area coverage, legal pages, SEO metadata, responsive navigation, and contact workflow are committed directly to `main`.

## Verified repository facts

- GitHub write access is working and direct commits to `main` are being accepted.
- React + TypeScript + Vite + Tailwind foundation is present.
- Public routes include Home, Services, Service Area, Booking, Quote, About, FAQ, Careers, Contact, Privacy, Terms, 404, and route-level error handling.
- Residential pricing logic remains isolated from UI and is covered by repository unit tests.
- The residential booking experience uses a four-stage guided flow with input validation, property-condition context, room details, other-space details, pets, add-ons, service notes, address, scheduling, access notes, and a review state.
- The virtual quote flow validates image type, per-file size, aggregate size, duplicate selections, and file count; supported images can be previewed and individually removed.
- The quote and booking interfaces do not claim that persistence, payment, or uploads have occurred when those systems are not connected.
- General customer inquiries can prepare a prefilled email without introducing an unverified backend form endpoint.
- Route metadata includes per-route titles, descriptions, canonical URLs, Open Graph metadata, and Twitter metadata.
- Static-hosting compatibility includes a SPA fallback, robots policy, sitemap, manifest, and favicon.
- Supabase persistence, Stripe, authentication, private upload storage, and production booking writes remain intentionally disabled.
- Current GitHub repository metadata reports the repository as public; no secrets, customer data, Supabase private keys, or Stripe keys may be committed.

## GitHub Actions status

CI is configured for direct `main` pushes, pull requests targeting `main`, and manual dispatch. The workflow requests dependency installation, lint, tests, and production build.

Earlier pull-request-triggered runs created a `quality` job but failed before normal workflow steps were exposed. The jobs API returned an empty step list, so those failures did not establish a TypeScript, lint, test, or Vite build error.

Direct-main commits have not yet produced an executable verification record through the available connector. Treat executable CI/local verification as unresolved until a Node 22 environment with package-registry access successfully runs the quality commands.

## Required executable verification

1. Obtain a Node 22 environment with package-registry access.
2. Run `npm install --no-audit --no-fund` and generate `package-lock.json`.
3. Run `npm run lint`.
4. Run `npm test`.
5. Run `npm run build`.
6. Commit the verified lockfile.
7. Switch CI dependency installation from `npm install` to `npm ci`.
8. Re-run the quality gate and require a successful result before calling the application production-ready.
9. Reconfirm repository visibility before any infrastructure credentials are introduced.

## Release status

`IMPLEMENTED — VERIFICATION REQUIRED`

The customer-facing WebApp implementation is materially advanced, but executable lint/test/build verification is still required before production release.
