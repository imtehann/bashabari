/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        bangla: ['Hind Siliguri', 'sans-serif'],
      },
      colors: {
        navy: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#1e3a5f',
          700: '#162d4a',
          800: '#0f2035',
          900: '#0a1628',
          950: '#060d1a',
        },
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        emerald: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        surface: {
          DEFAULT: '#ffffff',
          soft: '#f8fafc',
          muted: '#f1f5f9',
          border: '#e2e8f0',
        },
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(15,23,42,0.06)',
        'card-hover': '0 4px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(15,23,42,0.12)',
        nav: '0 1px 0 rgba(0,0,0,0.06)',
        glass: '0 8px 32px rgba(15,23,42,0.08)',
        soft: '0 2px 8px rgba(15,23,42,0.06)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
