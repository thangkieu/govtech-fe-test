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

  .rc-notification-notice {
    padding: 0.5rem 1rem;
    border: 1px solid ${(p) => p.theme.colors.border};
    box-shadow: 2px 2px 10px #ddd;
    max-width: 300px;
    line-height: 1.4;
    border-radius: 0.7em;
    padding: 0.5rem 1rem;
  }

  .noti-icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    margin-right: 0.5rem;
    margin-top: 3px;
  }

  .noti-content {
    display: flex;  
    line-height: 1.4; 
  }

  .noti-title {
    margin: 0;
    font-weight: normal;
    margin-bottom: 0.2rem;
    color: ${(p) => p.theme.colors.danger};
  }

  .noti-error {
    .noti-icon {
      fill: ${(p) => p.theme.colors.danger};
    }
  }
`;
