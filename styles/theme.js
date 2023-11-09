import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: '#1366d9',
      dark: '#282F33',
      light: '#637580'
    },
    secondary: {
      main: '#48B285',
      contrastText: '#FFFFFF'
    },
    button: {
      main: '#FFFFFF',
    },
    description: {
      primary: '#637580'
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;