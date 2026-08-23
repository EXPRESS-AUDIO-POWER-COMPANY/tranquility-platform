import { ArrowRight, Building2, CheckCircle2, ClipboardCheck, KeyRound, Layers3, ShieldCheck } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'

const scopeFactors = [
  ['Property profile', 'Square footage, layout, restrooms, common areas, offices, break areas, and other spaces that need service.'],
  ['Traffic and frequency', 'How often the space is used and whether service is occasional, recurring, or tied to a specific event or turnover.'],
  ['Access requirements', 'Building access, parking, keys, entry procedures, security instructions, and preferred service windows.'],
  ['Priority areas', 'Customer-facing zones, restrooms, floors, shared surfaces, kitchens, or other areas requiring special attention.'],
  ['Special conditions', 'Buildup, stains, specialty surfaces, post-project cleanup, or conditions that require a closer review before pricing.'],
  ['Service expectations', 'The requested outcome, timing, communication preferences, and any property-specific instructions the team should understand.'],
]

const process = [
  {
    icon: ClipboardCheck,
    title: 'Describe the property',
    body: 'Provide the site profile, requested frequency, primary areas, condition, and timing so the initial review starts with usable information.',
  },
  {
    icon: Layers3,
    title: 'Build the service scope',
    body: 'Commercial work stays quote-based because layout, traffic, access, and recurring requirements can change the amount of labor needed.',
  },
  {
    icon: KeyRound,
    title: 'Confirm access and scheduling',
    body: 'Finalize the operational details needed for the property, including preferred service windows and approved access instructions.',
  },
]

export function CommercialCleaning() {
  return (
    <>
      <section className="px-5 pb-16 pt-14 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <p className="eyebrow">Commercial cleaning</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] tracking-editorial sm:text-6xl lg:text-7xl">Professional spaces need a scope that reflects how the property actually operates.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-black/62">Commercial cleaning is handled through a custom review so property layout, traffic, access, timing, and frequency can be considered before service is priced.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink to="/quote?service=commercial">Request a commercial quote <ArrowRight className="ml-2 size-4" /></ButtonLink>
              <ButtonLink to="/contact" variant="secondary">Contact Tranquility</ButtonLink>
            </div>
          </div>

          <aside className="rounded-[2.5rem] bg-tranquility-charcoal p-8 text-white shadow-premium sm:p-10">
            <Building2 className="size-7 text-tranquility-stone" aria-hidden="true" />
            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">Custom scope</p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight">Designed for offices and professional spaces.</h2>
            <div className="mt-8 grid gap-4 border-t border-white/10 pt-7">
              {['Quote-based service planning', 'One-time or recurring requests', 'Property access and timing review', 'Scope adjusted to the actual space'].map((item) => (
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
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow">Commercial scope</p>
              <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">The quote starts with the operating reality of the property.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-black/58 lg:justify-self-end">Instead of forcing commercial properties into residential pricing, Tranquility uses the information below to understand what the site actually requires.</p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {scopeFactors.map(([title, body], index) => (
              <article key={title} className="rounded-[2rem] border border-black/7 bg-tranquility-ivory p-7">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/58">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
          <div>
            <ShieldCheck className="size-7 text-tranquility-moss" aria-hidden="true" />
            <p className="mt-6 eyebrow">Operational clarity</p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">Access instructions belong in the service plan, not in a last-minute text.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-black/58">Commercial properties can have entry procedures, front desks, parking restrictions, shared spaces, and timing limitations. The quote workflow captures those details before scheduling.</p>
          </div>

          <div className="rounded-[2.4rem] bg-white p-7 shadow-premium sm:p-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">Examples of useful site notes</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {['Preferred service windows', 'Parking or loading instructions', 'Building entry procedures', 'Front-desk or contact protocol', 'Restricted or excluded areas', 'Priority rooms or customer-facing zones'].map((item) => (
                <span key={item} className="flex items-start gap-3 rounded-2xl bg-tranquility-ivory p-4 text-sm font-semibold leading-6 text-black/68">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-tranquility-moss" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-tranquility-charcoal px-5 py-20 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">How commercial quoting works</p>
          <h2 className="mt-5 max-w-3xl font-serif text-4xl tracking-tight sm:text-5xl">A short path from property profile to a service-ready scope.</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {process.map(({ icon: Icon, title, body }) => (
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
            <p className="eyebrow">Request commercial service</p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl tracking-tight">Send the property details first. Tranquility can build the right quote from there.</h2>
          </div>
          <ButtonLink to="/quote?service=commercial">Start commercial quote <ArrowRight className="ml-2 size-4" /></ButtonLink>
        </div>
      </section>
    </>
  )
}
