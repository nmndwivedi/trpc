/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-satoshi)", "system-ui", "sans-serif"],
        default: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        textcolor: {
          DEFAULT: "#000000",
          dark: "#fff8f5",
        },
        bgcolor: {
          DEFAULT: "#f4eae1",
          dark: "#2b0830",
        },
        primarycolor: {
          DEFAULT: "#fb8f3c",
          dark: "#fb8f3c",
        },
        secondarycolor: {
          DEFAULT: "#efdccc",
          dark: "#efdccc",
        },
        accentcolor: {
          DEFAULT: "#341439",
          dark: "#b979c3",
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
