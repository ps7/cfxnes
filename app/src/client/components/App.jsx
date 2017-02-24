import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, Redirect, IndexRedirect, browserHistory} from 'react-router';
import store from '../store';
import AppLayout from './AppLayout';
import * as emulatorComponents from './emulator';
import * as libraryComponents from './library';
import * as settingsComponents from './settings';
import * as aboutComponents from './about';

export default () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppLayout}>
        <Route path="emulator" components={emulatorComponents}>
          <Route path=":romId" components={emulatorComponents}/>
        </Route>
        <Route path="library" components={libraryComponents}/>
        <Route path="settings" components={settingsComponents}>
          <Route path=":activePanelId" components={settingsComponents}/>
        </Route>
        <Route path="about" components={aboutComponents}/>
        <IndexRedirect to="/emulator"/>
        <Redirect from="*" to="/emulator"/>
      </Route>
    </Router>
  </Provider>
);
