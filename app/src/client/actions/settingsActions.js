import {createAction} from 'redux-actions';
import {resetSettings as doSettingsReset} from '../settings';
import log from '../log';

// TODO move business logic to action creators

export const setRegion = createAction('setRegion');
export const setSpeed = createAction('setSpeed');
export const setVideoRenderer = createAction('setVideoRenderer');
export const setVideoScale = createAction('setVideoScale');
export const increaseVideoScale = createAction('increaseVideoScale');
export const decreaseVideoScale = createAction('decreaseVideoScale');
export const setVideoPalette = createAction('setVideoPalette');
export const setVideoFilter = createAction('setVideoFilter');
export const setVideoDebug = createAction('setVideoDebug');
export const setFullscreenType = createAction('setFullscreenType');
export const setFpsVisible = createAction('setFpsVisible');
export const setAudioEnabled = createAction('setAudioEnabled');
export const setAudioVolume = createAction('setAudioVolume', (channel, volume) => ({channel, volume}));
export const setDevice = createAction('setDevice', (port, device) => ({port, device}));

export const startSettingsReset = createAction('startSettingsReset');
export const finishSettingsReset = createAction('finishSettingsReset');
export const allowSettingsReset = createAction('allowSettingsReset');

export const resetSettings = () => dispatch => {
  dispatch(startSettingsReset());
  dispatch(finishSettingsReset(doSettingsReset()))
    .catch(error => log.error('Failed to reset settings', error))
    .then(() => {
      setTimeout(() => dispatch(allowSettingsReset()), 5000);
    });
};
