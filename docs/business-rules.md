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
- bedroom adjustments
- full-bath and half-bath adjustments
- service-level modifiers
- recurring-service discounts
- add-ons
- condition/manual-review adjustments
- effective dates and active/inactive rules

## Pets

Pets may remain present when they do not prevent safe service completion. Customers should disclose animal type/count and relevant behavior or access concerns.

## Quote media

Interior property images are potentially sensitive. Production implementation must use a private storage bucket, validated upload types/sizes, authenticated or signed access, and a retention policy.

## Payments

Target workflow: payment method required to reserve service, but no charge at booking. Final policy must be approved before Stripe production enablement.
