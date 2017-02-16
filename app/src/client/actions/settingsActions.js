import {createAction} from 'redux-actions';
import {resetSettings as doSettingsReset} from '../settings';
import {MIN_VIDEO_SCALE, MAX_VIDEO_SCALE, NO_DEVICE} from '../constants';
import log from '../log';
import nes from '../nes';

export const setFpsVisible = createAction('setFpsVisible');
export const startSettingsReset = createAction('startSettingsReset');
export const finishSettingsReset = createAction('finishSettingsReset');
export const unlockSettingsReset = createAction('unlockSettingsReset');

export const setRegion = createAction('setRegion', region => {
  nes.region = region;
  return region;
});

export const setSpeed = createAction('setSpeed', speed => {
  nes.speed = speed;
  return speed;
});

export const setVideoRenderer = createAction('setVideoRenderer', renderer => {
  nes.video.renderer = renderer;
  return renderer;
});

export const setVideoScale = createAction('setVideoScale', scale => {
  nes.video.scale = scale;
  return scale;
});

export const setVideoPalette = createAction('setVideoPalette', palette => {
  nes.video.palette = palette;
  return palette;
});

export const setVideoFilter = createAction('setVideoFilter', filter => {
  nes.video.filter = filter;
  return filter;
});

export const setVideoDebug = createAction('setVideoDebug', debug => {
  nes.video.debug = debug;
  return debug;
});

export const setFullscreenType = createAction('setFullscreenType', type => {
  nes.fullscreen.type = type;
  return type;
});

export const setAudioEnabled = createAction('setAudioEnabled', enabled => {
  nes.audio.enabled = enabled;
  return enabled;
});

export const setAudioVolume = createAction('setAudioVolume', (channel, volume) => {
  nes.audio.volume[channel] = volume;
  return {channel, volume};
});

export const setDevice = createAction('setDevice', (port, device) => {
  nes.devices[port] = device !== NO_DEVICE ? device : null;
  return {port, device};
});

export const increaseVideoScale = () => dispatch => {
  if (nes.video.scale < MAX_VIDEO_SCALE) {
    dispatch(setVideoScale(nes.video.scale + 1));
  }
};

export const decreaseVideoScale = () => dispatch => {
  if (nes.video.scale > MIN_VIDEO_SCALE) {
    dispatch(setVideoScale(nes.video.scale - 1));
  }
};

export const resetSettings = () => dispatch => {
  dispatch(startSettingsReset());
  dispatch(finishSettingsReset(doSettingsReset()))
    .catch(error => log.error('Failed to reset settings', error))
    .then(() => {
      setTimeout(() => dispatch(unlockSettingsReset()), 5000);
    });
};
