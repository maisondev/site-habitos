/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefcf6',
          100: '#d6f6e7',
          200: '#aeead0',
          300: '#7cd9b7',
          400: '#4ec69e',
          500: '#2aac8a',
          600: '#1d8874',
          700: '#176c60',
          800: '#14564f',
          900: '#114844',
        }
      }
    },
  },
  plugins: [],
}
