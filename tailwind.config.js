/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'main-background':"url('/public/12.jpg')",
      },
      colors:{
        'navBG':'rgba(244, 243, 240, 0.8)',
        'activeBG':'rgba(255, 255, 255, 0.5)',
        'navText': 'rgb(2, 90, 78)',
      }
    },
  },
  plugins: [],
}