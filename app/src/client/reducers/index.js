import {combineReducers} from 'redux';
import emulator from './emulatorReducer';
import settings from './settingsReducer';
import database from './databaseReducer';

export default combineReducers({emulator, settings, database});
