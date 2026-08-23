import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/Button'

export function RouteError() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'Something unexpected happened while loading this page.'

  return (
    <section className="min-h-[70vh] bg-tranquility-ivory px-5 py-24 text-center text-tranquility-charcoal lg:px-8">
      <p className="eyebrow">Unable to load page</p>
      <h1 className="mt-4 font-serif text-5xl">We hit a problem.</h1>
      <p className="mx-auto mt-4 max-w-xl text-black/60">{message}</p>
      <ButtonLink className="mt-7" to="/">Return home</ButtonLink>
    </section>
  )
}
