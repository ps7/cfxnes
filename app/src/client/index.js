import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './App';

function renderApp() {
  const reactElement = <AppContainer><App/></AppContainer>;
  const domElement = document.getElementById('root');
  ReactDOM.render(reactElement, domElement);
}

if (module.hot) {
  module.hot.accept('./App', renderApp);
}

renderApp();
