const faqs = [
  [
    'How does residential pricing work?',
    'Residential pricing begins with the size and layout of the home, then adjusts for the selected service, frequency, rooms, pets, and optional add-ons. Larger or unusually detailed jobs may move to a custom quote.',
  ],
  [
    'Can pets stay home during the cleaning?',
    'Yes, as long as they do not interfere with safe service completion. Animals that may become aggressive, highly anxious, or disruptive should be secured before the cleaning team arrives.',
  ],
  [
    'Can the final service price change?',
    'A residential estimate is based on the details provided. If the actual property condition or requested scope is materially different, Tranquility can review the job before confirming the final service scope.',
  ],
  [
    'What is a virtual consultation?',
    'A virtual consultation is the custom-quote path for customers who want a closer review. You can describe the space and prepare interior property photos so the scope can be evaluated more accurately.',
  ],
  [
    'Do you offer recurring cleaning?',
    'Yes. The residential experience supports one-time, weekly, biweekly, and monthly service options.',
  ],
  [
    'Do you clean commercial spaces?',
    'Yes. Commercial cleaning is handled through a custom quote because property size, traffic, access, frequency, and service scope vary from business to business.',
  ],
  [
    'What add-ons can I request?',
    'Available add-ons include laundry, inside oven, inside refrigerator, dishwasher detail, spot or stain treatment, spot carpet cleaning, range hood or vent detail, and excess pet hair. Some specialty items may require review.',
  ],
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
              <summary className="cursor-pointer list-none pr-8 font-semibold marker:hidden">{question}</summary>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-black/60">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
