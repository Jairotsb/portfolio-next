const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: ["active"],
  theme: {
    // Mantém as configurações de fonte, telas, etc. aqui.
    fontFamily: {
      header: ["Inter-italic", "sans-serif"],
      body: ["Inter-roman", "sans-serif"],
    },
    screens: {
      xs: "375px",
      ...defaultTheme.screens,
    },
    container: {
      center: true,
      padding: "1rem",
    },
    // Use 'extend' para adicionar novos valores, sem sobrescrever os padrões.
    extend: {
      colors: {
        ...colors, // IMPORTANTE: Isso adiciona todas as cores padrão do Tailwind.
        // E aqui você pode adicionar ou sobrescrever suas cores personalizadas.
        primary: "#5540af",
        secondary: "#252426",
        white: "#ffffff",
        black: "#000000",
        yellow: "#f9e71c",
        lila: "#e6e5ec",
        "grey-10": "#6c6b6d",
        "grey-20": "#7c7c7c",
        "grey-30": "#919091",
        "grey-40": "#929293",
        "grey-50": "#f4f3f8",
        "grey-60": "#edebf6",
        "grey-70": "#d8d8d8",
        "hero-gradient-from": "rgba(85, 64, 174, 0.95)",
        "hero-gradient-to": "rgba(65, 47, 144, 0.93)",
        "blog-gradient-from": "#8f9098",
        "blog-gradient-to": "#222222",
      },
      // Suas outras extensões continuam aqui.
      spacing: {
        // ...
      },
      zIndex: {
        // ...
      },
      inset: {
        // ...
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};