const faqs = [
  ['When am I charged?', 'A valid payment method is required to reserve service. The intended Tranquility workflow is to charge after the cleaning is completed rather than collecting the full service amount at booking.'],
  ['Can pets stay home?', 'Yes, as long as they do not interfere with safe service completion. Animals that may become aggressive, highly anxious, or disruptive should be secured before the cleaning team arrives.'],
  ['Can pricing change?', 'Yes. Residential instant pricing is a base estimate. The final amount may change when the actual property condition, requested scope, or information provided differs materially from the booking details.'],
  ['What if I want a custom quote?', 'Use the virtual consultation option to describe the property and include interior photos so Tranquility can review the scope more closely before service.'],
  ['Do I need to provide cleaning supplies?', 'Tranquility is designed to arrive prepared with standard cleaning supplies. If you prefer specific products or have sensitivities, include that information with your service request.'],
  ['Can I reschedule or cancel?', 'Appointments can be rescheduled or cancelled subject to the current Tranquility scheduling policy. Final cancellation windows and any applicable late-cancellation terms are confirmed with the booking.'],
]

export function Faq() {
  return (
    <section className="px-5 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow">Frequently asked questions</p>
        <h1 className="mt-5 font-serif text-5xl tracking-tight">Straight answers, no clutter.</h1>
        <div className="mt-10 divide-y divide-black/10 rounded-4xl bg-white px-6 shadow-soft sm:px-8">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group py-6">
              <summary className="cursor-pointer list-none font-semibold">{question}</summary>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-black/60">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
