/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#240A8A",
        secondary: "#A0BAFB",
        tertiary: "#D7E3FF",
      },
    },
  },
  plugins: [],
};
