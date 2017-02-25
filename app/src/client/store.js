import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {identity} from 'lodash-es';
import rootReducer from './reducers';
import {createSettingsMonitor} from './settings';

const middleware = [thunk, promise];
const applyDevTools = (__DEVELOPMENT__ && __REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || identity;

if (__DEVELOPMENT__) {
  const createLogger = require('redux-logger');
  middleware.push(createLogger({diff: true, duration: true}));
}

const enhancer = applyDevTools(applyMiddleware(...middleware));
const store = createStore(rootReducer, enhancer);

if (__DEVELOPMENT__ && module.hot) {
  module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
}

const checkSettings = createSettingsMonitor();
store.subscribe(() => checkSettings(store.getState().settings));

export default store;
