/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          accent: '#f97316',
          success: '#22c55e',
          warning: '#eab308',
          danger: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'brand-200': '0 4px 14px 0 rgba(191, 219, 254, 0.7)',
        'emerald-200': '0 4px 14px 0 rgba(167, 243, 208, 0.7)',
        'amber-200': '0 4px 14px 0 rgba(253, 230, 138, 0.7)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'zoom-in-95': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'in': 'fade-in 0.3s ease-out',
        'zoom-in-95': 'zoom-in-95 0.2s ease-out',
      },
    },
  },
  plugins: [],
}
