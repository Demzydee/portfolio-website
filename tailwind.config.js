/** Breakpoints must be static: CSS custom properties cannot drive media queries. */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: { sm: '40rem', md: '48rem', lg: '64rem', xl: '80rem', '2xl': '96rem' },
    extend: {
      colors: {
        canvas: 'var(--color-bg)', surface: 'var(--color-surface)',
        ink: 'var(--color-text-dark)', foreground: 'var(--color-text)',
        muted: 'var(--color-muted)', accent: 'var(--color-accent)',
      },
      fontFamily: { sans: ['var(--font-body)'], kanit: ['Kanit', 'sans-serif'] },
      spacing: Object.fromEntries([0,1,2,3,4,5,6,7,8,10,12,14,16,18,20,24,28,32,40].map(n => [n, `var(--space-${n})`])),
      borderRadius: { sm: 'var(--radius-sm)', md: 'var(--radius-md)', lg: 'var(--radius-lg)', full: 'var(--radius-pill)' },
    },
  },
  plugins: [],
};
