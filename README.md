# Tranquility Platform

Production-oriented rebuild of Tranquility Cleaning's customer website and future operations platform.

## Engineering principles

- GitHub is the canonical source of truth.
- The project must remain portable to VS Code and independent hosting.
- Lovable may be used as a secondary visual/deployment environment without becoming a lock-in dependency.
- Supabase will be introduced through migrations with intentional RLS and private storage policies.
- Stripe secret operations will remain server-side; raw card data never touches application storage.

## Current milestone

Implemented frontend foundation:
- React + TypeScript + Vite
- Tailwind CSS with shadcn-compatible configuration
- responsive site shell and navigation
- Home, About, FAQ, Careers, Booking, Quote, and 404 routes
- typed residential pricing estimator using temporary seed configuration
- virtual quote image-selection validation (no uploads yet)
- Vitest pricing tests
- GitHub Actions CI for lint, test, and build

Production data submission, authentication, Supabase persistence, private photo storage, Stripe, scheduling, and admin tooling are intentionally not enabled yet.

## Local development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm test
npm run build
```

## Branch strategy

- `main`: release-ready code
- `development`: integrated development branch
- `feature/*`: isolated implementation branches as the project expands

See `docs/architecture.md`, `docs/business-rules.md`, and `SECURITY.md` before introducing infrastructure changes.
