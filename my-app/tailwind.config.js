/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#154A99',
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
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
        fontSize: {
          '22px': '22px',
          "14px": "14px",
          "12px": "12px",
        },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.slider-thumb-easy': {
          '&::-webkit-slider-thumb': {
            '-webkit-appearance': 'none',
            'appearance': 'none',
            'width': '1.25rem',
            'height': '1.25rem',
            'border-radius': '9999px',
            'background': '#38a169', // green color
          },
          '&::-moz-range-thumb': {
            'width': '1.25rem',
            'height': '1.25rem',
            'border-radius': '9999px',
            'background': '#38a169', // green color
          },
        },
        '.slider-thumb-medium': {
          '&::-webkit-slider-thumb': {
            '-webkit-appearance': 'none',
            'appearance': 'none',
            'width': '1.25rem',
            'height': '1.25rem',
            'border-radius': '9999px',
            'background': '#d69e2e', // yellow color
          },
          '&::-moz-range-thumb': {
            'width': '1.25rem',
            'height': '1.25rem',
            'border-radius': '9999px',
            'background': '#d69e2e', // yellow color
          },
        },
        '.slider-thumb-hard': {
          '&::-webkit-slider-thumb': {
            '-webkit-appearance': 'none',
            'appearance': 'none',
            'width': '1.25rem',
            'height': '1.25rem',
            'border-radius': '9999px',
            'background': '#e53e3e', // red color
          },
          '&::-moz-range-thumb': {
            'width': '1.25rem',
            'height': '1.25rem',
            'border-radius': '9999px',
            'background': '#e53e3e', // red color
          },
        },
      }, ['responsive', 'hover']);
    },
  ],
}
