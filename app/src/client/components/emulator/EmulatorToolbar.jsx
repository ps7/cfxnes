import React, {PureComponent, PropTypes} from 'react';
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

import {Button, ButtonGroup, Icon, IconStack, Input, Popup, Toolbar, Tooltip} from '../common';
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

  handleVolumePopupToggle = () => {
    this.setState({volumePopupVisible: !this.state.volumePopupVisible});
  }

  handleVolumePopupClose = () => {
    this.setState({volumePopupVisible: false});
  }

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
    const {volumePopupVisible} = this.state;
    return (
      <ButtonGroup id="emulator-toolbar-volume">
        <Button onClick={this.handleVolumePopupToggle}>
          <IconStack className="volume-icon">
            {masterVolume > 0.5 && <Icon name="volume-up" stack="1x"/>}
            {masterVolume > 0 && masterVolume <= 0.5 && <Icon name="volume-down" stack="1x"/>}
            {masterVolume === 0 && <Icon name="volume-off" stack="1x"/>}
            {!audioEnabled && <Icon name="ban" stack="1x"/>}
          </IconStack>
          <Tooltip position="bottom">Volume</Tooltip>
        </Button>
        {volumePopupVisible && (
          <Popup className="volume-popup" onBlur={this.handleVolumePopupClose}>
            <Input type="checkbox" value={audioEnabled} onChange={this.handleAudioEnabledChange}/>
            <Input type="range" min="0" max="1" step="0.01" disabled={!audioEnabled}
                    value={masterVolume} onChange={this.handleMasterVolumeChange}/>
          </Popup>
        )}
      </ButtonGroup>
    );
  }

  render() {
    const {running, fpsVisible} = this.props;
    return (
      <Toolbar id="emulator-toolbar">
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
