/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        ink: 'var(--color-ink)',
        'ink-soft': 'var(--color-ink-soft)',
        accent: 'var(--color-accent)',
        'accent-soft': 'var(--color-accent-soft)',
        sand: 'var(--color-sand)',
        deep: 'var(--color-deep)',
      },
      fontFamily: {
        sans: [
          'ui-rounded',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        // Expressive serif headings: Latin via Cormorant Infant, CJK via
        // Nanum Myeongjo (traditional-form Hanja suits Traditional Chinese).
        heading: ['"Cormorant Infant"', '"Nanum Myeongjo"', 'Georgia', 'serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.8' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        tick: {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        glow: 'glow 7s ease-in-out infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
        'spin-slower': 'spin-slow 38s linear infinite reverse',
        tick: 'tick 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
        fade: 'fade 0.6s ease-out both',
        'fade-slow': 'fade 0.9s ease-in-out both',
      },
    },
  },
  plugins: [],
};
