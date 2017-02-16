import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import rootReducer from './reducers';
import {watchSettings} from './settings';

const enhancer = applyMiddleware(thunk, promise);
const store = createStore(rootReducer, enhancer);

watchSettings(store);

export default store;
