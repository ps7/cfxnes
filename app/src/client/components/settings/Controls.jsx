import React from 'react';
import {ButtonSelect} from '../common';
import {Port, Device} from '../../enums';

const Controls = ({port, device, onDeviceChange}) => {
  const handleDeviceChange = value => onDeviceChange(port, value);
  return (
    <div className="controls">
      <label>Controller {port}</label>
      <ButtonSelect items={Device.items} value={device} onChange={handleDeviceChange}/>
    </div>
  );
};

Controls.propTypes = {
  port: React.PropTypes.oneOf(Port.values).isRequired,
  device: React.PropTypes.oneOf(Device.values).isRequired,
  onDeviceChange: React.PropTypes.func,
};

Controls.defaultProps = {
  onDeviceChange: null,
};

export default Controls;
