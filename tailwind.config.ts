import type { Config } from 'tailwindcss'

const opacityScale = Object.fromEntries(
  Array.from({ length: 101 }, (_, value) => [String(value), String(value / 100)]),
)

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tranquility: {
          ivory: '#F7F3EA',
          stone: '#D7D0C4',
          sage: '#8C9B88',
          moss: '#5F6D5C',
          taupe: '#A99581',
          charcoal: '#232825',
        },
      },
      opacity: opacityScale,
      boxShadow: {
        soft: '0 18px 50px -24px rgba(35, 40, 37, 0.28)',
        premium: '0 28px 80px -38px rgba(35, 40, 37, 0.38)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      letterSpacing: {
        editorial: '-0.035em',
      },
    },
  },
  plugins: [],
} satisfies Config
