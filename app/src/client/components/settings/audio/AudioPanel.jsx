import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Icon, Field, keysValuePropType} from '../../common';
import {AudioChannel} from '../../../enums';
import SettingsPanel from '../SettingsPanel';
import AudioVolumeField from './AudioVolumeField';

const ID = 'audio';

export default class AudioPanel extends PureComponent {

  static id = ID;

  static propTypes = {
    audioSupported: PropTypes.bool.isRequired,
    audioEnabled: PropTypes.bool.isRequired,
    audioVolume: keysValuePropType(AudioChannel.values, PropTypes.number).isRequired,
    onAudioEnabledChange: PropTypes.func.isRequired,
    onAudioVolumeChange: PropTypes.func.isRequired,
  };

  render() {
    const {
      audioSupported,
      audioEnabled,
      audioVolume,
      onAudioEnabledChange,
      onAudioVolumeChange,
      ...defaultPanelProps
    } = this.props;

    const panelProps = {
      ...defaultPanelProps,
      id: ID,
      title: 'Audio',
      icon: 'music',
    };

    if (!audioSupported) {
      return (
        <SettingsPanel {...panelProps}>
          <Icon name="exclamation-triangle"/> Your browser does not support Web Audio.
        </SettingsPanel>
      );
    }

    return (
      <SettingsPanel {...panelProps}>
        <Field id="audio-enabled" label="Enable audio" type="checkbox"
               value={audioEnabled} onChange={onAudioEnabledChange}/>
        {AudioChannel.values.map(channel => (
          <AudioVolumeField key={channel} channel={channel} disabled={!audioEnabled}
                            value={audioVolume[channel]} onChange={onAudioVolumeChange}/>
        ))}
      </SettingsPanel>
    );
  }

}
