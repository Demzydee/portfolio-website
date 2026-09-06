export const designSystem = {
  colors: {
    background: '#0C0C0C',
    backgroundAlt: '#12161D',
    surface: '#FFFFFF',
    surfaceSoft: '#111827',
    text: '#D7E2EA',
    textStrong: '#F5F7FA',
    textDark: '#0C0C0C',
    muted: '#A9B5C1',
    border: 'rgba(215, 226, 234, 0.18)',
    borderDark: 'rgba(12, 12, 12, 0.15)',
    accent: '#B600A8',
    accentSecondary: '#7621B0',
    accentTertiary: '#BE4C00',
    highlight: '#BBCCD7',
    panel: '#12181F',
  },
  gradients: {
    heroText: 'linear-gradient(180deg, #646973 0%, #bbccd7 100%)',
    button: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
    panel: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
    glow: 'radial-gradient(circle at top, rgba(182, 0, 168, 0.28), transparent 55%)',
  },
  radii: {
    sm: '24px',
    md: '32px',
    lg: '40px',
    xl: '60px',
  },
  shadows: {
    soft: '0 25px 80px rgba(0,0,0,0.35)',
    button: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
    card: '0 20px 50px rgba(0, 0, 0, 0.18)',
  },
  type: {
    display: {
      xs: 'clamp(2rem, 6vw, 4rem)',
      sm: 'clamp(2.5rem, 8vw, 6rem)',
      md: 'clamp(3rem, 12vw, 160px)',
      lg: 'clamp(4rem, 16vw, 180px)',
    },
    body: {
      sm: 'clamp(0.8rem, 1.2vw, 1rem)',
      md: 'clamp(1rem, 1.8vw, 1.35rem)',
      lg: 'clamp(1.2rem, 2.2vw, 2.1rem)',
    },
  },
} as const;

export const designTokens = {
  sectionShell: 'rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]',
  sectionPadding: 'px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32',
};
