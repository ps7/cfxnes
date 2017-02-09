import React from 'react';
import {connect} from 'react-redux';
import {Field, Panel} from '../common';
import {setRegion, setSpeed} from '../../actions';
import {makeEnumPropType} from '../../utils';

const regions = [
  {id: 'auto', caption: 'Autodetect'},
  {id: 'ntsc', caption: 'NTSC'},
  {id: 'pal', caption: 'PAL'},
];

class SystemPanel extends React.Component {

  static id = 'system';

  static propTypes = {
    region: makeEnumPropType(regions).isRequired,
    speed: React.PropTypes.number.isRequired,
    collapsed: React.PropTypes.bool,
    onHeaderClick: React.PropTypes.func,
    dispatch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    collapsed: false,
    onHeaderClick: false,
  }

  handleRegionChange = e => {
    this.props.dispatch(setRegion(e.target.value));
  };

  handleSpeedChange = e => {
    this.props.dispatch(setSpeed(parseFloat(e.target.value)));
  };

  render() {
    const {region, speed, collapsed, onHeaderClick} = this.props;
    return (
      <Panel type={SystemPanel.id} icon="server" caption="Emulation" collapsed={collapsed} onHeaderClick={onHeaderClick}>
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

export default connect(mapStateToProps)(SystemPanel);
