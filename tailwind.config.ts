import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./packages/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-x-500": "#718096",
        "purple-x-400": "#9f7aea",
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};

export default config;
