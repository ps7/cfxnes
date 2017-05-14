import React, {Component, PropTypes} from 'react';
import {ButtonSelect} from '../../common';
import {Port, Device} from '../../../enums';

export default class ControlsDevice extends Component {

  static propTypes = {
    port: PropTypes.oneOf(Port.values).isRequired,
    device: PropTypes.oneOf(Device.values).isRequired,
    onChange: PropTypes.func,
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
        {onChange != null
          ? <ButtonSelect options={Device.items} value={device} onChange={this.handleChange}/>
          : <span>{Device.getLabel(device)}</span>
        }
      </div>
    );
  }

}
