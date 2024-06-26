/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#F5F6F6',
        "sidebar-bg": "#1A73E8",
        "active-link-bg": "#1A73E8",
        "category-tag-bg": "#E9F0F1",
        "custom-gold": '#CCA457'
      },
      width: {
        'custom-width': '231.594px',
      },
      height: {
        'custom-height': '52px',
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
