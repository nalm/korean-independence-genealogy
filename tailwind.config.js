/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        korea: {
          red: '#c53030',
          blue: '#1e40af',
          indigo: '#1e3a8a',
          gold: '#b45309',
          hanji: '#faf8f5',
          darkBg: '#0b0f17',
          darkCard: '#131924',
          darkBorder: '#263147',
        }
      },
      fontFamily: {
        serif: ['"Noto Serif KR"', 'serif'],
        sans: ['"Pretendard"', '"Noto Sans KR"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
