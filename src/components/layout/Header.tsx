import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/Button'
import { primaryNav, siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-tranquility-ivory/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link aria-label={`${siteConfig.name} home`} className="font-serif text-xl font-semibold tracking-tight" to="/">
          Tranquility
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {primaryNav.map((item) => (
            <NavLink
              key={item.href}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium text-tranquility-charcoal/70 hover:text-tranquility-charcoal',
                  isActive && 'text-tranquility-charcoal',
                )
              }
              to={item.href}
            >
              {item.label}
            </NavLink>
          ))}
          <ButtonLink to="/booking">Book now</ButtonLink>
        </nav>
        <button
          aria-expanded={open}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          className="rounded-full p-2 md:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <nav aria-label="Mobile navigation" className="border-t border-black/5 px-5 pb-5 md:hidden">
          <div className="grid gap-1 pt-3">
            {primaryNav.map((item) => (
              <NavLink
                key={item.href}
                className="rounded-2xl px-4 py-3 text-sm font-semibold hover:bg-white/70"
                onClick={() => setOpen(false)}
                to={item.href}
              >
                {item.label}
              </NavLink>
            ))}
            <ButtonLink className="mt-2" to="/booking">Book now</ButtonLink>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
