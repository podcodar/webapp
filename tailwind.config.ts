import tailwindcss from "@tailwindcss/vite";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./packages/**/*.{ts,tsx}"],
  darkMode: [
    "variant",
    [
      // if system selected color is dark
      "@media (prefers-color-scheme: dark) { &:not(.light *) }",
      // or if .dark class is present
      "&:is(.dark *)",
    ],
  ],

  plugins: [tailwindcss],
};

export default config;
