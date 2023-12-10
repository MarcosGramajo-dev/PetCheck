/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT ( {
  content: ["./dist/**/*.html", "./src/**/*.{js,jsx,ts,tsx}", "./*.html"],
  theme: {
    extend: {
      colors:{
        'vet-purple-dark': '#410756',
        'vet-purple': '#8842CF',
        'vet-purple-light': '#E7DDF1',
        'vet-blue': '#6C74BB',
        'vet-red': '#F55C5C'
      },
      screens: {
        "sm": "540px",
        "md": "720px",
        "lg": "960px",
      }
    },
    
  },
  plugins: [],
});

// module.exports = withMT({
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// });
