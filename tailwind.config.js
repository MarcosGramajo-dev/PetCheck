const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports =withMT( {
  content: ["./dist/**/*.html", "./src/**/*.{js,jsx,ts,tsx}", "./*.html"],
  theme: {
    extend: {
      colors:{
        'vet-purple-dark': '#410756',
        'vet-purple': '#8842CF',
        'vet-purple-light': '#E7DDF1',
        'vet-blue': '#6C74BB',
        'vet-red': '#F55C5C'
      }
    },
  },
  plugins: [],
});
