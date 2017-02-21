import React from 'react';
import {Port, Device} from '../../../enums';

const DeviceInput = ({input}) => {
  const caption = Device.getInputCaption(input);
  return <div className="device-input">{caption}</div>;
};

DeviceInput.propTypes = {
  input: React.PropTypes.shape({
    port: React.PropTypes.oneOf(Port.values).isRequired,
    device: React.PropTypes.oneOf(Device.values).isRequired,
    name: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default DeviceInput;
