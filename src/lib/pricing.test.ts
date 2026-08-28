import { describe, expect, it } from 'vitest'
import type { BookingEstimateInput, PricingRules } from '@/types/booking'
import { calculateBookingEstimate } from './pricing'

const testRules: PricingRules = {
  minimumSquareFeet: 300,
  baseServicePrices: {
    standard: 100,
    deep: 150,
    'move-in-out': 175,
  },
  manualQuoteAboveSquareFeet: 2999,
  frequencyDiscounts: {
    'one-time': 0,
    weekly: 0.15,
    biweekly: 0.1,
    monthly: 0.05,
  },
  addOns: [
    { id: 'oven', name: 'Synthetic oven add-on', prices: { standard: 25, deep: 30, 'move-in-out': 35 } },
    { id: 'refrigerator', name: 'Synthetic refrigerator add-on', prices: { standard: 25, deep: 30, 'move-in-out': 35 } },
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
    expect(result.serviceSubtotal).toBe(100)
    expect(result.addOnTotal).toBe(25)
    expect(result.subtotal).toBe(125)
    expect(result.frequencyDiscount).toBe(0)
    expect(result.total).toBe(125)
  })

  it('applies recurring discounts to service only', () => {
    const result = calculate({ ...baseInput, serviceType: 'deep', frequency: 'biweekly', squareFootage: 1200, addOnIds: ['refrigerator'] })
    expect(result.serviceSubtotal).toBe(150)
    expect(result.addOnTotal).toBe(30)
    expect(result.frequencyDiscount).toBe(15)
    expect(result.total).toBe(165)
  })

  it('uses the service-specific add-on price', () => {
    const standard = calculate({ ...baseInput, serviceType: 'standard', addOnIds: ['oven'] })
    const deep = calculate({ ...baseInput, serviceType: 'deep', addOnIds: ['oven'] })
    const move = calculate({ ...baseInput, serviceType: 'move-in-out', addOnIds: ['oven'] })
    expect(standard.addOnTotal).toBe(25)
    expect(deep.addOnTotal).toBe(30)
    expect(move.addOnTotal).toBe(35)
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
    expect(result).toEqual({ serviceSubtotal: 0, addOnTotal: 0, subtotal: 0, frequencyDiscount: 0, total: 0, requiresManualQuote: true })
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
