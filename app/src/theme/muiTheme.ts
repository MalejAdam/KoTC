import { createTheme } from '@mui/material';
// SB DESIGN KIT COLORS

// NEUTRALS
export const NEUTRAL_00 = '#ffffff';
export const NEUTRAL_05 = '#fafafb';
export const NEUTRAL_10 = '#f5f6f8';
export const NEUTRAL_20 = '#e8ebef';
export const NEUTRAL_30 = '#d8dde4';
export const NEUTRAL_40 = '#b5bbc4';
export const NEUTRAL_50 = '#929aa3';
export const NEUTRAL_60 = '#67707a';
export const NEUTRAL_70 = '#4b5662';
export const NEUTRAL_80 = '#3a4452'; // Top bar background
export const NEUTRAL_85 = '#263140';
export const NEUTRAL_90 = '#212a37';
export const NEUTRAL_95 = '#1a212b';
export const NEUTRAL_98 = '#131921';
export const NEUTRAL_100 = '#0e1016';

// ACCENTS
export const ACCENT_10 = '#e9f7ff';
export const ACCENT_20 = '#baefff';
export const ACCENT_30 = '#8ae6ff';
export const ACCENT_40 = '#19caf9';
export const ACCENT_50 = '#04aadb';
export const ACCENT_60 = '#097eb2'; // Button default
export const ACCENT_70 = '#00537c'; // Button hover
export const ACCENT_80 = '#0c4562'; // Button pressed
export const ACCENT_90 = '#173647';
export const ACCENT_100 = '#112838';

// STATUS & ALERTS
export const ERROR_10 = '#f8e5e5';
export const ERROR_20 = '#ff9696';
export const ERROR_30 = '#ff6b63';
export const ERROR_40 = '#d40000';
export const ERROR_50 = '#a90000';

// SUCCESS
export const SUCCESS_10 = '#edf4e5';
export const SUCCESS_20 = '#99e6aa';
export const SUCCESS_30 = '#5cd677';
export const SUCCESS_40 = '#2cb14a';
export const SUCCESS_50 = '#1e8035';

// INFORMATION
export const INFORMATION_10 = '#e9f7ff';
export const INFORMATION_20 = '#8ae6ff';
export const INFORMATION_30 = '#19caf9';
export const INFORMATION_40 = '#097eb2';
export const INFORMATION_50 = '#00537c';

// WARNING
export const WARNING_10 = '#fff2de';
export const WARNING_20 = '#ffd9a1';
export const WARNING_30 = '#ffbd5c';
export const WARNING_40 = '#e48c09';
export const WARNING_50 = '#ad6800';

// PRODUCT
export const PRODUCT_10 = '#ebfafc';
export const PRODUCT_20 = '#d9eef1';
export const PRODUCT_30 = '#50e4ea';
export const PRODUCT_40 = '#07ced6';
export const PRODUCT_50 = '#00a0b4';
export const PRODUCT_60 = '#008a9c';
export const PRODUCT_70 = '#006d84';
export const PRODUCT_80 = '#00586b';
export const PRODUCT_90 = '#173647';


export const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans, sans-serif' as const
  },

  palette: {
    primary: {
      main: ACCENT_60
    },
    secondary: {
      main: NEUTRAL_80
    }
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          margin: 0
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: `${NEUTRAL_00}aa`
        }
      }
    },
    MuiAccordionSummary:{
      styleOverrides: {
        root:{
          backgroundColor: 'rgb(221,221,221)'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: 'none' as const,
          backgroundColor: 'rgb(0,0,0,0)'
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          boxShadow: `0px 1px 0px 0px ${NEUTRAL_10} inset`
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: NEUTRAL_05,
        }
      }
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          backgroundColor: NEUTRAL_00,
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true
      },
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          fontSize: '1rem',
          fontWeight: 600,
          backgroundColor: PRODUCT_70,
          color: NEUTRAL_00,
          ':hover': {
            backgroundColor: PRODUCT_80
          },
          ':active': {
            backgroundColor: PRODUCT_70
          },
          
        },
        sizeLarge: {
          padding: '10px 40px'
        },
        sizeMedium: {
          padding: '8px 12px'
        },
        sizeSmall: {
          padding: '6px 12px'
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'filled' && ownerState.severity === 'success' && {
                backgroundColor: SUCCESS_40,
                color: NEUTRAL_00,
              }),
          ...(ownerState.variant === 'filled' && ownerState.severity === 'error' && {
            backgroundColor: ERROR_40,
            color: NEUTRAL_00,
          }),
          ...(ownerState.variant === 'filled' && ownerState.severity === 'info' && {
            backgroundColor: INFORMATION_30,
            color: NEUTRAL_00,
          }),
          ...(ownerState.variant === 'filled' && ownerState.severity === 'warning' && {
            backgroundColor: WARNING_30,
            color: NEUTRAL_00,
          }),
        }),
      }
    }
  }
});
