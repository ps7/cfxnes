import React from 'react';
import {connect} from 'react-redux';
import {setRegion, setSpeed} from '../actions';
import {makeEnumPropType} from '../utils';
import Panel from './Panel';
import Field from './Field';

const regions = [
  {id: 'auto', caption: 'Autodetect'},
  {id: 'ntsc', caption: 'NTSC'},
  {id: 'pal', caption: 'PAL'},
];

class SettingsSystem extends React.Component {

  static propTypes = {
    region: makeEnumPropType(regions).isRequired,
    speed: React.PropTypes.number.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  };

  handleRegionChange = e => {
    this.props.dispatch(setRegion(e.target.value));
  };

  handleSpeedChange = e => {
    this.props.dispatch(setSpeed(parseFloat(e.target.value)));
  };

  render() {
    const {region, speed, ...panelAttrs} = this.props;
    return (
      <Panel icon="server" caption="Emulation" {...panelAttrs}>
        <Field id="region" caption="Region" type="select" items={regions} value={region} onChange={this.handleRegionChange}/>
        <Field id="speed" caption="Emulation speed" type="range" min="0.25" max="2" step="0.25" value={speed} onChange={this.handleSpeedChange}/>
      </Panel>
    );
  }

}

const mapStateToProps = state => {
  const {region, speed} = state.settings;
  return {region, speed};
};

export default connect(mapStateToProps)(SettingsSystem);
