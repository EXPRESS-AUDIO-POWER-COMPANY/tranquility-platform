import { BookingEstimator } from '@/components/booking/BookingEstimator'

export function Booking() {
  return (
    <section className="px-5 py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">Residential booking</p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl tracking-tight">Tell us about your home.</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-black/60">
          Choose the service, size, rooms, pets, and add-ons that fit your space. Homes that fall outside instant-pricing guidelines can move directly to a virtual consultation for a more accurate review.
        </p>
        <div className="mt-10"><BookingEstimator /></div>
      </div>
    </section>
  )
}
