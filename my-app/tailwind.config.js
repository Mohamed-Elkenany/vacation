/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [
    require('tailwind-scrollbar'),
  ],
  darkMode:'class',
  theme: {
    screens: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
    maxWidth: {
        container:"1440px"
      },
      fontFamily: {
        lobster: "Lobster Two",
        great_vibes:"Great Vibes",
      },
    },
  },
}

