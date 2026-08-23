const faqs = [
  ['When am I charged?', 'The target production flow requires a valid payment method to reserve service while charging only after the cleaning is completed, subject to the final business policy and Stripe implementation.'],
  ['Can pets stay home?', 'Yes, as long as they do not interfere with safe service completion. Animals that may become aggressive, anxious, or disruptive should be secured before the cleaning team arrives.'],
  ['Can pricing change?', 'Yes. Instant residential pricing is a base estimate and can be adjusted when the actual property condition or requested scope materially differs from the submitted information.'],
  ['What if I want a custom quote?', 'Use the virtual consultation path to describe the property and, once private storage is enabled, attach interior photos for a more accurate review.'],
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
