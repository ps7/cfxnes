import React from 'react';
import {connect} from 'react-redux';
import {noop} from 'lodash-es';
import {Panel, Modal, Icon, Field} from '../common';
import {Port, Device, SettingsGroup} from '../../enums';

import {
  setControlsDevice,
  addControlsInput,
  removeControlsInput,
  resetControls,
  setControlsVisible,
  bindGamepadToJoypad,
} from '../../actions';

import {Controls, GamepadList} from './controls';

const {CONTROLS} = SettingsGroup;

class ControlsPanel extends React.Component {

  static id = CONTROLS;

  static propTypes = {
    controls: React.PropTypes.shape({
      [Port.ONE]: Controls.propTypes.controls,
      [Port.TWO]: Controls.propTypes.controls,
    }).isRequired,
    controlsVisible: React.PropTypes.bool.isRequired,
    active: React.PropTypes.bool,
    onActivate: React.PropTypes.func,
    dispatch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    active: false,
    onActivate: noop,
  }

  constructor(props) {
    super(props);
    this.state = {inputRequestVisible: false};
  }

  handleHeaderClick = () => {
    this.props.onActivate(CONTROLS);
  }

  handleDeviceChange = (port, device) => {
    this.props.dispatch(setControlsDevice(port, device));
  };

  handleInputAddRequest = deviceInput => {
    this.setState({inputRequestVisible: true});
    this.props.dispatch(addControlsInput(deviceInput)).then(() => {
      this.setState({inputRequestVisible: false});
    });
  };

  handleInputRemoveRequest = sourceInput => {
    this.props.dispatch(removeControlsInput(sourceInput));
  };

  handleGamepadMapRequest = (index, port) => {
    const {dispatch} = this.props;
    dispatch(setControlsDevice(port, Device.JOYPAD));
    dispatch(bindGamepadToJoypad(index, port));
  };

  handleResetControls = event => {
    event.preventDefault();
    this.props.dispatch(resetControls());
  };

  handleControlsVisibleChange = event => {
    this.props.dispatch(setControlsVisible(event.target.checked));
  };

  render() {
    const {controls, controlsVisible, active} = this.props;
    return (
      <Panel type={CONTROLS} icon="gamepad" caption="Controls" collapsed={!active} onHeaderClick={this.handleHeaderClick}>
        {this.state.inputRequestVisible && (
          <Modal>
            <Modal.Body>
              <div>Press key or button (ESC to cancel).</div>
            </Modal.Body>
          </Modal>
        )}
        {Port.values.map(port => {
          return <Controls key={port} port={port} controls={controls[port]}
                           onDeviceChange={this.handleDeviceChange}
                           onInputAddRequest={this.handleInputAddRequest}
                           onInputRemoveRequest={this.handleInputRemoveRequest}/>;
        })}
        <div className="controls-defaults">
          <Icon name="keyboard-o"/> &nbsp;
          <a href="#" onClick={this.handleResetControls}>Restore default keyboard controls</a>
        </div>
        <GamepadList onMapRequest={this.handleGamepadMapRequest}/>
        <Field id="controls-visible" caption="Show controls on emulator page" type="checkbox"
                checked={controlsVisible} onChange={this.handleControlsVisibleChange}/>
      </Panel>
    );
  }

}

const mapStateToProps = state => {
  const {controls, controlsVisible} = state.settings.values;
  return {controls, controlsVisible};
};

export default connect(mapStateToProps)(ControlsPanel);
