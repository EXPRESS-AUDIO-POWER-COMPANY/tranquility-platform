import {
  ArrowRight,
  Building2,
  CheckCircle2,
  CircleDot,
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
    bestFor: 'Routine upkeep for occupied homes',
    pricingPath: 'Residential estimate',
    description: 'Flexible maintenance cleaning for occupied homes, apartments, townhomes, and similar residential spaces.',
    includes: ['Kitchen and bathroom surfaces', 'Living and sleeping areas', 'Floor care within service scope', 'Room and pet details captured up front'],
  },
  {
    icon: Sparkles,
    title: 'Deep Cleaning',
    subtitle: 'Detailed reset',
    bestFor: 'Homes needing more time and detail',
    pricingPath: 'Residential estimate or review',
    description: 'A more intensive service when the space needs additional time, attention, and detail beyond routine maintenance.',
    includes: ['Expanded detail work', 'Fixtures and frequently missed surfaces', 'Higher-effort kitchen and bath care', 'Optional specialty add-ons'],
  },
  {
    icon: PackageCheck,
    title: 'Move-In / Move-Out',
    subtitle: 'Fresh transition',
    bestFor: 'Vacant or transitioning homes',
    pricingPath: 'Residential estimate or review',
    description: 'Cleaning for empty or transitioning homes when the goal is to leave the property feeling reset and ready.',
    includes: ['Vacant-space cleaning path', 'Kitchen and bathroom detail', 'Cabinet/appliance add-ons available', 'Custom scope when property condition requires it'],
  },
  {
    icon: Building2,
    title: 'Commercial Cleaning',
    subtitle: 'Custom quote',
    bestFor: 'Offices and professional spaces',
    pricingPath: 'Custom quote only',
    description: 'Flexible planning for offices and professional spaces where square footage, traffic, frequency, and scope vary by location.',
    includes: ['Quote-based service planning', 'Frequency and access review', 'Custom property scope', 'Direct consultation before service'],
  },
]

const comparison = [
  ['Routine surface care', true, true, true],
  ['Kitchen and bathroom cleaning', true, true, true],
  ['Floor care within selected scope', true, true, true],
  ['Expanded detail / buildup attention', false, true, true],
  ['Vacant-property transition focus', false, false, true],
  ['Specialty add-ons available', true, true, true],
]

const addOns = [
  ['Laundry', 'One load'],
  ['Inside oven', 'Appliance interior'],
  ['Inside refrigerator', 'Appliance interior'],
  ['Dishwasher detail', 'Appliance detail'],
  ['Spot / stain treatment', 'Condition review may apply'],
  ['Spot carpet cleaning', 'Condition review may apply'],
  ['Range hood / vent detail', 'Kitchen detail'],
  ['Excess pet hair', 'Condition review may apply'],
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
          {services.map(({ icon: ServiceIcon, title, subtitle, bestFor, pricingPath, description, includes }) => (
            <article key={title} className="rounded-[2.2rem] border border-black/7 bg-white p-7 shadow-soft sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-full bg-tranquility-ivory text-tranquility-moss"><ServiceIcon className="size-5" aria-hidden="true" /></span>
                <span className="rounded-full bg-tranquility-stone/35 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-black/50">{subtitle}</span>
              </div>
              <h2 className="mt-7 font-serif text-3xl">{title}</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-black/58">{description}</p>
              <dl className="mt-6 grid gap-3 rounded-2xl bg-tranquility-ivory p-5 text-sm sm:grid-cols-2">
                <div><dt className="text-xs font-bold uppercase tracking-[0.12em] text-black/35">Best for</dt><dd className="mt-2 font-semibold text-black/70">{bestFor}</dd></div>
                <div><dt className="text-xs font-bold uppercase tracking-[0.12em] text-black/35">Pricing path</dt><dd className="mt-2 font-semibold text-black/70">{pricingPath}</dd></div>
              </dl>
              <div className="mt-7 grid gap-3 border-t border-black/7 pt-6 sm:grid-cols-2">
                {includes.map((item) => (
                  <span key={item} className="flex items-start gap-2 text-sm text-black/62"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-tranquility-moss" aria-hidden="true" />{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow">Residential service guide</p>
              <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">Standard, deep, or move-out? See the difference quickly.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-black/58 lg:justify-self-end">This guide is intentionally high-level. Exact scope can be adjusted when property condition or specialty requests require a closer review.</p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-[2rem] border border-black/7">
            <table className="w-full min-w-[720px] border-collapse bg-white text-left text-sm">
              <thead className="bg-tranquility-ivory">
                <tr>
                  <th className="p-5 font-semibold">Service focus</th>
                  <th className="p-5 font-semibold">Standard</th>
                  <th className="p-5 font-semibold">Deep</th>
                  <th className="p-5 font-semibold">Move-In / Out</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/7">
                {comparison.map(([label, standard, deep, move]) => (
                  <tr key={String(label)}>
                    <th className="p-5 font-medium text-black/65">{label}</th>
                    {[standard, deep, move].map((included, index) => (
                      <td key={index} className="p-5">{included ? <CheckCircle2 className="size-5 text-tranquility-moss" aria-label="Included" /> : <span className="text-black/30">—</span>}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
            {addOns.map(([item, note]) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                <CircleDot className="mt-0.5 size-4 shrink-0 text-tranquility-stone" aria-hidden="true" />
                <span><span className="block text-sm font-semibold text-white/84">{item}</span><span className="mt-1 block text-xs leading-5 text-white/45">{note}</span></span>
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
