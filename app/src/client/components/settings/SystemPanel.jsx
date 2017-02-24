import React from 'react';
import {connect} from 'react-redux';
import {noop} from 'lodash-es';
import {Field, Panel} from '../common';
import {setRegion, setSpeed} from '../../actions';
import {Region} from '../../enums';

const SYSTEM = 'system';

class SystemPanel extends React.Component {

  static id = SYSTEM;

  static propTypes = {
    region: React.PropTypes.oneOf(Region.values).isRequired,
    speed: React.PropTypes.number.isRequired,
    active: React.PropTypes.bool,
    onActivate: React.PropTypes.func,
    dispatch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    active: false,
    onActivate: noop,
  }

  handleHeaderClick = () => {
    this.props.onActivate(SYSTEM);
  }

  handleRegionChange = e => {
    this.props.dispatch(setRegion(e.target.value));
  };

  handleSpeedChange = e => {
    this.props.dispatch(setSpeed(parseFloat(e.target.value)));
  };

  render() {
    const {region, speed, active} = this.props;
    return (
      <Panel type={SYSTEM} icon="server" caption="System" collapsed={!active} onHeaderClick={this.handleHeaderClick}>
        <Field id="region" caption="Region" type="select" items={Region.items} value={region} onChange={this.handleRegionChange}/>
        <Field id="speed" caption="Emulation speed" type="range" min="0.25" max="2" step="0.25" value={speed} onChange={this.handleSpeedChange}/>
      </Panel>
    );
  }

}

const mapStateToProps = state => {
  const {region, speed} = state.settings;
  return {region, speed};
};

export default connect(mapStateToProps)(SystemPanel);
