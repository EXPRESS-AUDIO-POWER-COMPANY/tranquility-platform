import type { Frequency, PricingAddOn, ServiceType } from '@/types/booking'

// Temporary version-controlled seed configuration. This will be moved into
// Supabase-managed pricing tables before production booking is enabled.
export const pricingConfig = {
  baseBySquareFootage: [
    { max: 999, price: 115 },
    { max: 1499, price: 145 },
    { max: 1999, price: 175 },
    { max: 2499, price: 215 },
    { max: 2999, price: 255 },
  ],
  manualQuoteAboveSquareFeet: 2999,
  serviceMultipliers: {
    standard: 1,
    deep: 1.45,
    'move-in-out': 1.6,
  } satisfies Record<ServiceType, number>,
  bedroomIncrement: 12,
  fullBathroomIncrement: 22,
  halfBathroomIncrement: 12,
  petPresenceIncrement: 10,
  frequencyDiscounts: {
    'one-time': 0,
    weekly: 0.15,
    biweekly: 0.1,
    monthly: 0.05,
  } satisfies Record<Frequency, number>,
  addOns: [
    { id: 'laundry', name: 'Laundry — one load', price: 25 },
    { id: 'oven', name: 'Inside oven', price: 30 },
    { id: 'refrigerator', name: 'Inside refrigerator', price: 30 },
    { id: 'dishwasher', name: 'Dishwasher detail', price: 20 },
    { id: 'spot-stain', name: 'Spot / stain treatment', price: 25, requiresReview: true },
    { id: 'spot-carpet', name: 'Spot carpet cleaning', price: 30, requiresReview: true },
    { id: 'hood-vents', name: 'Range hood / vent detail', price: 25 },
    { id: 'excess-pet-hair', name: 'Excess pet hair', price: 20, requiresReview: true },
  ] satisfies PricingAddOn[],
} as const
