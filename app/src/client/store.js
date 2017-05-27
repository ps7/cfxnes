import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {identity} from 'lodash-es';
import rootReducer, {selectSettingsValues} from './reducers';
import {initSettings} from './actions';
import {saveSettings} from './settings';

const middleware = [thunk, promise];
const applyDevTools = (__DEVELOPMENT__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || identity; // eslint-disable-line no-underscore-dangle

if (__DEVELOPMENT__) {
  const {createLogger} = require('redux-logger');
  middleware.push(createLogger({diff: true, duration: true}));
}

const enhancer = applyDevTools(applyMiddleware(...middleware));
const store = createStore(rootReducer, enhancer);

if (__DEVELOPMENT__ && module.hot) {
  module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
}

store.dispatch(initSettings()).then(() => {
  store.subscribe(() => saveSettings(selectSettingsValues(store.getState())));
});

export default store;
