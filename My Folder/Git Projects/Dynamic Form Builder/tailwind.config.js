/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {      
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        customBlue: "#0B83A5",
        customGreen:"#368505",
        customOrange:"#E3902F",
        customRed:"#D11A2A",
      },
    },
  },
  plugins: [],
}
