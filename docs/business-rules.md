# Tranquility Business Rules — Working Specification

## Customer experience

- Public experience should remain calm, neutral, informative, and uncluttered.
- No animated characters.
- Avoid visible people unless imagery is faceless or detail-oriented.
- Residential service may use instant/base pricing.
- Commercial service should remain manual/custom quote unless explicitly approved otherwise.
- Customers may choose virtual consultation for more accurate pricing.

## Residential pricing

The local pricing configuration is a temporary engineering seed for frontend development. It is not production pricing authority.

Production pricing must become admin-configurable and support:
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

Pricing calculation policy for the seed engine:
- the service multiplier applies to the core cleaning service only
- recurring-service discounts apply to the core cleaning service only
- published fixed-price add-ons remain fixed and are not multiplied or discounted
- duplicate add-on identifiers must not create duplicate charges
- unknown add-on identifiers and malformed property inputs must be rejected rather than silently priced
- homes above the configured instant-pricing threshold route to custom quote review

## Pets

Pets may remain present when they do not prevent safe service completion. Customers should disclose animal type/count and relevant behavior or access concerns. Excess pet hair may be priced as a separate add-on when applicable.

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
- payment method authorization through Stripe

No frontend-only milestone may falsely claim a booking, payment method, or customer record was persisted.

## Quote media

Interior property images are potentially sensitive. Production implementation must use a private storage bucket, validated upload types/sizes, authenticated or signed access, and a retention policy.

## Payments

Target workflow: payment method required to reserve service, but no charge at booking. Raw card data must never enter application storage. Final capture, cancellation, rescheduling, and remediation policy must be approved before Stripe production enablement.
