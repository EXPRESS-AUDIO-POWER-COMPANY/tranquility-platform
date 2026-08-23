import { ArrowRight, CheckCircle2, Droplets, ScanSearch, Sparkles, TimerReset } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'

const focusAreas = [
  ['Kitchen detail', 'More time around cooking surfaces, appliance exteriors, fixtures, buildup-prone areas, and requested appliance-interior add-ons.'],
  ['Bathroom reset', 'Additional attention for fixtures, hard surfaces, buildup, and the details that routine maintenance can miss.'],
  ['High-touch details', 'Expanded attention around frequently handled surfaces, visible ledges, fixtures, and room details within the selected scope.'],
  ['Floors and edges', 'Floor care remains property-specific, with extra attention considered when condition or buildup changes the work required.'],
  ['Pet-related conditions', 'Pet presence is documented up front, and excess pet hair can be selected for closer review when applicable.'],
  ['Priority areas', 'Customers can identify rooms or details that need the most attention instead of relying on a generic deep-clean checklist.'],
]

const whenToChoose = [
  {
    icon: TimerReset,
    title: 'It has been a while',
    body: 'The home needs more time and detail than ordinary maintenance because buildup or overlooked areas have accumulated.',
  },
  {
    icon: ScanSearch,
    title: 'You want a reset',
    body: 'The goal is to bring the property back to a stronger maintenance baseline before continuing with routine or recurring cleaning.',
  },
  {
    icon: Droplets,
    title: 'Specific areas need attention',
    body: 'Kitchens, bathrooms, fixtures, or other priority areas need a closer cleaning scope than a standard visit would usually allow.',
  },
]

export function DeepCleaning() {
  return (
    <>
      <section className="px-5 pb-16 pt-14 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <p className="eyebrow">Deep cleaning</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] tracking-editorial sm:text-6xl lg:text-7xl">When routine cleaning is not enough, start with a more detailed reset.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-black/62">Deep cleaning is designed for homes that need more time, more detail, or a stronger reset before returning to ordinary maintenance.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink to="/booking?service=deep">Estimate a deep clean <ArrowRight className="ml-2 size-4" /></ButtonLink>
              <ButtonLink to="/quote?service=specialty" variant="secondary">Request a closer review</ButtonLink>
            </div>
          </div>

          <aside className="rounded-[2.5rem] bg-tranquility-charcoal p-8 text-white shadow-premium sm:p-10">
            <Sparkles className="size-7 text-tranquility-stone" aria-hidden="true" />
            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">Detailed reset</p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight">More attention where the property needs it.</h2>
            <div className="mt-8 grid gap-4 border-t border-white/10 pt-7">
              {['Expanded detail beyond routine upkeep', 'Condition and priority-area context', 'Optional specialty add-ons', 'Custom review when condition requires it'].map((item) => (
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
            <p className="eyebrow">When deep cleaning makes sense</p>
            <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">Choose it because the condition calls for more time—not because the package name sounds better.</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {whenToChoose.map(({ icon: Icon, title, body }) => (
              <article key={title} className="rounded-[2rem] border border-black/7 bg-tranquility-ivory p-7 sm:p-8">
                <Icon className="size-6 text-tranquility-moss" aria-hidden="true" />
                <h3 className="mt-6 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/58">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="eyebrow">Focus areas</p>
              <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">The scope follows the home, not a generic room list.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-black/58 lg:justify-self-end">These are examples of the details that can matter in a deep-clean request. Final scope still depends on property condition and the service details provided.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map(([title, body], index) => (
              <article key={title} className="rounded-[2rem] border border-black/7 bg-white p-7 shadow-[0_18px_45px_-36px_rgba(35,40,37,0.45)]">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/58">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-tranquility-charcoal px-5 py-20 text-white lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">Estimate vs. custom review</p>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">Some deep cleans can be estimated. Others need a closer look.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/62">If the property is large, heavily affected, unusually configured, or includes specialty conditions, the virtual quote path gives Tranquility more information before pricing is finalized.</p>
          </div>
          <div className="grid gap-3">
            {['Large homes outside the instant-estimate range', 'Heavy buildup or unusual property conditions', 'Specialty stain, carpet, or pet-hair requests', 'A customer who simply wants a closer review before scheduling'].map((item) => (
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
            <p className="eyebrow">Ready for the reset?</p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl tracking-tight">Build the property profile first. The estimate updates from there.</h2>
          </div>
          <ButtonLink to="/booking?service=deep">Estimate a deep clean <ArrowRight className="ml-2 size-4" /></ButtonLink>
        </div>
      </section>
    </>
  )
}
