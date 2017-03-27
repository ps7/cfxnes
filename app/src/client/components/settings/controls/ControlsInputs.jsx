import React from 'react';
import {Port, Device} from '../../../enums';
import ControlsInputsRow from './ControlsInputsRow';

const ControlsInputs = ({port, device, inputs, onAdd, onRemove}) => (
  <div className="controls-inputs">
    {Device.getInputNames(device).map(name => {
      const deviceInput = {port, device, name};
      return <ControlsInputsRow key={Device.getInputId(deviceInput)}
                                deviceInput={deviceInput}
                                sourceInputs={inputs[device][name]}
                                onAdd={onAdd}
                                onRemove={onRemove}/>;
    })}
  </div>
);

ControlsInputs.propTypes = {
  port: React.PropTypes.oneOf(Port.values).isRequired,
  device: React.PropTypes.oneOf(Device.values).isRequired,
  inputs: React.PropTypes.object.isRequired,
  onAdd: React.PropTypes.func,
  onRemove: React.PropTypes.func,
};

ControlsInputs.defaultProps = {
  onAdd: null,
  onRemove: null,
};

export default ControlsInputs;
