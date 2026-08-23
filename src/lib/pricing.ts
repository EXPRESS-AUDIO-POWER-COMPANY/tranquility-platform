import { pricingConfig } from '@/config/pricing'
import type { BookingEstimate, BookingEstimateInput, PricingRules } from '@/types/booking'

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

function assertValidInput(input: BookingEstimateInput, rules: PricingRules) {
  if (!Number.isFinite(input.squareFootage) || input.squareFootage < rules.minimumSquareFeet) {
    throw new RangeError(`Square footage must be at least ${rules.minimumSquareFeet}.`)
  }

  if (!hasOwn(rules.serviceMultipliers, input.serviceType)) {
    throw new Error(`Unknown service type: ${String(input.serviceType)}`)
  }

  if (!hasOwn(rules.frequencyDiscounts, input.frequency)) {
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

  const knownAddOns = new Set<string>(rules.addOns.map(({ id }) => id))
  const invalidAddOnIndex = input.addOnIds.findIndex(
    (id) => typeof id !== 'string' || !knownAddOns.has(id),
  )
  if (invalidAddOnIndex >= 0) {
    throw new Error(`Unknown add-on: ${String(input.addOnIds[invalidAddOnIndex])}`)
  }
}

function getBasePrice(squareFootage: number, rules: PricingRules) {
  const tier = rules.baseBySquareFootage.find(({ max }) => squareFootage <= max)
  return tier?.price ?? 0
}

export function calculateBookingEstimate(
  input: BookingEstimateInput,
  rules: PricingRules = pricingConfig,
): BookingEstimate {
  assertValidInput(input, rules)

  if (input.squareFootage > rules.manualQuoteAboveSquareFeet) {
    return {
      serviceSubtotal: 0,
      addOnTotal: 0,
      subtotal: 0,
      frequencyDiscount: 0,
      total: 0,
      requiresManualQuote: true,
    }
  }

  const base = getBasePrice(input.squareFootage, rules)
  const roomAdjustments =
    input.bedrooms * rules.roomIncrements.bedroom +
    input.fullBathrooms * rules.roomIncrements.fullBathroom +
    input.halfBathrooms * rules.roomIncrements.halfBathroom +
    input.livingRooms * rules.roomIncrements.livingRoom +
    input.diningRooms * rules.roomIncrements.diningRoom +
    input.kitchens * rules.roomIncrements.kitchen +
    input.laundryRooms * rules.roomIncrements.laundryRoom +
    input.otherRooms * rules.roomIncrements.otherRoom +
    (input.petsPresent ? rules.petPresenceIncrement : 0)

  const uniqueAddOnIds = new Set(input.addOnIds)
  const addOnTotal = rules.addOns
    .filter(({ id }) => uniqueAddOnIds.has(id))
    .reduce((sum, addOn) => sum + addOn.price, 0)

  const serviceSubtotal = Math.round(
    (base + roomAdjustments) * rules.serviceMultipliers[input.serviceType],
  )
  const frequencyDiscount = Math.round(
    serviceSubtotal * rules.frequencyDiscounts[input.frequency],
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
