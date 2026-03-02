/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "text-color": "#393D3F",
        "background-color": "#FDFDFF",
        "main-accent": "#C6C5B9",
        "secondary-accent": "#3772FF", 
      },
    },
  },
  plugins: [],
};
