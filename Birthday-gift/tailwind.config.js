/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#BEE9FF',
        ocean: '#65C9FF',
        deep: '#1B7FBF',
        dark: '#0C4A6E',
        abyss: '#041C32',
        deepest: '#020B16',
        glow: {
          cyan: '#7FFFF0',
          turquoise: '#40E0D0',
          purple: '#8A7FFF',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-18px) translateX(10px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        rise: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '10%': { opacity: '0.7' },
          '100%': { transform: 'translateY(-120vh) scale(1.4)', opacity: '0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', filter: 'blur(8px)' },
          '50%': { opacity: '1', filter: 'blur(14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      animation: {
        drift: 'drift 8s ease-in-out infinite',
        sway: 'sway 6s ease-in-out infinite',
        rise: 'rise linear infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
};
