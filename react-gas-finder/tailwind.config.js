/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#1fb6ff',
        fos: '#130C35',
        lightfos: '#6B41CF',
        lighterfos: '#AA8DF5',
        emojifos: 'e0aaff'
      },
    },
  },
  plugins: [],
}

