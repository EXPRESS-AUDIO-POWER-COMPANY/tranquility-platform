import { Menu, Phone, Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BrandMark } from '@/components/brand/BrandMark'
import { ButtonLink } from '@/components/ui/Button'
import { primaryNav, siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-tranquility-ivory/95 backdrop-blur-xl supports-[backdrop-filter]:bg-tranquility-ivory/88">
      <div className="border-b border-white/8 bg-tranquility-charcoal text-white">
        <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-between gap-4 px-5 text-[11px] sm:text-xs lg:px-8">
          <Link className="flex min-w-0 items-center gap-2 text-white/72 transition hover:text-white" to="/service-area">
            <Sparkles className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">Serving {siteConfig.serviceAreaShort}</span>
          </Link>
          <a className="flex shrink-0 items-center gap-2 font-semibold tracking-[0.01em] text-white transition hover:text-white/80" href={siteConfig.phoneHref}>
            <Phone className="size-3.5" aria-hidden="true" />
            {siteConfig.phone}
          </a>
        </div>
      </div>

      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link aria-label={`${siteConfig.name} home`} className="group flex items-center gap-3.5" to="/">
          <span className="grid size-11 place-items-center rounded-full bg-tranquility-charcoal text-white shadow-soft transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_18px_45px_-24px_rgba(35,40,37,0.65)]">
            <BrandMark className="size-9" />
          </span>
          <span>
            <span className="block font-serif text-[1.42rem] font-medium leading-none tracking-[-0.025em]">Tranquility</span>
            <span className="mt-1.5 block text-[9px] font-bold uppercase tracking-[0.24em] text-tranquility-charcoal/45">Cleaning</span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-4 xl:flex">
          {primaryNav.map((item) => (
            <NavLink
              key={item.href}
              className={({ isActive }) => cn(
                'relative py-2 text-[13px] font-semibold text-tranquility-charcoal/58 transition duration-200 hover:text-tranquility-charcoal',
                isActive && 'text-tranquility-charcoal after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-tranquility-moss',
              )}
              to={item.href}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="ml-1 flex items-center gap-2.5">
            <ButtonLink to="/quote" variant="secondary">Get a quote</ButtonLink>
            <ButtonLink to="/booking">Book now</ButtonLink>
          </div>
        </nav>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={open}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          className="grid size-11 place-items-center rounded-full border border-black/10 bg-white shadow-sm transition hover:border-black/18 hover:bg-tranquility-ivory xl:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <nav aria-label="Mobile navigation" className="border-t border-black/6 bg-tranquility-ivory px-5 pb-5 shadow-[0_22px_45px_-35px_rgba(35,40,37,0.5)] xl:hidden" id="mobile-navigation">
          <div className="mx-auto grid max-w-7xl gap-1 pt-3 sm:grid-cols-2 lg:grid-cols-3">
            {primaryNav.map((item) => (
              <NavLink
                key={item.href}
                className={({ isActive }) => cn(
                  'rounded-2xl px-4 py-3 text-sm font-semibold text-tranquility-charcoal/68 transition hover:bg-white hover:text-tranquility-charcoal',
                  isActive && 'bg-white text-tranquility-charcoal shadow-sm',
                )}
                to={item.href}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2 sm:col-span-2 lg:col-span-3">
              <ButtonLink to="/quote" variant="secondary">Get quote</ButtonLink>
              <ButtonLink to="/booking">Book now</ButtonLink>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
