import { pricingConfig } from '@/config/pricing'
import type { BookingEstimate, BookingEstimateInput } from '@/types/booking'

const countFields = [
  'bedrooms',
  'fullBathrooms',
  'halfBathrooms',
  'livingRooms',
  'diningRooms',
  'kitchens',
  'laundryRooms',
  'otherRooms',
] as const satisfies readonly (keyof BookingEstimateInput)[]

function assertValidInput(input: BookingEstimateInput) {
  if (!Number.isFinite(input.squareFootage) || input.squareFootage < pricingConfig.minimumSquareFeet) {
    throw new RangeError(`Square footage must be at least ${pricingConfig.minimumSquareFeet}.`)
  }

  for (const field of countFields) {
    const value = input[field]
    if (!Number.isInteger(value) || value < 0 || value > 20) {
      throw new RangeError(`${field} must be a whole number between 0 and 20.`)
    }
  }

  const knownAddOns = new Set(pricingConfig.addOns.map(({ id }) => id))
  const unknownAddOn = input.addOnIds.find((id) => !knownAddOns.has(id))
  if (unknownAddOn) {
    throw new Error(`Unknown add-on: ${unknownAddOn}`)
  }
}

function getBasePrice(squareFootage: number) {
  const tier = pricingConfig.baseBySquareFootage.find(({ max }) => squareFootage <= max)
  return tier?.price ?? 0
}

export function calculateBookingEstimate(input: BookingEstimateInput): BookingEstimate {
  assertValidInput(input)

  if (input.squareFootage > pricingConfig.manualQuoteAboveSquareFeet) {
    return {
      serviceSubtotal: 0,
      addOnTotal: 0,
      subtotal: 0,
      frequencyDiscount: 0,
      total: 0,
      requiresManualQuote: true,
    }
  }

  const base = getBasePrice(input.squareFootage)
  const roomAdjustments =
    input.bedrooms * pricingConfig.roomIncrements.bedroom +
    input.fullBathrooms * pricingConfig.roomIncrements.fullBathroom +
    input.halfBathrooms * pricingConfig.roomIncrements.halfBathroom +
    input.livingRooms * pricingConfig.roomIncrements.livingRoom +
    input.diningRooms * pricingConfig.roomIncrements.diningRoom +
    input.kitchens * pricingConfig.roomIncrements.kitchen +
    input.laundryRooms * pricingConfig.roomIncrements.laundryRoom +
    input.otherRooms * pricingConfig.roomIncrements.otherRoom +
    (input.petsPresent ? pricingConfig.petPresenceIncrement : 0)

  const uniqueAddOnIds = new Set(input.addOnIds)
  const addOnTotal = pricingConfig.addOns
    .filter(({ id }) => uniqueAddOnIds.has(id))
    .reduce((sum, addOn) => sum + addOn.price, 0)

  // Service multipliers and recurring discounts apply only to the core cleaning
  // service. Fixed-price add-ons remain fixed so a deep-clean multiplier or
  // recurring discount cannot silently distort their published price.
  const serviceSubtotal = Math.round(
    (base + roomAdjustments) * pricingConfig.serviceMultipliers[input.serviceType],
  )
  const frequencyDiscount = Math.round(
    serviceSubtotal * pricingConfig.frequencyDiscounts[input.frequency],
  )
  const discountedService = Math.max(0, serviceSubtotal - frequencyDiscount)
  const subtotal = serviceSubtotal + addOnTotal

  return {
    serviceSubtotal,
    addOnTotal,
    subtotal,
    frequencyDiscount,
    total: discountedService + addOnTotal,
    requiresManualQuote: false,
  }
}
