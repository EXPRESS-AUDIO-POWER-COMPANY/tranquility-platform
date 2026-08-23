import {
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Home as HomeIcon,
  Layers3,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { BrandMark } from '@/components/brand/BrandMark'
import { ButtonLink } from '@/components/ui/Button'
import { siteConfig } from '@/config/site'

const services = [
  {
    title: 'Residential Cleaning',
    eyebrow: 'Everyday care',
    description: 'One-time or recurring cleaning built around the size, layout, and rhythm of your home.',
    href: '/residential-cleaning',
  },
  {
    title: 'Deep Cleaning',
    eyebrow: 'Detailed reset',
    description: 'A more intensive service for kitchens, bathrooms, fixtures, surfaces, and often-missed details.',
    href: '/booking?service=deep',
  },
  {
    title: 'Move-In / Move-Out',
    eyebrow: 'Fresh transition',
    description: 'A turnover clean for homes between occupants, moving days, and fresh starts.',
    href: '/booking?service=move-in-out',
  },
  {
    title: 'Commercial Cleaning',
    eyebrow: 'Custom scope',
    description: 'Flexible service planning for offices and professional spaces with quote-based pricing.',
    href: '/commercial-cleaning',
  },
]

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Tell us about the space',
    body: 'Choose the service, square footage, room counts, pets, and extras that matter for your cleaning.',
  },
  {
    icon: Layers3,
    title: 'See the right pricing path',
    body: 'Residential jobs can receive a clear planning estimate. Larger or more detailed spaces move to a custom quote.',
  },
  {
    icon: Sparkles,
    title: 'Choose the next step',
    body: 'Continue with the residential reservation profile or use the virtual consultation when a closer review makes more sense.',
  },
]

const highlights = [
  'Square-footage based estimates',
  'Room-by-room property details',
  'One-time or recurring options',
  'Pet and access notes',
  'Optional cleaning add-ons',
  'Virtual consultation option',
]

const trustPoints = [
  ['DFW focused', 'Local service coverage across Dallas-Fort Worth and surrounding communities.'],
  ['Clear choices', 'Understand the service, estimate, and custom-quote path before moving forward.'],
  ['Property-specific', 'Room layout, pets, condition, access, and specialty requests can all be captured up front.'],
]

const standardDetails = [
  ['01', 'Scope first', 'The service starts with the property details instead of forcing every home into the same package.'],
  ['02', 'Clear pricing path', 'Residential estimates stay separate from jobs that need a custom review.'],
  ['03', 'Prepared arrival', 'Pets, access notes, timing, and priority areas can be documented before service.'],
]

