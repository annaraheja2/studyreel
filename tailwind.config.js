/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc',
          400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca',
          800: '#3730a3', 900: '#312e81',
        },
      },
      boxShadow: {
        warm: '0 1px 2px rgba(43,38,32,0.04), 0 12px 30px -16px rgba(43,38,32,0.22)',
        warmSm: '0 1px 2px rgba(43,38,32,0.05), 0 4px 12px -6px rgba(43,38,32,0.12)',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'none' } },
      },
      animation: { in: 'fadeUp 0.45s ease both' },
      // Sharper, tighter radii across the whole app
      borderRadius: {
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.625rem',
        '2xl': '0.75rem',
        '3xl': '0.875rem',
      },
    },
  },
  plugins: [],
}
