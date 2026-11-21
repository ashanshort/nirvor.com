import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#1F3A2A",
          gold: "#D4AF37",
          cream: "#FBF8F1",
        },
      },
    },
  },
  plugins: [],
};

export default config;
