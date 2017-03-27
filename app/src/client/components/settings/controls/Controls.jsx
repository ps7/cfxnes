import React from 'react';
import {Port, Device} from '../../../enums';
import ControlsDevice from './ControlsDevice';
import ControlsInputs from './ControlsInputs';

const Controls = ({port, controls, onDeviceChange, onInputAdd, onInputRemove}) => {
  const {device, inputs} = controls;
  return (
    <div className="controls">
      <ControlsDevice port={port} device={device} onChange={onDeviceChange}/>
      <ControlsInputs port={port} device={device} inputs={inputs}
                      onAdd={onInputAdd} onRemove={onInputRemove}/>
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
  onInputAdd: React.PropTypes.func,
  onInputRemove: React.PropTypes.func,
};

Controls.defaultProps = {
  onDeviceChange: null,
  onInputAdd: null,
  onInputRemove: null,
};

export default Controls;
