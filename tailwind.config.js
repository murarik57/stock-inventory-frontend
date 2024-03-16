/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1600px",
    },
    extend: {
      fontFamily: {
        sans: ["Open Sans", "-apple-system", "Ubuntu", "Helvetica Neue"],
      },
      fontSize: {
        50: "50px",
        12: "12px",
        14: "14px",
        16: "16px",
      },
      lineHeight: {
        75: "75px",
        14: "14px",
      },
    },
  },
  plugins: [],
};
