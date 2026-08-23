import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Home,
  Layers3,
  PackageCheck,
  Sparkles,
} from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'

const services = [
  {
    icon: Home,
    title: 'Residential Cleaning',
    subtitle: 'One-time or recurring',
    description: 'Flexible maintenance cleaning for occupied homes, apartments, townhomes, and similar residential spaces.',
    includes: ['Kitchen and bathroom surfaces', 'Living and sleeping areas', 'Floor care within service scope', 'Room and pet details captured up front'],
  },
  {
    icon: Sparkles,
    title: 'Deep Cleaning',
    subtitle: 'Detailed reset',
    description: 'A more intensive service when the space needs additional time, attention, and detail beyond routine maintenance.',
    includes: ['Expanded detail work', 'Fixtures and frequently missed surfaces', 'Higher-effort kitchen and bath care', 'Optional specialty add-ons'],
  },
  {
    icon: PackageCheck,
    title: 'Move-In / Move-Out',
    subtitle: 'Fresh transition',
    description: 'Cleaning for empty or transitioning homes when the goal is to leave the property feeling reset and ready.',
    includes: ['Vacant-space cleaning path', 'Kitchen and bathroom detail', 'Cabinet/appliance add-ons available', 'Custom scope when property condition requires it'],
  },
  {
    icon: Building2,
    title: 'Commercial Cleaning',
    subtitle: 'Custom quote',
    description: 'Flexible planning for offices and professional spaces where square footage, traffic, frequency, and scope vary by location.',
    includes: ['Quote-based service planning', 'Frequency and access review', 'Custom property scope', 'Direct consultation before service'],
  },
]

const addOns = [
  'Laundry',
  'Inside oven',
  'Inside refrigerator',
  'Dishwasher detail',
  'Spot / stain treatment',
  'Spot carpet cleaning',
  'Range hood / vent detail',
  'Excess pet hair',
]

export function Services() {
  return (
    <>
      <section className="px-5 pb-14 pt-14 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Services</p>
          <div className="mt-5 grid gap-7 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <h1 className="max-w-4xl font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl">Choose the cleaning path that fits the space.</h1>
            <p className="max-w-xl text-base leading-7 text-black/60 lg:justify-self-end">Residential jobs can begin with a base estimate. Commercial, larger, or more detailed spaces can move directly into a custom quote so the scope stays accurate.</p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          {services.map(({ icon: ServiceIcon, title, subtitle, description, includes }) => (
            <article key={title} className="rounded-[2.2rem] border border-black/7 bg-white p-7 shadow-soft sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-full bg-tranquility-ivory text-tranquility-moss">
                  <ServiceIcon className="size-5" aria-hidden="true" />
                </span>
                <span className="rounded-full bg-tranquility-stone/35 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-black/50">{subtitle}</span>
              </div>
              <h2 className="mt-7 font-serif text-3xl">{title}</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-black/58">{description}</p>
              <div className="mt-7 grid gap-3 border-t border-black/7 pt-6 sm:grid-cols-2">
                {includes.map((item) => (
                  <span key={item} className="flex items-start gap-2 text-sm text-black/62">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-tranquility-moss" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-tranquility-charcoal px-5 py-20 text-white lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Layers3 className="size-7 text-tranquility-stone" aria-hidden="true" />
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-white/45">Optional add-ons</p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight">Personalize the cleaning without making booking complicated.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">Add-ons can be selected with residential service. Some specialty items may require review depending on condition and scope.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {addOns.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-sm font-semibold text-white/80">
                <CheckCircle2 className="size-4 shrink-0 text-tranquility-stone" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2.4rem] bg-white p-8 shadow-soft sm:p-12 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow">Not sure which service fits?</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl tracking-tight">Start with the property details. Tranquility can route the job from there.</h2>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink to="/quote" variant="secondary">Request a quote</ButtonLink>
            <ButtonLink to="/booking">Build an estimate <ArrowRight className="ml-2 size-4" /></ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
