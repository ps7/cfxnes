import {handleActions} from 'redux-actions';
import {MIN_VIDEO_SCALE, MAX_VIDEO_SCALE, NO_DEVICE, OpState} from '../constants';
import {loadSettings} from '../settings';
import nes from '../nes';

// TODO move business logic to action creators

export default handleActions({
  setRegion(state, action) {
    nes.region = action.payload;
    return {...state, region: nes.region};
  },

  setSpeed(state, action) {
    nes.speed = action.payload;
    return {...state, speed: nes.speed};
  },

  setVideoRenderer(state, action) {
    nes.video.renderer = action.payload;
    return {...state, videoRenderer: nes.video.renderer};
  },

  setVideoScale(state, action) {
    nes.video.scale = action.payload;
    return {...state, videoScale: nes.video.scale};
  },

  increaseVideoScale(state) {
    if (nes.video.scale < MAX_VIDEO_SCALE) {
      nes.video.scale++;
    }
    return {...state, videoScale: nes.video.scale};
  },

  decreaseVideoScale(state) {
    if (nes.video.scale > MIN_VIDEO_SCALE) {
      nes.video.scale--;
    }
    return {...state, videoScale: nes.video.scale};
  },

  setVideoPalette(state, action) {
    nes.video.palette = action.payload;
    return {...state, videoPalette: nes.video.palette};
  },

  setVideoFilter(state, action) {
    nes.video.filter = action.payload;
    return {...state, videoFilter: nes.video.filter};
  },

  setVideoDebug(state, action) {
    nes.video.debug = action.payload;
    return {...state, videoDebug: nes.video.debug};
  },

  setFullscreenType(state, action) {
    nes.fullscreen.type = action.payload;
    return {...state, fullscreenType: nes.fullscreen.type};
  },

  setFpsVisible(state, action) {
    return {...state, fpsVisible: action.payload};
  },

  setAudioEnabled(state, action) {
    nes.audio.enabled = action.payload;
    return {...state, audioEnabled: nes.audio.enabled};
  },

  setAudioVolume(state, action) {
    const {channel, volume} = action.payload;
    nes.audio.volume[channel] = volume;
    return {...state, audioVolume: {...nes.audio.volume}};
  },

  setDevice(state, action) {
    const {port, device} = action.payload;
    nes.devices[port] = device !== NO_DEVICE ? device : null;
    return {...state, controls: {...state.controls, [port]: {...state.controls[port] || NO_DEVICE, device}}};
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

  allowSettingsReset(state) {
    return {...state, resetState: null};
  },
}, loadSettings());
