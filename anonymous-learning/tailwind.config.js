/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#fcfcfc',
        foreground: '#171717',
        accent: '#2563eb',
        muted: '#f5f5f5',
        'muted-foreground': '#737373',
        border: '#e5e5e5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
