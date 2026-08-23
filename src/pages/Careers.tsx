import { siteConfig } from '@/config/site'

export function Careers() {
  return (
    <section className="px-5 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl rounded-4xl bg-white p-8 shadow-soft sm:p-12">
        <p className="eyebrow">Careers</p>
        <h1 className="mt-5 font-serif text-5xl tracking-tight">Interested in working with Tranquility?</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-black/60">
          Tranquility welcomes reliable, detail-oriented professionals who care about delivering respectful service inside customers&apos; homes and businesses.
        </p>
        <div className="mt-8 rounded-3xl bg-tranquility-ivory p-6">
          <p className="text-sm font-semibold">Contractor and career inquiries</p>
          <p className="mt-2 text-sm text-black/60">Email {siteConfig.email} or call {siteConfig.phone}.</p>
        </div>
      </div>
    </section>
  )
}
