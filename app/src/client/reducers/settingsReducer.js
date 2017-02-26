import {
  SET_ACTIVE_PANEL,
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
  SET_CONTROLS_DEVICE,
  SET_CONTROLS_INPTUS,
  START_SETTINGS_RESET,
  FINISH_SETTINGS_RESET,
  UNLOCK_SETTINGS_RESET,
} from '../actions/settingsActions';

import {ActionState} from '../enums';
import {loadSettings} from '../settings';
import {handleActions} from './common';

export default handleActions({
  [SET_ACTIVE_PANEL]: (state, activePanelId) => ({...state, activePanelId}),
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
  [SET_CONTROLS_DEVICE]: (state, {port, device}) => {
    const {controls} = state;
    const {inputs} = controls[port];
    return {...state, controls: {...controls, [port]: {device, inputs}}};
  },
  [SET_CONTROLS_INPTUS]: (state, {port, inputs}) => {
    const {controls} = state;
    const {device} = controls[port];
    return {...state, controls: {...controls, [port]: {device, inputs}}};
  },
  [UNLOCK_SETTINGS_RESET]: state => ({...state, resetState: ActionState.NONE}),
  [START_SETTINGS_RESET]: state => ({...state, resetState: ActionState.STARTED}),
  [FINISH_SETTINGS_RESET]: {
    success: (state, defaultState) => ({...defaultState, resetState: ActionState.SUCCESS}),
    failure: state => ({...state, resetState: ActionState.FAILURE}),
  },
}, loadSettings);
