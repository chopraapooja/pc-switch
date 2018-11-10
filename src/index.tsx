import createHistory from 'history/createBrowserHistory';
import 'promise-polyfill/src/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import 'whatwg-fetch';
import '../src/styles/index.scss';
import { Home } from '../src/components/Home';

const history = createHistory();

export class App extends React.Component {

  render() {
    return (
      <Router history={history}>
        <Route
          name="Project"
          path="*"
          component={Home}
        />
      </Router>
    )
  }
}

render(
  <App />,
  document.getElementById('root')
);
