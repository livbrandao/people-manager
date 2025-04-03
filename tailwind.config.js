/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sea: {
          greyishBlue: "#578597",
          darkGreyishBlue: "#51656D",
          skyBlue: "#4FA1C2",
          darkGray: "#3B4042",
          charcoal: "#252F33",
        },
      },
    },
  },
  plugins: [],
};
