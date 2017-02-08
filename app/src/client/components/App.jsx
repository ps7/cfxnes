import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, Redirect, IndexRedirect, hashHistory} from 'react-router';
import store from '../store';
import AppLayout from './AppLayout';
import {Emulator, EmulatorToolbar} from './emulator';
import {Library} from './library';
import {Settings} from './settings';
import {About} from './about';

export default () => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={AppLayout}>
        <Route path="emulator(/:newRomId)" components={{main: Emulator, toolbar: EmulatorToolbar}}/>
        <Route path="library" components={{main: Library}}/>
        <Route path="settings(/:activePanelId)" components={{main: Settings}}/>
        <Route path="about" components={{main: About}}/>
        <IndexRedirect to="/emulator"/>
        <Redirect from="*" to="/emulator"/>
      </Route>
    </Router>
  </Provider>
);
