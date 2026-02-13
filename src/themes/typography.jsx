/**
 * Typography used in theme
 * @param {JsonObject} theme theme customization object
 */

export default function themeTypography(theme) {
  return {
    fontFamily: theme?.customization?.fontFamily || 'Inter, Roboto, sans-serif',

    /* ================= HEADINGS ================= */
    h6: {
      fontWeight: 500,
      color: theme.heading,
      fontSize: '0.75rem'
    },
    h5: {
      fontSize: '0.875rem',
      color: theme.heading,
      fontWeight: 600
    },
    h4: {
      fontSize: '1rem',
      color: theme.heading,
      fontWeight: 600
    },
    h3: {
      fontSize: '1.25rem',
      color: theme.heading,
      fontWeight: 600
    },
    h2: {
      fontSize: '1.5rem',
      color: theme.heading,
      fontWeight: 700
    },
    h1: {
      fontSize: '2.125rem',
      color: theme.heading,
      fontWeight: 700
    },

    /* ================= SUBTITLES ================= */
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: theme.textDark
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: theme.darkTextSecondary
    },

    /* ================= BODY ================= */
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.5em',
      color: theme.darkTextPrimary
    },
    body2: {
      fontSize: '0.875rem',
      letterSpacing: '0em',
      fontWeight: 400,
      lineHeight: '1.6em',
      color: theme.darkTextSecondary
    },

    caption: {
      fontSize: '0.75rem',
      color: theme.darkTextSecondary,
      fontWeight: 400
    },

    /* ================= BUTTON ================= */
    button: {
      textTransform: 'capitalize',
      fontWeight: 600
    },

    /* ================= INPUT ================= */
    customInput: {
      marginTop: 1,
      marginBottom: 1,
      '& > label': {
        top: 23,
        left: 0,
        color: theme.darkTextSecondary,
        '&[data-shrink="false"]': {
          top: 5
        }
      },
      '& > div > input': {
        padding: '30.5px 14px 11.5px !important',
        color: theme.textDark
      },
      '& legend': {
        display: 'none'
      },
      '& fieldset': {
        top: 0,
        borderColor: theme.divider
      },
      '&:hover fieldset': {
        borderColor: '#ff7a18'
      }
    },

    /* ================= LAYOUT ================= */
    mainContent: {
      backgroundColor: theme.background,
      width: '100%',
      minHeight: 'calc(100vh - 88px)',
      flexGrow: 1,
      padding: '0px',
      marginTop: '88px',
      marginRight: '20px',
      borderRadius: `${theme?.customization?.borderRadius}px`
    },

    /* ================= MENU ================= */
    menuCaption: {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: theme.heading,
      padding: '6px',
      textTransform: 'capitalize',
      marginTop: '12px'
    },
    subMenuCaption: {
      fontSize: '0.6875rem',
      fontWeight: 600,
      color: theme.darkTextSecondary,
      textTransform: 'capitalize'
    },

    /* ================= AVATARS ================= */
    commonAvatar: {
      cursor: 'pointer',
      borderRadius: '8px',
      backgroundColor: theme.paper,
      color: '#ff7a18'
    },
    smallAvatar: {
      width: '22px',
      height: '22px',
      fontSize: '1rem'
    },
    mediumAvatar: {
      width: '34px',
      height: '34px',
      fontSize: '1.2rem'
    },
    largeAvatar: {
      width: '44px',
      height: '44px',
      fontSize: '1.5rem'
    }
  };
}
