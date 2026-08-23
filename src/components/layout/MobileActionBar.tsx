import { ClipboardList, Phone, Sparkles } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { siteConfig } from '@/config/site'

const baseClass = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-4 text-sm font-bold'

export function MobileActionBar() {
  const location = useLocation()
  const onBooking = location.pathname === '/booking'
  const onQuote = location.pathname === '/quote'
  const reservationLabel = siteConfig.onlineBookingEnabled ? 'Book now' : 'Start request'

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-black/8 bg-white/95 px-3 pt-3 shadow-[0_-14px_40px_-24px_rgba(35,40,37,0.45)] backdrop-blur-lg md:hidden"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        {onQuote ? (
          <Link className={`${baseClass} border border-black/8 bg-tranquility-ivory text-tranquility-charcoal`} to="/booking">
            <Sparkles className="size-4" aria-hidden="true" />
            {reservationLabel}
          </Link>
        ) : (
          <Link className={`${baseClass} border border-black/8 bg-tranquility-ivory text-tranquility-charcoal`} to="/quote">
            <ClipboardList className="size-4" aria-hidden="true" />
            {onBooking ? 'Custom quote' : 'Get quote'}
          </Link>
        )}

        {onBooking || onQuote ? (
          <a className={`${baseClass} bg-tranquility-charcoal text-white`} href={siteConfig.phoneHref}>
            <Phone className="size-4" aria-hidden="true" />
            Call now
          </a>
        ) : (
          <Link className={`${baseClass} bg-tranquility-charcoal text-white`} to="/booking">
            <Sparkles className="size-4" aria-hidden="true" />
            {reservationLabel}
          </Link>
        )}
      </div>
    </div>
  )
}
