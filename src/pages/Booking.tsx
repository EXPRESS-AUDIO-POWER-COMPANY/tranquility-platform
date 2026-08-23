import { BookingEstimator } from '@/components/booking/BookingEstimator'

export function Booking() {
  return (
    <section className="px-5 py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">Residential booking</p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl tracking-tight">Build your cleaning estimate.</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-black/60">Select the details of your home and desired service. This first engineering milestone uses a typed local pricing seed; production booking will move pricing, customer records, scheduling, and payment-method handling into secured backend infrastructure.</p>
        <div className="mt-10"><BookingEstimator /></div>
      </div>
    </section>
  )
}
