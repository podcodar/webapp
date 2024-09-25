import type { Config } from "tailwindcss";

import daisyui from "daisyui";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./packages/**/*.{ts,tsx}"],
  plugins: [daisyui],
};

export default config;
