/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1abc9f',   // teal-green
        soft: '#e8f9f7',      // very light aqua
        dark: '#2c3e50',      // strong dark text
      },
    },
  },
}
