 /** @type {import('tailwindcss').Config} */
 export default {
  content: [
    "./src/**/*.{html,js}",
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}