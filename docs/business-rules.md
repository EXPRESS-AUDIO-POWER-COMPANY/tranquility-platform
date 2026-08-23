# Tranquility Business Rules — Working Specification

## Customer experience

- Public experience should remain calm, neutral, informative, and uncluttered.
- No animated characters.
- Avoid visible people unless imagery is faceless or detail-oriented.
- Residential service may expose live pricing only after business approval and technical activation.
- Commercial service remains manual/custom quote unless explicitly approved otherwise.
- Customers may choose virtual consultation when property condition or scope needs a closer review.
- The customer interface must never expose placeholder pricing, fake confirmations, or claims that persistence occurred when supporting infrastructure is not active.

## Residential pricing authority

There is currently **no approved production pricing authority connected to the public application**.

The production configuration therefore contains no placeholder business dollar amounts. `VITE_ENABLE_LIVE_PRICING=true` alone is not sufficient to expose pricing; the production rules must also be intentionally configured and approved in code/infrastructure.

Calculator unit tests use synthetic fixture rules that exist only to verify calculation behavior. Test fixture values are not Tranquility business pricing.

Future production pricing should become centrally managed and support:
- square-footage tiers
- bedrooms
- full and half bathrooms
- living rooms
- dining rooms
- kitchens
- laundry rooms
- other spaces
- service-level modifiers
- recurring-service discounts
- add-ons
- condition/manual-review adjustments
- effective dates and active/inactive rules
- auditable versioning

Pricing calculation policy once live pricing is approved:
- service multipliers apply to the core cleaning service only
- recurring-service discounts apply to the core cleaning service only
- published fixed-price add-ons remain fixed and are not multiplied or discounted
- duplicate add-on identifiers must not create duplicate charges
- unknown add-on identifiers and malformed property inputs must be rejected rather than silently priced
- any automatic large-property custom-quote threshold must be explicitly configured as a business rule rather than assumed

## Pets

Pets may remain present when they do not prevent safe service completion. Customers should disclose animal type/count and relevant behavior or access concerns. Excess pet hair may be handled as a separate add-on or review item when applicable.

## Booking data

The production booking workflow must collect and validate at minimum:
- customer name
- phone
- email
- physical service address
- property profile and room selections
- pet details when applicable
- requested service and frequency
- requested appointment date/window
- selected add-ons
- access/arrival notes when applicable
- payment method authorization through Stripe once payments are activated

No customer-facing state may falsely claim a booking, payment method, quote, upload, or customer record was persisted.

Until persistence is connected, the public residential flow may prepare a structured customer request for direct contact without pretending that an online booking has been created.

## Quote media

Interior property images are potentially sensitive. Production implementation must use a private storage bucket, validated upload types/sizes, authorization-controlled or signed access, and an explicit retention policy.

The current frontend validates and previews selected images locally but does not persist them.

## Payments

Target workflow: a payment method may be required to reserve service, but raw payment-card data must never enter application storage. Use Stripe-hosted or Stripe Elements collection and verified server-side webhooks.

Final charge timing, cancellation, rescheduling, refund, remediation, and no-access policies must be approved by the business before Stripe production enablement. No policy should be invented in code.
