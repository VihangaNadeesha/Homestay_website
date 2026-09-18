import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { ink: "#21352a", leaf: "#315b3e", sand: "#e8dcc5", cream: "#fbf8f1", clay: "#a95e3e" }, fontFamily: { display: ["var(--font-display)", "serif"], sans: ["var(--font-sans)", "sans-serif"] } } },
  plugins: []
} satisfies Config;
