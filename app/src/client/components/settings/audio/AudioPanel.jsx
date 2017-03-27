import React from 'react';
import {connect} from 'react-redux';
import {fromPairs} from 'lodash-es';
import {Icon, Field, Panel} from '../../common';
import {AudioChannel, SettingsGroup} from '../../../enums';
import {audioSupported, setAudioEnabled, setAudioVolume} from '../../../actions';
import AudioVolumeField from './AudioVolumeField';

const {AUDIO} = SettingsGroup;

class AudioPanel extends React.Component {

  static id = AUDIO;

  static propTypes = {
    audioEnabled: React.PropTypes.bool.isRequired,
    audioVolume: React.PropTypes.shape(
      fromPairs(AudioChannel.values.map(value => [value, React.PropTypes.number]))
    ).isRequired,
    active: React.PropTypes.bool.isRequired,
    onActivate: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  };

  handleHeaderClick = () => {
    this.props.onActivate(AUDIO);
  }

  handleAudioEnabledChange = enabled => {
    this.props.dispatch(setAudioEnabled(enabled));
  };

  handleAudioVolumeChange = (channel, volume) => {
    this.props.dispatch(setAudioVolume(channel, volume));
  }

  render() {
    const {audioEnabled, audioVolume, active} = this.props;
    const panelProps = {
      type: AUDIO,
      icon: 'music',
      caption: 'Audio',
      collapsed: !active,
      onHeaderClick: this.handleHeaderClick,
    };

    if (!audioSupported) {
      return (
        <Panel {...panelProps}>
          <Icon name="exclamation-triangle"/> Your browser does not support Web Audio.
        </Panel>
      );
    }

    return (
      <Panel {...panelProps}>
        <Field id="audio-enabled" caption="Enable audio" type="checkbox"
               value={audioEnabled} onChange={this.handleAudioEnabledChange}/>
        {AudioChannel.values.map(channel => (
          <AudioVolumeField key={channel} channel={channel}
                            disabled={!audioEnabled}
                            value={audioVolume[channel]}
                            onChange={this.handleAudioVolumeChange}/>
        ))}
      </Panel>
    );
  }

}

const mapStateToProps = state => {
  const {audioEnabled, audioVolume} = state.settings.values;
  return {audioEnabled, audioVolume};
};

export default connect(mapStateToProps)(AudioPanel);
