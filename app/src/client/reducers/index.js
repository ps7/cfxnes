import {combineReducers} from 'redux';
import emulator from './emulator';
import library from './library';
import settings from './settings';
import database from './database';

export default combineReducers({emulator, library, database, settings});
