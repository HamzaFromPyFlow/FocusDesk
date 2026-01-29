/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./renderer/index.html",
    "./renderer/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          card: '#334155',
          border: '#475569',
        },
        light: {
          bg: '#f8fafc',
          surface: '#ffffff',
          card: '#f1f5f9',
          border: '#e2e8f0',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
