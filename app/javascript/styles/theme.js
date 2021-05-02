import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63a4ff',
      main: '#1976d2',
      dark: '#004ba0',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#fffd61',
      main: '#ffca28',
      dark: '#c79a00',
      contrastText: '#000000'
    }
  },
  typography: {
    h1: {
      fontFamily: "Kaushan Script"
    },
    h2: {
      fontFamily: "Kaushan Script"
    },
    h3: {
      fontFamily: "Kaushan Script"
    },
    h4: {
      fontFamily: "Kaushan Script"
    },
    h5: {
      fontFamily: "Kaushan Script"
    },
    h6: {
      fontFamily: "Kaushan Script"
    },
  }
});

export default theme;