import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05050d",
        panel: "#0d0b19",
        violet: "#9b63ff",
      },
    },
  },
  plugins: [],
};

export default config;
