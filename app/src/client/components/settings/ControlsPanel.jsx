import React from 'react';
import {connect} from 'react-redux';
import {Panel} from '../common';
import {Port} from '../../enums';
import {setDevice} from '../../actions';
import Controls from './controls/Controls';

class ControlsPanel extends React.Component {

  static id = 'controls';

  static propTypes = {
    controls: React.PropTypes.shape({
      [Port.ONE]: Controls.propTypes.controls,
      [Port.TWO]: Controls.propTypes.controls,
    }).isRequired,
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
  };

  handleInputChangeRequest = (/* deviceInput, sourceInput */) => {
  };

  render() {
    const {controls, collapsed, onHeaderClick} = this.props;
    return (
      <Panel type={ControlsPanel.id} icon="gamepad" caption="Controls" collapsed={collapsed} onHeaderClick={onHeaderClick}>
        {Port.values.map(port => {
          return <Controls key={port} port={port} controls={controls[port]}
                           onDeviceChange={this.handleDeviceChange}
                           onInputChangeRequest={this.handleInputChangeRequest}/>;
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
