/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: { DEFAULT: '#FE1157', dark: '#D10F4B', light: '#FF3A78' },
        gold: { DEFAULT: '#FE1157', light: '#FF3A78', dark: '#D10F4B' },
        cream: '#FFFFFF',
        ink: '#0F1012',
        muted: '#4B5563',
        surface: '#FFFFFF',
        primary: { DEFAULT: '#FE1157' },
        background: { DEFAULT: '#FFFFFF' },
        text: { DEFAULT: '#0F1012', light: '#1F2937', muted: '#4B5563' },
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
