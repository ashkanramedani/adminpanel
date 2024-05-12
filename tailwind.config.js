const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    fontFamily:
    {
      iran:['iran'], title:['title']
    },
    extend:{}
  },
  plugins: [],
}



