import React from 'react';
import {connect} from 'react-redux';
import ButtonGroup from './ButtonGroup';
import Button from './Button';
import FpsCounter from './FpsCounter';
import {startEmulator, stopEmulator} from '../actions';

class EmulatorToolbar extends React.Component {

  handleStart = () => {
    this.props.dispatch(startEmulator());
  };

  handleStop = () => {
    this.props.dispatch(stopEmulator());
  };

  render() {
    const {running} = this.props;

    return (
      <div className="emulator-toolbar">
        <ButtonGroup>
          <Button icon="folder-open" tooltip="Open ROM"/>
        </ButtonGroup>
          <Button icon="power-off" tooltip="Power"/>
          <Button icon="repeat" tooltip="Reset"/>
          {running
            ? <Button icon="pause" tooltip="Pause" onClick={this.handleStop}/>
            : <Button icon="play" tooltip="Run" onClick={this.handleStart}/>
          }
        <ButtonGroup>
        </ButtonGroup>
        <ButtonGroup>
          <Button icon="search-plus" tooltip="Decrease scale"/>
          <Button icon="search-plus" tooltip="Increase scale"/>
          <Button icon="arrows-alt" tooltip="Fullscreen"/>
        </ButtonGroup>
        <ButtonGroup>
          <Button icon="volume-up" tooltip="Volume"/>
        </ButtonGroup>
        {running && <FpsCounter/>}
      </div>
    );
  }

}

const mapStateToProps = state => ({
  running: state.running,
});

export default connect(mapStateToProps)(EmulatorToolbar);
