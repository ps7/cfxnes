import React from 'react';
import {connect} from 'react-redux';
import {MIN_VIDEO_SCALE, MAX_VIDEO_SCALE} from '../../constants';

import {
  resetEmulator, powerEmulator,
  startEmulator, stopEmulator,
  increaseVideoScale, decreaseVideoScale,
  enterFullscreen,
} from '../../actions';

import {Button, ButtonGroup, Toolbar} from '../common';
import FpsCounter from './FpsCounter';

class EmulatorToolbar extends React.Component {

  static propTypes = {
    running: React.PropTypes.bool.isRequired,
    videoScale: React.PropTypes.number.isRequired,
    fpsVisible: React.PropTypes.bool.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  };

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
          <Button icon="folder-open" tooltip="Open ROM"/>
        </ButtonGroup>
        <ButtonGroup>
          <Button icon="power-off" tooltip="Power" onClick={this.handlePower}/>
          <Button icon="repeat" tooltip="Reset" onClick={this.handleReset}/>
          {running
            ? <Button icon="pause" tooltip="Pause" onClick={this.handleStop}/>
            : <Button icon="play" tooltip="Run" onClick={this.handleStart}/>
          }
        </ButtonGroup>
        <ButtonGroup>
          <Button icon="search-minus" tooltip="Increase scale" disabled={videoScale <= MIN_VIDEO_SCALE} onClick={this.handleDecreaseScale}/>
          <Button icon="search-plus" tooltip="Decrease scale" disabled={videoScale >= MAX_VIDEO_SCALE} onClick={this.handleIncreaseScale}/>
          <Button icon="arrows-alt" tooltip="Fullscreen" onClick={this.handleFullscren}/>
        </ButtonGroup>
        <ButtonGroup>
          <Button icon="volume-up" tooltip="Volume"/>
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
