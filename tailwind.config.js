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
        sans: [
          "Poppins",
          "Open Sans",
          "-apple-system",
          "Ubuntu",
          "Helvetica Neue",
        ],
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
      colors: {
        "pri-color": "var(--primary)", //#2a2a2a
        "error-red": "var(--error)", //#f44242
        "success-green": "var(--secondary-green)", // rgb(14, 154, 51)
        "primary-bg": "var(--primary-bg-color)", //#1c2536
        "secondary-bg": "var(--primary)", //#0078d4
        "light-400": "var(--text-light-1)", //rgb(102, 102, 102)
        "sec-btn-border-color": "var(--sec-btn-border-color)", //#d9d9d9
        "btn-icon-color": "var(--btn-icon-color)", //#adabab
        "sec-text-color": "var(--sec-text-color)", //#333
        "ter-text-color": "var(--ter-text-color)", //#666
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
