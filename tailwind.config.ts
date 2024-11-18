import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        slideRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(120px)" },
        },
        slideLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-120px)" },
        },
      },
      animation: {
        slideRight: "slideRight 0.5s ease-in-out",
        slideLeft: "slideLeft 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
