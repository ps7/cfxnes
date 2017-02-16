import {combineReducers} from 'redux';
import emulator from './emulatorReducer';
import settings from './settingsReducer';

export default combineReducers({emulator, settings});
