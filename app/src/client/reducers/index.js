import {combineReducers} from 'redux';
import emulator from './emulator';
import settings from './settings';

export default combineReducers({emulator, settings});
