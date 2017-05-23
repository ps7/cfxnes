import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {AppContainer, HeaderContainer, Emulator, EmulatorToolbar, Library, Settings, About} from './components';
import store from './store';

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
          <Route path="/library" component={Library}/>
          <Route path="/settings/:activePanelId?" component={Settings}/>
          <Route path="/about" component={About}/>
          <Route component={EmulatorRedirect}/>
        </Switch>
      </AppContainer>
    </BrowserRouter>
  </Provider>
);
