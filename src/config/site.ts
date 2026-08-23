const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.trim()

export const siteConfig = {
  name: 'Tranquility Cleaning',
  shortName: 'Tranquility',
  tagline: 'Come home to tranquility.',
  description:
    'Professional residential and commercial cleaning across Dallas-Fort Worth with simple booking, clear service options, and thoughtful care for every space.',
  siteUrl: configuredSiteUrl || 'https://tranquility.cleaning',
  phone: '(945) 402-3260',
  phoneHref: 'tel:+19454023260',
  email: 'tlcllc26@gmail.com',
  careerEmail: 'tlcllc26@gmail.com',
  serviceArea: 'Dallas-Fort Worth and surrounding communities',
  serviceAreaShort: 'Dallas-Fort Worth',
  serviceCities: [
    'Dallas',
    'Fort Worth',
    'Arlington',
    'Plano',
    'Irving',
    'Garland',
    'Frisco',
    'McKinney',
    'Grand Prairie',
    'Denton',
    'Mesquite',
    'Carrollton',
    'Lewisville',
    'Richardson',
  ],
} as const

export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Service Area', href: '/service-area' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
] as const
