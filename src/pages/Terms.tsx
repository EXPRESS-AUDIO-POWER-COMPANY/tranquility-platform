import { FileCheck2 } from 'lucide-react'
import { siteConfig } from '@/config/site'

const sections = [
  ['Website estimates', 'Residential prices shown by the website are planning estimates based on the information selected by the customer. Property condition, actual scope, access limitations, specialty requests, and information that differs from the submitted profile can affect final pricing.'],
  ['Custom quotes', 'Larger homes, commercial spaces, specialty conditions, and other jobs outside the standard residential pricing path may require a custom quote before service is confirmed.'],
  ['Scheduling', 'A preferred date or arrival window is a service request until Tranquility confirms availability. Scheduling may depend on location, staffing, travel time, service duration, and the requested scope.'],
  ['Customer information', 'Customers are responsible for providing accurate contact, property, access, pet, room, and service information. Materially incomplete or inaccurate information may require the scope, schedule, or price to be reviewed.'],
  ['Pets and property access', 'Customers should disclose pets and relevant access conditions before service. Animals that could prevent safe service completion should be secured. Customers are responsible for providing lawful and safe access to the property.'],
  ['Payment authorization', 'When online reservation and payment functionality is enabled, the booking flow may require a valid payment method before a reservation can be finalized. Any charge timing and authorization language will be presented during the payment step.'],
  ['Service concerns', 'Questions about service scope, scheduling, pricing, or a completed cleaning should be reported to Tranquility promptly so the concern can be reviewed with the relevant booking details.'],
  ['Website availability', 'Tranquility may update website content, services, pricing logic, service areas, and scheduling options as the business evolves. Website availability is not guaranteed to be uninterrupted.'],
]

export function Terms() {
  return (
    <section className="px-5 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[2.4rem] bg-white p-8 shadow-soft sm:p-12">
          <span className="grid size-12 place-items-center rounded-full bg-tranquility-ivory text-tranquility-moss"><FileCheck2 className="size-5" aria-hidden="true" /></span>
          <p className="mt-7 eyebrow">Website terms</p>
          <h1 className="mt-4 font-serif text-5xl tracking-tight sm:text-6xl">Terms of Use</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-black/60">These terms describe the current website experience and the expectations around estimates, quote requests, scheduling, and service information.</p>

          <div className="mt-10 divide-y divide-black/8 border-y border-black/8">
            {sections.map(([title, body]) => (
              <section key={title} className="py-7">
                <h2 className="font-serif text-2xl">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-black/60">{body}</p>
              </section>
            ))}
          </div>

          <p className="mt-8 text-sm leading-7 text-black/55">Questions about these terms can be directed to <a className="font-semibold text-tranquility-moss hover:text-tranquility-charcoal" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>
        </div>
      </div>
    </section>
  )
}
