# Tranquility Platform

GitHub-first production WebApp for Tranquility Cleaning.

## Engineering principles

- GitHub is the canonical source of truth.
- `main` is the active implementation branch and the branch used for day-to-day development.
- New feature branches will not be created unless the repository owner explicitly requests one.
- The project must remain portable to VS Code and independent hosting.
- Lovable may be used as a secondary visual/deployment environment without becoming a lock-in dependency.
- Supabase and payment infrastructure are intentionally deferred until the customer-facing WebApp is ready for that phase.
- No secrets, customer data, Supabase service credentials, or payment secrets may be committed to source control.

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

## Development workflow

The working model is intentionally simple:

```text
main
  ↓
commit implementation
  ↓
verify
  ↓
continue building
```

Existing historical branches may remain visible in GitHub, but they are not part of the active workflow. Future engineering changes should be committed directly to `main` unless the owner explicitly asks for isolation through a branch.

## Verification policy

GitHub accepting a commit is not the same as a successful production build. The repository's current GitHub Actions runner creates the `quality` job but has been failing before normal workflow steps are exposed. Until that runner issue is resolved, code-level verification must be reported separately from commit success.

## Repository visibility

No secrets, production credentials, customer data, Supabase keys, or Stripe keys may be committed. Repository visibility must be rechecked before infrastructure credentials are introduced because current connector metadata reports the repository as public.

See `docs/architecture.md`, `docs/business-rules.md`, `docs/backend-contracts.md`, and `SECURITY.md` before introducing infrastructure changes.
