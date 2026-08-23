import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

export function SiteLayout() {
  return (
    <div className="min-h-screen bg-tranquility-ivory text-tranquility-charcoal">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
