import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, Redirect, IndexRedirect, hashHistory} from 'react-router';
import store from '../store';
import AppLayout from './AppLayout';
import Emulator from './Emulator';
import EmulatorToolbar from './EmulatorToolbar';
import Library from './Library';
import Settings from './Settings';
import About from './About';

export default () => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={AppLayout}>
        <Route path="emulator(/:romId)" components={{main: Emulator, toolbar: EmulatorToolbar}}/>
        <Route path="library" components={{main: Library}}/>
        <Route path="settings(/:activePanelId)" components={{main: Settings}}/>
        <Route path="about" components={{main: About}}/>
        <IndexRedirect to="/emulator"/>
        <Redirect from="*" to="/emulator"/>
      </Route>
    </Router>
  </Provider>
);
