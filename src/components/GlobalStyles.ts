import { createGlobalStyle } from 'styled-components';
import 'normalize.css';
import { mediaQuery } from '../utils/helpers';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  html {
    font-size: 12px;

    ${mediaQuery('lg')} {
      font-size: 14px;
    }
  }

  body {
    font-family: Open Sans, Roboto, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${(p) => p.theme.colors.bg};
    color: ${(p) => p.theme.colors.text};
  }

  p {
    line-height: 1.4;
  }

  h1 { font-size: 3em }
  
  button { color: inherit; }
  
  .icon { width: 1em; height: 1em }
  
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
