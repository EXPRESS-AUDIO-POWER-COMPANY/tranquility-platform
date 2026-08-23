import { ClipboardList, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/8 bg-white/95 p-3 shadow-[0_-14px_40px_-24px_rgba(35,40,37,0.45)] backdrop-blur-lg md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/8 bg-tranquility-ivory px-4 text-sm font-bold text-tranquility-charcoal" to="/quote">
          <ClipboardList className="size-4" aria-hidden="true" />
          Get quote
        </Link>
        <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-tranquility-charcoal px-4 text-sm font-bold text-white" to="/booking">
          <Sparkles className="size-4" aria-hidden="true" />
          Book now
        </Link>
      </div>
    </div>
  )
}
