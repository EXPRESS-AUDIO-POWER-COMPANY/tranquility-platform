import { Menu, Phone, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/Button'
import { primaryNav, siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-tranquility-ivory/95 backdrop-blur-xl">
      <div className="border-b border-black/5 bg-tranquility-charcoal text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2 text-xs lg:px-8">
          <Link className="flex items-center gap-2 text-white/75 hover:text-white" to="/service-area">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Serving {siteConfig.serviceAreaShort}
          </Link>
          <a className="flex items-center gap-2 font-semibold text-white hover:text-white/80" href={siteConfig.phoneHref}>
            <Phone className="size-3.5" aria-hidden="true" />
            {siteConfig.phone}
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
        <Link aria-label={`${siteConfig.name} home`} className="group flex items-center gap-3" to="/">
          <span className="grid size-10 place-items-center rounded-full bg-tranquility-charcoal font-serif text-xl text-white shadow-soft transition-transform group-hover:scale-[1.03]">T</span>
          <span>
            <span className="block font-serif text-xl font-semibold leading-none tracking-tight">Tranquility</span>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-tranquility-charcoal/45">Cleaning</span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-4 xl:flex">
          {primaryNav.map((item) => (
            <NavLink
              key={item.href}
              className={({ isActive }) => cn(
                'relative py-2 text-[13px] font-semibold text-tranquility-charcoal/60 transition hover:text-tranquility-charcoal',
                isActive && 'text-tranquility-charcoal after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-tranquility-moss',
              )}
              to={item.href}
            >
              {item.label}
            </NavLink>
          ))}
          <ButtonLink to="/quote" variant="secondary">Get a quote</ButtonLink>
          <ButtonLink to="/booking">Book now</ButtonLink>
        </nav>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={open}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          className="grid size-11 place-items-center rounded-full border border-black/10 bg-white shadow-sm xl:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <nav aria-label="Mobile navigation" className="border-t border-black/5 bg-tranquility-ivory px-5 pb-5 xl:hidden" id="mobile-navigation">
          <div className="grid gap-1 pt-3 sm:grid-cols-2 lg:grid-cols-3">
            {primaryNav.map((item) => (
              <NavLink
                key={item.href}
                className={({ isActive }) => cn(
                  'rounded-2xl px-4 py-3 text-sm font-semibold text-tranquility-charcoal/70 hover:bg-white',
                  isActive && 'bg-white text-tranquility-charcoal shadow-sm',
                )}
                onClick={() => setOpen(false)}
                to={item.href}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2 sm:col-span-2 lg:col-span-3">
              <ButtonLink onClick={() => setOpen(false)} to="/quote" variant="secondary">Get quote</ButtonLink>
              <ButtonLink onClick={() => setOpen(false)} to="/booking">Book now</ButtonLink>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
