import React, {PureComponent, PropTypes} from 'react';
import {Modal, Icon, Field} from '../../common';
import SettingsPanel from '../SettingsPanel';
import ControlsList from './ControlsList';
import GamepadList from './GamepadList';

const ID = 'controls';

export default class ControlsPanel extends PureComponent {

  static id = ID;

  static propTypes = {
    controls: ControlsList.propTypes.controls, // eslint-disable-line react/require-default-props
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

  handleReset = event => {
    event.preventDefault();
    this.props.onControlsReset();
  };

  render() {
    const {
      controls,
      controlsVisible,
      onControlsVisibleChange,
      onControlsDeviceChange,
      onControlsInputRemove,
      onControlsGamepadMap,
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
          <a href="#" onClick={this.handleReset}>Restore default keyboard controls</a>
        </div>
        <GamepadList onMap={onControlsGamepadMap}/>
        <Field id="controls-visible" label="Show controls on emulator page" type="checkbox"
               value={controlsVisible} onChange={onControlsVisibleChange}/>
      </SettingsPanel>
    );
  }

}
