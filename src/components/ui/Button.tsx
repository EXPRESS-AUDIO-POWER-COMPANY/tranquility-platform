import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'

const base =
  'inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tranquility-moss focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-tranquility-charcoal text-white hover:bg-tranquility-moss',
  secondary: 'bg-white text-tranquility-charcoal shadow-soft hover:bg-tranquility-ivory',
  ghost: 'text-tranquility-charcoal hover:bg-white/70',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], className)} {...props} />
}

export function ButtonLink({
  to,
  children,
  className,
  variant = 'primary',
}: PropsWithChildren<{ to: string; className?: string; variant?: Variant }>) {
  return (
    <Link className={cn(base, variants[variant], className)} to={to}>
      {children}
    </Link>
  )
}
