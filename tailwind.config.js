/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      /* ── Color Design Tokens ─────────────────────────────── */
      colors: {
        /* Dark theme (primary) */
        "bg-base": "#0A0A0A",
        "bg-surface": "#111111",
        "bg-elevated": "#1A1A1A",
        "border-subtle": "#222222",
        "text-primary": "#F2F0EB",
        "text-secondary": "#8A8A8A",
        "text-tertiary": "#444444",
        accent: "#D4B896",
        "accent-hover": "#C4A882",
        error: "#E05252",
        /* Legacy nav tokens kept for compatibility */
        navBG: "rgba(10, 10, 10, 0.8)",
        activeBG: "rgba(212, 184, 150, 0.15)",
        navText: "#F2F0EB",
      },

      /* ── Background Images ───────────────────────────────── */
      backgroundImage: {
        "main-background": "url('/10.jpg')",
        "main-background-2":
          "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/main/hero-bg-3.jpg')",
        "hero-bg":
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/main/hero-bg.jpg')",
        "hero-bg-2":
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/main/hero-bg-2.jpg')",
      },

      /* ── Typography ──────────────────────────────────────── */
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        inter: ["Inter", "sans-serif"],
        lora: ["Lora", "serif"],
        display: ['"Playfair Display"', "serif"],
        body: ["Inter", "sans-serif"],
      },
      fontSize: {
        "display-2xl": [
          "clamp(3.5rem, 8vw, 7rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em" },
        ],
        "display-xl": [
          "clamp(2.5rem, 5vw, 4.5rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "clamp(2rem, 3.5vw, 3rem)",
          { lineHeight: "1.15", letterSpacing: "-0.01em" },
        ],
        "heading-xl": ["1.75rem", { lineHeight: "1.3" }],
        "heading-lg": ["1.25rem", { lineHeight: "1.4" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body-md": ["1rem", { lineHeight: "1.65" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        caption: ["0.75rem", { lineHeight: "1.5" }],
      },

      /* ── Spacing ────────────────────────────────────────── */
      spacing: {
        18: "4.5rem",
        88: "22rem",
        100: "25rem",
        112: "28rem",
        128: "32rem",
      },

      /* ── Border Radius ───────────────────────────────────── */
      borderRadius: {
        card: "4px",
        tile: "2px",
        pill: "9999px",
      },

      /* ── Transitions ─────────────────────────────────────── */
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.22, 1, 0.36, 1)",
        "expo-in": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
