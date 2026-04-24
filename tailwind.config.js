/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        card: "var(--color-card)",
        surface: "var(--color-surface)",

        text: "var(--color-text)",
        muted: "var(--color-muted)",

        primary: "var(--color-primary)",
        "primary-soft": "var(--color-primary-soft)",

        secondary: "var(--color-secondary)",

        danger: "var(--color-danger)",
        success: "var(--color-success)",
      },
      borderRadius: {
        xl: "var(--radius)",
      },
    },
  },
  plugins: [],
};

