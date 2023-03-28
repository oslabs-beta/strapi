/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: 'rgb(18, 16, 99)',
      },
      boxShadow: {
        'sm-right': '2px 5px 5px 0 rgba(200, 200, 200, 0.5)',
      },
    },
  },
  plugins: [],
};
