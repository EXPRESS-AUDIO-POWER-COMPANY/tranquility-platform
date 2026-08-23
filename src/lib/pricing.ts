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

function hasOwn(object: object, key: PropertyKey) {
  return Object.prototype.hasOwnProperty.call(object, key)
}

function assertValidInput(input: BookingEstimateInput) {
  if (!Number.isFinite(input.squareFootage) || input.squareFootage < pricingConfig.minimumSquareFeet) {
    throw new RangeError(`Square footage must be at least ${pricingConfig.minimumSquareFeet}.`)
  }

  if (!hasOwn(pricingConfig.serviceMultipliers, input.serviceType)) {
    throw new Error(`Unknown service type: ${String(input.serviceType)}`)
  }

  if (!hasOwn(pricingConfig.frequencyDiscounts, input.frequency)) {
    throw new Error(`Unknown frequency: ${String(input.frequency)}`)
  }

  if (typeof input.petsPresent !== 'boolean') {
    throw new TypeError('petsPresent must be a boolean.')
  }

  for (const field of countFields) {
    const value = input[field]
    if (!Number.isInteger(value) || value < 0 || value > 20) {
      throw new RangeError(`${field} must be a whole number between 0 and 20.`)
    }
  }

  if (!Array.isArray(input.addOnIds)) {
    throw new TypeError('addOnIds must be an array.')
  }

  const knownAddOns = new Set<string>(pricingConfig.addOns.map(({ id }) => id))
  const invalidAddOnIndex = input.addOnIds.findIndex((id) => typeof id !== 'string' || !knownAddOns.has(id))
  if (invalidAddOnIndex >= 0) {
    throw new Error(`Unknown add-on: ${String(input.addOnIds[invalidAddOnIndex])}`)
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
