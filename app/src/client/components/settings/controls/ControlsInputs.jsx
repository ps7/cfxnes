import React from 'react';
import {Port, Device} from '../../../enums';
import ControlsInputsRow from './ControlsInputsRow';

const ControlsInputs = ({port, device, inputs, onChangeRequest}) => (
  <div className="controls-inputs">
    {Device.getInputNames(device).map(name => (
      <ControlsInputsRow key={Device.getInputId(port, device, name)}
                         deviceInput={{port, device, name}}
                         sourceInputs={inputs[device][name]}
                         onChangeRequest={onChangeRequest}/>
    ))}
  </div>
);

ControlsInputs.propTypes = {
  port: React.PropTypes.oneOf(Port.values).isRequired,
  device: React.PropTypes.oneOf(Device.values).isRequired,
  inputs: React.PropTypes.object.isRequired,
  onChangeRequest: React.PropTypes.func,
};

ControlsInputs.defaultProps = {
  onChangeRequest: null,
};

export default ControlsInputs;
