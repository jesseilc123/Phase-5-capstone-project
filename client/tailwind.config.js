/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1080px',
      xl: '1440px',
    },
    colors: {
      'white': '#FFFFFF',
      'light-green': '#E5F0CF',
      'n-green': '#CEE6BD',
      'yellow': '#FFF2BF',
      'beige': '#F2F3DB',
      'grey': '#292929',
      'light-grey': '#D3D3D3',
      'light-blue': '#3951C6',
      'blue': '#34459B',
      'dark-blue': '#314091',
      'light-cyan': '#43BAE0',
      'cyan': '#024766',
      'red': '#FF0000',
      'light-red': '#fc8181',
      'facebook': '#1877F2',
      'google': '#4285F4',
      'twitch': '#9146FF',
      'apple': '#000000',
      'off-white': '#F5F3F5',
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/home/jesseilc123/development/code/phase-5/Phase-5-capstone-project/client/src/utils/pikmin_exploration.jpg')",
        'hero-pattern-2': "url('/home/jesseilc123/development/code/phase-5/Phase-5-capstone-project/client/src/utils/pikmin_flower.png')",
        'pattern-3' : "url(/home/jesseilc123/development/code/phase-5/Phase-5-capstone-project/client/src/utils/parkay_floor.svg)"
      }
    },
  },
  plugins: [require('tailwindcss-hero-patterns')],
}

