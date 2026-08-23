import { ButtonLink } from '@/components/ui/Button'

export function NotFound() {
  return (
    <section className="px-5 py-24 text-center lg:px-8">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-serif text-5xl">That page is not here.</h1>
      <p className="mx-auto mt-4 max-w-xl text-black/60">Return to the main Tranquility experience.</p>
      <ButtonLink className="mt-7" to="/">Go home</ButtonLink>
    </section>
  )
}
