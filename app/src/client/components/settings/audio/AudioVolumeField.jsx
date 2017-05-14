import React, {PureComponent, PropTypes} from 'react';
import {Field} from '../../common';
import {AudioChannel} from '../../../enums';

export default class AudioVolumeField extends PureComponent {

  static propTypes = {
    channel: PropTypes.oneOf(AudioChannel.values).isRequired,
    disabled: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  handleChange = value => {
    const {channel, onChange} = this.props;
    onChange(channel, value);
  };

  render() {
    const {channel, disabled, value} = this.props;
    const label = AudioChannel.getLabel(channel);

    return <Field key={value} id={`audio-volume-${value}`} label={label}
                  type="range" min="0" max="1" step="0.01" value={value}
                  disabled={disabled} onChange={this.handleChange}/>;
  }

}
