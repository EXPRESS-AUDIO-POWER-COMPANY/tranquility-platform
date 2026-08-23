import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { siteConfig } from '@/config/site'

export function ServiceArea() {
  return (
    <>
      <section className="px-5 pb-14 pt-14 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">Dallas-Fort Worth service area</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl">Professional cleaning across the Metroplex.</h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-black/60 lg:justify-self-end">
            Tranquility serves homes and professional spaces throughout Dallas-Fort Worth. Availability can vary by location, service scope, and schedule, so the booking and quote paths capture the property address before final confirmation.
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.serviceCities.map((city) => (
            <article key={city} className="rounded-[2rem] border border-black/7 bg-white p-6 shadow-soft">
              <span className="grid size-11 place-items-center rounded-full bg-tranquility-ivory text-tranquility-moss">
                <MapPin className="size-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-serif text-2xl">{city}</h2>
              <p className="mt-3 text-sm leading-6 text-black/55">Residential and custom cleaning requests are reviewed based on service availability and property scope.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-tranquility-charcoal px-5 py-20 text-white lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/42">Outside the city list?</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl tracking-tight">Nearby communities can still request service.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">If your city is not listed, send the property details anyway. Tranquility can confirm whether the address falls within the current service range.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {['Residential cleaning', 'Deep cleaning', 'Move-in / move-out', 'Commercial custom quotes'].map((item) => (
              <span key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-sm text-white/78">
                <CheckCircle2 className="size-4 shrink-0 text-tranquility-stone" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2.4rem] bg-white p-8 shadow-soft sm:p-12 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow">Check your address</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl tracking-tight">Start with the service path that fits the property.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/quote" variant="secondary">Request a quote</ButtonLink>
            <ButtonLink to="/booking">Build an estimate <ArrowRight className="ml-2 size-4" /></ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
