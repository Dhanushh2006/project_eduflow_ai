/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        muted: "#64748b",
        border: "#e2e8f0",
        primary: "#0f172a",
        accent: "#2563eb",
        success: "#059669",
        warning: "#d97706",
        danger: "#dc2626",
        surface: "#f8fafc",
      },
      fontFamily: {
        sans: ["Inter","system-ui","-apple-system","sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.06)",
        soft: "0 4px 24px rgba(15,23,42,0.06)"
      }
    },
  },
  plugins: [],
}
