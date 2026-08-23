import { cn } from '@/lib/utils'

type BrandMarkProps = {
  className?: string
}

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn('shrink-0', className)}
      fill="none"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M13.5 14.5h21M24 14.5v16.2c0 4.2 2.7 6.8 6.9 6.8h3.6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
      <path
        d="M30.5 10.25c.42 1.8 1.65 3.03 3.45 3.45-1.8.42-3.03 1.65-3.45 3.45-.42-1.8-1.65-3.03-3.45-3.45 1.8-.42 3.03-1.65 3.45-3.45Z"
        fill="currentColor"
      />
    </svg>
  )
}
