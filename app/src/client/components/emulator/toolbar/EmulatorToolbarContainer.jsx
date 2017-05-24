import {connect} from 'react-redux';
import {AudioChannel} from '../../../enums';
import {selectEmulator, selectSettingsValues} from '../../../reducers';

import {
  resetEmulator, powerEmulator,
  startEmulator, stopEmulator,
  increaseVideoScale, decreaseVideoScale,
  enterFullscreen,
  setAudioVolume, setAudioEnabled,
} from '../../../actions';

import EmulatorToolbar from './EmulatorToolbar';

const mapStateToProps = state => {
  const {running} = selectEmulator(state);
  const {videoScale, fpsVisible, audioEnabled, audioVolume} = selectSettingsValues(state);
  return {
    running, videoScale, fpsVisible, audioEnabled,
    audioVolume: audioVolume.master,
  };
};

const mapDispatchToProps = dispatch => ({
  onFileOpen: () => document.getElementById('emulator-file').click(),
  onPower: () => dispatch(powerEmulator()),
  onReset: () => dispatch(resetEmulator()),
  onStart: () => dispatch(startEmulator()),
  onStop: () => dispatch(stopEmulator()),
  onVideoScaleDecrease: () => dispatch(decreaseVideoScale()),
  onVideoScaleIncrease: () => dispatch(increaseVideoScale()),
  onFullscreen: () => dispatch(enterFullscreen()),
  onAudioEnabledChange: enabled => dispatch(setAudioEnabled(enabled)),
  onAudioVolumeChange: volume => dispatch(setAudioVolume(AudioChannel.MASTER, volume)),
});

const connectEmulatorToolbar = connect(mapStateToProps, mapDispatchToProps);
export default connectEmulatorToolbar(EmulatorToolbar);
