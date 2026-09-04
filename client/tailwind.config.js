/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#0d9488', // Primary Healthcare Teal
          600: '#0f766e',
          700: '#115e59',
          800: '#134e4a',
          900: '#042f2e',
          950: '#021e1d',
        },
        navy: {
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        friction: {
          low: '#059669',     // Emerald
          medium: '#d97706',  // Amber
          high: '#ea580c',    // Orange
          critical: '#e11d48' // Rose
        },
        role: {
          patient: '#059669',
          hospital: '#4f46e5',
          doctor: '#0d9488',
          asha: '#d97706',
          government: '#2563eb',
          admin: '#7c3aed',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 14px -2px rgba(15, 23, 42, 0.03)',
        'card-hover': '0 4px 6px -1px rgba(15, 23, 42, 0.04), 0 16px 32px -4px rgba(15, 23, 42, 0.08)',
        'glass': '0 8px 32px 0 rgba(15, 23, 42, 0.06)',
        'glow-teal': '0 0 25px -4px rgba(13, 148, 136, 0.25)',
        'glow-subtle': '0 0 15px -3px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
