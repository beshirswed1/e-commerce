// tailwind.config.js
module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/redux/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#101F30',
          light: '#F3EEE8',
          gray: '#A2B4C0',
          sand: '#D8C2A7',
        }
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
