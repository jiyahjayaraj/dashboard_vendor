export default function themePalette(theme) {
  return {
    mode: 'dark',

    common: {
      black: '#000000'
    },

    /* ================= PRIMARY (ORANGE) ================= */
    primary: {
      light: '#ff9f1c',
      main: '#ff7a18',          // Eventora orange
      dark: '#e66a10',
      200: '#ffd8b5',
      800: '#c85c0d'
    },

    /* ================= SECONDARY (DARK ORANGE / AMBER) ================= */
    secondary: {
      light: '#ffb366',
      main: '#ff8c32',
      dark: '#cc6a1a',
      200: '#ffe0c2',
      800: '#b85a12'
    },

    /* ================= STATUS COLORS ================= */
    error: {
      light: '#f87171',
      main: '#ef4444',
      dark: '#b91c1c'
    },

    warning: {
      light: '#fbbf24',
      main: '#f59e0b',
      dark: '#b45309'
    },

    success: {
      light: '#6ee7b7',
      200: '#34d399',
      main: '#10b981',
      dark: '#047857'
    },

    orange: {
      light: '#ffb366',
      main: '#ff7a18',
      dark: '#cc5f12'
    },

    /* ================= GREY SCALE ================= */
    grey: {
      50: '#f9fafb',
      100: '#e5e7eb',
      500: '#9ca3af',
      600: '#d1d5db',
      700: '#e5e7eb',
      900: '#ffffff'
    },

    /* ================= DARK THEME LEVELS ================= */
    dark: {
      light: '#9ca3af',
      main: '#121821',     // cards
      dark: '#0f141a',     // layout
      800: '#0b0f14',      // background
      900: '#0b0f14'
    },

    /* ================= TEXT ================= */
    text: {
      primary: '#e5e7eb',
      secondary: '#9ca3af',
      dark: '#ffffff',
      hint: '#6b7280'
    },

    /* ================= BACKGROUND ================= */
    background: {
      paper: '#121821',       // card / login box
      default: '#0b0f14'      // page background
    },

    /* ================= CUSTOM EXTRAS ================= */
    textColor: {
      whiteText: '#ffffff'
    },

    borderColor: {
      lightBorder: '#1f2933'
    }
  };
}
