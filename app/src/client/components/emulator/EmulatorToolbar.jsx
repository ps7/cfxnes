import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {MIN_VIDEO_SCALE, MAX_VIDEO_SCALE} from '../../common';

import {
  resetEmulator, powerEmulator,
  startEmulator, stopEmulator,
  increaseVideoScale, decreaseVideoScale,
  enterFullscreen,
} from '../../actions';

import {Button, ButtonGroup, Icon, Toolbar, Tooltip} from '../common';
import FpsCounter from './FpsCounter';

class EmulatorToolbar extends Component {

  static propTypes = {
    running: PropTypes.bool.isRequired,
    videoScale: PropTypes.number.isRequired,
    fpsVisible: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

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

  render() {
    const {running, videoScale, fpsVisible} = this.props;

    return (
      <Toolbar type="emulator">
        <ButtonGroup>
          <Button onClick={this.handleOpenROM}>
            <Icon name="folder-open"/>
            <Tooltip position="bottom">Open ROM</Tooltip>
          </Button>
        </ButtonGroup>
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
        <ButtonGroup>
          <Button>
            <Icon name="volume-up"/>
            <Tooltip position="bottom">Volume</Tooltip>
          </Button>
        </ButtonGroup>
        {fpsVisible && running && <FpsCounter/>}
      </Toolbar>
    );
  }

}

const mapStateToProps = state => {
  const {running} = state.emulator;
  const {videoScale, fpsVisible} = state.settings.values;
  return {running, videoScale, fpsVisible};
};

export default connect(mapStateToProps)(EmulatorToolbar);
