import type { Config } from 'tailwindcss'

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
      boxShadow: {
        soft: '0 18px 50px -24px rgba(35, 40, 37, 0.28)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
} satisfies Config
