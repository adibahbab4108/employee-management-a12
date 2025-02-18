/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary": "#f93800",
        "secondary": "#ffb500",
        "accent":"#c23232"
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#f93800",
          "secondary": "#ffb500",
          "accent": "#c23232",
          "neutral": "#3D4451",
          "base-100": "#FFFFFF",
        },
      },
    ],
  },
  plugins: [
    require('daisyui')
  ],
}