import {combineReducers} from 'redux';
import emulator from './emulator';
import library from './library';
import settings from './settings';

export default combineReducers({emulator, library, settings});
