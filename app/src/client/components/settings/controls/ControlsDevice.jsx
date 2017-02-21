import React from 'react';
import {ButtonSelect} from '../../common';
import {Port, Device} from '../../../enums';

export default class ControlsDevice extends React.Component {

  static propTypes = {
    port: React.PropTypes.oneOf(Port.values).isRequired,
    device: React.PropTypes.oneOf(Device.values).isRequired,
    onChange: React.PropTypes.func.isRequired,
  };

  handleChange = device => {
    const {port, onChange} = this.props;
    onChange(port, device);
  }

  render() {
    const {device} = this.props;
    return <ButtonSelect items={Device.items} value={device} onChange={this.handleChange}/>;
  }

}
