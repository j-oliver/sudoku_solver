/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        difficulty: {
          easy: '#16d31d',
          medium: '#eff400',
          hard: '#d35a16',
          extreme: '#c81f1f',
        },
      },
    },
  },
  plugins: [],
};
