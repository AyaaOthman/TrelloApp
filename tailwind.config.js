/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bluee: "#0079BF",
        lightBlue: "#B3D9FF",
        Orange: "	#FFAB4A",
        LightOrange: "#FFE8C4",
      },
    },
  },
  plugins: [require("tw-elements-react/dist/plugin.cjs")],
};
