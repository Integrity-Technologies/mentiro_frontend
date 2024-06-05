/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#F5F6F6',
        "sidebar-bg": "#F5F6F6", // Custom light grey
        "active-link-bg": "#ccffcc", // Custom light green
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],      },
    },
  },
  plugins: [],
}