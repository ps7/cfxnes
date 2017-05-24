import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Modal, Icon, Field, LinkButton} from '../../common';
import SettingsPanel from '../SettingsPanel';
import ControlsList, {controlsPropType} from './ControlsList';
import GamepadList from './GamepadList';

const ID = 'controls';

export default class ControlsPanel extends PureComponent {

  static id = ID;

  static propTypes = {
    controls: controlsPropType.isRequired,
    controlsVisible: PropTypes.bool.isRequired,
    onControlsVisibleChange: PropTypes.func.isRequired,
    onControlsDeviceChange: PropTypes.func.isRequired,
    onControlsInputAdd: PropTypes.func.isRequired,
    onControlsInputRemove: PropTypes.func.isRequired,
    onControlsGamepadMap: PropTypes.func.isRequired,
    onControlsReset: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {inputRequestVisible: false};
  }

  handleInputAdd = deviceInput => {
    this.setState({inputRequestVisible: true});
    this.props.onControlsInputAdd(deviceInput).then(() => {
      this.setState({inputRequestVisible: false});
    });
  };

  render() {
    const {
      controls,
      controlsVisible,
      onControlsVisibleChange,
      onControlsDeviceChange,
      onControlsInputRemove,
      onControlsGamepadMap,
      onControlsReset,
      ...panelProps
    } = this.props;

    return (
      <SettingsPanel id={ID} title="Controls" icon="gamepad" {...panelProps}>
        {this.state.inputRequestVisible && (
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
