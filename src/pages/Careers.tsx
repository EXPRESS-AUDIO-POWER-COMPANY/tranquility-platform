import { siteConfig } from '@/config/site'

export function Careers() {
  return (
    <section className="px-5 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl rounded-4xl bg-white p-8 shadow-soft sm:p-12">
        <p className="eyebrow">Careers</p>
        <h1 className="mt-5 font-serif text-5xl tracking-tight">Interested in working with Tranquility?</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-black/60">The launch scope keeps contractor recruiting intentionally simple. A dedicated careers inbox can be connected for inquiries and onboarding when the business email is finalized.</p>
        <div className="mt-8 rounded-3xl bg-tranquility-ivory p-6">
          <p className="text-sm font-semibold">Current business contact</p>
          <p className="mt-2 text-sm text-black/60">{siteConfig.email} • {siteConfig.phone}</p>
        </div>
      </div>
    </section>
  )
}
