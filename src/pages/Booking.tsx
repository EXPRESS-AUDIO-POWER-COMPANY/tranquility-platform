import { BookingEstimator } from '@/components/booking/BookingEstimator'

export function Booking() {
  return (
    <section className="px-5 py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="eyebrow">Residential service request</p>
            <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.98] tracking-editorial sm:text-6xl">Build the cleaning around your home.</h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-black/58 lg:justify-self-end">Move through one clear step at a time. The service profile captures the property, rooms, pets, add-ons, schedule preferences, and access details needed for review.</p>
        </div>
        <div className="mt-10"><BookingEstimator /></div>
      </div>
    </section>
  )
}
