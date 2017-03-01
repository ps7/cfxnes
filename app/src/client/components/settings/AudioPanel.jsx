import React from 'react';
import {connect} from 'react-redux';
import {fromPairs, last, noop} from 'lodash-es';
import {Icon, Field, Panel} from '../common';
import {AudioChannel, SettingsGroup} from '../../enums';
import {audioSupported, setAudioEnabled, setAudioVolume} from '../../actions';

const {AUDIO} = SettingsGroup;

class AudioPanel extends React.Component {

  static id = AUDIO;

  static propTypes = {
    audioEnabled: React.PropTypes.bool.isRequired,
    audioVolume: React.PropTypes.shape(
      fromPairs(AudioChannel.values.map(value => [value, React.PropTypes.number]))
    ).isRequired,
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

  handleAudioEnabledChange = event => {
    this.props.dispatch(setAudioEnabled(event.target.checked));
  };

  handleAudioVolumeChange = event => {
    const {id, value} = event.target;
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
        {AudioChannel.items.map(item => {
          const {value, caption} = item;
          return <Field key={value} id={`audio-volume-${value}`} caption={caption}
                        type="range" min="0" max="1" step="0.01" value={audioVolume[value]}
                        disabled={!audioEnabled} onChange={this.handleAudioVolumeChange}/>;
        })}
      </Panel>
    );
  }

}

const mapStateToProps = state => {
  const {audioEnabled, audioVolume} = state.settings.values;
  return {audioEnabled, audioVolume};
};

export default connect(mapStateToProps)(AudioPanel);
