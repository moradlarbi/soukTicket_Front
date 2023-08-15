/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/hero.jpg')",
        event: "url('/assets/eventHero.jpg')",
        events: "url('/assets/events.jpg')",
        organizerBg: "url('/assets/organizer1.png')",
      },
      fontFamily: {
        SpaceGrotesk: ["Space Grotesk", "sans-serif"],
        Syne: ["Syne", "sans-serif"],
        monument: ["MonumentExtended", "sans-serif"],
        foggy: ["foggy", "sans-serif"],
      },
      fontWeight: {
        ultrabold: 800,
      },
      colors: {
        // Background and text colors
        platinum: "#f7f7ff", //Ghost white
        mikado: "#ffc328", // Mikado Yellow
        mikadofaint: "#ffc3281a",
        jetlight: "#b5b5b5ff",
        jetlighter: "#d9d9d9ff",
        platinumdark: "#a0a0a0ff",
        jetdark: "#7f7f7fff",
        lightGray: "#F5F5F5",
        palatinate: "#4c36f3",
        // Call-to-action colors
        ctaprimary: "#f52314",
        redfaint: "#f523140a", // Off Red (RGB)
        ctasecondary: "#1ad65fff", // Emerald
        ctatertiary: "#1a9ff7ff", // Dodger blue
        dark: "#1b1b1b",

        // Hover and active states
        ctaprimaryhover: "#e43e45ff",

        // Additional elements
        borderjetlight: "#b5b5b5ff",
        borderjetlighter: "#d9d9d9ff",
      },
    },
  },
  plugins: [],
};
