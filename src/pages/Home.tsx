import { ArrowRight, CheckCircle2, Home as HomeIcon, ShieldCheck, Sparkles } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { siteConfig } from '@/config/site'

const services = [
  ['Residential cleaning', 'Reliable recurring or one-time care tailored to the way your home is used.'],
  ['Deep cleaning', 'A detailed reset for kitchens, bathrooms, surfaces, fixtures, and overlooked areas.'],
  ['Move-in / move-out', 'Thorough turnover cleaning to help a home feel ready for what comes next.'],
  ['Commercial cleaning', 'Flexible service planning for offices and professional spaces across DFW.'],
]

const steps = [
  ['Tell us about your space', 'Choose your service, home size, rooms, pets, and any add-ons you need.'],
  ['Choose your preferred timing', 'Share the date and arrival window that works best for your household.'],
  ['Enjoy your tranquility', 'We confirm the details, complete the service, and handle payment securely.'],
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
              {['Clear base pricing', 'DFW local', 'Secure payment'].map((item) => (
                <span key={item} className="flex items-center gap-2"><CheckCircle2 className="size-4 text-tranquility-moss" />{item}</span>
              ))}
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-4xl bg-[linear-gradient(145deg,#e3ddd1,#f9f6ef_48%,#aab4a6)] shadow-soft" aria-label="Warm neutral interior-inspired Tranquility brand composition">
            <div className="absolute inset-8 rounded-[1.7rem] border border-white/70 bg-white/25 backdrop-blur-[2px]" />
            <div className="absolute bottom-10 left-10 max-w-xs rounded-3xl bg-white/85 p-6 shadow-soft backdrop-blur">
              <Sparkles className="size-5 text-tranquility-moss" />
              <p className="mt-3 font-serif text-2xl">A cleaner home. A calmer day.</p>
              <p className="mt-2 text-sm leading-6 text-black/60">Simple booking, clear expectations, and thoughtful care for the spaces you live in.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Services</p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">Professional cleaning without the clutter.</h2>
            <ButtonLink to="/booking" variant="ghost">See residential pricing <ArrowRight className="ml-2 size-4" /></ButtonLink>
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
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-5 max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">From busy home to breathing room.</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {steps.map(([title, body], index) => (
              <article key={title} className="rounded-4xl bg-white p-7 shadow-soft">
                <span className="text-xs font-bold tracking-[0.18em] text-tranquility-moss">0{index + 1}</span>
                <h3 className="mt-5 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/60">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-tranquility-stone/25 px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {[
            { icon: ShieldCheck, title: 'Clear expectations', body: 'Know what you are selecting, what your estimate includes, and when additional review may be needed.' },
            { icon: Sparkles, title: 'Flexible service', body: 'Choose one-time or recurring care, then personalize the visit with the add-ons your home needs.' },
            { icon: HomeIcon, title: 'Virtual consultations', body: 'Prefer a custom quote? Share property details and interior photos so the scope can be reviewed before service.' },
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
