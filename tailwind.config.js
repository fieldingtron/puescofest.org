/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{html,js,jsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      backgroundImage: (theme) => ({
        morchelas: "url('/images/morchelas.png')",
        mujer: "url('/images/mujer.png')",
        "martin-pescador": "url('/images/martin-pescador.png')",
        araucaria: "url('/images/araucarias1_bckgr.png')",

        }),

      colors: {
        strongCyan: "hsl(171, 66%, 44%)",
        lightBlue: "hsl(233, 100%, 69%)",
        darkGrayishBlue: "hsl(210, 10%, 33%)",
        grayishBlue: "hsl(201, 11%, 66%)",
        darkBlue: "hsl(217, 28%, 15%)",
        darkBlue1: "hsl(218, 28%, 13%)",
        darkBlue2: "hsl(216, 53%, 9%)",
        darkBlue3: "hsl(219, 30%, 18%)",
        accentCyan: "hsl(176, 68%, 64%)",
        accentBlue: "hsl(198, 60%, 50%)",
        lightRed: "hsl(0, 100%, 63%)",
        softBlue: "hsl(231, 69%, 60%)",
        softRed: "hsl(0, 94%, 66%)",
        grayishBlue: "hsl(229, 8%, 60%)",
        veryDarkBlue: "hsl(229, 31%, 21%)",
      },
      fontFamily: {
        sans: ["Bai Jamjuree", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tw-elements/dist/plugin.cjs"),
    require("@tailwindcss/typography"),
  ],
};
