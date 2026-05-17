// Tailwind setup with content paths and theme extensions for scalable design tokens.
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1280px"
        }
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        ctaPulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(217, 154, 32, 0.28), 0 12px 28px rgba(4, 12, 28, 0.22)"
          },
          "50%": {
            boxShadow: "0 0 0 5px rgba(217, 154, 32, 0.1), 0 16px 34px rgba(4, 12, 28, 0.28)"
          }
        }
      },
      animation: {
        ctaPulseGlow: "ctaPulseGlow 2.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
