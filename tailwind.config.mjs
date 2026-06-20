/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--bg-base)",
        surface: "var(--bg-deep)",
        elevated: "var(--bg-elevated)",
        ink: "var(--text-primary)",
        body: "var(--text-body)",
        muted: "var(--text-secondary)",
        navy: "var(--bg-base)",
        accent: "var(--text-cyan)",
        gold: "var(--text-gold)",
        violet: "var(--text-violet)",
        line: "var(--border-soft)",
        slate: "var(--text-muted)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "Aptos",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "Newsreader",
          "Source Serif 4",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
        serif: [
          "Newsreader",
          "Source Serif 4",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
      },
      boxShadow: {
        premium: "var(--shadow-card)",
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
      },
      spacing: {
        18: "4.5rem",
      },
      backgroundImage: {
        "finance-grid":
          "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
    },
  },
};
