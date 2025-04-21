/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary1:'#065f46',
        primary2:'#10b981',
        customRed: '#EF4444',
        customIndigo: '#4338CA', 
      },
    },
  },
  plugins: [require('tailwind-scrollbar'),],
}
