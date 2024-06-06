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
        "active-link-bg": "#7799ff", // Custom light green
        "category-tag-bg": "#E9F0F1",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],      },
        fontSize: {
          '22px': '22px',
          "14px": "14px",
          "12px": "12px",
        },
    },
  },
  plugins: [],
}