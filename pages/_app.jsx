import React, { useReducer } from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import theme from '../src/theme';
import GlobalContext from '../src/components/GlobalContext';

const initialState = {
  difficulty: 41,
  playerColor: '#0199d9',
  gameSize: 0.8,
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_DIFFICULTY':
      return {
        difficulty: action.difficulty,
        playerColor: state.playerColor,
        gameSize: state.gameSize,
      };
    case 'UPDATE_PLAYER_COLOR':
      return {
        difficulty: state.difficulty,
        playerColor: action.playerColor,
        gameSize: state.gameSize,
      };
    case 'UPDATE_GAME_SIZE':
      return {
        difficulty: state.difficulty,
        playerColor: state.playerColor,
        gameSize: action.gameSize,
      };
    default:
      return initialState;
  }
}

function ContextWrapper({ children }) {
  const [settings, dispatch] = useReducer(reducer, initialState);
  return <GlobalContext.Provider value={{ settings, dispatch }}>{children}</GlobalContext.Provider>;
}

ContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>The Labyrinth</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <ContextWrapper>
            <Component {...pageProps} />
          </ContextWrapper>
        </ThemeProvider>
      </Container>
    );
  }
}

export default MyApp;
