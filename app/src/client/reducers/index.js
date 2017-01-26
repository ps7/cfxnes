import {combineReducers} from 'redux';
import emulator from './emulator';
import fullscreen from './fullscreen';
import video from './video';

export default combineReducers({emulator, fullscreen, video});
