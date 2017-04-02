import React, {PropTypes} from 'react';
import {Port, Device} from '../../../enums';

const DeviceInput = ({input}) => {
  const caption = Device.getInputCaption(input);
  return <div className="device-input">{caption}</div>;
};

DeviceInput.propTypes = {
  input: PropTypes.shape({
    port: PropTypes.oneOf(Port.values).isRequired,
    device: PropTypes.oneOf(Device.values).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeviceInput;
