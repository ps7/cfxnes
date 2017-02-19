import {handleActions} from '../utils';
import {OpState} from '../constants';
import {loadSettings} from '../settings';

import {
  SET_REGION,
  SET_SPEED,
  SET_VIDEO_RENDERER,
  SET_VIDEO_SCALE,
  SET_VIDEO_PALETTE,
  SET_VIDEO_FILTER,
  SET_VIDEO_DEBUG,
  SET_FULLSCREEN_TYPE,
  SET_FPS_VISIBLE,
  SET_AUDIO_ENABLED,
  SET_AUDIO_VOLUME,
  SET_DEVICE,
  START_SETTINGS_RESET,
  FINISH_SETTINGS_RESET,
  UNLOCK_SETTINGS_RESET,
} from '../actions/settingsActions';

export default handleActions({
  [SET_REGION]: (state, region) => ({...state, region}),
  [SET_SPEED]: (state, speed) => ({...state, speed}),
  [SET_VIDEO_RENDERER]: (state, videoRenderer) => ({...state, videoRenderer}),
  [SET_VIDEO_SCALE]: (state, videoScale) => ({...state, videoScale}),
  [SET_VIDEO_PALETTE]: (state, videoPalette) => ({...state, videoPalette}),
  [SET_VIDEO_FILTER]: (state, videoFilter) => ({...state, videoFilter}),
  [SET_VIDEO_DEBUG]: (state, videoDebug) => ({...state, videoDebug}),
  [SET_FULLSCREEN_TYPE]: (state, fullscreenType) => ({...state, fullscreenType}),
  [SET_FPS_VISIBLE]: (state, fpsVisible) => ({...state, fpsVisible}),
  [SET_AUDIO_ENABLED]: (state, audioEnabled) => ({...state, audioEnabled}),
  [SET_AUDIO_VOLUME]: (state, {channel, volume}) => {
    const {audioVolume} = state;
    return {...state, audioVolume: {...audioVolume, [channel]: volume}};
  },
  [SET_DEVICE]: (state, {port, device}) => {
    const {controls} = state;
    const {inputs} = controls[port];
    return {...state, controls: {...controls, [port]: {device, inputs}}};
  },
  [UNLOCK_SETTINGS_RESET]: state => ({...state, resetState: null}),
  [START_SETTINGS_RESET]: state => ({...state, resetState: OpState.STARTED}),
  [FINISH_SETTINGS_RESET]: {
    success: (state, defaultState) => ({...defaultState, resetState: OpState.SUCCESS}),
    failure: state => ({...state, resetState: OpState.ERROR}),
  },
}, loadSettings);
