import React from 'react';
import {Port, Device} from '../../../enums';
import ControlsDevice from './ControlsDevice';
import ControlsInputs from './ControlsInputs';

const Controls = ({port, controls, onDeviceChange, onInputChangeRequest}) => {
  const {device, inputs} = controls;
  return (
    <div className="controls">
      <label>Controller {port}</label>
      <ControlsDevice port={port} device={device} onChange={onDeviceChange}/>
      <ControlsInputs port={port} device={device} inputs={inputs} onChangeRequest={onInputChangeRequest}/>
    </div>
  );
};

Controls.propTypes = {
  port: React.PropTypes.oneOf(Port.values).isRequired,
  controls: React.PropTypes.shape({
    device: React.PropTypes.oneOf(Device.values).isRequired,
    inputs: ControlsInputs.propTypes.inputs,
  }).isRequired,
  onDeviceChange: React.PropTypes.func,
  onInputChangeRequest: React.PropTypes.func,
};

Controls.defaultProps = {
  onDeviceChange: null,
  onInputChangeRequest: null,
};

export default Controls;
