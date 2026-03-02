import { createTheme } from '@mui/material/styles';

// assets
import colors from 'assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
  const color = colors;

  const themeOption = {
    colors: color,

    // TEXT
    heading: '#ffffff',
    darkTextPrimary: '#e5e7eb',
    darkTextSecondary: '#9ca3af',
    textDark: '#ffffff',

    // BACKGROUND
    paper: '#121821',             // cards, login box
    backgroundDefault: '#0b0f14', // full page background
    background: '#0f141a',        // layout background

    // MENU & SELECTION
    menuSelected: '#fe7816',      // orange highlight
    menuSelectedBack: 'rgba(255, 122, 24, 0.15)',

    // DIVIDER
    divider: '#1f2933',

    customization
  };

  const themeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px'
        }
      }
    },
    typography: themeTypography(themeOption)
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
