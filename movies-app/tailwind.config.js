/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: { max: "430px" },

      s: { max: "768px" },

      md: { max: "1000px" },

      lg: { max: "1200px" },

      xl: { max: "1425px" },

      "2xl": { max: "1536px" },
    },
  },
  plugins: [],
};
