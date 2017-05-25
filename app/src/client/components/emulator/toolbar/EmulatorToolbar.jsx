import React from 'react';
import PropTypes from 'prop-types';
import {Toolbar} from '../../common';
import FileTools from './FileTools';
import SystemTools from './SystemTools';
import VideoTools from './VideoTools';
import AudioTools from './AudioTools';
import FpsCounter from './FpsCounter';
import connect from './connect';

const EmulatorToolbar = ({
  running, fpsVisible, videoScale, audioEnabled, audioVolume,
  onFileOpen, onPower, onReset, onStart, onStop,
  onVideoScaleDecrease, onVideoScaleIncrease, onFullscreen,
  onAudioEnabledChange, onAudioVolumeChange,
}) => (
  <Toolbar className="emulator-toolbar">
    <FileTools onFileOpen={onFileOpen}/>
    <SystemTools running={running} onPower={onPower}
                 onReset={onReset} onStart={onStart} onStop={onStop}/>
    <VideoTools scale={videoScale} onScaleDecrease={onVideoScaleDecrease}
                onScaleIncrease={onVideoScaleIncrease} onFullscreen={onFullscreen}/>
    <AudioTools enabled={audioEnabled} onEnabledChange={onAudioEnabledChange}
                value={audioVolume} onValueChange={onAudioVolumeChange}/>
    {fpsVisible && running && <FpsCounter/>}
  </Toolbar>
);

EmulatorToolbar.propTypes = {
  running: PropTypes.bool.isRequired,
  videoScale: PropTypes.number.isRequired,
  fpsVisible: PropTypes.bool.isRequired,
  audioEnabled: PropTypes.bool.isRequired,
  audioVolume: PropTypes.number.isRequired,
  onFileOpen: PropTypes.func.isRequired,
  onPower: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  onVideoScaleIncrease: PropTypes.func.isRequired,
  onVideoScaleDecrease: PropTypes.func.isRequired,
  onFullscreen: PropTypes.func.isRequired,
  onAudioEnabledChange: PropTypes.func.isRequired,
  onAudioVolumeChange: PropTypes.func.isRequired,
};

export default connect(EmulatorToolbar);
