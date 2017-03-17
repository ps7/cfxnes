import React from 'react';
import {Port, Device} from '../../../enums';
import ControlsDevice from './ControlsDevice';
import ControlsInputs from './ControlsInputs';

const Controls = ({port, controls, onDeviceChange, onInputAddRequest, onInputRemoveRequest}) => {
  const {device, inputs} = controls;
  return (
    <div className="controls">
      <ControlsDevice port={port} device={device} onChange={onDeviceChange}/>
      <ControlsInputs port={port} device={device} inputs={inputs}
                      onAddRequest={onInputAddRequest} onRemoveRequest={onInputRemoveRequest}/>
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
  onInputAddRequest: React.PropTypes.func,
  onInputRemoveRequest: React.PropTypes.func,
};

Controls.defaultProps = {
  onDeviceChange: null,
  onInputAddRequest: null,
  onInputRemoveRequest: null,
};

export default Controls;
