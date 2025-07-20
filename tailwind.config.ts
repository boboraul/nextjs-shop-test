import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          50: '#f5f6ff',
          100: '#e0e4ff',
          200: '#c2caff',
          300: '#a3adff',
          400: '#8490ff',
          500: '#536dff', // your base color
          600: '#3e57e0',
          700: '#2d44b3',
          800: '#1d3085',
          900: '#0e1c57',
        },
      },
      rotate: {
        10: "10deg",
      }
    },
    
  },
  plugins: [],
};
export default config;
