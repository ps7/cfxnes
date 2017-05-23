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

import {Button, ButtonGroup, Icon, Toolbar, Tooltip} from '../common';
import VolumeControl from './VolumeControl';
import FpsCounter from './FpsCounter';

class EmulatorToolbar extends PureComponent {

  static propTypes = {
    running: PropTypes.bool.isRequired,
    videoScale: PropTypes.number.isRequired,
    fpsVisible: PropTypes.bool.isRequired,
    masterVolume: PropTypes.number.isRequired,
    audioEnabled: PropTypes.bool.isRequired,
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

  handleMasterVolumeChange = value => {
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
    const {masterVolume, audioEnabled} = this.props;
    return <VolumeControl value={masterVolume} onValueChange={this.handleMasterVolumeChange}
                          enabled={audioEnabled} onEnabledChange={this.handleAudioEnabledChange}/>;
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
  const {running} = state.emulator;
  const {videoScale, fpsVisible, audioEnabled, audioVolume} = state.settings.values;
  const masterVolume = audioVolume.master;
  return {running, videoScale, fpsVisible, masterVolume, audioEnabled};
};

export default connect(mapStateToProps)(EmulatorToolbar);
