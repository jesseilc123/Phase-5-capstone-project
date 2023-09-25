/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'white': '#FFFFFF',
      'light-green': '#E5F0CF',
      "n-green": "#CEE6BD",
      'yellow': '#EBEB15',
      'beige': '#F2F3DB',
      'grey': '#292929',
      'light-blue': '#3951C6',
      'blue': '#34459B',
      'dark-blue': '#314091',
      'light-cyan': "#43BAE0",
      'cyan': "#024766",
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/home/jesseilc123/development/code/phase-5/Phase-5-capstone-project/client/src/utils/pikmin_exploration.jpg')",
      }
    },
  },
  plugins: [require('tailwindcss-hero-patterns')],
}

