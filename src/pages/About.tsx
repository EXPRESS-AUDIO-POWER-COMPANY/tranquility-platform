import { CheckCircle2, HeartHandshake, Home, Sparkles } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'

const values = [
  {
    icon: Home,
    title: 'Respect for the space',
    body: 'Every home is personal. Tranquility is designed around clear notes, thoughtful preparation, and service that respects the way people actually live.',
  },
  {
    icon: HeartHandshake,
    title: 'Clear expectations',
    body: 'Customers should understand what they selected, what the estimate means, and when a custom review makes more sense than forcing a one-size-fits-all price.',
  },
  {
    icon: Sparkles,
    title: 'A calmer experience',
    body: 'The website, booking path, communication, and service experience should all feel easier to understand and easier to manage.',
  },
]

export function About() {
  return (
    <>
      <section className="px-5 pb-16 pt-14 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="eyebrow">About Tranquility</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl">Professional cleaning designed to make home feel lighter.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-black/62">Tranquility serves homes and professional spaces across Dallas-Fort Worth with a simple goal: make dependable cleaning easier to understand, easier to schedule, and easier to trust.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/booking">Build an estimate</ButtonLink>
              <ButtonLink to="/quote" variant="secondary">Request a custom quote</ButtonLink>
            </div>
          </div>

          <div className="rounded-[2.4rem] bg-tranquility-charcoal p-8 text-white shadow-soft sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/42">The Tranquility standard</p>
            <p className="mt-5 font-serif text-3xl leading-tight sm:text-4xl">Clean spaces should create breathing room, not another complicated task to manage.</p>
            <div className="mt-8 grid gap-4 border-t border-white/10 pt-7">
              {['Simple customer choices', 'Thoughtful property details', 'Flexible one-time or recurring care', 'Custom review when the scope needs it'].map((item) => (
                <span key={item} className="flex items-start gap-3 text-sm text-white/72">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-tranquility-stone" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Why Tranquility</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">Professional without feeling impersonal.</h2>
            <p className="max-w-2xl text-sm leading-7 text-black/58 lg:justify-self-end">The customer experience is intentionally straightforward on the surface while still capturing the details needed to prepare for the space properly.</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map(({ icon: ValueIcon, title, body }) => (
              <article key={title} className="rounded-[2rem] border border-black/7 bg-tranquility-ivory p-7">
                <span className="grid size-11 place-items-center rounded-full bg-white text-tranquility-moss shadow-sm"><ValueIcon className="size-5" aria-hidden="true" /></span>
                <h3 className="mt-6 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/58">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.4rem] bg-tranquility-stone/30 p-8 sm:p-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="eyebrow">Built around real households</p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl tracking-tight">Pets, room layouts, special areas, recurring schedules, and custom conditions all matter.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-black/58">That is why Tranquility separates straightforward residential estimating from virtual consultation. The customer gets a simple experience without pretending every property can be priced the exact same way.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink to="/services" variant="secondary">Explore services</ButtonLink>
            <ButtonLink to="/contact">Contact Tranquility</ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
