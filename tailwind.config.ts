import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#080808",
        line: "rgba(255,255,255,0.08)",
        muted: "rgba(255,255,255,0.6)",
        background: "#080808",
        foreground: "#ffffff",
        accent: "#c8b89a",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%, -40%) scale(1)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 700ms ease-out forwards",
        spotlight: "spotlight 2s ease 0.4s 1 forwards",
      },
    },
  },
  plugins: [],
};

export default config;
