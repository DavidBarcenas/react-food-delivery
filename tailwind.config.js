/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--secondary-color)',
        'danger-alert': '#fff5f8',
        'danger-alert-color': '#f1416c',
      },
    },
  },
  plugins: [],
};
