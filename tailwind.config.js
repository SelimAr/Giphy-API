/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
        'mobile-l': '500px',
        'laptop-m': '1540px'
    },
  },
  plugins: [],
}

