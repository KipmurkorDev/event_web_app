/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'red': '#ff0000',
        'blue': '#0000ff',
        'green': '#00ff00',
        'yellow': '#ffff00',
        'purple': '#800080',
        'pink': '#ffc0cb',
        'orange': '#ffa500',
        'indigo': '#4b0082',
      },
    },
  },
  plugins: [],
}
