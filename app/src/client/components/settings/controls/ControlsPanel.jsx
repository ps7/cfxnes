import React from 'react';
import {connect} from 'react-redux';
import {Panel, Modal, Icon, Field} from '../../common';
import {Device, SettingsGroup} from '../../../enums';

import {
  setControlsDevice,
  addControlsInput,
  removeControlsInput,
  resetControls,
  setControlsVisible,
  bindGamepadToJoypad,
} from '../../../actions';

import ControlsList from './ControlsList';
import GamepadList from './GamepadList';

const {CONTROLS} = SettingsGroup;

class ControlsPanel extends React.Component {

  static id = CONTROLS;

  static propTypes = {
    controls: ControlsList.propTypes.controls, // eslint-disable-line react/require-default-props
    controlsVisible: React.PropTypes.bool.isRequired,
    active: React.PropTypes.bool.isRequired,
    onActivate: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  };

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

  handleInputAdd = deviceInput => {
    this.setState({inputRequestVisible: true});
    this.props.dispatch(addControlsInput(deviceInput)).then(() => {
      this.setState({inputRequestVisible: false});
    });
  };

  handleInputRemove = sourceInput => {
    this.props.dispatch(removeControlsInput(sourceInput));
  };

  handleGamepadMap = (index, port) => {
    const {dispatch} = this.props;
    dispatch(setControlsDevice(port, Device.JOYPAD));
    dispatch(bindGamepadToJoypad(index, port));
  };

  handleResetControls = event => {
    event.preventDefault();
    this.props.dispatch(resetControls());
  };

  handleControlsVisibleChange = visible => {
    this.props.dispatch(setControlsVisible(visible));
  };

  render() {
    const {controls, controlsVisible, active} = this.props;
    return (
      <Panel type={CONTROLS} icon="gamepad" caption="Controls" collapsed={!active} onHeaderClick={this.handleHeaderClick}>
        {this.state.inputRequestVisible && (
          <Modal>
            <Modal.Body>Press key or button (ESC to cancel).</Modal.Body>
          </Modal>
        )}
        <ControlsList controls={controls}
                      onDeviceChange={this.handleDeviceChange}
                      onInputAdd={this.handleInputAdd}
                      onInputRemove={this.handleInputRemove}/>
        <div className="controls-defaults">
          <Icon name="keyboard-o"/>{' '}
          <a href="#" onClick={this.handleResetControls}>Restore default keyboard controls</a>
        </div>
        <GamepadList onMap={this.handleGamepadMap}/>
        <Field id="controls-visible" caption="Show controls on emulator page" type="checkbox"
               value={controlsVisible} onChange={this.handleControlsVisibleChange}/>
      </Panel>
    );
  }

}

const mapStateToProps = state => {
  const {controls, controlsVisible} = state.settings.values;
  return {controls, controlsVisible};
};

export default connect(mapStateToProps)(ControlsPanel);
