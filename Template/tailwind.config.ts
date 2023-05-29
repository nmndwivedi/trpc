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
        primarycontrastcolor: {
          DEFAULT: "#000000",
          dark: "#000000",
        },
        secondarycolor: {
          DEFAULT: "#efdccc",
          dark: "#efdccc",
        },
        secondarycontrastcolor: {
          DEFAULT: "#000000",
          dark: "#000000",
        },
        accentcolor: {
          DEFAULT: "#008B8B",
          dark: "#00CED1",
        },
      },
      animation: {
        "spin-slow": "spin 40s linear infinite",
      },
    },
  },
  plugins: [],
};

module.exports = config;
