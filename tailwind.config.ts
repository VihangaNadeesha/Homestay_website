import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { ink: "#2A4628", leaf: "#779663", sand: "#DDE6D8", cream: "#F9F6F0", clay: "#C87A53" }, fontFamily: { display: ["var(--font-display)", "serif"], sans: ["var(--font-sans)", "sans-serif"] } } },
  plugins: []
} satisfies Config;
