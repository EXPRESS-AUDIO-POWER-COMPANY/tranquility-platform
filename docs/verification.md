# Verification Record

## Current state

The application foundation is implemented on `development` and remains unmerged in draft PR #1.

## Completed repository checks

- Repository identity and write permissions verified.
- `main` retained as the release branch.
- `development` is the active integration branch and is ahead of `main` with no intentional production merge yet.
- The repository started without an application codebase, so no existing production application architecture was overwritten.
- React + TypeScript + Vite + Tailwind foundation is present.
- Public routes include Home, About, FAQ, Careers, Booking, Quote, 404, and route-level error handling.
- Residential pricing logic is isolated from UI and covered by unit tests in the repository.
- Pricing input validation rejects malformed dimensions and unknown add-ons.
- Fixed-price add-ons are not multiplied by service-level modifiers or recurring discounts.
- Booking estimator handles invalid in-progress form input without crashing the route.
- No Supabase production project, Stripe secret, service-role credential, persistent quote upload, or production booking write has been enabled for Tranquility.
- `.env.example` contains browser-safe placeholders only; privileged credentials are explicitly excluded.

## GitHub Actions status

The workflow definition is now recognized as `.github/workflows/ci.yml` and GitHub creates the `quality` job. The most recent observed run for the foundation branch failed before any normal workflow step was exposed. The jobs API returned a failed `quality` job with an empty step list, and the job log endpoint returned `BlobNotFound`.

This is materially different from a TypeScript, lint, test, or Vite build failure: there is currently no evidence that those commands executed in that failed run. Treat the blocker as CI execution/runner infrastructure until an executable log proves otherwise.

## Required verification before merge

1. Obtain an executable Node 22 environment with package-registry access (GitHub Actions or local/remote development environment).
2. Resolve dependencies and generate `package-lock.json`.
3. Run `npm run lint`.
4. Run `npm test`.
5. Run `npm run build`.
6. Commit the verified lockfile.
7. Change CI dependency installation from `npm install` to `npm ci`.
8. Re-run CI and require a green `quality` job before moving PR #1 out of draft.

## Release status

`IMPLEMENTED — VERIFICATION REQUIRED`

Do not merge to `main`, publish a production domain, or label the foundation production-ready until the executable quality gate succeeds.
