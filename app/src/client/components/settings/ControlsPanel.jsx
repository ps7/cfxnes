import React from 'react';
import {connect} from 'react-redux';
import {noop} from 'lodash-es';
import {Panel} from '../common';
import {Port} from '../../enums';
import {setDevice} from '../../actions';
import Controls from './controls/Controls';

const CONTROLS = 'controls';

class ControlsPanel extends React.Component {

  static id = CONTROLS;

  static propTypes = {
    controls: React.PropTypes.shape({
      [Port.ONE]: Controls.propTypes.controls,
      [Port.TWO]: Controls.propTypes.controls,
    }).isRequired,
    active: React.PropTypes.bool,
    onActivate: React.PropTypes.func,
    dispatch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    active: false,
    onActivate: noop,
  }

  handleHeaderClick = () => {
    this.props.onActivate(CONTROLS);
  }

  handleDeviceChange = (port, device) => {
    this.props.dispatch(setDevice(port, device));
  };

  handleInputChangeRequest = (/* deviceInput, sourceInput */) => {
  };

  render() {
    const {controls, active} = this.props;
    return (
      <Panel type={CONTROLS} icon="gamepad" caption="Controls" collapsed={!active} onHeaderClick={this.handleHeaderClick}>
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
