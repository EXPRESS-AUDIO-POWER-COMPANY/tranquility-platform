import { ArrowRight, CheckCircle2, Home, KeyRound, PackageCheck, Sparkles } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'

const transitionTypes = [
  {
    title: 'Move-out cleaning',
    body: 'A turnover-oriented service for a home that is being vacated and needs a more complete reset before handoff, listing, inspection, or the next occupant.',
  },
  {
    title: 'Move-in cleaning',
    body: 'A pre-occupancy cleaning path for a home that should feel prepared before furniture, boxes, and normal household activity move in.',
  },
  {
    title: 'Vacant property reset',
    body: 'A custom transition clean for properties that are empty but may have condition, timing, or specialty needs beyond a routine residential visit.',
  },
]

const planningDetails = [
  'Whether the home is occupied, partially occupied, or vacant',
  'Approximate square footage and room profile',
  'Current condition and priority areas',
  'Preferred service date and move timeline',
  'Access, gate, parking, or key instructions',
  'Requested appliance-interior or specialty add-ons',
]

export function MoveCleaning() {
  return (
    <>
      <section className="px-5 pb-16 pt-14 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <p className="eyebrow">Move-in / move-out cleaning</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] tracking-editorial sm:text-6xl lg:text-7xl">A cleaner transition for the property you are leaving—or the one you are stepping into.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-black/62">Move cleaning uses a transition-focused scope instead of treating a vacant or changing property like an ordinary maintenance visit.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink to="/booking?service=move-in-out">Estimate move cleaning <ArrowRight className="ml-2 size-4" /></ButtonLink>
              <ButtonLink to="/quote?service=move-in-out" variant="secondary">Request a closer review</ButtonLink>
            </div>
          </div>

          <aside className="rounded-[2.5rem] bg-tranquility-charcoal p-8 text-white shadow-premium sm:p-10">
            <PackageCheck className="size-7 text-tranquility-stone" aria-hidden="true" />
            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">Property transition</p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight">Built around an emptying or incoming home.</h2>
            <div className="mt-8 grid gap-4 border-t border-white/10 pt-7">
              {['Vacant and transitioning property focus', 'Condition and timing context', 'Appliance-interior add-ons available', 'Custom review for unusual scope'].map((item) => (
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
            <p className="eyebrow">Transition paths</p>
            <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">The same property can need a different clean depending on where it is in the move.</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {transitionTypes.map((item, index) => (
              <article key={item.title} className="rounded-[2rem] border border-black/7 bg-tranquility-ivory p-7 sm:p-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 font-serif text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/58">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Home className="size-7 text-tranquility-moss" aria-hidden="true" />
            <p className="mt-6 eyebrow">What helps us plan</p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">Moving already has enough variables. The cleaning request should make the property easier to understand.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-black/58">The booking path collects the practical details needed to separate an ordinary move clean from a property that needs custom review.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {planningDetails.map((item) => (
              <span key={item} className="flex items-start gap-3 rounded-[1.6rem] border border-black/7 bg-white p-5 text-sm font-semibold leading-6 text-black/68 shadow-[0_18px_45px_-36px_rgba(35,40,37,0.45)]">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-tranquility-moss" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-tranquility-charcoal px-5 py-20 text-white lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <KeyRound className="size-7 text-tranquility-stone" aria-hidden="true" />
            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">Access and timing</p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">The move timeline matters as much as the room count.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/62">Gate details, empty-property access, parking, key handoff, and preferred timing can all affect how smoothly a transition clean is scheduled.</p>
          </div>
          <div className="grid gap-3">
            {['Preferred service date and arrival window', 'Whether furniture or boxes remain in the property', 'Gate, key, lockbox, front-desk, or call-on-arrival notes', 'Any time-sensitive handoff, inspection, or occupancy deadline'].map((item) => (
              <span key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-sm leading-6 text-white/72">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-tranquility-stone" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2.5rem] bg-white p-8 shadow-premium sm:p-12 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow">Plan the transition clean</p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl tracking-tight">Start with the property profile and move timeline.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/quote?service=move-in-out" variant="secondary"><Sparkles className="mr-2 size-4" />Custom review</ButtonLink>
            <ButtonLink to="/booking?service=move-in-out">Build estimate <ArrowRight className="ml-2 size-4" /></ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
