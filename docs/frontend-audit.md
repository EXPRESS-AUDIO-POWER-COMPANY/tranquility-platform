# Tranquility Frontend Audit

Date: 2026-08-23
Active branch: `main`

## Objective

Audit the customer-facing WebApp against the current Tranquility product requirements while keeping Supabase, authentication, persistent uploads, and payments intentionally deferred.

## Implemented during audit

### Information architecture
- Home
- Services
- Service Area
- Residential Estimate / Booking Profile
- Virtual Quote
- About
- FAQ
- Careers
- Contact
- Privacy
- Terms
- 404 and route-error handling

### Residential booking experience
- residential-only service selection
- service type and frequency
- square-footage pricing input
- property-condition context
- bedrooms
- full bathrooms
- half bathrooms
- living rooms
- dining rooms
- kitchens
- laundry rooms
- other rooms with required detail when selected
- pet disclosure and required pet detail when applicable
- add-ons
- priority/service notes
- customer name, email, phone
- street address, city, ZIP
- preferred date with past-date prevention
- preferred arrival window
- access/arrival notes
- client-side contact validation
- custom-quote routing above the residential instant-estimate threshold
- final request review and direct contact actions

### Virtual quote experience
- residential, commercial, and specialty quote paths
- property and service details
- condition and timing
- preferred contact method
- detailed scope notes
- optional property image selection
- max file count
- per-file size validation
- aggregate file-size validation
- image-type validation
- duplicate-file suppression
- preview/removal UX
- privacy guidance for interior images
- final quote review and direct contact actions

### Customer clarity
- residential vs deep vs move-in/out comparison
- commercial custom-quote distinction
- add-on guidance
- expanded FAQ
- service-area city coverage
- direct phone/email contact
- careers contact path
- legal/privacy pages

### Navigation and responsive behavior
- desktop navigation
- responsive menu before desktop navigation can overflow
- route-change menu close
- Escape-key menu close
- persistent mobile quote/book actions
- skip-to-content link
- reduced-motion support
- focus-visible styles
- horizontal-overflow protection

### SEO and hosting readiness
- route-specific title/description metadata
- canonical URLs
- Open Graph metadata
- Twitter metadata
- noindex behavior for unknown routes
- JSON-LD CleaningService data
- robots.txt
- sitemap.xml
- web manifest
- favicon
- SPA redirect fallback
- safe static-hosting response headers

## Intentionally deferred by product decision

The following are not missing accidentally; they are explicitly deferred until the owner resumes infrastructure work:

- dedicated Supabase project provisioning
- migration execution against a live Tranquility database
- authentication / authorization
- customer/admin portals
- persistent contact submissions
- persistent booking records
- private property-photo upload/storage
- Stripe SetupIntent / payment method collection
- Stripe PaymentIntent / payment capture
- webhooks
- production scheduling/availability engine
- admin-editable pricing UI
- virtual assistant/chat

## Outstanding verification blocker

The repository has unit tests and a CI quality workflow, but no successful executable Node quality-gate result has been observed through the available tool environment. Before production release:

1. install dependencies in Node 22
2. generate and commit `package-lock.json`
3. pass lint
4. pass tests
5. pass production build
6. switch CI from `npm install` to `npm ci`
7. rerun CI successfully

## Security boundary

The GitHub repository currently reports as public. No private credentials, production customer records, payment data, or private quote images may be committed. Infrastructure credentials must remain in deployment secrets/environment configuration when those systems are introduced.

## Current status

`IMPLEMENTED — VERIFICATION REQUIRED`
