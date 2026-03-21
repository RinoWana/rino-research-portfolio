/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50:  '#fdf8f0',
          100: '#f5e6d0',
          200: '#ead0a8',
          300: '#d9b07a',
          400: '#c8903e',
          500: '#b8762a',
          600: '#9a6020',
          700: '#7a4a18',
          800: '#5c3510',
          900: '#3d2208',
          950: '#1a0f05',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C87A',
          dark: '#9A7030',
        },
        surface: {
          DEFAULT: '#140D08',
          card: '#1E1510',
          hover: '#261A10',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(ellipse at 30% 50%, #3D2000 0%, #0A0603 60%)',
        'card-gradient':
          'linear-gradient(135deg, #1E1510 0%, #140D08 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
