import {resetSettings as doSettingsReset, copyInputsFromNes} from '../settings';
import {MIN_VIDEO_SCALE, MAX_VIDEO_SCALE} from '../constants';
import {Port, Device, Source} from '../enums';
import log from '../log';
import nes from '../nes';
import {UNLOCK_TIMEOUT, createAction} from './common';

export const SET_ACTIVE_PANEL = 'SET_ACTIVE_PANEL';
export const SET_REGION = 'SET_REGION';
export const SET_SPEED = 'SET_SPEED';
export const SET_VIDEO_RENDERER = 'SET_VIDEO_RENDERER';
export const SET_VIDEO_SCALE = 'SET_VIDEO_SCALE';
export const SET_VIDEO_PALETTE = 'SET_VIDEO_PALETTE';
export const SET_VIDEO_FILTER = 'SET_VIDEO_FILTER';
export const SET_VIDEO_DEBUG = 'SET_VIDEO_DEBUG';
export const SET_FULLSCREEN_TYPE = 'SET_FULLSCREEN_TYPE';
export const SET_FPS_VISIBLE = 'SET_FPS_VISIBLE';
export const SET_AUDIO_ENABLED = 'SET_AUDIO_ENABLED';
export const SET_AUDIO_VOLUME = 'SET_AUDIO_VOLUME';
export const SET_CONTROLS_DEVICE = 'SET_CONTROLS_DEVICE';
export const SET_CONTROLS_INPTUS = 'SET_CONTROLS_INPTUS';
export const UNLOCK_SETTINGS_RESET = 'UNLOCK_SETTINGS_RESET';
export const START_SETTINGS_RESET = 'START_SETTINGS_RESET';
export const FINISH_SETTINGS_RESET = 'FINISH_SETTINGS_RESET';

export function setActivePanel(id) {
  return createAction(SET_ACTIVE_PANEL, id);
}

export function setRegion(region) {
  nes.region = region;
  return createAction(SET_REGION, region);
}

export function setSpeed(speed) {
  nes.speed = speed;
  return createAction(SET_SPEED, speed);
}

export function setVideoRenderer(renderer) {
  nes.video.renderer = renderer;
  return createAction(SET_VIDEO_RENDERER, renderer);
}

export function setVideoScale(scale) {
  nes.video.scale = scale;
  return createAction(SET_VIDEO_SCALE, scale);
}

export function increaseVideoScale() {
  return dispatch => {
    if (nes.video.scale < MAX_VIDEO_SCALE) {
      dispatch(setVideoScale(nes.video.scale + 1));
    }
  };
}

export function decreaseVideoScale() {
  return dispatch => {
    if (nes.video.scale > MIN_VIDEO_SCALE) {
      dispatch(setVideoScale(nes.video.scale - 1));
    }
  };
}

export function setVideoPalette(palette) {
  nes.video.palette = palette;
  return createAction(SET_VIDEO_PALETTE, palette);
}

export function setVideoFilter(filter) {
  nes.video.filter = filter;
  return createAction(SET_VIDEO_FILTER, filter);
}

export function setVideoDebug(debug) {
  nes.video.debug = debug;
  return createAction(SET_VIDEO_DEBUG, debug);
}

export function setFullscreenType(type) {
  nes.fullscreen.type = type;
  return createAction(SET_FULLSCREEN_TYPE, type);
}

export function setFpsVisible(visible) {
  return createAction(SET_FPS_VISIBLE, visible);
}

export function setAudioEnabled(enabled) {
  nes.audio.enabled = enabled;
  return createAction(SET_AUDIO_ENABLED, enabled);
}

export function setAudioVolume(channel, volume) {
  nes.audio.volume[channel] = volume;
  return createAction(SET_AUDIO_VOLUME, {channel, volume});
}

export function setControlsDevice(port, device) {
  nes.devices[port] = device;
  return createAction(SET_CONTROLS_DEVICE, {port, device});
}

export function rebindControlsInput(deviceInput) {
  return dispatch => {
    return new Promise(resolve => {
      nes.inputs.record(sourceInputId => {
        if (sourceInputId !== 'keyboard.escape') {
          const deviceInputId = Device.getInputId(deviceInput);
          nes.inputs.delete(deviceInputId, sourceInputId);
          nes.inputs.set(deviceInputId, sourceInputId);
          for (const port of Port.values) {
            const inputs = copyInputsFromNes(port);
            dispatch(createAction(SET_CONTROLS_INPTUS, {port, inputs}));
          }
        }
        resolve();
      });
    });
  };
}

export function resetSettings() {
  return dispatch => {
    dispatch(createAction(START_SETTINGS_RESET));
    dispatch(createAction(FINISH_SETTINGS_RESET, doSettingsReset()))
      .catch(error => log.error('Failed to reset settings', error))
      .then(() => {
        setTimeout(() => dispatch(createAction(UNLOCK_SETTINGS_RESET)), UNLOCK_TIMEOUT);
      });
  };
}
