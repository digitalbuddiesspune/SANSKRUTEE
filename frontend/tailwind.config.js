/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: { DEFAULT: '#2B6B5A', dark: '#1A4D3F', light: '#3A7D6B' },
        gold: { DEFAULT: '#C4A265', light: '#D4B87A', dark: '#A8894F' },
        cream: '#FAF6F0',
        ink: '#1A2F2A',
        muted: '#8B9A95',
        surface: '#F5F0E8',
        primary: { DEFAULT: '#2B6B5A' },
        background: { DEFAULT: '#FAF6F0' },
        text: { DEFAULT: '#1A2F2A', light: '#3D5A50', muted: '#8B9A95' },
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
