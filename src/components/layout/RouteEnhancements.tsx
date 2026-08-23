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
  '/booking': {
    title: 'Build a Cleaning Estimate | Tranquility Cleaning',
    description: 'Build a residential cleaning estimate based on service type, home size, rooms, pets, frequency, and optional add-ons.',
  },
  '/quote': {
    title: 'Request a Virtual Cleaning Quote | Tranquility Cleaning',
    description: 'Request a custom cleaning review for larger homes, commercial spaces, special conditions, or properties that need a closer look.',
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
}

export function RouteEnhancements() {
  const location = useLocation()

  useEffect(() => {
    const meta = pageMeta[location.pathname] ?? {
      title: `${siteConfig.name} | Dallas-Fort Worth`,
      description: siteConfig.description,
    }

    document.title = meta.title

    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.appendChild(description)
    }
    description.content = meta.description

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return null
}
