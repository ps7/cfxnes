import {createStore} from 'redux';
import rootReducer from './reducers';
import {watchSettings} from './settings';

const store = createStore(rootReducer);
watchSettings(store);
export default store;
