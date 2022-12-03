/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./src/**/*.{html,js}"],
  content: ["./src/**/*.{js, jsx, ts, tsx}", "./templates/**/*.html"],
  // important: '#root',
  // important: true,
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        customBlue: "#0B83A5",
        customGreen:"#4CAF50",
        customOrange:"#E3902F",
        customRed:"#D11A2A",
       
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
