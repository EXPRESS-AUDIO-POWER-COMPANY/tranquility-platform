# Verification Record

## Current state

The active development surface is `main`. The premium customer WebApp, dedicated residential/commercial service pages, booking estimator, virtual quote experience, service-area coverage, legal pages, SEO metadata, responsive navigation, bespoke brand system, and contact workflow are committed directly to `main`.

## Verified repository facts

- GitHub write access is working and direct commits to `main` are being accepted.
- React + TypeScript + Vite + Tailwind foundation is present.
- Public routes include Home, Services, Residential Cleaning, Commercial Cleaning, Service Area, Booking, Quote, About, FAQ, Careers, Contact, Privacy, Terms, 404, and route-level error handling.
- A reusable Tranquility brand mark is implemented and used by the primary header/footer identity.
- Tailwind now supports the complete opacity scale used throughout the design, eliminating invalid fractional opacity utility gaps.
- Global typography, form states, focus treatment, autofill behavior, reduced motion, and responsive interaction styling have been hardened.
- Residential pricing logic remains isolated from UI and is covered by repository unit tests.
- The residential booking experience uses a four-stage guided flow with validation, property-condition context, room details, other-space details, pets, add-ons, service notes, address, scheduling, access notes, and a review state.
- The virtual quote flow validates image type, per-file size, aggregate size, duplicate selections, and file count; supported images can be previewed and individually removed.
- The quote and booking interfaces do not claim that persistence, payment, uploads, or confirmed scheduling occurred when those systems are not connected.
- General customer inquiries can prepare a prefilled email without introducing an unverified backend form endpoint.
- Route metadata includes per-route titles, descriptions, canonical URLs, Open Graph metadata, and Twitter metadata.
- Structured `CleaningService` metadata includes the supported service catalog and DFW service-area cities.
- Static-hosting compatibility includes a SPA fallback, security headers, robots policy, sitemap, installable manifest, and branded SVG favicon.
- SPA route changes restore focus to the main content region for keyboard and assistive-technology users.
- Supabase persistence, Stripe, authentication, private upload storage, and production booking writes remain intentionally disabled.
- The connected Supabase account currently exposes only an unrelated inactive project; it has not been touched.
- The connected Lovable workspace currently has no Tranquility project, so GitHub remains the sole canonical implementation surface and no duplicate project has been created.
- Current GitHub repository metadata reports the repository as public; no secrets, customer data, Supabase private keys, or Stripe keys may be committed.

## GitHub Actions status

CI is configured for direct `main` pushes, pull requests targeting `main`, and manual dispatch. The workflow requests dependency installation, lint, tests, and production build.

Earlier pull-request-triggered runs created a `quality` job but failed before normal workflow steps were exposed. The jobs API returned an empty step list, so those failures did not establish a TypeScript, lint, test, or Vite build error.

The available connector still does not provide an executable push-triggered verification record for the current `main` head. Treat executable CI/local verification as unresolved until a Node 22 environment with package-registry access successfully runs the quality commands.

## Required executable verification

1. Obtain a Node 22 environment with package-registry access.
2. Run `npm install --no-audit --no-fund` and generate `package-lock.json`.
3. Run `npm run typecheck`.
4. Run `npm run lint`.
5. Run `npm test`.
6. Run `npm run build` or `npm run check`.
7. Commit the verified lockfile.
8. Switch CI dependency installation from `npm install` to `npm ci`.
9. Re-run the quality gate and require a successful result before calling the application production-ready.
10. Reconfirm repository visibility before any infrastructure credentials are introduced.

## Release status

`IMPLEMENTED — VERIFICATION REQUIRED`

The customer-facing WebApp is now a materially complete premium frontend, but executable lint/test/build verification and deployment visual QA are still required before production release.
