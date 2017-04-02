import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, Redirect, IndexRedirect, browserHistory} from 'react-router';
import {App, emulator, library, settings, about} from './components';
import store from './store';

export default () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="emulator" components={emulator}>
          <Route path=":romId" components={emulator}/>
        </Route>
        <Route path="library" components={library}/>
        <Route path="settings" components={settings}>
          <Route path=":activePanelId" components={settings}/>
        </Route>
        <Route path="about" components={about}/>
        <IndexRedirect to="/emulator"/>
        <Redirect from="*" to="/emulator"/>
      </Route>
    </Router>
  </Provider>
);
