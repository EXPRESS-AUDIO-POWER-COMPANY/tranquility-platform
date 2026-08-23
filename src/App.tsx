import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { About } from '@/pages/About'
import { Booking } from '@/pages/Booking'
import { Careers } from '@/pages/Careers'
import { Contact } from '@/pages/Contact'
import { Faq } from '@/pages/Faq'
import { Home } from '@/pages/Home'
import { NotFound } from '@/pages/NotFound'
import { Privacy } from '@/pages/Privacy'
import { Quote } from '@/pages/Quote'
import { RouteError } from '@/pages/RouteError'
import { ServiceArea } from '@/pages/ServiceArea'
import { Services } from '@/pages/Services'
import { Terms } from '@/pages/Terms'

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    errorElement: <RouteError />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/services', element: <Services /> },
      { path: '/service-area', element: <ServiceArea /> },
      { path: '/booking', element: <Booking /> },
      { path: '/quote', element: <Quote /> },
      { path: '/about', element: <About /> },
      { path: '/faq', element: <Faq /> },
      { path: '/careers', element: <Careers /> },
      { path: '/contact', element: <Contact /> },
      { path: '/privacy', element: <Privacy /> },
      { path: '/terms', element: <Terms /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}
