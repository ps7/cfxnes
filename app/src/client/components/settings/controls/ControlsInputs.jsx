import React, {PropTypes} from 'react';
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
  port: PropTypes.oneOf(Port.values).isRequired,
  device: PropTypes.oneOf(Device.values).isRequired,
  inputs: PropTypes.object.isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
};

ControlsInputs.defaultProps = {
  onAdd: null,
  onRemove: null,
};

export default ControlsInputs;
