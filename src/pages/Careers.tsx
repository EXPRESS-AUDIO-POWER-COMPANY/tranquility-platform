import { CheckCircle2, Mail, Phone, ShieldCheck, Smartphone, Truck } from 'lucide-react'
import { siteConfig } from '@/config/site'

const expectations = [
  { icon: Truck, title: 'Reliable transportation', body: 'Dependable transportation is important for reaching scheduled service locations throughout the Dallas-Fort Worth area.' },
  { icon: Smartphone, title: 'Reliable communication', body: 'A working smartphone and responsive communication help keep scheduling, access details, and job updates clear.' },
  { icon: ShieldCheck, title: 'Professional standards', body: 'Candidates should be eligible for required screening and committed to respectful, detail-oriented service.' },
]

export function Careers() {
  return (
    <>
      <section className="px-5 pb-14 pt-14 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <p className="eyebrow">Careers & contractor opportunities</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl">Bring reliability, care, and attention to detail.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-black/62">Tranquility welcomes dependable professionals who understand that customers are trusting a cleaning team inside personal homes and working spaces.</p>
          </div>

          <div className="rounded-[2.2rem] bg-white p-8 shadow-soft sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">Career inquiries</p>
            <h2 className="mt-4 font-serif text-3xl">Start with a direct conversation.</h2>
            <p className="mt-4 text-sm leading-7 text-black/58">For current opportunities, contractor onboarding questions, or future availability, contact Tranquility directly.</p>
            <div className="mt-7 grid gap-3">
              <a className="flex min-h-12 items-center gap-3 rounded-2xl bg-tranquility-ivory px-4 py-3 text-sm font-semibold hover:bg-tranquility-stone/35" href={`mailto:${siteConfig.careerEmail}?subject=Tranquility%20Career%20Inquiry`}>
                <Mail className="size-4 text-tranquility-moss" aria-hidden="true" />
                {siteConfig.careerEmail}
              </a>
              <a className="flex min-h-12 items-center gap-3 rounded-2xl bg-tranquility-ivory px-4 py-3 text-sm font-semibold hover:bg-tranquility-stone/35" href={siteConfig.phoneHref}>
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
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.4rem] bg-tranquility-charcoal p-8 text-white sm:p-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/42">A strong fit looks like</p>
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
