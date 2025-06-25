/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,njk,md}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Custom dark theme colors
        gray: {
          950: '#0a0a0a',
          925: '#0f0f0f',
          900: '#1a1a1a',
          850: '#1f1f1f',
          800: '#262626',
          750: '#2a2a2a',
        },
        // Soft pastel accents
        blue: {
          400: '#60a5fa',
          500: '#3b82f6',
        },
        purple: {
          400: '#c084fc',
          500: '#a855f7',
        },
        pink: {
          400: '#f472b6',
          500: '#ec4899',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-out': 'fadeOut 0.4s ease-out forwards',
        'spotlight': 'spotlight 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0.6', transform: 'translateY(-10px)' }
        },
        spotlight: {
          '0%': { boxShadow: '0 0 0 rgba(59, 130, 246, 0)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1)' }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 