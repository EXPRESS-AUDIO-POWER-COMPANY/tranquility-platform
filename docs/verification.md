# Verification Record

## Current state

The application foundation remains unmerged. The premium customer experience is implemented on `feature/premium-webapp-experience` and targets `development` through draft PR #2.

## Verified repository facts

- GitHub write access is working and commits are being accepted.
- `main` remains untouched by the premium feature work.
- `development` remains the integration branch.
- The premium feature branch is isolated from release.
- React + TypeScript + Vite + Tailwind foundation is present.
- Public routes include Home, Services, Booking, Quote, About, FAQ, Careers, Contact, 404, and route-level error handling.
- Residential pricing logic remains isolated from UI and is covered by repository unit tests.
- The customer booking experience now uses a four-stage guided flow for service, rooms, extras, and schedule/contact details.
- The virtual quote flow validates selected image types, size, and count without pretending persistence is active.
- Route metadata and scroll restoration are implemented without additional runtime dependencies.
- Supabase persistence, Stripe, authentication, private uploads, and production booking writes remain intentionally disabled.
- Current GitHub repository metadata reports the repository as public; therefore no secrets or customer data may be committed.

## GitHub Actions status

The workflow definition is recognized as `.github/workflows/ci.yml`, and GitHub consistently creates the `quality` job for pull-request commits. Current runs fail before any normal workflow step is exposed. The jobs API returns the failed `quality` job with an empty step list.

There is therefore still no evidence that dependency installation, lint, tests, or the Vite build executed in those failed hosted runs. Treat the blocker as CI runner/execution infrastructure until executable logs prove otherwise.

## Required verification before merge

1. Obtain an executable Node 22 environment with package-registry access.
2. Resolve dependencies and generate `package-lock.json`.
3. Run `npm run lint`.
4. Run `npm test`.
5. Run `npm run build`.
6. Commit the verified lockfile.
7. Change CI dependency installation from `npm install` to `npm ci`.
8. Re-run CI and require a green `quality` job before promoting either draft PR.
9. Reconfirm intended repository visibility before any infrastructure credential setup.

## Release status

`IMPLEMENTED — VERIFICATION REQUIRED`

Do not merge to `main`, publish a production domain, or label the frontend production-ready until the executable quality gate succeeds.
