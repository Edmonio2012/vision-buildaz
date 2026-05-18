import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1.5rem",
          lg: "2rem"
        },
        screens: {
          "2xl": "1180px"
        }
      },
      colors: {
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        dominant: "var(--color-dominant)",
        accent: "var(--color-accent)",
        heading: "var(--color-heading)",
        body: "var(--color-body)",
        muted: "var(--color-muted)",
        night: "var(--color-night)",
        cream: "var(--color-cream)",
        line: "var(--color-line)",
        border: "var(--color-line)",
        input: "var(--color-line)",
        ring: "var(--color-accent)",
        background: "var(--color-canvas)",
        foreground: "var(--color-heading)",
        primary: {
          DEFAULT: "var(--color-dominant)",
          foreground: "var(--color-cream)"
        },
        secondary: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-heading)"
        },
        muted: {
          DEFAULT: "rgba(17, 45, 50, 0.08)",
          foreground: "var(--color-muted)"
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-night)"
        },
        card: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-heading)"
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"]
      },
      fontSize: {
        display: ["4.75rem", { lineHeight: "0.92", fontWeight: "800" }],
        h1: ["3.75rem", { lineHeight: "0.95", fontWeight: "800" }],
        h2: ["2.75rem", { lineHeight: "1", fontWeight: "800" }],
        h3: ["1.75rem", { lineHeight: "1.15", fontWeight: "700" }],
        body: ["1.0625rem", { lineHeight: "1.85", fontWeight: "400" }],
        small: ["0.875rem", { lineHeight: "1.6", fontWeight: "500" }],
        label: ["0.75rem", { lineHeight: "1.3", fontWeight: "700" }]
      },
      spacing: {
        section: "7.5rem",
        "section-lg": "10rem",
        rail: "4.5rem",
        field: "3.75rem"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 8px)",
        sm: "calc(var(--radius) - 14px)",
        control: "var(--radius-control)",
        panel: "var(--radius-panel)"
      },
      boxShadow: {
        subtle: "var(--shadow-subtle)",
        medium: "var(--shadow-medium)",
        strong: "var(--shadow-strong)"
      },
      transitionDuration: {
        premium: "420ms"
      },
      transitionTimingFunction: {
        premium: "var(--ease-premium)"
      }
    }
  },
  plugins: []
};

export default config;
