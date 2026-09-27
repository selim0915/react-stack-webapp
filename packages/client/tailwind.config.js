/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'header': '60px',
      },
      maxWidth: {
        'content': '1280px',
      }
    },
  },
  plugins: [],
}
