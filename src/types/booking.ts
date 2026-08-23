export type ServiceType = 'standard' | 'deep' | 'move-in-out'
export type Frequency = 'one-time' | 'weekly' | 'biweekly' | 'monthly'

export interface RoomProfile {
  bedrooms: number
  fullBathrooms: number
  halfBathrooms: number
  livingRooms: number
  diningRooms: number
  kitchens: number
  laundryRooms: number
  otherRooms: number
}

export interface BookingEstimateInput extends RoomProfile {
  serviceType: ServiceType
  frequency: Frequency
  squareFootage: number
  petsPresent: boolean
  addOnIds: string[]
}

export interface PricingAddOn {
  id: string
  name: string
  price: number
  requiresReview?: boolean
}

export interface PricingRules {
  minimumSquareFeet: number
  baseBySquareFootage: readonly {
    max: number
    price: number
  }[]
  manualQuoteAboveSquareFeet: number
  serviceMultipliers: Readonly<Record<ServiceType, number>>
  roomIncrements: Readonly<{
    bedroom: number
    fullBathroom: number
    halfBathroom: number
    livingRoom: number
    diningRoom: number
    kitchen: number
    laundryRoom: number
    otherRoom: number
  }>
  petPresenceIncrement: number
  frequencyDiscounts: Readonly<Record<Frequency, number>>
  addOns: readonly PricingAddOn[]
}

export interface BookingEstimate {
  serviceSubtotal: number
  addOnTotal: number
  subtotal: number
  frequencyDiscount: number
  total: number
  requiresManualQuote: boolean
}
