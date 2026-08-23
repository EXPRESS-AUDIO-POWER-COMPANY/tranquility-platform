import { ChevronDown } from 'lucide-react'

const faqs = [
  ['How does residential pricing work?', 'Residential pricing begins with the size and layout of the home, then adjusts for the selected service, frequency, rooms, pets, and optional add-ons. Larger or unusually detailed jobs may move to a custom quote.'],
  ['What is the difference between standard and deep cleaning?', 'Standard cleaning is the recurring or routine maintenance path. Deep cleaning is designed for spaces that need more time and detail beyond normal maintenance, especially kitchens, bathrooms, fixtures, buildup, and commonly missed surfaces.'],
  ['Can pets stay home during the cleaning?', 'Yes, as long as they do not interfere with safe service completion. Animals that may become aggressive, highly anxious, or disruptive should be secured before the cleaning team arrives.'],
  ['Can the final service price change?', 'A residential estimate is based on the details provided. If the actual property condition or requested scope is materially different, Tranquility can review the job before confirming the final service scope and price.'],
  ['What is a virtual consultation?', 'A virtual consultation is the custom-quote path for customers who want a closer review. You can describe the space and select interior property photos so the scope can be evaluated more accurately.'],
  ['Do you offer recurring cleaning?', 'Yes. The residential experience supports one-time, weekly, biweekly, and monthly service options.'],
  ['Do I need to sign a long-term contract?', 'Tranquility offers one-time and recurring service options without requiring customers to choose a long-term service plan just to request cleaning. Any terms that apply to a confirmed recurring schedule should be reviewed when the service is finalized.'],
  ['Do I need to provide cleaning supplies?', 'Tranquility is designed to arrive prepared for the agreed cleaning scope. If you want specific products used, have specialty surfaces, or prefer a particular product type, share that information before service so the request can be reviewed.'],
  ['Do you clean commercial spaces?', 'Yes. Commercial cleaning is handled through a custom quote because property size, traffic, access, frequency, and service scope vary from business to business.'],
  ['What add-ons can I request?', 'Available add-ons include laundry, inside oven, inside refrigerator, dishwasher detail, spot or stain treatment, spot carpet cleaning, range hood or vent detail, and excess pet hair. Some specialty items may require review.'],
  ['Do I have to be home during service?', 'Not necessarily. Customers can provide lawful access instructions and property notes before service. Access details should be accurate and should never require a cleaning professional to enter an unsafe or unauthorized area.'],
  ['What should I tell you before the appointment?', 'Share anything that affects access, time, safety, or scope: pets, gate or entry details, rooms that should not be entered, specialty surfaces, stains, unusual buildup, parking limitations, or other conditions the team should know about.'],
  ['How does scheduling work?', 'Customers choose a preferred date and arrival window. The request is not a guaranteed appointment until Tranquility confirms service availability for the address, scope, and expected duration.'],
  ['What if I need to change my appointment?', 'Contact Tranquility as early as possible when a date or access plan changes. Any final rescheduling or cancellation terms that apply to a confirmed reservation will be reviewed with the booking.'],
]

export function Faq() {
  return (
    <section className="px-5 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow">Frequently asked questions</p>
        <h1 className="mt-5 max-w-3xl font-serif text-5xl tracking-tight sm:text-6xl">Straight answers before you book.</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-black/60">The essentials are kept in one place so customers can understand the service without digging through a complicated website.</p>
        <div className="mt-10 divide-y divide-black/8 rounded-[2.2rem] bg-white px-6 shadow-soft sm:px-9">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold marker:hidden">
                <span>{question}</span>
                <ChevronDown className="size-4 shrink-0 text-tranquility-moss transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-4 max-w-3xl pr-8 text-sm leading-7 text-black/60">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
