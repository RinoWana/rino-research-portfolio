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
        ink: {
          DEFAULT: '#1A1F35',
          950: '#0B0E1A',
          900: '#12172B',
          800: '#1A1F35',
        },
        navy: {
          DEFAULT: '#2E3A7E',
        },
        peri: {
          DEFAULT: '#C6CCF5',
          dim: '#8F9BD8',
        },
        rule: {
          light: '#D2D6E2',
          DEFAULT: '#3C4570',
        },
        offwhite: '#FCFCFD',
        muted: '#5D6478',
      },
      fontFamily: {
        sans: ["'TeX Gyre Heros'", "'Helvetica Neue'", 'Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(ellipse at 30% 0%, #F5F6FA 0%, #FFFFFF 60%)',
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
