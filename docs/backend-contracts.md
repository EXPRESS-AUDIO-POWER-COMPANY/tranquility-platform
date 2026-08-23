# Backend Boundaries and API Contracts

This document defines the intended privileged execution boundaries before any production Supabase or Stripe integration is enabled.

## Core rule

The public browser must never receive Supabase service-role credentials, Stripe secret keys, webhook secrets, or unrestricted database access. Sensitive writes are performed through validated server/Edge Function boundaries.

## `submit-quote-request`

Purpose: accept an anonymous virtual-consultation request without granting anonymous direct INSERT access to private customer/property/quote tables.

Expected request payload:
- customer: full name, email, phone
- property: street address, unit, city, state, postal code
- requested service
- square footage and optional room profile
- pets/details
- customer notes
- upload manifest metadata, when private uploads are enabled

Server responsibilities:
1. Apply rate limiting / abuse protection.
2. Validate payload shape, lengths, allowed values, and service-area rules.
3. Normalize email/phone/address fields.
4. Create or resolve the customer transactionally.
5. Create the property and quote records.
6. Issue constrained/signed upload instructions for the private quote-media bucket when requested.
7. Write an audit event.
8. Return a public-safe quote reference only.

The response must never include internal customer IDs that enable cross-record access, storage service keys, or privileged database metadata.

## `create-booking-intent`

Purpose: validate a residential booking request and create a server-authoritative reservation draft before payment-method setup.

Server responsibilities:
1. Recalculate pricing from server/database pricing rules; never trust a browser-submitted total.
2. Validate service type, property profile, add-ons, frequency, date/window, and service-area eligibility.
3. Create/update customer and property records transactionally.
4. Create booking with `awaiting_payment_method` status.
5. Create Stripe Customer when needed.
6. Create Stripe SetupIntent for card-on-file collection.
7. Return only the client secret/publishable data required by Stripe.js plus a public-safe booking reference.

The browser-estimated amount is advisory. The server-calculated amount is authoritative.

## `confirm-booking-payment-method`

Purpose: reconcile Stripe SetupIntent completion with booking state.

Preferred design: rely on verified Stripe webhook state rather than trusting a browser callback. A browser endpoint may poll/read a public-safe booking status but must not force privileged state transitions.

## `stripe-webhook`

Purpose: authoritative Stripe event consumer.

Requirements:
- webhook signature verification is mandatory
- raw request body preserved for verification
- idempotency by Stripe event ID
- no JWT requirement on the webhook endpoint because authentication is the Stripe signature
- reject unsupported/invalid events safely
- never log cardholder-sensitive payloads unnecessarily

Relevant events will eventually include SetupIntent and PaymentIntent lifecycle events.

## `complete-job-and-charge`

Purpose: privileged post-service payment initiation.

This operation must require staff/admin authorization and must not be callable anonymously. It should:
- verify booking is eligible for completion/payment
- calculate/confirm final amount
- create or capture the Stripe PaymentIntent according to the approved business policy
- persist provider identifiers/status
- write an audit event

## Storage boundary

Interior quote photos are private household data.

Required controls:
- private bucket only
- restricted MIME types
- size/count limits
- unpredictable object paths scoped to a quote
- signed upload/read access with short expiry
- server-side ownership checks before issuing signed URLs
- lifecycle/retention policy before production launch

Do not expose a public bucket for customer interior photos.

## Authorization roadmap

No broad authenticated policies are approved yet. When staff/admin authentication is introduced, database authorization should use explicit roles and least-privilege RLS. Hiding admin UI controls is not authorization.
