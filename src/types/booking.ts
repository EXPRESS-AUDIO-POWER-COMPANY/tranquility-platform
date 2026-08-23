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

export interface BookingEstimate {
  serviceSubtotal: number
  addOnTotal: number
  subtotal: number
  frequencyDiscount: number
  total: number
  requiresManualQuote: boolean
}
