/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8F0",
        sage: "#A3B18A",
        olive: "#6B8E23",
        brown: "#4E342E",
      },
      fontFamily: {
        logo: ["Playfair Display", "serif"],
        heading: ["DM Serif Display", "serif"],
        body: ["Poppins", "sans-serif"],
        hand: ["Caveat", "cursive"],
      },
    },
  },
  plugins: [],
};
