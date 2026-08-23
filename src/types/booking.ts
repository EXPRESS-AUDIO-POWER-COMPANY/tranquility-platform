export type ServiceType = 'standard' | 'deep' | 'move-in-out'
export type Frequency = 'one-time' | 'weekly' | 'biweekly' | 'monthly'

export interface BookingEstimateInput {
  serviceType: ServiceType
  frequency: Frequency
  squareFootage: number
  bedrooms: number
  fullBathrooms: number
  halfBathrooms: number
  petsPresent: boolean
  addOnIds: string[]
}

export interface PricingAddOn {
  id: string
  name: string
  price: number
  requiresReview?: boolean
}

export interface BookingEstimate {
  subtotal: number
  frequencyDiscount: number
  total: number
  requiresManualQuote: boolean
}
