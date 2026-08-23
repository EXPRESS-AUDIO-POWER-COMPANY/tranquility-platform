export const siteConfig = {
  name: 'Tranquility Cleaning',
  shortName: 'Tranquility',
  tagline: 'Come home to tranquility.',
  description:
    'Professional residential and commercial cleaning across Dallas-Fort Worth with simple booking, clear service options, and thoughtful care for every space.',
  phone: '(945) 402-3260',
  phoneHref: 'tel:+19454023260',
  email: 'tlcllc26@gmail.com',
  serviceArea: 'Dallas-Fort Worth and surrounding communities',
  serviceAreaShort: 'Dallas-Fort Worth',
} as const

export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Careers', href: '/careers' },
] as const
