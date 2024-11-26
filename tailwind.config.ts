import daisyuiPlugin from "daisyui";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./packages/**/*.{ts,tsx}"],
  plugins: [daisyuiPlugin],
  darkMode: "class",
  daisyui: {
    themes: ["light", "dark"],
  },
};

export default config;
