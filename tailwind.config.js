/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0b1121', // Deep midnight navy / charcoal background
          800: '#131b2f', // Slightly lighter navy for cards
          700: '#1e293b',
        },
        lavender: {
          400: '#a78bfa',
          500: '#8b5cf6', // Soft lavender / muted purple
          600: '#7c3aed',
        },
        cyan: {
          400: '#38bdf8', // Powder blue / soft cyan
          500: '#0ea5e9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(145deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.4) 100%)',
      }
    },
  },
  plugins: [],
}
