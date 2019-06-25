import { createMuiTheme } from '@material-ui/core/styles';

const theme = (overrides = {}) => createMuiTheme({
  ...{
    palette: {
      primary: {
        main: '#0199d9',
      },
      secondary: {
        main: '#FFF',
      },
    },
  },
  ...overrides,
});

export default theme;
