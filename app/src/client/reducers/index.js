import {combineReducers} from 'redux';
import emulator from './emulator';
import database from './database';
import settings from './settings';

export default combineReducers({emulator, database, settings});
