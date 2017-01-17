import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './components/App';

function renderApp() {
  const reactElement = <AppContainer><App/></AppContainer>;
  const domElement = document.getElementById('root');
  render(reactElement, domElement);
}

renderApp();

/* eslint-env node */
if (__DEVELOPMENT__ && module.hot) {
  module.hot.accept('./components/App', renderApp);
}
