import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6A0DAD',
        secondary: '#4F4A52',
        neutral: {
          900: '#191A20',
          950: '#060609',
        },
        surface: {
          DEFAULT: '#FBFBFB',
          soft: '#FEF4E7',
          elevated: '#ffffff',
        },
      },
      borderColor: {
        subtle: 'rgba(79, 74, 82, 0.2)',
        strong: 'rgba(106, 13, 173, 0.35)',
      },
      boxShadow: {
        soft: '0 16px 40px rgba(6, 6, 9, 0.08)',
      },
      fontFamily: {
        sans: '"DM Sans", "Segoe UI", sans-serif',
        display: '"Outfit", "Avenir Next", sans-serif',
      },
    },
  },
  plugins: [],
} satisfies Config
