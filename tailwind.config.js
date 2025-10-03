/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2d4891',
        accent: '#64aa53',
        gray: {
          bg: '#f6f7fb'
        }
      }
    },
  },
  plugins: [],
}
