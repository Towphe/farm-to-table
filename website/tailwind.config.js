/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'smooth-yellow': '#F3CA52',
        'light-yellow' : '#F3CA52',
        'dark-green' : '#0A6847',
        'light-green' : '#7ABA78',
        'off-white' : '#FAF9F6'
      }
    },
  },
  plugins: [],
}

