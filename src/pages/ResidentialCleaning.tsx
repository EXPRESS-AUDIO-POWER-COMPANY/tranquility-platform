import { ArrowRight, CheckCircle2, Clock3, Home, KeyRound, ShieldCheck, Sparkles } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'

const serviceModes = [
  {
    title: 'Standard Cleaning',
    label: 'Routine maintenance',
    body: 'A practical one-time or recurring option for occupied homes that need consistent upkeep across the primary living spaces.',
    detailHref: '/residential-cleaning',
    estimateHref: '/booking?service=standard',
    detailLabel: 'Standard overview',
  },
  {
    title: 'Deep Cleaning',
    label: 'Detailed reset',
    body: 'A more intensive path for homes that need additional time around buildup, fixtures, kitchens, bathrooms, and often-missed details.',
    detailHref: '/deep-cleaning',
    estimateHref: '/booking?service=deep',
    detailLabel: 'Deep-clean details',
  },
  {
    title: 'Move-In / Move-Out',
    label: 'Transition cleaning',
    body: 'A property-reset path for vacant or transitioning homes where the cleaning scope is different from ordinary maintenance service.',
    detailHref: '/move-in-move-out-cleaning',
    estimateHref: '/booking?service=move-in-out',
    detailLabel: 'Move-clean details',
  },
]

const planningDetails = [
  'Approximate square footage and room profile',
  'Bathrooms, kitchens, living areas, and additional spaces',
  'Pets that may be present during service',
  'Property condition and priority areas',
  'Access, parking, gate, or arrival instructions',
  'Optional appliance, laundry, carpet, stain, or pet-hair add-ons',
]

const preparation = [
  {
    icon: Home,
    title: 'Describe the home',
    body: 'Start with the size, room count, selected service, and frequency so the request reflects the actual property instead of a generic package.',
  },
  {
    icon: KeyRound,
    title: 'Share access details',
    body: 'Add gate, parking, call-on-arrival, pet, or other property notes that can help the visit begin without unnecessary confusion.',
  },
  {
    icon: Clock3,
    title: 'Choose a preferred window',
    body: 'Provide the requested date and arrival window. Final availability is confirmed through the scheduling process.',
  },
]

export function ResidentialCleaning() {
  return (
    <>
      <section className="px-5 pb-16 pt-14 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <p className="eyebrow">Residential cleaning</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] tracking-editorial sm:text-6xl lg:text-7xl">A cleaning plan built around the way your home actually lives.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-black/62">Tranquility keeps the customer experience straightforward while still collecting the property details that matter for preparation, scope, and pricing.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink to="/booking?service=standard">Build my estimate <ArrowRight className="ml-2 size-4" /></ButtonLink>
              <ButtonLink to="/quote" variant="secondary">Request a closer review</ButtonLink>
            </div>
          </div>

          <aside className="rounded-[2.5rem] bg-tranquility-charcoal p-8 text-white shadow-premium sm:p-10">
            <Sparkles className="size-6 text-tranquility-stone" aria-hidden="true" />
            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">Residential planning</p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight">Clear choices before the cleaning begins.</h2>
            <div className="mt-8 grid gap-4 border-t border-white/10 pt-7">
              {['One-time or recurring options', 'Property-specific room profile', 'Optional add-ons and priority notes', 'Custom review when the space needs it'].map((item) => (
                <span key={item} className="flex items-start gap-3 text-sm leading-6 text-white/72">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-tranquility-stone" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="eyebrow">Choose the level of care</p>
            <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">Three residential paths. One clear experience.</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {serviceModes.map((service) => (
              <article key={service.title} className="flex flex-col rounded-[2rem] border border-black/7 bg-tranquility-ivory p-7 sm:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-tranquility-moss">{service.label}</p>
                <h3 className="mt-4 font-serif text-3xl">{service.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-black/58">{service.body}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  <ButtonLink to={service.estimateHref}>Start estimate <ArrowRight className="ml-2 size-4" /></ButtonLink>
                  <ButtonLink to={service.detailHref} variant="secondary">{service.detailLabel}</ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <ShieldCheck className="size-7 text-tranquility-moss" aria-hidden="true" />
            <p className="mt-6 eyebrow">What helps us prepare</p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">The useful details are captured before they become day-of surprises.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-black/58">The estimate workflow is designed to collect practical service information without turning the customer experience into a long intake packet.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {planningDetails.map((item, index) => (
              <div key={item} className="rounded-[1.6rem] border border-black/7 bg-white p-6 shadow-[0_18px_45px_-36px_rgba(35,40,37,0.45)]">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">{String(index + 1).padStart(2, '0')}</span>
                <p className="mt-3 text-sm font-semibold leading-6 text-black/72">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-tranquility-charcoal px-5 py-20 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">Before service</p>
          <h2 className="mt-5 max-w-3xl font-serif text-4xl tracking-tight sm:text-5xl">A professional visit starts with a prepared handoff.</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {preparation.map(({ icon: Icon, title, body }) => (
              <article key={title} className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7">
                <Icon className="size-5 text-tranquility-stone" aria-hidden="true" />
                <h3 className="mt-6 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2.5rem] bg-white p-8 shadow-premium sm:p-12 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow">Ready to plan the clean?</p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl tracking-tight">Start with the home. The right service path follows from there.</h2>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink to="/quote" variant="secondary">Custom quote</ButtonLink>
            <ButtonLink to="/booking?service=standard">Build my estimate <ArrowRight className="ml-2 size-4" /></ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
