/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        
      },
      colors: {
        // Light mode colors (default)
        primary: {
          100: "#0061FF0A",
          200: "#0061FF1A",
          300: "#0061FF",
        },
        accent: {
          100: "#FBFBFD",
        },
        black: {
          DEFAULT: "#000000",
          100: "#8C8E98",
          200: "#666876",
          300: "#191D31",
        },
        danger: "#F75555",
        
        // Dark mode colors
        dark: {
          primary: {
            100: "#0061FF0A",
            200: "#0061FF1A",
            300: "#0061FF", // You might want to adjust this for dark mode
          },
          accent: {
            100: "#1A1A2E",
          },
          black: {
            DEFAULT: "#FFFFFF", // Inverted for dark mode
            100: "#A1A1AA",
            200: "#71717A",
            300: "#E4E4E7",
          },
          danger: "#EF4444",
          background: "#121212",
          card: "#1E1E1E",
        }
      },
    },
  },
  plugins: [],
  darkMode: "class", // This enables class-based dark mode
};