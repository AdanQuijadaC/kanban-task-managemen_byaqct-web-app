/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        first_indigo: "#635fc7",
        second_indigo: "#a8a4ff",
        first_black: "#000112",
        second_black: "#20212c",
        third_black: "#2b2c37",
        fourth_black: "#3e3f4e",
        first_gray: "#828fa3",
        second_gray: "#e4ebfa",
        first_white: "#f4f7fd",
        second_white: "#ffffff",
        first_red: "#ea5555",
        second_red: "#ff9898",
      },
      fontFamily: {
        PlusJakartaSans: "Plus Jakarta Sans",
      },
    },
    screens: {
      sm: "525px",
      md: "768px",
      lg: "1024px",
    },
  },
  darkMode: "class",
  plugins: [],
};
