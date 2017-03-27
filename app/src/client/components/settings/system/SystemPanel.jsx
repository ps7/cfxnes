import React from 'react';
import {connect} from 'react-redux';
import {Field, Panel} from '../../common';
import {setRegion, setSpeed} from '../../../actions';
import {Region, SettingsGroup} from '../../../enums';

const {SYSTEM} = SettingsGroup;

class SystemPanel extends React.Component {

  static id = SYSTEM;

  static propTypes = {
    region: React.PropTypes.oneOf(Region.values).isRequired,
    speed: React.PropTypes.number.isRequired,
    active: React.PropTypes.bool.isRequired,
    onActivate: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  };

  handleHeaderClick = () => {
    this.props.onActivate(SYSTEM);
  }

  handleRegionChange = region => {
    this.props.dispatch(setRegion(region));
  };

  handleSpeedChange = speed => {
    this.props.dispatch(setSpeed(speed));
  };

  render() {
    const {region, speed, active} = this.props;
    return (
      <Panel type={SYSTEM} icon="server" caption="System" collapsed={!active} onHeaderClick={this.handleHeaderClick}>
        <Field id="region" caption="Region" type="select" items={Region.items}
               value={region} onChange={this.handleRegionChange}/>
        <Field id="speed" caption="Emulation speed" type="range" min="0.25" max="2" step="0.25"
               value={speed} onChange={this.handleSpeedChange}/>
      </Panel>
    );
  }

}

const mapStateToProps = state => {
  const {region, speed} = state.settings.values;
  return {region, speed};
};

export default connect(mapStateToProps)(SystemPanel);
