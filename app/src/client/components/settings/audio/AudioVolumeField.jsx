import React from 'react';
import {Field} from '../../common';
import {AudioChannel} from '../../../enums';

export default class AudioVolumeField extends React.Component {

  static propTypes = {
    channel: React.PropTypes.oneOf(AudioChannel.values).isRequired,
    disabled: React.PropTypes.bool.isRequired,
    value: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
  }

  handleChange = value => {
    const {channel, onChange} = this.props;
    onChange(channel, value);
  };

  render() {
    const {channel, disabled, value} = this.props;
    const caption = AudioChannel.getCaption(channel);

    return <Field key={value} id={`audio-volume-${value}`} caption={caption}
                  type="range" min="0" max="1" step="0.01" value={value}
                  disabled={disabled} onChange={this.handleChange}/>;
  }

}
