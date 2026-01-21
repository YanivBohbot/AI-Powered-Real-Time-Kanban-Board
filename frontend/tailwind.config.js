/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "sans-serif"] },
      colors: {
        brand: { 500: "#3b82f6", 600: "#2563eb" },
        dark: { 900: "#0f172a", 800: "#1e293b", 700: "#334155" },
      },
    },
  },
  plugins: [],
};
