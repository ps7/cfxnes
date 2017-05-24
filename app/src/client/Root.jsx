import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import store from './store';

import {
  AppContainer,
  HeaderContainer,
  Emulator,
  EmulatorToolbar,
  LibraryContainer,
  Settings,
  About,
} from './components';

const EmulatorRedirect = () => <Redirect to="/emulator"/>;

export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer>
        <HeaderContainer>
          <Route path="/emulator" component={EmulatorToolbar}/>
        </HeaderContainer>
        <Switch>
          <Route path="/emulator/:romId?" component={Emulator}/>
          <Route path="/library" component={LibraryContainer}/>
          <Route path="/settings/:activePanelId?" component={Settings}/>
          <Route path="/about" component={About}/>
          <Route component={EmulatorRedirect}/>
        </Switch>
      </AppContainer>
    </BrowserRouter>
  </Provider>
);
