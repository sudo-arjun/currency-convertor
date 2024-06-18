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
        'img-wide': `url(/world.jpg)`,
        'img-sm' : 'url(/coins.jpeg)'
      }
    },
  },
  plugins: [],
}

