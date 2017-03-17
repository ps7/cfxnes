import React from 'react';
import {Port, Device} from '../../../enums';
import ControlsInputsRow from './ControlsInputsRow';

const ControlsInputs = ({port, device, inputs, onAddRequest, onRemoveRequest}) => (
  <div className="controls-inputs">
    {Device.getInputNames(device).map(name => {
      const deviceInput = {port, device, name};
      return <ControlsInputsRow key={Device.getInputId(deviceInput)}
                                deviceInput={deviceInput}
                                sourceInputs={inputs[device][name]}
                                onAddRequest={onAddRequest}
                                onRemoveRequest={onRemoveRequest}/>;
    })}
  </div>
);

ControlsInputs.propTypes = {
  port: React.PropTypes.oneOf(Port.values).isRequired,
  device: React.PropTypes.oneOf(Device.values).isRequired,
  inputs: React.PropTypes.object.isRequired,
  onAddRequest: React.PropTypes.func,
  onRemoveRequest: React.PropTypes.func,
};

ControlsInputs.defaultProps = {
  onAddRequest: null,
  onRemoveRequest: null,
};

export default ControlsInputs;
