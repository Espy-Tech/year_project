import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0b0f1a",
          secondary: "#111827",
          tertiary: "#1a2236",
          card: "#141c2e",
        },
        border: {
          light: "rgba(99,179,237,0.15)",
          medium: "rgba(99,179,237,0.3)",
        },
        accent: {
          primary: "#63b3ed",
          secondary: "#f6ad55",
          success: "#68d391",
          danger: "#fc8181",
        },
        text: {
          primary: "#e2e8f0",
          secondary: "#94a3b8",
          tertiary: "#64748b",
        },
      },
      fontFamily: {
        serif: ["DM Serif Display", "Georgia", "serif"],
        sans: ["Outfit", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern":
          "linear-gradient(rgba(99,179,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-pattern": "48px 48px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      boxShadow: {
        "glow-blue": "0 0 20px rgba(99, 179, 237, 0.2)",
        "glow-orange": "0 0 20px rgba(246, 173, 85, 0.2)",
        card: "0 4px 16px rgba(0, 0, 0, 0.3)",
        "card-hover": "0 12px 32px rgba(0, 0, 0, 0.4)",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      spacing: {
        "4.5": "1.125rem",
        "5.5": "1.375rem",
      },
    },
  },
  plugins: [],
};

export default config;
