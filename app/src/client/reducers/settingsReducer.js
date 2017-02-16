import {handleActions} from 'redux-actions';
import {OpState} from '../constants';
import {loadSettings} from '../settings';

export default handleActions({
  setRegion(state, action) {
    return {...state, region: action.payload};
  },

  setSpeed(state, action) {
    return {...state, speed: action.payload};
  },

  setVideoRenderer(state, action) {
    return {...state, videoRenderer: action.payload};
  },

  setVideoScale(state, action) {
    return {...state, videoScale: action.payload};
  },

  setVideoPalette(state, action) {
    return {...state, videoPalette: action.payload};
  },

  setVideoFilter(state, action) {
    return {...state, videoFilter: action.payload};
  },

  setVideoDebug(state, action) {
    return {...state, videoDebug: action.payload};
  },

  setFullscreenType(state, action) {
    return {...state, fullscreenType: action.payload};
  },

  setFpsVisible(state, action) {
    return {...state, fpsVisible: action.payload};
  },

  setAudioEnabled(state, action) {
    return {...state, audioEnabled: action.payload};
  },

  setAudioVolume(state, action) {
    const {channel, volume} = action.payload;
    const {audioVolume} = state;
    return {...state, audioVolume: {...audioVolume, [channel]: volume}};
  },

  setDevice(state, action) {
    const {port, device} = action.payload;
    const {controls} = state;
    const {inputs} = controls[port];
    return {...state, controls: {...controls, [port]: {device, inputs}}};
  },

  startSettingsReset(state) {
    return {...state, resetState: OpState.STARTED};
  },

  finishSettingsReset(state, action) {
    if (action.error) {
      return {...state, resetState: OpState.ERROR};
    }
    return {...action.payload, resetState: OpState.SUCCESS};
  },

  unlockSettingsReset(state) {
    return {...state, resetState: null};
  },
}, loadSettings());
