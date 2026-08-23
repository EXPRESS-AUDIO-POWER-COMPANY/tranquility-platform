import type { PricingAddOn, PricingRules } from '@/types/booking'

const configuredMinimumSquareFeet = Number(import.meta.env.VITE_MINIMUM_SQUARE_FEET)
const configuredManualQuoteThreshold = Number(import.meta.env.VITE_MANUAL_QUOTE_ABOVE_SQFT)
const livePricingRequested = import.meta.env.VITE_ENABLE_LIVE_PRICING === 'true'

// No unapproved dollar amounts belong in the production customer bundle. The
// public configuration intentionally contains neutral zero-value rules until a
// business-approved pricing authority is connected. Calculator tests inject
// isolated fixture rules and therefore do not rely on these production values.
const pricingAuthorityConfigured = false

const addOns: PricingAddOn[] = [
  { id: 'laundry', name: 'Laundry — one load', price: 0 },
  { id: 'oven', name: 'Inside oven', price: 0 },
  { id: 'refrigerator', name: 'Inside refrigerator', price: 0 },
  { id: 'dishwasher', name: 'Dishwasher detail', price: 0 },
  { id: 'spot-stain', name: 'Spot / stain treatment', price: 0, requiresReview: true },
  { id: 'spot-carpet', name: 'Spot carpet cleaning', price: 0, requiresReview: true },
  { id: 'hood-vents', name: 'Range hood / vent detail', price: 0 },
  { id: 'excess-pet-hair', name: 'Excess pet hair', price: 0, requiresReview: true },
]

const rules = {
  minimumSquareFeet:
    Number.isFinite(configuredMinimumSquareFeet) && configuredMinimumSquareFeet > 0
      ? configuredMinimumSquareFeet
      : 1,
  baseBySquareFootage: [{ max: Number.POSITIVE_INFINITY, price: 0 }],
  manualQuoteAboveSquareFeet:
    Number.isFinite(configuredManualQuoteThreshold) && configuredManualQuoteThreshold > 0
      ? configuredManualQuoteThreshold
      : Number.POSITIVE_INFINITY,
  serviceMultipliers: {
    standard: 1,
    deep: 1,
    'move-in-out': 1,
  },
  roomIncrements: {
    bedroom: 0,
    fullBathroom: 0,
    halfBathroom: 0,
    livingRoom: 0,
    diningRoom: 0,
    kitchen: 0,
    laundryRoom: 0,
    otherRoom: 0,
  },
  petPresenceIncrement: 0,
  frequencyDiscounts: {
    'one-time': 0,
    weekly: 0,
    biweekly: 0,
    monthly: 0,
  },
  addOns,
} satisfies PricingRules

export const pricingConfig = {
  livePricingEnabled: livePricingRequested && pricingAuthorityConfigured,
  ...rules,
} as const
