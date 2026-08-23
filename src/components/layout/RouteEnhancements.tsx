import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteConfig } from '@/config/site'

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Tranquility Cleaning | Professional Cleaning in Dallas-Fort Worth',
    description: siteConfig.description,
  },
  '/services': {
    title: 'Cleaning Services | Tranquility Cleaning',
    description: 'Explore residential, deep cleaning, move-in and move-out, commercial, and specialty cleaning options from Tranquility Cleaning across Dallas-Fort Worth.',
  },
  '/service-area': {
    title: 'Dallas-Fort Worth Service Area | Tranquility Cleaning',
    description: 'See the Dallas-Fort Worth communities served by Tranquility Cleaning and request availability for nearby residential or commercial properties.',
  },
  '/booking': {
    title: 'Build a Cleaning Estimate | Tranquility Cleaning',
    description: 'Build a residential cleaning estimate based on service type, home size, rooms, pets, frequency, and optional add-ons.',
  },
  '/quote': {
    title: 'Request a Virtual Cleaning Quote | Tranquility Cleaning',
    description: 'Prepare a custom cleaning review for larger homes, commercial spaces, special conditions, or properties that need a closer look.',
  },
  '/about': {
    title: 'About Tranquility Cleaning | Dallas-Fort Worth',
    description: 'Learn how Tranquility Cleaning approaches dependable, thoughtful service with simple booking and clear expectations across Dallas-Fort Worth.',
  },
  '/faq': {
    title: 'Frequently Asked Questions | Tranquility Cleaning',
    description: 'Answers about pricing, pets, custom quotes, recurring cleaning, supplies, scheduling, and service expectations.',
  },
  '/careers': {
    title: 'Careers | Tranquility Cleaning',
    description: 'Learn about contractor and career opportunities with Tranquility Cleaning in the Dallas-Fort Worth area.',
  },
  '/contact': {
    title: 'Contact Tranquility Cleaning | Dallas-Fort Worth',
    description: 'Contact Tranquility Cleaning for residential, commercial, custom quote, service, and career questions across Dallas-Fort Worth.',
  },
  '/privacy': {
    title: 'Privacy Policy | Tranquility Cleaning',
    description: 'Read how information provided through the Tranquility Cleaning website is intended to be used and protected.',
  },
  '/terms': {
    title: 'Terms of Use | Tranquility Cleaning',
    description: 'Read the website terms covering cleaning estimates, custom quotes, scheduling, customer information, and service requests.',
  },
}

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

export function RouteEnhancements() {
  const location = useLocation()

  useEffect(() => {
    const meta = pageMeta[location.pathname] ?? {
      title: `${siteConfig.name} | Dallas-Fort Worth`,
      description: siteConfig.description,
    }
    const canonicalUrl = new URL(location.pathname, siteConfig.siteUrl).toString()

    document.title = meta.title
    setMeta('meta[name="description"]', 'name', 'description', meta.description)
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
    setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl)
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary')
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description)

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return null
}
