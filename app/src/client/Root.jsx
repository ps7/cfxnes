import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {App, Header, Emulator, EmulatorToolbar, Library, Settings, About} from './components';
import {EMULATOR_PATH, LIBRARY_PATH, SETTINGS_PATH, ABOUT_PATH} from './routes';
import store from './store';

const EmulatorRedirect = () => <Redirect to="/emulator"/>;

export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Header>
          <Route path={EMULATOR_PATH} component={EmulatorToolbar}/>
        </Header>
        <Switch>
          <Route path={EMULATOR_PATH} component={Emulator}/>
          <Route path={LIBRARY_PATH} component={Library}/>
          <Route path={SETTINGS_PATH} component={Settings}/>
          <Route path={ABOUT_PATH} component={About}/>
          <Route component={EmulatorRedirect}/>
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>
);
