import { ArrowRight, Mail, MapPin, Phone, Sparkles } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { siteConfig } from '@/config/site'

const paths = [
  {
    title: 'Book residential service',
    body: 'Start with the home size, room profile, pets, frequency, and add-ons to build a planning estimate.',
    href: '/booking',
    label: 'Build an estimate',
  },
  {
    title: 'Request a custom quote',
    body: 'Use the virtual consultation path for larger homes, commercial spaces, special conditions, or custom scope.',
    href: '/quote',
    label: 'Request a quote',
  },
]

export function Contact() {
  return (
    <>
      <section className="px-5 pb-14 pt-14 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">Contact Tranquility</p>
            <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl">A simple path to the right kind of help.</h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-black/60 lg:justify-self-end">
            Residential booking, custom quotes, commercial cleaning, service questions, and contractor inquiries all have a clear next step.
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 lg:px-8 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          <a className="rounded-[2rem] bg-white p-7 shadow-soft transition hover:-translate-y-0.5" href={siteConfig.phoneHref}>
            <span className="grid size-11 place-items-center rounded-full bg-tranquility-ivory text-tranquility-moss"><Phone className="size-5" aria-hidden="true" /></span>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-black/40">Call</p>
            <p className="mt-2 font-serif text-2xl">{siteConfig.phone}</p>
            <p className="mt-3 text-sm leading-6 text-black/55">For immediate service questions and booking assistance.</p>
          </a>

          <a className="rounded-[2rem] bg-white p-7 shadow-soft transition hover:-translate-y-0.5" href={`mailto:${siteConfig.email}`}>
            <span className="grid size-11 place-items-center rounded-full bg-tranquility-ivory text-tranquility-moss"><Mail className="size-5" aria-hidden="true" /></span>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-black/40">Email</p>
            <p className="mt-2 break-all font-serif text-2xl">{siteConfig.email}</p>
            <p className="mt-3 text-sm leading-6 text-black/55">For quotes, commercial requests, careers, and detailed questions.</p>
          </a>

          <div className="rounded-[2rem] bg-tranquility-charcoal p-7 text-white shadow-soft">
            <span className="grid size-11 place-items-center rounded-full bg-white/10 text-tranquility-stone"><MapPin className="size-5" aria-hidden="true" /></span>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-white/40">Service area</p>
            <p className="mt-2 font-serif text-2xl">Dallas-Fort Worth</p>
            <p className="mt-3 text-sm leading-6 text-white/60">Serving communities throughout the DFW area, subject to scheduling and service availability.</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-2">
            {paths.map((path) => (
              <article key={path.title} className="rounded-[2.2rem] border border-black/7 bg-tranquility-ivory p-8 sm:p-10">
                <Sparkles className="size-6 text-tranquility-moss" aria-hidden="true" />
                <h2 className="mt-6 font-serif text-3xl">{path.title}</h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-black/58">{path.body}</p>
                <ButtonLink className="mt-7" to={path.href}>{path.label} <ArrowRight className="ml-2 size-4" /></ButtonLink>
              </article>
            ))}
          </div>

          <div className="mt-14">
            <p className="eyebrow">Primary service communities</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {siteConfig.serviceCities.map((city) => (
                <span key={city} className="rounded-full border border-black/8 bg-white px-4 py-2 text-sm font-semibold text-black/58 shadow-sm">{city}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
