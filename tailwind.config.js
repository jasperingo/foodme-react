
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      outline: {
        'yellow-input': ['1px solid rgba(245, 158, 11, var(--tw-border-opacity))', '0px'],
      }
    }
  },
  variants: {
    extend: {
      borderColor: ['invalid']
    },
  },
  plugins: [require('tailwindcss-invalid-variant-plugin')],
}

