import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'

const base =
  'group inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold tracking-[-0.01em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tranquility-moss focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary:
    'bg-tranquility-charcoal text-white shadow-[0_14px_32px_-22px_rgba(35,40,37,0.9)] hover:-translate-y-0.5 hover:bg-tranquility-moss hover:shadow-[0_18px_38px_-22px_rgba(35,40,37,0.7)] active:translate-y-0',
  secondary:
    'border border-black/8 bg-white text-tranquility-charcoal shadow-[0_12px_30px_-24px_rgba(35,40,37,0.45)] hover:-translate-y-0.5 hover:border-black/14 hover:bg-tranquility-ivory active:translate-y-0',
  ghost: 'text-tranquility-charcoal hover:bg-white/70',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], className)} {...props} />
}

type ButtonLinkProps = PropsWithChildren<
  Omit<LinkProps, 'className'> & {
    className?: string
    variant?: Variant
  }
>

export function ButtonLink({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      {children}
    </Link>
  )
}
