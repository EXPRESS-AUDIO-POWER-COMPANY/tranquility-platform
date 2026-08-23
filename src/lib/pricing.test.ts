import { describe, expect, it } from 'vitest'
import type { BookingEstimateInput, PricingRules } from '@/types/booking'
import { calculateBookingEstimate } from './pricing'

// Deliberately synthetic fixture values. These exist only to verify calculator
// behavior and are not Tranquility business pricing.
const testRules: PricingRules = {
  minimumSquareFeet: 300,
  baseBySquareFootage: [
    { max: 999, price: 100 },
    { max: 1499, price: 150 },
    { max: 1999, price: 200 },
    { max: 2499, price: 250 },
    { max: 2999, price: 300 },
  ],
  manualQuoteAboveSquareFeet: 2999,
  serviceMultipliers: {
    standard: 1,
    deep: 1.5,
    'move-in-out': 1.75,
  },
  roomIncrements: {
    bedroom: 10,
    fullBathroom: 20,
    halfBathroom: 10,
    livingRoom: 10,
    diningRoom: 5,
    kitchen: 15,
    laundryRoom: 5,
    otherRoom: 10,
  },
  petPresenceIncrement: 10,
  frequencyDiscounts: {
    'one-time': 0,
    weekly: 0.15,
    biweekly: 0.1,
    monthly: 0.05,
  },
  addOns: [
    { id: 'oven', name: 'Synthetic oven add-on', price: 25 },
    { id: 'refrigerator', name: 'Synthetic refrigerator add-on', price: 25 },
  ],
}

const baseInput = {
  serviceType: 'standard' as const,
  frequency: 'one-time' as const,
  squareFootage: 1500,
  bedrooms: 3,
  fullBathrooms: 2,
  halfBathrooms: 0,
  livingRooms: 1,
  diningRooms: 1,
  kitchens: 1,
  laundryRooms: 1,
  otherRooms: 0,
  petsPresent: false,
  addOnIds: [] as string[],
}

function calculate(input: BookingEstimateInput) {
  return calculateBookingEstimate(input, testRules)
}

describe('calculateBookingEstimate', () => {
  it('calculates a standard one-time residential estimate', () => {
    const result = calculate({ ...baseInput, addOnIds: ['oven'] })

    expect(result.requiresManualQuote).toBe(false)
    expect(result.serviceSubtotal).toBe(305)
    expect(result.addOnTotal).toBe(25)
    expect(result.subtotal).toBe(330)
    expect(result.frequencyDiscount).toBe(0)
    expect(result.total).toBe(330)
  })

  it('applies recurring discounts to service only', () => {
    const result = calculate({
      ...baseInput,
      serviceType: 'deep',
      frequency: 'biweekly',
      squareFootage: 1200,
      bedrooms: 2,
      fullBathrooms: 1,
      halfBathrooms: 1,
      petsPresent: true,
      addOnIds: ['refrigerator'],
    })

    expect(result.serviceSubtotal).toBe(368)
    expect(result.addOnTotal).toBe(25)
    expect(result.frequencyDiscount).toBe(37)
    expect(result.total).toBe(356)
  })

  it('keeps fixed-price add-ons fixed across service multipliers and recurring discounts', () => {
    const withoutAddOn = calculate({
      ...baseInput,
      serviceType: 'move-in-out',
      frequency: 'weekly',
    })
    const withAddOn = calculate({
      ...baseInput,
      serviceType: 'move-in-out',
      frequency: 'weekly',
      addOnIds: ['oven'],
    })

    expect(withAddOn.total - withoutAddOn.total).toBe(25)
  })

  it('does not double-charge duplicate add-on ids', () => {
    const result = calculate({ ...baseInput, addOnIds: ['oven', 'oven'] })
    expect(result.addOnTotal).toBe(25)
  })

  it('keeps the configured maximum instant-pricing size on the estimate path', () => {
    const result = calculate({ ...baseInput, squareFootage: testRules.manualQuoteAboveSquareFeet })
    expect(result.requiresManualQuote).toBe(false)
    expect(result.total).toBeGreaterThan(0)
  })

  it('routes the first square foot above the configured threshold to manual quoting', () => {
    const result = calculate({ ...baseInput, squareFootage: testRules.manualQuoteAboveSquareFeet + 1 })
    expect(result).toEqual({
      serviceSubtotal: 0,
      addOnTotal: 0,
      subtotal: 0,
      frequencyDiscount: 0,
      total: 0,
      requiresManualQuote: true,
    })
  })

  it('rejects invalid square footage instead of pricing malformed input', () => {
    expect(() => calculate({ ...baseInput, squareFootage: 0 })).toThrow(RangeError)
    expect(() => calculate({ ...baseInput, squareFootage: Number.NaN })).toThrow(RangeError)
  })

  it('rejects invalid room counts', () => {
    expect(() => calculate({ ...baseInput, bedrooms: -1 })).toThrow(RangeError)
    expect(() => calculate({ ...baseInput, kitchens: 1.5 })).toThrow(RangeError)
    expect(() => calculate({ ...baseInput, otherRooms: 21 })).toThrow(RangeError)
  })

  it('rejects unknown add-ons instead of silently trusting client input', () => {
    expect(() => calculate({ ...baseInput, addOnIds: ['not-a-real-service'] })).toThrow('Unknown add-on')
  })

  it('rejects malformed runtime service and frequency values', () => {
    const invalidService = { ...baseInput, serviceType: 'invalid' } as unknown as BookingEstimateInput
    const invalidFrequency = { ...baseInput, frequency: 'daily' } as unknown as BookingEstimateInput

    expect(() => calculate(invalidService)).toThrow('Unknown service type')
    expect(() => calculate(invalidFrequency)).toThrow('Unknown frequency')
  })

  it('rejects malformed runtime pet and add-on collection values', () => {
    const invalidPets = { ...baseInput, petsPresent: 'yes' } as unknown as BookingEstimateInput
    const invalidAddOns = { ...baseInput, addOnIds: 'oven' } as unknown as BookingEstimateInput
    const invalidAddOnEntry = { ...baseInput, addOnIds: [undefined] } as unknown as BookingEstimateInput

    expect(() => calculate(invalidPets)).toThrow(TypeError)
    expect(() => calculate(invalidAddOns)).toThrow(TypeError)
    expect(() => calculate(invalidAddOnEntry)).toThrow('Unknown add-on')
  })
})