export function Home() {
  return (
    <>
      <section className="relative overflow-hidden px-5 pb-20 pt-12 sm:pt-16 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="absolute -right-24 top-20 size-80 rounded-full bg-tranquility-sage/12 blur-3xl" aria-hidden="true" />
        <div className="absolute -left-24 bottom-10 size-72 rounded-full bg-tranquility-taupe/8 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.03fr_0.97fr] lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-tranquility-charcoal/65 shadow-sm sm:text-xs">
              <BadgeCheck className="size-4 text-tranquility-moss" aria-hidden="true" />
              Professional cleaning · {siteConfig.serviceAreaShort}
            </div>
            <h1 className="mt-7 max-w-4xl font-serif text-5xl leading-[0.94] tracking-editorial sm:text-6xl lg:text-[5.55rem]">
              Come home to <span className="text-tranquility-moss">tranquility.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-black/62 sm:text-xl">Professional cleaning with a calmer way to understand your options, build a residential estimate, or request a closer property review.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink className="min-w-40" to="/booking">Build my estimate <ArrowRight className="ml-2 size-4" aria-hidden="true" /></ButtonLink>
              <ButtonLink className="min-w-40" to="/quote" variant="secondary">Request a quote</ButtonLink>
            </div>
            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {['Residential estimates', 'Custom quote option', 'One-time or recurring'].map((item) => (
                <span key={item} className="flex items-center gap-2 text-sm font-semibold text-black/62">
                  <CheckCircle2 className="size-4 shrink-0 text-tranquility-moss" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="rounded-[2.8rem] border border-black/5 bg-white p-2 shadow-premium">
              <div className="relative overflow-hidden rounded-[2.4rem] bg-tranquility-charcoal p-7 text-white sm:p-10">
                <div className="absolute -right-20 -top-16 size-72 rounded-full border border-white/8" aria-hidden="true" />
                <div className="absolute -right-8 -top-4 size-44 rounded-full border border-white/8" aria-hidden="true" />

                <div className="relative flex items-center justify-between gap-5">
                  <span className="grid size-14 place-items-center rounded-full border border-white/14 bg-white/[0.055] text-white">
                    <BrandMark className="size-12" />
                  </span>
                  <span className="text-right text-[10px] font-bold uppercase tracking-[0.22em] text-white/42">The Tranquility standard</span>
                </div>

                <div className="relative mt-16 max-w-md">
                  <p className="font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">Thoughtful service begins before anyone walks through the door.</p>
                  <p className="mt-5 text-sm leading-7 text-white/62">The property profile, requested scope, timing, access, pets, and priorities should be clear before the cleaning begins.</p>
                </div>

                <div className="relative mt-12 divide-y divide-white/10 border-y border-white/10">
                  {standardDetails.map(([number, title, body]) => (
                    <div key={title} className="grid gap-3 py-5 sm:grid-cols-[44px_0.55fr_1fr] sm:items-start">
                      <span className="text-[10px] font-bold tracking-[0.18em] text-tranquility-stone">{number}</span>
                      <span className="font-serif text-xl text-white">{title}</span>
                      <span className="text-xs leading-6 text-white/55">{body}</span>
                    </div>
                  ))}
                </div>

                <div className="relative mt-7 flex flex-wrap items-center justify-between gap-4 text-xs text-white/45">
                  <span>{siteConfig.serviceAreaShort}</span>
                  <span className="font-semibold uppercase tracking-[0.16em]">Clean · Calm · Clear</span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 hidden rounded-3xl border border-black/6 bg-tranquility-ivory px-5 py-4 shadow-soft sm:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/40">Property-specific planning</p>
              <p className="mt-1.5 font-serif text-xl">Size · rooms · priorities</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-white px-5 py-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[10px] font-bold uppercase tracking-[0.17em] text-black/42 sm:text-xs md:justify-between">
          {['Residential', 'Deep Cleaning', 'Move-In / Move-Out', 'Commercial', 'Virtual Quotes'].map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {trustPoints.map(([title, body]) => (
            <article key={title} className="rounded-[1.8rem] border border-black/7 bg-white p-7 shadow-[0_18px_45px_-36px_rgba(35,40,37,0.45)]">
              <CheckCircle2 className="size-5 text-tranquility-moss" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-2xl">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-black/58">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow">Cleaning services</p>
              <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">The right service starts with the right level of care.</h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-black/58 lg:justify-self-end">Choose a service, describe the property, personalize the scope, and move into the residential estimate or custom-quote path that makes sense.</p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {services.map((service, index) => (
              <article key={service.title} className="group flex flex-col rounded-[2rem] border border-black/7 bg-white p-7 shadow-[0_16px_50px_-38px_rgba(35,40,37,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-premium sm:p-8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-tranquility-moss sm:text-xs">{service.eyebrow}</p>
                    <h3 className="mt-4 font-serif text-3xl">{service.title}</h3>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-tranquility-ivory text-sm font-bold text-tranquility-moss">0{index + 1}</span>
                </div>
                <p className="mt-5 flex-1 max-w-xl text-sm leading-7 text-black/58">{service.description}</p>
                <ButtonLink className="mt-7 self-start" to={service.href} variant="secondary">Explore service <ArrowRight className="ml-2 size-4" /></ButtonLink>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center"><ButtonLink to="/services" variant="secondary">Compare all services <ArrowRight className="ml-2 size-4" /></ButtonLink></div>
        </div>
      </section>

      <section className="bg-tranquility-charcoal px-5 py-20 text-white lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45 sm:text-xs">Details that matter</p>
              <h2 className="mt-5 max-w-xl font-serif text-4xl tracking-tight sm:text-5xl">Simple to use. Detailed enough to prepare properly.</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/62">Customers should not need to fight through a complicated form to explain a home. Tranquility asks for the details that can actually affect scope, timing, or service preparation.</p>
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
              <article key={title} className="rounded-[2rem] bg-white p-7 shadow-[0_18px_45px_-36px_rgba(35,40,37,0.45)] sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-full bg-tranquility-ivory text-tranquility-moss"><StepIcon className="size-5" aria-hidden="true" /></span>
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
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] border border-black/6 bg-white shadow-premium lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-8 sm:p-12 lg:p-14">
            <p className="eyebrow">Virtual consultation</p>
            <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">Some spaces deserve a closer look before the quote.</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-black/60">Describe the property, note special conditions, and select interior photos for a more accurate custom review instead of forcing every job into one price.</p>
            <ButtonLink className="mt-8" to="/quote">Start a virtual quote <ArrowRight className="ml-2 size-4" /></ButtonLink>
          </div>
          <div className="bg-tranquility-charcoal p-8 text-white sm:p-10 lg:p-12">
            <Camera className="size-7 text-tranquility-stone" aria-hidden="true" />
            <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">Property-photo guidance</p>
            <h3 className="mt-4 font-serif text-3xl">Show the space. Keep the review focused.</h3>
            <div className="mt-7 grid gap-3">
              {['Interior rooms and surfaces that affect scope', 'Areas with buildup, stains, pet hair, or special conditions', 'Appliances or specialty areas included in the request', 'No identification, card information, or unrelated private documents'].map((item) => (
                <span key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-sm leading-6 text-white/68">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-tranquility-stone" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 lg:px-8 lg:pb-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2.4rem] border border-black/7 bg-white p-8 shadow-[0_18px_45px_-36px_rgba(35,40,37,0.45)] sm:p-12 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow">Service area</p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl tracking-tight">Serving Dallas-Fort Worth and surrounding communities.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-black/58">Check the primary service cities or send the property address to confirm availability in a nearby community.</p>
          </div>
          <ButtonLink to="/service-area" variant="secondary"><MapPin className="mr-2 size-4" />View service area</ButtonLink>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow">Ready when you are</p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl tracking-tight sm:text-5xl">Make the next cleaning easier before it even starts.</h2>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-black/58">
              <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-tranquility-moss" aria-hidden="true" />Clear scope</span>
              <span className="flex items-center gap-2"><HomeIcon className="size-4 text-tranquility-moss" aria-hidden="true" />Property details</span>
              <span className="flex items-center gap-2"><Sparkles className="size-4 text-tranquility-moss" aria-hidden="true" />Personalized options</span>
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
