export function About() {
  return (
    <section className="px-5 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow">About Tranquility</p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl tracking-tight sm:text-6xl">Professional cleaning designed to make home feel lighter.</h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-black/65">
          Tranquility serves homes across the Dallas-Fort Worth area with a simple goal: make it easier to schedule dependable cleaning without making the process feel complicated.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            ['Clear pricing path', 'Residential customers can build a base estimate from the size and layout of the home, while custom jobs can move to a virtual quote.'],
            ['Thoughtful service', 'Property details, pets, access notes, and add-ons are captured up front so the cleaning team can arrive better prepared.'],
            ['Flexible care', 'Choose one-time, weekly, biweekly, or monthly service based on what works for your household.'],
          ].map(([title, body]) => (
            <article key={title} className="rounded-4xl bg-white p-7 shadow-soft">
              <h2 className="font-serif text-2xl">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-black/60">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
