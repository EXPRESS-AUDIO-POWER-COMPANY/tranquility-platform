import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-tranquility-charcoal text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:grid-cols-[1.3fr_0.7fr_0.8fr] lg:px-8 lg:py-16">
        <div>
          <Link className="inline-flex items-center gap-3" to="/">
            <span className="grid size-11 place-items-center rounded-full bg-white font-serif text-xl text-tranquility-charcoal">T</span>
            <span>
              <span className="block font-serif text-2xl leading-none">Tranquility</span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Cleaning</span>
            </span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/62">{siteConfig.description}</p>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-white/35">{siteConfig.tagline}</p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/42">Explore</p>
          <div className="mt-5 grid gap-3 text-sm font-semibold text-white/76">
            <Link className="hover:text-white" to="/services">Services</Link>
            <Link className="hover:text-white" to="/booking">Build an estimate</Link>
            <Link className="hover:text-white" to="/quote">Virtual quote</Link>
            <Link className="hover:text-white" to="/about">About</Link>
            <Link className="hover:text-white" to="/faq">FAQ</Link>
            <Link className="hover:text-white" to="/careers">Careers</Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/42">Contact</p>
          <div className="mt-5 grid gap-4 text-sm text-white/72">
            <a className="flex items-start gap-3 hover:text-white" href={siteConfig.phoneHref}>
              <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {siteConfig.phone}
            </a>
            <a className="flex items-start gap-3 break-all hover:text-white" href={`mailto:${siteConfig.email}`}>
              <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {siteConfig.email}
            </a>
            <span className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {siteConfig.serviceArea}
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/8 px-5 py-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs text-white/35">
          <span>Tranquility Cleaning</span>
          <span>Dallas-Fort Worth, Texas</span>
        </div>
      </div>
    </footer>
  )
}
