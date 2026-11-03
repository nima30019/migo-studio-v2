/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF781F",
          "orange-hover": "#E06310",
          "orange-glow": "rgba(255, 120, 31, 0.35)",
          cyan: "#00F2FE",
          black: "#07080B",
          surface: "#0D1017",
          card: "#121620",
          border: "#1E2430",
          text: "#F5F5F5",
          muted: "#9CA3AF",
        },
      },
      fontFamily: {
        sans: ["Space Grotesk", "Inter", "sans-serif"],
        farsi: ["Vazirmatn", "Segoe UI", "Tahoma", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
      boxShadow: {
        'glow-orange': '0 0 25px -5px rgba(255, 120, 31, 0.4)',
        'glow-orange-lg': '0 0 45px -5px rgba(255, 120, 31, 0.55)',
        'glow-cyan': '0 0 25px -5px rgba(0, 242, 254, 0.4)',
        'card-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orbit-slow': 'spin 20s linear infinite',
      },
    },
  },
  plugins: [],
};
