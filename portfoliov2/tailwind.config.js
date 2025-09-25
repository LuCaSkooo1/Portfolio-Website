/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["var(--font-plus-jakarta)", "sans-serif"],
        grotesk: ["var(--font-space-grotesk)", "sans-serif"],
      },
    },
  },
  animation: {
        gradient: "gradient 15s ease infinite",
      },
  plugins: [],
};
