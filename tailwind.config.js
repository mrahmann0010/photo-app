/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'main-background':"url('/public/10.jpg')",
        'main-background-2':"url('/public/main/hero-bg-3.jpg')",
        // 'hero-background':"url('/1.jpg')",
      },
      colors:{
        'navBG':'rgba(244, 243, 240, 0.8)',
        'activeBG':'rgba(255, 255, 255, 0.8)',
        'navText': 'rgb(2, 90, 78)',
      },
      fontFamily: {
            playfair: ['Playfair Display', 'serif'], // Install via Google Fonts
        },
    },
  },
  plugins: [],
}