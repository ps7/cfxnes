import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {formatPercentage} from '../../../common';
import {Field} from '../../common';
import {AudioChannel} from '../../../enums';
import './AudioVolumeField.css';

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

    return <Field id={`${channel}-audio-volume`} type="slider"
                  className="audio-volume-field" label={label} format={formatPercentage}
                  min="0" max="1" step="0.01" orientation="vertical"
                  disabled={disabled} value={value} onChange={this.handleChange}/>;
  }

}
