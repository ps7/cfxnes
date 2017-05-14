import React, {PropTypes} from 'react';
import {Port, Device} from '../../../enums';

const DeviceInput = ({input}) => {
  const name = Device.getInputLabel(input);
  return <div className="device-input">{name}</div>;
};

DeviceInput.propTypes = {
  input: PropTypes.shape({
    port: PropTypes.oneOf(Port.values).isRequired,
    device: PropTypes.oneOf(Device.values).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeviceInput;
