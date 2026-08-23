import { ArrowRight, CheckCircle2, Home as HomeIcon, ShieldCheck, Sparkles } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { siteConfig } from '@/config/site'

const services = [
  ['Residential cleaning', 'Consistent recurring or one-time care for occupied homes.'],
  ['Deep cleaning', 'A more detailed reset for kitchens, bathrooms, surfaces, and overlooked areas.'],
  ['Move-in / move-out', 'Thorough turnover cleaning when a home is changing hands.'],
  ['Commercial cleaning', 'Flexible service planning for offices and professional spaces.'],
]

export function Home() {
  return (
    <>
      <section className="overflow-hidden px-5 pb-20 pt-14 sm:pt-20 lg:px-8 lg:pb-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow">Professional cleaning • Dallas-Fort Worth</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">Come home to tranquility.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/65">{siteConfig.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/booking">Book residential service <ArrowRight className="ml-2 size-4" /></ButtonLink>
              <ButtonLink to="/quote" variant="secondary">Request a virtual quote</ButtonLink>
            </div>
            <div className="mt-10 grid max-w-xl gap-3 text-sm sm:grid-cols-3">
              {['Transparent pricing', 'DFW local', 'Pay after service'].map((item) => (
                <span key={item} className="flex items-center gap-2"><CheckCircle2 className="size-4 text-tranquility-moss" />{item}</span>
              ))}
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-4xl bg-[linear-gradient(145deg,#e3ddd1,#f9f6ef_48%,#aab4a6)] shadow-soft">
            <div className="absolute inset-8 rounded-[1.7rem] border border-white/70 bg-white/25 backdrop-blur-[2px]" />
            <div className="absolute bottom-10 left-10 max-w-xs rounded-3xl bg-white/85 p-6 shadow-soft backdrop-blur">
              <Sparkles className="size-5 text-tranquility-moss" />
              <p className="mt-3 font-serif text-2xl">Quiet luxury, practical care.</p>
              <p className="mt-2 text-sm leading-6 text-black/60">A calmer booking experience built around clear expectations and reliable service.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Services</p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">Professional cleaning without the clutter.</h2>
            <ButtonLink to="/booking" variant="ghost">Explore booking <ArrowRight className="ml-2 size-4" /></ButtonLink>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map(([title, description]) => (
              <article key={title} className="rounded-3xl border border-black/8 bg-tranquility-ivory p-6">
                <HomeIcon className="size-5 text-tranquility-moss" />
                <h3 className="mt-5 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/60">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {[
            { icon: ShieldCheck, title: 'Simple by design', body: 'The customer-facing experience stays calm and informative while operational complexity remains behind the scenes.' },
            { icon: Sparkles, title: 'Flexible pricing', body: 'Residential pricing is designed to evolve without rebuilding the interface or hard-coding business rules into components.' },
            { icon: HomeIcon, title: 'Virtual consultations', body: 'Customers who need a custom quote can submit property details and, once storage is connected, private interior photos for review.' },
          ].map(({ icon: CardIcon, title, body }) => (
            <article key={title} className="rounded-4xl bg-white p-7 shadow-soft">
              <CardIcon className="size-6 text-tranquility-moss" />
              <h3 className="mt-5 font-serif text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-black/60">{body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
