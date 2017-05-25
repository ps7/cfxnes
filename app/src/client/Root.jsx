import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {App, Header, Emulator, EmulatorToolbar, Library, Settings, About} from './components';
import store from './store';

const EmulatorRedirect = () => <Redirect to="/emulator"/>;

export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Header>
          <Route path="/emulator" component={EmulatorToolbar}/>
        </Header>
        <Switch>
          <Route path="/emulator/:romId?" component={Emulator}/>
          <Route path="/library" component={Library}/>
          <Route path="/settings/:activePanelId?" component={Settings}/>
          <Route path="/about" component={About}/>
          <Route component={EmulatorRedirect}/>
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>
);
