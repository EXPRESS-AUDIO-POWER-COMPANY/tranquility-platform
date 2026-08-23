import { BookingEstimator } from '@/components/booking/BookingEstimator'

export function Booking() {
  return (
    <section className="px-5 py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="eyebrow">Residential booking</p>
            <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl">Build the cleaning around your home.</h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-black/58 lg:justify-self-end">Move through one simple step at a time. Your planning estimate updates as the service, rooms, pets, and add-ons change.</p>
        </div>
        <div className="mt-10"><BookingEstimator /></div>
      </div>
    </section>
  )
}
