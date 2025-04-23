/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],

  fontFamily: {
    inter: ['var(--font-inter)'],
    poppins: ['var(--font-poppins)'],
    urbanist: ['var(--font-urbanist)'],
  },
  
}


