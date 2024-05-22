import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
   palette: {
      primary: {
         main: '#1FAB89',
      },
      secondary: {
         main: '#62D2A2',
         light: '#9DF3C4',
      },
   },

   components: {
      MuiButton: {
         defaultProps: {
            variant: 'contained',
         },
         styleOverrides: {
            root: {
               padding: '8px 24px',
            },
         },
      },
      MuiContainer: {
         defaultProps: {
            maxWidth: 'lg',
         },
      },
   },
   typography: {
      body1: {
         color: '#0B1134CC',
      },
   },
});

theme.shadows[1] = '0px 5px 22px lightgray';
