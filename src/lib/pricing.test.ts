import { describe, expect, it } from 'vitest'
import { calculateBookingEstimate } from './pricing'

describe('calculateBookingEstimate', () => {
  it('calculates a standard one-time residential estimate', () => {
    const result = calculateBookingEstimate({
      serviceType: 'standard',
      frequency: 'one-time',
      squareFootage: 1500,
      bedrooms: 3,
      fullBathrooms: 2,
      halfBathrooms: 0,
      petsPresent: false,
      addOnIds: ['oven'],
    })

    expect(result.requiresManualQuote).toBe(false)
    expect(result.subtotal).toBe(285)
    expect(result.frequencyDiscount).toBe(0)
    expect(result.total).toBe(285)
  })

  it('applies recurring discounts after service and add-on modifiers', () => {
    const result = calculateBookingEstimate({
      serviceType: 'deep',
      frequency: 'biweekly',
      squareFootage: 1200,
      bedrooms: 2,
      fullBathrooms: 1,
      halfBathrooms: 1,
      petsPresent: true,
      addOnIds: ['refrigerator'],
    })

    expect(result.requiresManualQuote).toBe(false)
    expect(result.frequencyDiscount).toBeGreaterThan(0)
    expect(result.total).toBeLessThan(result.subtotal)
  })

  it('routes large homes to manual quoting', () => {
    const result = calculateBookingEstimate({
      serviceType: 'standard',
      frequency: 'one-time',
      squareFootage: 3500,
      bedrooms: 4,
      fullBathrooms: 3,
      halfBathrooms: 1,
      petsPresent: false,
      addOnIds: [],
    })

    expect(result).toEqual({
      subtotal: 0,
      frequencyDiscount: 0,
      total: 0,
      requiresManualQuote: true,
    })
  })
})
