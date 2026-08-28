import type { PricingAddOn, PricingRules, ServiceType } from '@/types/booking'

const configuredMinimumSquareFeet = Number(import.meta.env.VITE_MINIMUM_SQUARE_FEET)
const configuredManualQuoteThreshold = Number(import.meta.env.VITE_MANUAL_QUOTE_ABOVE_SQFT)
const livePricingRequested = import.meta.env.VITE_ENABLE_LIVE_PRICING !== 'false'

// Business-approved pricing supplied by Treva. The base service prices are for
// an average/standard 1 bed / 1 bath home. Square footage and scope are used
// for review routing rather than incremental base-price calculation.
const baseServicePrices: Readonly<Record<ServiceType, number>> = {
  standard: 145,
  deep: 215,
  'move-in-out': 235,
}

const addOns: PricingAddOn[] = [
  {
    id: 'bedroom',
    name: 'Additional bedroom',
    prices: { standard: 15, deep: 27, 'move-in-out': 37 },
  },
  {
    id: 'laundry-wash-dry-fold',
    name: 'Laundry — wash, dry & fold (per load)',
    prices: { standard: 20, deep: 20, 'move-in-out': 20 },
  },
  {
    id: 'laundry-fold-only',
    name: 'Laundry — fold only (per load)',
    prices: { standard: 13, deep: 13, 'move-in-out': 13 },
  },
  {
    id: 'laundry-room',
    name: 'Laundry / utility room',
    prices: { standard: 10, deep: 17, 'move-in-out': 22 },
  },
  {
    id: 'bathroom',
    name: 'Additional full bathroom — starting at',
    prices: { standard: 17, deep: 29, 'move-in-out': 39 },
    requiresReview: true,
  },
  {
    id: 'half-bathroom',
    name: 'Additional half bathroom',
    prices: { standard: 13, deep: 25, 'move-in-out': 37 },
  },
  {
    id: 'living-room',
    name: 'Additional living room',
    prices: { standard: 15, deep: 15, 'move-in-out': 15 },
  },
  {
    id: 'dining-room',
    name: 'Additional dining room',
    prices: { standard: 15, deep: 15, 'move-in-out': 15 },
  },
  {
    id: 'office',
    name: 'Office',
    prices: { standard: 12, deep: 12, 'move-in-out': 12 },
  },
  {
    id: 'excess-dishes',
    name: 'Excess dishes',
    prices: { standard: 25, deep: 25, 'move-in-out': 25 },
  },
  {
    id: 'oven',
    name: 'Inside oven',
    prices: { standard: 40, deep: 40, 'move-in-out': 40 },
  },
  {
    id: 'refrigerator',
    name: 'Inside refrigerator',
    prices: { standard: 25, deep: 25, 'move-in-out': 25 },
  },
  {
    id: 'hood-vents',
    name: 'Above-stove hood / vents — starting at',
    prices: { standard: 45, deep: 45, 'move-in-out': 45 },
    requiresReview: true,
  },
  {
    id: 'cabinet-interior',
    name: 'Cabinet interior',
    prices: { standard: 35, deep: 35, 'move-in-out': 35 },
  },
  {
    id: 'excess-pet-hair',
    name: 'Excess pet hair vacuuming',
    prices: { standard: 15, deep: 15, 'move-in-out': 15 },
  },
  {
    id: 'baseboards',
    name: 'Baseboards — starting at',
    prices: { standard: 25, deep: 25, 'move-in-out': 25 },
    requiresReview: true,
  },
  {
    id: 'garage-patio',
    name: 'Garage / patio',
    prices: { standard: 35, deep: 35, 'move-in-out': 35 },
  },
  {
    id: 'carpet-spot',
    name: 'Carpet spot cleaning — starting at',
    prices: { standard: 35, deep: 35, 'move-in-out': 35 },
    requiresReview: true,
  },
]

const rules: PricingRules = {
  minimumSquareFeet:
    Number.isFinite(configuredMinimumSquareFeet) && configuredMinimumSquareFeet > 0
      ? configuredMinimumSquareFeet
      : 1,
  baseServicePrices,
  manualQuoteAboveSquareFeet:
    Number.isFinite(configuredManualQuoteThreshold) && configuredManualQuoteThreshold > 0
      ? configuredManualQuoteThreshold
      : Number.POSITIVE_INFINITY,
  frequencyDiscounts: {
    'one-time': 0,
    weekly: 0.2,
    biweekly: 0.15,
    monthly: 0.1,
  },
  addOns,
}

export const pricingConfig = {
  livePricingEnabled: livePricingRequested,
  ...rules,
} as const

export function getAddOnPrice(addOn: PricingAddOn, serviceType: ServiceType) {
  return addOn.prices[serviceType]
}
