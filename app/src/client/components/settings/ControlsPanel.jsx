import React from 'react';
import {connect} from 'react-redux';
import {Panel} from '../common';
import {Port} from '../../enums';
import {setDevice} from '../../actions';
import Controls from './Controls';

class ControlsPanel extends React.Component {

  static id = 'controls';

  static propTypes = {
    controls: React.PropTypes.object.isRequired,
    collapsed: React.PropTypes.bool,
    onHeaderClick: React.PropTypes.func,
    dispatch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    collapsed: false,
    onHeaderClick: false,
  }

  handleDeviceChange = (port, device) => {
    this.props.dispatch(setDevice(port, device));
  }

  render() {
    const {controls, collapsed, onHeaderClick} = this.props;
    return (
      <Panel icon="gamepad" caption="Controls" collapsed={collapsed} onHeaderClick={onHeaderClick}>
        {Port.values.map(port => {
          const {device} = controls[port];
          return <Controls key={port} port={port} device={device} onDeviceChange={this.handleDeviceChange}/>;
        })}
      </Panel>
    );
  }

}

const mapStateToProps = state => {
  const {controls} = state.settings;
  return {controls};
};

export default connect(mapStateToProps)(ControlsPanel);