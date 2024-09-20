/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        whiteGit: {
          100: "#F2F2FA",
          200: "#A8A8B3"
        },
        grayGit: {
          100: "#737380",
          200: "#3A3A3A",
          300: "#A8A8B3",
          400: "#3D3D4D",
          500: "#6C6C80"
        },
        greenGit: {
          100: "#04D361"
        }
      },
      backgroundImage: {
        "background-github": "url('/src/assets/GitHub.png')"
      }
    },
  },
  plugins: [],
}