import { memo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../components/GlobalStyles';

import { routes } from './routes';
import { theme } from './theme';

const NotFoundPage = loadable(() => import('../pages/NotFound'));

export const App = memo(() => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
});

export default App;
