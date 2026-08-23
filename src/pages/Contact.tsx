import { ArrowRight, Mail, MapPin, MessageSquareText, Phone, Sparkles } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button, ButtonLink } from '@/components/ui/Button'
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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [topic, setTopic] = useState('General service question')
  const [message, setMessage] = useState('')

  function handleEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const subject = encodeURIComponent(`Tranquility — ${topic}`)
    const body = encodeURIComponent([
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      `Topic: ${topic}`,
      '',
      message,
    ].join('\n'))
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
  }

  return (
    <>
      <section className="px-5 pb-14 pt-14 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">Contact Tranquility</p>
            <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl">A simple path to the right kind of help.</h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-black/60 lg:justify-self-end">Residential booking, custom quotes, commercial cleaning, service questions, and contractor inquiries all have a clear next step.</p>
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
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <MessageSquareText className="size-7 text-tranquility-moss" aria-hidden="true" />
            <p className="mt-6 eyebrow">General questions</p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl tracking-tight">Write the message here, then send it through your email app.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-black/58">This keeps general inquiries functional without pretending a backend form submission exists before secure message persistence is connected.</p>
          </div>

          <form className="rounded-[2rem] bg-tranquility-ivory p-7 sm:p-9" onSubmit={handleEmail}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">Name<input autoComplete="name" className="field bg-white" minLength={2} onChange={(event) => setName(event.target.value)} required value={name} /></label>
              <label className="grid gap-2 text-sm font-semibold">Email<input autoComplete="email" className="field bg-white" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} /></label>
              <label className="grid gap-2 text-sm font-semibold">Phone <span className="font-normal text-black/40">(optional)</span><input autoComplete="tel" className="field bg-white" onChange={(event) => setPhone(event.target.value)} type="tel" value={phone} /></label>
              <label className="grid gap-2 text-sm font-semibold">Topic<select className="field bg-white" onChange={(event) => setTopic(event.target.value)} value={topic}><option>General service question</option><option>Residential cleaning</option><option>Commercial cleaning</option><option>Scheduling question</option><option>Existing service concern</option><option>Other</option></select></label>
            </div>
            <label className="mt-5 grid gap-2 text-sm font-semibold">Message<textarea className="field min-h-36 bg-white" maxLength={2000} onChange={(event) => setMessage(event.target.value)} required value={message} /><span className="text-right text-xs font-normal text-black/35">{message.length}/2000</span></label>
            <Button className="mt-6" type="submit">Open email to send <Mail className="ml-2 size-4" /></Button>
          </form>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-2">
            {paths.map((path) => (
              <article key={path.title} className="rounded-[2.2rem] border border-black/7 bg-white p-8 shadow-soft sm:p-10">
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
            <ButtonLink className="mt-6" to="/service-area" variant="secondary">View full service area <ArrowRight className="ml-2 size-4" /></ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
