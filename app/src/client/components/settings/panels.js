import {connect} from 'react-redux';

import {
  setRegion,
  setSpeed,
  setVideoRenderer,
  setVideoScale,
  setVideoPalette,
  setVideoFilter,
  setVideoDebug,
  setFullscreenType,
  setFpsVisible,
  setAudioEnabled,
  setAudioVolume,
  setControlsDevice,
  addControlsInput,
  removeControlsInput,
  resetControls,
  setControlsVisible,
  bindGamepadToJoypad,
  resetSettings,
  deleteNVRAMs,
} from '../../actions';

import {audioSupported} from '../../settings';
import {Device} from '../../enums';
import {SystemPanel} from './system';
import {VideoPanel} from './video';
import {AudioPanel} from './audio';
import {ControlsPanel} from './controls';
import {ResetPanel} from './reset';

const mapStateToProps = state => {
  const {database, settings} = state;
  return {
    audioSupported,
    settingsResetLocked: settings.resetLocked,
    nvramsDeletionState: database.nvramsDeletionState,
    ...settings.values,
  };
};

const mapDispatchToProps = dispatch => ({
  onRegionChange: region => dispatch(setRegion(region)),
  onSpeedChange: speed => dispatch(setSpeed(speed)),
  onVideoRendererChange: renderer => dispatch(setVideoRenderer(renderer)),
  onVideoScaleChange: scale => dispatch(setVideoScale(scale)),
  onVideoPaletteChange: palette => dispatch(setVideoPalette(palette)),
  onVideoFilterChange: filter => dispatch(setVideoFilter(filter)),
  onVideoDebugChange: debug => dispatch(setVideoDebug(debug)),
  onFullscreenTypeChange: type => dispatch(setFullscreenType(type)),
  onFpsVisibleChange: visible => dispatch(setFpsVisible(visible)),
  onAudioEnabledChange: enabled => dispatch(setAudioEnabled(enabled)),
  onAudioVolumeChange: (channel, volume) => dispatch(setAudioVolume(channel, volume)),
  onControlsVisibleChange: visible => dispatch(setControlsVisible(visible)),
  onControlsDeviceChange: (port, device) => dispatch(setControlsDevice(port, device)),
  onControlsInputAdd: deviceInput => dispatch(addControlsInput(deviceInput)),
  onControlsInputRemove: sourceInput => dispatch(removeControlsInput(sourceInput)),
  onControlsGamepadMap: (index, port) => {
    dispatch(setControlsDevice(port, Device.JOYPAD));
    dispatch(bindGamepadToJoypad(index, port));
  },
  onControlsReset: () => dispatch(resetControls()),
  onSettingsReset: () => dispatch(resetSettings()),
  onNVRAMsDelete: () => dispatch(deleteNVRAMs()),
});

const connectPanel = connect(mapStateToProps, mapDispatchToProps);
const panels = [SystemPanel, VideoPanel, AudioPanel, ControlsPanel, ResetPanel].map(connectPanel);
const panelIds = panels.map(panel => panel.id);
const isValidPanelId = id => panelIds.indexOf(id) >= 0;
const defaultPanelId = panelIds[0];

export {panels, isValidPanelId, defaultPanelId};
