import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
