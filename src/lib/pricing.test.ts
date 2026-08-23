import { describe, expect, it } from 'vitest'
import { pricingConfig } from '@/config/pricing'
import type { BookingEstimateInput } from '@/types/booking'
import { calculateBookingEstimate } from './pricing'

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

describe('calculateBookingEstimate', () => {
  it('calculates a standard one-time residential estimate', () => {
    const result = calculateBookingEstimate({ ...baseInput, addOnIds: ['oven'] })
    expect(result.requiresManualQuote).toBe(false)
    expect(result.serviceSubtotal).toBe(287)
    expect(result.addOnTotal).toBe(30)
    expect(result.subtotal).toBe(317)
    expect(result.frequencyDiscount).toBe(0)
    expect(result.total).toBe(317)
  })

  it('applies recurring discounts to service only', () => {
    const result = calculateBookingEstimate({
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
    expect(result.serviceSubtotal).toBe(355)
    expect(result.addOnTotal).toBe(30)
    expect(result.frequencyDiscount).toBe(36)
    expect(result.total).toBe(349)
  })

  it('keeps fixed-price add-ons fixed across service multipliers and recurring discounts', () => {
    const withoutAddOn = calculateBookingEstimate({ ...baseInput, serviceType: 'move-in-out', frequency: 'weekly' })
    const withAddOn = calculateBookingEstimate({ ...baseInput, serviceType: 'move-in-out', frequency: 'weekly', addOnIds: ['oven'] })
    expect(withAddOn.total - withoutAddOn.total).toBe(30)
  })

  it('does not double-charge duplicate add-on ids', () => {
    const result = calculateBookingEstimate({ ...baseInput, addOnIds: ['oven', 'oven'] })
    expect(result.addOnTotal).toBe(30)
  })

  it('keeps the configured maximum instant-pricing size on the estimate path', () => {
    const result = calculateBookingEstimate({ ...baseInput, squareFootage: pricingConfig.manualQuoteAboveSquareFeet })
    expect(result.requiresManualQuote).toBe(false)
    expect(result.total).toBeGreaterThan(0)
  })

  it('routes the first square foot above the configured threshold to manual quoting', () => {
    const result = calculateBookingEstimate({ ...baseInput, squareFootage: pricingConfig.manualQuoteAboveSquareFeet + 1 })
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
    expect(() => calculateBookingEstimate({ ...baseInput, squareFootage: 0 })).toThrow(RangeError)
    expect(() => calculateBookingEstimate({ ...baseInput, squareFootage: Number.NaN })).toThrow(RangeError)
  })

  it('rejects invalid room counts', () => {
    expect(() => calculateBookingEstimate({ ...baseInput, bedrooms: -1 })).toThrow(RangeError)
    expect(() => calculateBookingEstimate({ ...baseInput, kitchens: 1.5 })).toThrow(RangeError)
    expect(() => calculateBookingEstimate({ ...baseInput, otherRooms: 21 })).toThrow(RangeError)
  })

  it('rejects unknown add-ons instead of silently trusting client input', () => {
    expect(() => calculateBookingEstimate({ ...baseInput, addOnIds: ['not-a-real-service'] })).toThrow('Unknown add-on')
  })

  it('rejects malformed runtime service and frequency values', () => {
    const invalidService = { ...baseInput, serviceType: 'invalid' } as unknown as BookingEstimateInput
    const invalidFrequency = { ...baseInput, frequency: 'daily' } as unknown as BookingEstimateInput
    expect(() => calculateBookingEstimate(invalidService)).toThrow('Unknown service type')
    expect(() => calculateBookingEstimate(invalidFrequency)).toThrow('Unknown frequency')
  })

  it('rejects malformed runtime pet and add-on collection values', () => {
    const invalidPets = { ...baseInput, petsPresent: 'yes' } as unknown as BookingEstimateInput
    const invalidAddOns = { ...baseInput, addOnIds: 'oven' } as unknown as BookingEstimateInput
    const invalidAddOnEntry = { ...baseInput, addOnIds: [undefined] } as unknown as BookingEstimateInput
    expect(() => calculateBookingEstimate(invalidPets)).toThrow(TypeError)
    expect(() => calculateBookingEstimate(invalidAddOns)).toThrow(TypeError)
    expect(() => calculateBookingEstimate(invalidAddOnEntry)).toThrow('Unknown add-on')
  })
})
