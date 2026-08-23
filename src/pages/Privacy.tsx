import { Mail, ShieldCheck } from 'lucide-react'
import { siteConfig } from '@/config/site'

const sections = [
  ['Information you provide', 'When you contact Tranquility, build a cleaning estimate, request a custom quote, or inquire about careers, you may provide contact information, property details, scheduling preferences, service notes, and property images.'],
  ['How information is used', 'Information submitted to Tranquility is used to respond to requests, evaluate cleaning scope, prepare quotes, coordinate service, communicate about appointments, and operate the business.'],
  ['Property images', 'Interior property images are intended only for cleaning-scope review. Do not submit identification documents, financial information, payment-card images, or unrelated sensitive content through a quote-photo workflow.'],
  ['Payments', 'When online payment functionality is enabled, payment-card details will be collected by the payment processor rather than stored as raw card data by the Tranquility application.'],
  ['Service providers', 'Tranquility may use technology and service providers to host the website, process forms, store business records, deliver communications, and process payments. Those providers receive information only as needed for the services they perform.'],
  ['Security and retention', 'Reasonable technical and operational safeguards should be used for customer information. Information should be retained only as long as needed for business, legal, accounting, safety, or dispute-resolution purposes.'],
  ['Your questions', `Questions about privacy or information submitted through this website can be directed to ${siteConfig.email}.`],
]

export function Privacy() {
  return (
    <section className="px-5 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[2.4rem] bg-white p-8 shadow-soft sm:p-12">
          <span className="grid size-12 place-items-center rounded-full bg-tranquility-ivory text-tranquility-moss"><ShieldCheck className="size-5" aria-hidden="true" /></span>
          <p className="mt-7 eyebrow">Privacy</p>
          <h1 className="mt-4 font-serif text-5xl tracking-tight sm:text-6xl">Privacy Policy</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-black/60">This policy explains the information Tranquility Cleaning may receive through the website and how that information is intended to be handled.</p>

          <div className="mt-10 divide-y divide-black/8 border-y border-black/8">
            {sections.map(([title, body]) => (
              <section key={title} className="py-7">
                <h2 className="font-serif text-2xl">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-black/60">{body}</p>
              </section>
            ))}
          </div>

          <a className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-tranquility-moss hover:text-tranquility-charcoal" href={`mailto:${siteConfig.email}`}>
            <Mail className="size-4" aria-hidden="true" />
            {siteConfig.email}
          </a>
        </div>
      </div>
    </section>
  )
}
