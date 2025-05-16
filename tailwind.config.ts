import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "gc-blue": "#26374A",
        "gc-red": "#B10E1E",
        "gc-white": "#FFFFFF",
        "gc-gray": "#EAEBED",
        "gc-link": "#284162",
        "gc-nav": "#333333",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        gc: ["Lato", "sans-serif"],
      },
      animation: {
        "blink": "blink 1s steps(1) infinite",
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
