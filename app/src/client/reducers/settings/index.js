import {combineReducers} from 'redux';
import system from './system';
import video from './video';
import audio from './audio';
import controls from './controls';

export default combineReducers({system, video, audio, controls});
