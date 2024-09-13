/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [ 
    {
      // since Tailwind compiles necessary classes build time, it is essential that all grid-cols-x classes, 
      // to be able to use ngClass for grid-cols-x
      pattern: /grid-cols-\d+/,
    }
  ],
}

