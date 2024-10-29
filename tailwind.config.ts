import type { Config } from "tailwindcss";

export default {
  content: ['./src/**/*.tsx', './src/**/*.jsx', 'node_modules/@marvin/react-ai/**/*.tsx'],
  theme: {
    extend: {
      backgroundImage: {
        "ring-gradient": "conic-gradient(from 0deg, #a855f7, #ee4899, #a855f7)",
      },
    },
  },
  plugins: [],
} satisfies Config

