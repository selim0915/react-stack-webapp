/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--ui-color-primary)',
        secondary: 'var(--ui-color-secondary)',
        error: 'var(--ui-color-error)',
        background: 'var(--ui-color-background)',
        foreground: 'var(--ui-color-foreground)',
        text: 'var(--ui-color-text)',
        border: 'var(--ui-color-border)',
      },
      spacing: {
        'header': 'var(--header-height)',
        'submenu': 'var(--submenu-height)',
      },
      maxWidth: {
        'content': 'var(--content-width)',
      }
    },
  },
  plugins: [],
}
