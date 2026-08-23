import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { About } from '@/pages/About'
import { Booking } from '@/pages/Booking'
import { Careers } from '@/pages/Careers'
import { Faq } from '@/pages/Faq'
import { Home } from '@/pages/Home'
import { NotFound } from '@/pages/NotFound'
import { Quote } from '@/pages/Quote'
import { RouteError } from '@/pages/RouteError'

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    errorElement: <RouteError />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/booking', element: <Booking /> },
      { path: '/quote', element: <Quote /> },
      { path: '/about', element: <About /> },
      { path: '/faq', element: <Faq /> },
      { path: '/careers', element: <Careers /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}
