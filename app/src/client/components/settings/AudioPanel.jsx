import React from 'react';
import {connect} from 'react-redux';
import {fromPairs, last, noop} from 'lodash-es';
import {Icon, Field, Panel} from '../common';
import {audioSupported} from '../../settings';
import {setAudioEnabled, setAudioVolume} from '../../actions';

const AUDIO = 'audio';

const channelCaptions = {
  master: 'Master volume',
  pulse1: 'Pulse channel 1',
  pulse2: 'Pulse channel 2',
  triangle: 'Triangle channel',
  noise: 'Noise channel',
  dmc: 'DMC channel',
};

const channels = Object.keys(channelCaptions);
const volumePropType = React.PropTypes.number;

class AudioPanel extends React.Component {

  static id = AUDIO;

  static propTypes = {
    audioEnabled: React.PropTypes.bool.isRequired,
    audioVolume: React.PropTypes.shape(fromPairs(channels.map(channel => [channel, volumePropType]))).isRequired,
    active: React.PropTypes.bool,
    onActivate: React.PropTypes.func,
    dispatch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    active: false,
    onActivate: noop,
  }

  handleHeaderClick = () => {
    this.props.onActivate(AUDIO);
  }

  handleAudioEnabledChange = e => {
    this.props.dispatch(setAudioEnabled(e.target.checked));
  };

  handleAudioVolumeChange = e => {
    const {id, value} = e.target;
    const channel = last(id.split('-'));
    this.props.dispatch(setAudioVolume(channel, parseFloat(value)));
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
        <Field id="audio-enabled" caption="Enable audio" type="checkbox" checked={audioEnabled} onChange={this.handleAudioEnabledChange}/>
        {channels.map(channel => (
          <Field key={channel} id={`audio-volume-${channel}`} caption={channelCaptions[channel]}
                 type="range" min="0" max="1" step="0.01" value={audioVolume[channel]}
                 disabled={!audioEnabled} onChange={this.handleAudioVolumeChange}/>
        ))}
      </Panel>
    );
  }

}

const mapStateToProps = state => {
  const {audioEnabled, audioVolume} = state.settings;
  return {audioEnabled, audioVolume};
};

export default connect(mapStateToProps)(AudioPanel);
