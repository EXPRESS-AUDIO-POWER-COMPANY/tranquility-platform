import { CheckCircle2, Mail, Phone, Send, ShieldCheck, Smartphone, Truck } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/config/site'

const expectations = [
  { icon: Truck, title: 'Reliable transportation', body: 'Dependable transportation is important for reaching scheduled service locations throughout the Dallas-Fort Worth area.' },
  { icon: Smartphone, title: 'Reliable communication', body: 'A working smartphone and responsive communication help keep scheduling, access details, and job updates clear.' },
  { icon: ShieldCheck, title: 'Professional standards', body: 'Candidates should be prepared to discuss screening requirements and committed to respectful, detail-oriented service.' },
]

export function Careers() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [transportation, setTransportation] = useState('')
  const [experience, setExperience] = useState('')
  const [availability, setAvailability] = useState('')
  const [message, setMessage] = useState('')

  const inquiryHref = useMemo(() => {
    const subject = encodeURIComponent(`Tranquility Career Inquiry — ${fullName || 'Applicant'}`)
    const body = encodeURIComponent([
      `Name: ${fullName || 'Not entered'}`,
      `Email: ${email || 'Not entered'}`,
      `Phone: ${phone || 'Not entered'}`,
      `City: ${city || 'Not entered'}`,
      `Reliable transportation: ${transportation || 'Not answered'}`,
      `Cleaning experience: ${experience || 'Not answered'}`,
      `Availability: ${availability || 'Not answered'}`,
      '',
      'Additional information:',
      message || 'None provided',
    ].join('\n'))

    return `mailto:${siteConfig.careerEmail}?subject=${subject}&body=${body}`
  }, [availability, city, email, experience, fullName, message, phone, transportation])

  const formComplete =
    fullName.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    phone.replace(/\D/g, '').length >= 10 &&
    city.trim().length >= 2 &&
    transportation.length > 0 &&
    experience.length > 0 &&
    availability.length > 0

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (formComplete) window.location.href = inquiryHref
  }

  return (
    <>
      <section className="px-5 pb-14 pt-14 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <p className="eyebrow">Careers & opportunities</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] tracking-editorial sm:text-6xl">Bring reliability, care, and attention to detail.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-black/62">Tranquility welcomes inquiries from dependable professionals who understand that customers are trusting a cleaning team inside personal homes and working spaces.</p>
          </div>

          <div className="rounded-[2.2rem] bg-white p-8 shadow-premium sm:p-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">Direct contact</p>
            <h2 className="mt-4 font-serif text-3xl">Questions before you inquire?</h2>
            <p className="mt-4 text-sm leading-7 text-black/58">Use the structured inquiry below, or contact Tranquility directly for questions about current or future opportunities.</p>
            <div className="mt-7 grid gap-3">
              <a className="flex min-h-12 items-center gap-3 rounded-2xl bg-tranquility-ivory px-4 py-3 text-sm font-semibold transition hover:bg-tranquility-stone/35" href={`mailto:${siteConfig.careerEmail}?subject=Tranquility%20Career%20Inquiry`}>
                <Mail className="size-4 text-tranquility-moss" aria-hidden="true" />
                {siteConfig.careerEmail}
              </a>
              <a className="flex min-h-12 items-center gap-3 rounded-2xl bg-tranquility-ivory px-4 py-3 text-sm font-semibold transition hover:bg-tranquility-stone/35" href={siteConfig.phoneHref}>
                <Phone className="size-4 text-tranquility-moss" aria-hidden="true" />
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">What matters</p>
          <h2 className="mt-5 max-w-3xl font-serif text-4xl tracking-tight sm:text-5xl">Professional service starts before the cleaning begins.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {expectations.map(({ icon: ExpectationIcon, title, body }) => (
              <article key={title} className="rounded-[2rem] border border-black/7 bg-tranquility-ivory p-7">
                <span className="grid size-11 place-items-center rounded-full bg-white text-tranquility-moss shadow-sm"><ExpectationIcon className="size-5" aria-hidden="true" /></span>
                <h3 className="mt-6 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/58">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">Career inquiry</p>
            <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">Share the basics before the first conversation.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-black/58">This inquiry prepares a structured email to Tranquility. It does not promise employment, contractor status, an interview, or a current opening.</p>
            <div className="mt-7 rounded-2xl border border-black/7 bg-white p-5 text-xs leading-6 text-black/55 shadow-sm">
              Do not include Social Security numbers, banking information, identification documents, or other sensitive records in an initial inquiry.
            </div>
          </div>

          <form className="rounded-[2.2rem] bg-white p-7 shadow-premium sm:p-10" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">Full name<input autoComplete="name" className="field" onChange={(event) => setFullName(event.target.value)} required value={fullName} /></label>
              <label className="grid gap-2 text-sm font-semibold">Email<input autoComplete="email" className="field" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} /></label>
              <label className="grid gap-2 text-sm font-semibold">Phone<input autoComplete="tel" className="field" onChange={(event) => setPhone(event.target.value)} required type="tel" value={phone} /></label>
              <label className="grid gap-2 text-sm font-semibold">City<input autoComplete="address-level2" className="field" onChange={(event) => setCity(event.target.value)} required value={city} /></label>
              <label className="grid gap-2 text-sm font-semibold">Reliable transportation<select className="field" onChange={(event) => setTransportation(event.target.value)} required value={transportation}><option value="">Select one</option><option value="Yes">Yes</option><option value="No">No</option><option value="Need to discuss">Need to discuss</option></select></label>
              <label className="grid gap-2 text-sm font-semibold">Cleaning experience<select className="field" onChange={(event) => setExperience(event.target.value)} required value={experience}><option value="">Select one</option><option value="No professional experience">No professional experience</option><option value="Less than 1 year">Less than 1 year</option><option value="1–3 years">1–3 years</option><option value="3+ years">3+ years</option></select></label>
              <label className="grid gap-2 text-sm font-semibold sm:col-span-2">General availability<select className="field" onChange={(event) => setAvailability(event.target.value)} required value={availability}><option value="">Select one</option><option value="Weekdays">Weekdays</option><option value="Evenings">Evenings</option><option value="Weekends">Weekends</option><option value="Flexible">Flexible</option><option value="Need to discuss">Need to discuss</option></select></label>
            </div>

            <label className="mt-6 grid gap-2 text-sm font-semibold">Anything else Tranquility should know? <span className="font-normal text-black/40">(optional)</span><textarea className="field min-h-32" maxLength={1500} onChange={(event) => setMessage(event.target.value)} value={message} /><span className="text-right text-xs font-normal text-black/40">{message.length}/1500</span></label>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button disabled={!formComplete} type="submit">Prepare career inquiry <Send className="ml-2 size-4" /></Button>
              <span className="text-xs leading-5 text-black/45">Opens your email app with the inquiry details prepared.</span>
            </div>
          </form>
        </div>
      </section>

      <section className="px-5 pb-20 lg:px-8 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.4rem] bg-tranquility-charcoal p-8 text-white sm:p-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/42">A strong fit looks like</p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight">Reliable, respectful, and serious about quality.</h2>
          </div>
          <div className="grid gap-3">
            {['Detail-oriented work', 'Respectful customer interaction', 'Dependable attendance and communication', 'Ability to follow service instructions and property notes'].map((item) => (
              <span key={item} className="flex items-start gap-3 text-sm text-white/72">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-tranquility-stone" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
