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
    font-family: Open Sans, Roboto, Helvetica Neue, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${(p) => p.theme.colors.bg};
  }

  p {
    line-height: 1.4;
  }
`;
