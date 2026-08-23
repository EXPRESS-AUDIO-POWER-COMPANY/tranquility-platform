import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { MobileActionBar } from './MobileActionBar'
import { RouteEnhancements } from './RouteEnhancements'

export function SiteLayout() {
  return (
    <div className="min-h-screen bg-tranquility-ivory text-tranquility-charcoal">
      <RouteEnhancements />
      <a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:shadow-soft" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main className="pb-20 md:pb-0" id="main-content">
        <Outlet />
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  )
}
