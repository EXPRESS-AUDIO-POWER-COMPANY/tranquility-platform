import { pricingConfig } from '@/config/pricing'
import type { BookingEstimate, BookingEstimateInput } from '@/types/booking'

function getBasePrice(squareFootage: number) {
  const tier = pricingConfig.baseBySquareFootage.find(({ max }) => squareFootage <= max)
  return tier?.price ?? 0
}

export function calculateBookingEstimate(input: BookingEstimateInput): BookingEstimate {
  const requiresManualQuote = input.squareFootage > pricingConfig.manualQuoteAboveSquareFeet

  if (requiresManualQuote) {
    return {
      subtotal: 0,
      frequencyDiscount: 0,
      total: 0,
      requiresManualQuote: true,
    }
  }

  const base = getBasePrice(input.squareFootage)
  const roomAdjustments =
    input.bedrooms * pricingConfig.bedroomIncrement +
    input.fullBathrooms * pricingConfig.fullBathroomIncrement +
    input.halfBathrooms * pricingConfig.halfBathroomIncrement +
    (input.petsPresent ? pricingConfig.petPresenceIncrement : 0)

  const addOns = pricingConfig.addOns
    .filter(({ id }) => input.addOnIds.includes(id))
    .reduce((sum, addOn) => sum + addOn.price, 0)

  const subtotal = Math.round(
    (base + roomAdjustments + addOns) * pricingConfig.serviceMultipliers[input.serviceType],
  )
  const frequencyDiscount = Math.round(
    subtotal * pricingConfig.frequencyDiscounts[input.frequency],
  )

  return {
    subtotal,
    frequencyDiscount,
    total: Math.max(0, subtotal - frequencyDiscount),
    requiresManualQuote: false,
  }
}
