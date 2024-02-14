/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-primary': '#335C55',
        'green-secondary': '#E7F9F6',
        'blue-primary': '#415F73',
        'blue-secondary': '#ECF6FC'
      }
    },
  },
  plugins: [],
}

