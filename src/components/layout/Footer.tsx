import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-tranquility-charcoal text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-serif text-2xl">Tranquility</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">{siteConfig.description}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">Explore</p>
          <div className="mt-4 grid gap-2 text-sm">
            <Link to="/booking">Book now</Link>
            <Link to="/quote">Request a quote</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/careers">Careers</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">Contact</p>
          <div className="mt-4 grid gap-2 text-sm text-white/80">
            <span>{siteConfig.phone}</span>
            <span>{siteConfig.email}</span>
            <span>{siteConfig.serviceArea}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
