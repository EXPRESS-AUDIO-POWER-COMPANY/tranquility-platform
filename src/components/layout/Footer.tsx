import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BrandMark } from '@/components/brand/BrandMark'
import { siteConfig } from '@/config/site'

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-tranquility-charcoal text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.2fr_0.7fr_0.9fr] lg:px-8 lg:py-20">
        <div>
          <Link className="group inline-flex items-center gap-3.5" to="/">
            <span className="grid size-12 place-items-center rounded-full border border-white/16 bg-white/[0.055] text-white transition group-hover:bg-white/10">
              <BrandMark className="size-10" />
            </span>
            <span>
              <span className="block font-serif text-2xl font-medium leading-none tracking-[-0.025em]">Tranquility</span>
              <span className="mt-1.5 block text-[9px] font-bold uppercase tracking-[0.24em] text-white/45">Cleaning</span>
            </span>
          </Link>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/62">{siteConfig.description}</p>
          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">{siteConfig.tagline}</p>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/42">Explore</p>
          <div className="mt-5 grid gap-3 text-sm font-semibold text-white/72">
            <Link className="transition hover:text-white" to="/services">Services</Link>
            <Link className="transition hover:text-white" to="/service-area">Service area</Link>
            <Link className="transition hover:text-white" to="/booking">Build an estimate</Link>
            <Link className="transition hover:text-white" to="/quote">Virtual quote</Link>
            <Link className="transition hover:text-white" to="/about">About</Link>
            <Link className="transition hover:text-white" to="/faq">FAQ</Link>
            <Link className="transition hover:text-white" to="/careers">Careers</Link>
            <Link className="transition hover:text-white" to="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/42">Contact</p>
          <div className="mt-5 grid gap-4 text-sm text-white/72">
            <a className="flex items-start gap-3 transition hover:text-white" href={siteConfig.phoneHref}>
              <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{siteConfig.phone}</span>
            </a>
            <a className="flex items-start gap-3 break-all transition hover:text-white" href={`mailto:${siteConfig.email}`}>
              <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{siteConfig.email}</span>
            </a>
            <Link className="flex items-start gap-3 transition hover:text-white" to="/service-area">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{siteConfig.serviceArea}</span>
            </Link>
          </div>
          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="text-xs leading-6 text-white/45">Residential estimates, custom property reviews, commercial inquiries, and direct service support.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 px-5 py-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Tranquility Cleaning · Dallas-Fort Worth, Texas</span>
          <div className="flex flex-wrap items-center gap-4">
            <Link className="transition hover:text-white" to="/privacy">Privacy</Link>
            <Link className="transition hover:text-white" to="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
