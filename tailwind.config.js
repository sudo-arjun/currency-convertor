/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing:{
        'okok': '10px'
      },
      backgroundImage:{
        'img-wide': `url(./src/assets/world.jpg)`,
        'img-sm' : 'url(./src/assets/coins.jpeg)'
      }
    },
  },
  plugins: [],
}

