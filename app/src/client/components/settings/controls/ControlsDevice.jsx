import React from 'react';
import {ButtonSelect} from '../../common';
import {Port, Device} from '../../../enums';

export default class ControlsDevice extends React.Component {

  static propTypes = {
    port: React.PropTypes.oneOf(Port.values).isRequired,
    device: React.PropTypes.oneOf(Device.values).isRequired,
    onChange: React.PropTypes.func,
  };

  static defaultProps = {
    onChange: null,
  }

  handleChange = device => {
    const {port, onChange} = this.props;
    onChange(port, device);
  }

  render() {
    const {port, device, onChange} = this.props;
    return (
      <div className="controls-device">
        <label>Port {port}:</label>
        {onChange == null && <span>{Device.getCaption(device)}</span>}
        {onChange != null && <ButtonSelect items={Device.items} value={device} onChange={this.handleChange}/>}
      </div>
    );
  }

}
