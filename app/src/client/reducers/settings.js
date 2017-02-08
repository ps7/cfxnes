import {handleActions} from 'redux-actions';
import {MIN_VIDEO_SCALE, MAX_VIDEO_SCALE} from '../constants';
import {loadSettings} from '../settings';
import nes from '../nes';

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
}, loadSettings());
