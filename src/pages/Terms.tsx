import { FileCheck2 } from 'lucide-react'
import { siteConfig } from '@/config/site'

const sections = [
  [
    'Service requests and pricing',
    'Information entered through the residential service-request flow is used to describe the requested cleaning and property. Unless an approved live-pricing feature is explicitly active, pricing is confirmed after Tranquility reviews the property details and requested scope. If a planning estimate is displayed in the future, it remains subject to property condition, actual scope, access limitations, specialty requests, and information that differs from the submitted profile.',
  ],
  [
    'Custom quotes',
    'Larger homes, commercial spaces, specialty conditions, and other jobs that need additional review may require a custom quote before service or pricing is confirmed.',
  ],
  [
    'Scheduling',
    'A preferred date or arrival window submitted through the website is a request, not a confirmed appointment, until Tranquility confirms availability. Scheduling may depend on location, staffing, travel time, service duration, property access, and the requested scope.',
  ],
  [
    'Customer information',
    'Customers are responsible for providing accurate contact, property, access, pet, room, and service information. Materially incomplete or inaccurate information may require the scope, schedule, or pricing to be reviewed before service is finalized.',
  ],
  [
    'Pets and property access',
    'Customers should disclose pets and relevant access conditions before service. Animals that could prevent safe service completion should be secured. Customers are responsible for providing lawful and reasonably safe access to the property.',
  ],
  [
    'Property photos',
    'The current website may allow customers to select property photos for local preview while preparing a quote request. Selected files are not treated as submitted to Tranquility unless they are later transmitted through an approved upload or communication method. Customers should not include identification documents, payment information, security credentials, or unrelated sensitive material.',
  ],
  [
    'Payment authorization',
    'If online reservation and payment functionality is enabled in the future, the applicable payment, authorization, charge timing, cancellation, and related terms will be presented as part of that transaction flow. The current public website does not itself finalize a payment authorization.',
  ],
  [
    'Service concerns',
    'Questions about service scope, scheduling, pricing, or a completed cleaning should be reported to Tranquility promptly so the concern can be reviewed with the relevant service details.',
  ],
  [
    'Website availability',
    'Tranquility may update website content, services, service areas, request workflows, and approved pricing or scheduling options as the business evolves. Website availability is not guaranteed to be uninterrupted.',
  ],
]

export function Terms() {
  return (
    <section className="px-5 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[2.4rem] bg-white p-8 shadow-premium sm:p-12">
          <span className="grid size-12 place-items-center rounded-full bg-tranquility-ivory text-tranquility-moss">
            <FileCheck2 className="size-5" aria-hidden="true" />
          </span>
          <p className="mt-7 eyebrow">Website terms</p>
          <h1 className="mt-4 font-serif text-5xl tracking-editorial sm:text-6xl">Terms of Use</h1>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-black/40">Last updated August 23, 2026</p>
          <p className="mt-6 max-w-3xl text-base leading-7 text-black/60">These terms describe the current website experience and the expectations around service requests, custom quotes, scheduling preferences, property information, and future transaction features.</p>

          <div className="mt-10 divide-y divide-black/8 border-y border-black/8">
            {sections.map(([title, body]) => (
              <section key={title} className="py-7">
                <h2 className="font-serif text-2xl">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-black/60">{body}</p>
              </section>
            ))}
          </div>

          <p className="mt-8 text-sm leading-7 text-black/55">
            Questions about these terms can be directed to{' '}
            <a className="font-semibold text-tranquility-moss transition hover:text-tranquility-charcoal" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>.
          </p>
        </div>
      </div>
    </section>
  )
}
