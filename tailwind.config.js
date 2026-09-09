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
        jakarta: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
        grotesk: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  animation: {
        gradient: "gradient 15s ease infinite",
      },
  plugins: [],
};
