import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {MIN_VIDEO_SCALE, MAX_VIDEO_SCALE} from '../../common';
import {AudioChannel} from '../../enums';

import {
  resetEmulator, powerEmulator,
  startEmulator, stopEmulator,
  increaseVideoScale, decreaseVideoScale,
  enterFullscreen,
  setAudioVolume, setAudioEnabled,
} from '../../actions';

import {selectEmulator, selectSettingsValues} from '../../reducers';
import {Button, ButtonGroup, Icon, Toolbar, Tooltip} from '../common';
import VolumeControl from './VolumeControl';
import FpsCounter from './FpsCounter';

class EmulatorToolbar extends PureComponent {

  static propTypes = {
    running: PropTypes.bool.isRequired,
    videoScale: PropTypes.number.isRequired,
    fpsVisible: PropTypes.bool.isRequired,
    audioEnabled: PropTypes.bool.isRequired,
    audioVolume: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  state = {volumePopupVisible: false};

  handleOpenROM = () => {
    document.getElementById('emulator-file').click();
  }

  handlePower = () => {
    this.props.dispatch(powerEmulator());
  };

  handleReset = () => {
    this.props.dispatch(resetEmulator());
  };

  handleStart = () => {
    this.props.dispatch(startEmulator());
  };

  handleStop = () => {
    this.props.dispatch(stopEmulator());
  };

  handleIncreaseScale = () => {
    this.props.dispatch(increaseVideoScale());
  };

  handleDecreaseScale = () => {
    this.props.dispatch(decreaseVideoScale());
  };

  handleFullscren = () => {
    this.props.dispatch(enterFullscreen());
  };

  handleAudioVolumeChange = value => {
    this.props.dispatch(setAudioVolume(AudioChannel.MASTER, value));
  };

  handleAudioEnabledChange = enabled => {
    this.props.dispatch(setAudioEnabled(enabled));
  };

  renderInputButtons() {
    return (
      <ButtonGroup>
        <Button onClick={this.handleOpenROM}>
          <Icon name="folder-open"/>
          <Tooltip position="bottom">Open ROM</Tooltip>
        </Button>
      </ButtonGroup>
    );
  }

  renderSystemButtons() {
    const {running} = this.props;
    return (
      <ButtonGroup>
        <Button onClick={this.handlePower}>
          <Icon name="power-off"/>
          <Tooltip position="bottom">Power</Tooltip>
        </Button>
        <Button onClick={this.handleReset}>
          <Icon name="repeat"/>
          <Tooltip position="bottom">Reset</Tooltip>
        </Button>
        {running ? (
          <Button onClick={this.handleStop}>
            <Icon name="pause"/>
            <Tooltip position="bottom">Pause</Tooltip>
          </Button>
        ) : (
          <Button onClick={this.handleStart}>
            <Icon name="play"/>
            <Tooltip position="bottom">Run</Tooltip>
          </Button>
        )}
      </ButtonGroup>
    );
  }

  renderVideoButtons() {
    const {videoScale} = this.props;
    return (
      <ButtonGroup>
        <Button disabled={videoScale <= MIN_VIDEO_SCALE} onClick={this.handleDecreaseScale}>
          <Icon name="search-minus"/>
          <Tooltip position="bottom">Increase scale</Tooltip>
        </Button>
        <Button disabled={videoScale >= MAX_VIDEO_SCALE} onClick={this.handleIncreaseScale}>
          <Icon name="search-plus"/>
          <Tooltip position="bottom">Decrease scale</Tooltip>
        </Button>
        <Button onClick={this.handleFullscren}>
          <Icon name="arrows-alt"/>
          <Tooltip position="bottom">Fullscreen</Tooltip>
        </Button>
      </ButtonGroup>
    );
  }

  renderAudioButtons() {
    const {audioEnabled, audioVolume} = this.props;
    return <VolumeControl enabled={audioEnabled} onEnabledChange={this.handleAudioEnabledChange}
                          value={audioVolume} onValueChange={this.handleAudioVolumeChange}/>;
  }

  render() {
    const {running, fpsVisible} = this.props;
    return (
      <Toolbar className="emulator-toolbar">
        {this.renderInputButtons()}
        {this.renderSystemButtons()}
        {this.renderVideoButtons()}
        {this.renderAudioButtons()}
        {fpsVisible && running && <FpsCounter/>}
      </Toolbar>
    );
  }

}

const mapStateToProps = state => {
  const {running} = selectEmulator(state);
  const {videoScale, fpsVisible, audioEnabled, audioVolume} = selectSettingsValues(state);
  return {
    running, videoScale, fpsVisible,
    audioEnabled, audioVolume: audioVolume.master,
  };
};

export default connect(mapStateToProps)(EmulatorToolbar);
