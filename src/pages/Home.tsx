import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  Home as HomeIcon,
  Image as ImageIcon,
  Layers3,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { siteConfig } from '@/config/site'

const services = [
  {
    title: 'Residential Cleaning',
    eyebrow: 'Everyday care',
    description: 'One-time or recurring cleaning built around the size, layout, and rhythm of your home.',
  },
  {
    title: 'Deep Cleaning',
    eyebrow: 'Detailed reset',
    description: 'A more intensive service for kitchens, bathrooms, fixtures, surfaces, and often-missed details.',
  },
  {
    title: 'Move-In / Move-Out',
    eyebrow: 'Fresh transition',
    description: 'A top-to-bottom turnover clean designed for homes between occupants or before a fresh start.',
  },
  {
    title: 'Commercial Cleaning',
    eyebrow: 'Custom scope',
    description: 'Flexible service planning for offices and professional spaces with quote-based pricing.',
  },
]

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Tell us about the space',
    body: 'Choose the service, square footage, room counts, pets, and the extras that matter for your cleaning.',
  },
  {
    icon: Layers3,
    title: 'See the right pricing path',
    body: 'Residential jobs can receive a clear base estimate. Larger or more detailed spaces move to a custom quote.',
  },
  {
    icon: Sparkles,
    title: 'Choose the next step',
    body: 'Book the service path that fits or use the virtual consultation when photos and a closer review make more sense.',
  },
]

const highlights = [
  'Square-footage based estimates',
  'Room-by-room service details',
  'One-time or recurring options',
  'Pet and access notes',
  'Optional cleaning add-ons',
  'Virtual quote consultation',
]

