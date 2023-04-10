/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.html", "./src/**/*.{js,jsx,ts,tsx}", "./*.html"],
  theme: {
    extend: {
      colors:{
        'vet-purple-dark': '#410756',
        'vet-purple': '#8842CF',
        'vet-purple-light': '#E7DDF1',
        'vet-blue': '#6C74BB',
      }
    },
  },
  plugins: [],
};
