/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        therery: 'var(--therery)',
        scondary: 'var(--secondary)',
        therery: 'var(--therery)',
      },
    },
  },
  plugins: [],
}

