import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Modal, Icon, Field, LinkButton} from '../../common';
import SettingsPanel from '../SettingsPanel';
import ControlsList, {controlsPropType} from './ControlsList';
import GamepadList from './GamepadList';
import connect from './connect';
import './ControlsSettings.css';

export const CONTROLS = 'controls';

class ControlsSettings extends PureComponent {

  static propTypes = {
    active: PropTypes.bool.isRequired,
    controls: controlsPropType.isRequired,
    controlsVisible: PropTypes.bool.isRequired,
    onActivate: PropTypes.func.isRequired,
    onControlsVisibleChange: PropTypes.func.isRequired,
    onControlsDeviceChange: PropTypes.func.isRequired,
    onControlsInputAdd: PropTypes.func.isRequired,
    onControlsInputRemove: PropTypes.func.isRequired,
    onControlsGamepadMap: PropTypes.func.isRequired,
    onControlsReset: PropTypes.func.isRequired,
  };

  state = {inputRequestVisible: false};

  handleInputAdd = deviceInput => {
    this.setState({inputRequestVisible: true});
    this.props.onControlsInputAdd(deviceInput).then(() => {
      this.setState({inputRequestVisible: false});
    });
  };

  render() {
    const {inputRequestVisible} = this.state;
    const {
      active, controls, controlsVisible, onActivate,
      onControlsVisibleChange, onControlsDeviceChange,
      onControlsInputRemove, onControlsGamepadMap, onControlsReset,
    } = this.props;

    return (
      <SettingsPanel id={CONTROLS} title="Controls" icon="gamepad" active={active} onActivate={onActivate}>
        {inputRequestVisible && (
          <Modal>
            <Modal.Body>Press key or button (ESC to cancel).</Modal.Body>
          </Modal>
        )}
        <ControlsList controls={controls}
                      onDeviceChange={onControlsDeviceChange}
                      onInputAdd={this.handleInputAdd}
                      onInputRemove={onControlsInputRemove}/>
        <div className="controls-defaults">
          <Icon name="keyboard-o"/>{' '}
          <LinkButton onClick={onControlsReset}>Restore default keyboard controls</LinkButton>
        </div>
        <GamepadList onMap={onControlsGamepadMap}/>
        <Field id="controls-visible" label="Show controls on emulator page" type="checkbox"
               value={controlsVisible} onChange={onControlsVisibleChange}/>
      </SettingsPanel>
    );
  }

}

export default connect(ControlsSettings);
