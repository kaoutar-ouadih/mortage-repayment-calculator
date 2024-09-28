/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: 'hsl(61, 70%, 52%)',
        lightLime: 'hsla(61, 70%, 52%, 60%)',
        veryLightLime: 'hsla(61, 60%, 82%, 60%)',
        red: 'hsl(4, 69%, 50%)',
        White: 'hsl(0, 0%, 100%)',
        slate100: 'hsl(202, 86%, 94%)',
        slate300: 'hsl(203, 41%, 72%)',
        slate500: 'hsl(200, 26%, 54%)',
        slate700: 'hsl(200, 24%, 40%)',
        slate900: 'hsl(202, 55%, 16%)',
        slate750: 'hsl(201, 80%, 10%)'
      },
      fontFamily: {
        plusJakartaSans: ['Plus Jakarta Sans']
      },
      screens:{
        tablet: '900px'
      }
    },
  },
  plugins: [],
}

