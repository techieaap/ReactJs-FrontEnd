/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.js",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px', // Small screens, mobile phones
        'md': '768px', // Medium screens, tablets
        'lg': '1024px', // Large screens, laptops/desktops
        'xl': '1280px', // Extra large screens, large desktops
      },
    },
  },
  plugins: [],
}
