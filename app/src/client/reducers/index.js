import {combineReducers} from 'redux';
import emulator from './emulatorReducer';
import database from './databaseReducer';
import settings from './settingsReducer';

export default combineReducers({emulator, database, settings});