export function Home() {
  return (
    <>
      <section className="relative overflow-hidden px-5 pb-20 pt-12 sm:pt-16 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="absolute -right-24 top-20 size-80 rounded-full bg-tranquility-sage/15 blur-3xl" aria-hidden="true" />
        <div className="absolute -left-24 bottom-10 size-72 rounded-full bg-tranquility-taupe/10 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-tranquility-charcoal/65 shadow-sm">
              <BadgeCheck className="size-4 text-tranquility-moss" aria-hidden="true" />
              Professional cleaning • {siteConfig.serviceAreaShort}
            </div>
            <h1 className="mt-7 max-w-4xl font-serif text-5xl leading-[0.96] tracking-[-0.045em] sm:text-6xl lg:text-[5.4rem]">
              A cleaner space should feel like <span className="text-tranquility-moss">peace</span> walking through the door.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-black/62 sm:text-xl">
              {siteConfig.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink className="min-w-40" to="/booking">
                Build my estimate <ArrowRight className="ml-2 size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink className="min-w-40" to="/quote" variant="secondary">
                Request a quote
              </ButtonLink>
            </div>
            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {['Easy to understand', 'Built for mobile', 'Custom quote option'].map((item) => (
                <span key={item} className="flex items-center gap-2 text-sm font-semibold text-black/62">
                  <CheckCircle2 className="size-4 shrink-0 text-tranquility-moss" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="relative min-h-[520px] overflow-hidden rounded-[2.4rem] border border-white/70 bg-[linear-gradient(145deg,#d9d4c9_0%,#f7f3ea_43%,#aab4a6_100%)] p-6 shadow-[0_40px_90px_-38px_rgba(35,40,37,0.42)] sm:p-8">
              <div className="absolute inset-x-10 top-10 h-48 rounded-[2rem] border border-white/65 bg-white/35 backdrop-blur-sm" />
              <div className="absolute bottom-0 right-0 h-72 w-48 rounded-tl-[7rem] bg-tranquility-charcoal/10" />
              <div className="absolute left-8 top-28 h-52 w-2/3 rounded-[2rem] border border-white/75 bg-white/25" />
              <div className="absolute right-12 top-16 size-28 rounded-full border-[14px] border-white/55" />

              <div className="relative z-10 flex h-full min-h-[456px] flex-col justify-between">
                <div className="ml-auto w-fit rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-soft backdrop-blur">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">Tranquility</p>
                  <p className="mt-1 font-serif text-xl">Clean. Calm. Clear.</p>
                </div>

                <div className="max-w-sm rounded-[2rem] bg-tranquility-charcoal p-7 text-white shadow-soft">
                  <Sparkles className="size-6 text-tranquility-stone" aria-hidden="true" />
                  <p className="mt-5 font-serif text-3xl leading-tight">Come home to tranquility.</p>
                  <p className="mt-3 text-sm leading-6 text-white/68">
                    Clear service choices, useful pricing guidance, and a simple path from first click to a cleaner space.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 hidden rounded-3xl border border-black/5 bg-white p-5 shadow-soft sm:block">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-black/40">Built around your home</p>
              <p className="mt-2 font-serif text-2xl">Size + rooms + extras</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-white px-5 py-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-bold uppercase tracking-[0.14em] text-black/42 md:justify-between">
          {['Residential', 'Deep Cleaning', 'Move-In / Move-Out', 'Commercial', 'Virtual Quotes'].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow">Cleaning services</p>
              <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">One clear place to understand what Tranquility can handle.</h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-black/58 lg:justify-self-end">
              The experience stays intentionally simple: choose a service, tell us about the property, personalize the scope, and move into the right booking or quote path.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {services.map((service, index) => (
              <article key={service.title} className="group rounded-[2rem] border border-black/7 bg-white p-7 shadow-[0_16px_50px_-38px_rgba(35,40,37,0.45)] sm:p-8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-tranquility-moss">{service.eyebrow}</p>
                    <h3 className="mt-4 font-serif text-3xl">{service.title}</h3>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-tranquility-ivory text-sm font-bold text-tranquility-moss">0{index + 1}</span>
                </div>
                <p className="mt-5 max-w-xl text-sm leading-7 text-black/58">{service.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center">
            <ButtonLink to="/services" variant="secondary">Explore all services <ArrowRight className="ml-2 size-4" /></ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-tranquility-charcoal px-5 py-20 text-white lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Built to stay simple</p>
              <h2 className="mt-5 max-w-xl font-serif text-4xl tracking-tight sm:text-5xl">Powerful underneath. Effortless for the customer.</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/62">
                Tranquility should never feel like a complicated app. The customer sees only the information needed to make a confident decision.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                  <CheckCircle2 className="size-5 shrink-0 text-tranquility-stone" aria-hidden="true" />
                  <span className="text-sm font-semibold text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-5 max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">From first click to the right cleaning plan.</h2>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {steps.map(({ icon: StepIcon, title, body }, index) => (
              <article key={title} className="rounded-[2rem] bg-white p-7 shadow-soft sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-full bg-tranquility-ivory text-tranquility-moss">
                    <StepIcon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-bold tracking-[0.18em] text-black/30">0{index + 1}</span>
                </div>
                <h3 className="mt-7 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/58">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] bg-tranquility-stone/35 lg:grid-cols-2">
          <div className="p-8 sm:p-12 lg:p-14">
            <p className="eyebrow">Virtual consultation</p>
            <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">Some spaces deserve a closer look before the quote.</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-black/60">
              Customers can describe the property, note special conditions, and prepare interior photos for a more accurate custom review instead of forcing every job into a one-size-fits-all price.
            </p>
            <ButtonLink className="mt-8" to="/quote">Start a virtual quote <ArrowRight className="ml-2 size-4" /></ButtonLink>
          </div>
          <div className="relative min-h-[360px] bg-[linear-gradient(135deg,#9aa596,#d7d0c4_48%,#f7f3ea)] p-8">
            <div className="absolute inset-8 rounded-[2rem] border border-white/65 bg-white/20" />
            <div className="relative flex h-full min-h-[296px] items-end justify-center">
              <div className="w-full max-w-sm rounded-[2rem] bg-white/90 p-7 shadow-soft backdrop-blur">
                <ImageIcon className="size-6 text-tranquility-moss" aria-hidden="true" />
                <p className="mt-4 font-serif text-2xl">Show the space, not yourself.</p>
                <p className="mt-3 text-sm leading-6 text-black/58">Interior details can help explain scope while keeping the visual experience calm, neutral, and property-focused.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow">Ready when you are</p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl tracking-tight sm:text-5xl">Make the next cleaning easier before it even starts.</h2>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-black/58">
              <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-tranquility-moss" />Clear scope</span>
              <span className="flex items-center gap-2"><HomeIcon className="size-4 text-tranquility-moss" />Property details</span>
              <span className="flex items-center gap-2"><Sparkles className="size-4 text-tranquility-moss" />Personalized options</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink to="/quote" variant="secondary">Get a quote</ButtonLink>
            <ButtonLink to="/booking">Build my estimate</ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
