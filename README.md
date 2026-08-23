# Tranquility Platform

GitHub-first production WebApp for Tranquility Cleaning.

## Engineering principles

- GitHub is the canonical source of truth.
- The project must remain portable to VS Code and independent hosting.
- Lovable may be used as a secondary visual/deployment environment without becoming a lock-in dependency.
- Supabase will be introduced through migrations with intentional RLS and private storage policies.
- Stripe secret operations will remain server-side; raw card data never touches application storage.

## Current premium frontend milestone

Implemented customer-facing scope:

- premium responsive Home experience
- Services overview
- four-stage guided residential estimate and booking-profile workflow
- virtual consultation / custom quote workflow
- About / Why Tranquility
- FAQ
- Careers / contractor inquiries
- Contact and DFW service-area experience
- persistent mobile Book / Get Quote actions
- route-level title/description metadata and scroll restoration
- accessible navigation, focus states, reduced-motion handling, and route error boundaries

Production data submission, authentication, Supabase persistence, private photo storage, Stripe, scheduling persistence, and admin tooling are intentionally deferred from this customer-interface milestone.

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

- `main` — release destination
- `development` — integrated development branch
- `feature/*` — isolated implementation branches

## Verification policy

No feature branch is promoted merely because GitHub accepted its commits. Before release, the application must pass an executable Node quality gate covering dependency resolution, lint, tests, and production build.

The repository's current GitHub Actions runner creates the `quality` job but fails before normal workflow steps are exposed. Until that runner issue is resolved, relevant PRs remain draft and carry the status `IMPLEMENTED — VERIFICATION REQUIRED`.

## Repository visibility

No secrets, production credentials, customer data, Supabase keys, or Stripe keys may be committed. Repository visibility must be rechecked before infrastructure credentials are introduced because current connector metadata reports the repository as public.

See `docs/architecture.md`, `docs/business-rules.md`, `docs/backend-contracts.md`, and `SECURITY.md` before introducing infrastructure changes.
