import { describe, expect, it } from 'vitest'
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
    const withoutAddOn = calculateBookingEstimate({
      ...baseInput,
      serviceType: 'move-in-out',
      frequency: 'weekly',
    })
    const withAddOn = calculateBookingEstimate({
      ...baseInput,
      serviceType: 'move-in-out',
      frequency: 'weekly',
      addOnIds: ['oven'],
    })

    expect(withAddOn.total - withoutAddOn.total).toBe(30)
  })

  it('does not double-charge duplicate add-on ids', () => {
    const result = calculateBookingEstimate({
      ...baseInput,
      addOnIds: ['oven', 'oven'],
    })

    expect(result.addOnTotal).toBe(30)
  })

  it('routes large homes to manual quoting', () => {
    const result = calculateBookingEstimate({
      ...baseInput,
      squareFootage: 3500,
    })

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
    expect(() =>
      calculateBookingEstimate({ ...baseInput, squareFootage: 0 }),
    ).toThrow(RangeError)
  })

  it('rejects unknown add-ons instead of silently trusting client input', () => {
    expect(() =>
      calculateBookingEstimate({ ...baseInput, addOnIds: ['not-a-real-service'] }),
    ).toThrow('Unknown add-on')
  })
})
