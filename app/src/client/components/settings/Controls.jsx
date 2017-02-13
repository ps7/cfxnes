import React from 'react';
import {ButtonSelect} from '../common';
import {PORTS, DEVICES, NO_DEVICE, JOYPAD, ZAPPER} from '../../constants';

const devices = [
  {id: NO_DEVICE, caption: 'None'},
  {id: JOYPAD, caption: 'Joypad'},
  {id: ZAPPER, caption: 'Zapper'},
];

const Controls = ({port, device, onDeviceChange}) => {
  const handleDeviceChange = value => onDeviceChange(port, value);
  return (
    <div className="controls">
      <label>Controller {port}</label>
      <ButtonSelect items={devices} value={device} onChange={handleDeviceChange}/>
    </div>
  );
};

Controls.propTypes = {
  port: React.PropTypes.oneOf(PORTS).isRequired,
  device: React.PropTypes.oneOf(DEVICES).isRequired,
  onDeviceChange: React.PropTypes.func,
};

Controls.defaultProps = {
  onDeviceChange: null,
};

export default Controls;
