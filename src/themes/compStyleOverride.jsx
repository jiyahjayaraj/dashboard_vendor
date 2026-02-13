export default function componentStyleOverrides() {
  return {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0b0f14', // deep dark
          color: '#e5e7eb'            // soft white
        }
      }
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: '#e5e7eb',
          borderRadius: 8,
          margin: '4px 8px',
          transition: 'all 0.25s ease',

          '&:hover': {
            backgroundColor: 'rgba(255, 122, 24, 0.08)'
          },

          '&.Mui-selected': {
            backgroundColor: 'rgba(255, 122, 24, 0.18)',
            color: '#ff7a18',

            '&:hover': {
              backgroundColor: 'rgba(255, 122, 24, 0.25)'
            },

            '& .MuiListItemIcon-root': {
              color: '#ff7a18'
            }
          }
        }
      }
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#9ca3af',
          minWidth: 36
        }
      }
    },

    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '0.95rem',
          fontWeight: 500
        }
      }
    }
  };
}
