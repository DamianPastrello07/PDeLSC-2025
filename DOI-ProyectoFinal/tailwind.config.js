/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0ea5e9",
        secondary: "#64748b",
        destructive: "#ef4444",
        muted: "#f1f5f9",
        background: "#ffffff",
        foreground: "#0f172a",
      },
    },
  },
  plugins: [],
}
