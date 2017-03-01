import React from 'react';
import {connect} from 'react-redux';
import {noop} from 'lodash-es';
import {Panel, Modal, Icon} from '../common';
import {Port, SettingsGroup} from '../../enums';
import {setControlsDevice, rebindControlsInput, resetControls} from '../../actions';
import Controls from './controls/Controls';

const {CONTROLS} = SettingsGroup;

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

  constructor(props) {
    super(props);
    this.state = {inputRequestVisible: false};
  }

  handleHeaderClick = () => {
    this.props.onActivate(CONTROLS);
  }

  handleDeviceChange = (port, device) => {
    this.props.dispatch(setControlsDevice(port, device));
  };

  handleInputChangeRequest = deviceInput => {
    this.setState({inputRequestVisible: true});
    this.props.dispatch(rebindControlsInput(deviceInput)).then(() => {
      this.setState({inputRequestVisible: false});
    });
  };

  handleResetControls = event => {
    event.preventDefault();
    this.props.dispatch(resetControls());
  }

  render() {
    const {controls, active} = this.props;
    return (
      <Panel type={CONTROLS} icon="gamepad" caption="Controls" collapsed={!active} onHeaderClick={this.handleHeaderClick}>
        {this.state.inputRequestVisible && (
          <Modal>
            <Modal.Body>
              <div>Press key or button (ESC to cancel).</div>
            </Modal.Body>
          </Modal>
        )}
        {Port.values.map(port => {
          return <Controls key={port} port={port} controls={controls[port]}
                           onDeviceChange={this.handleDeviceChange}
                           onInputChangeRequest={this.handleInputChangeRequest}/>;
        })}
        <p>
          <Icon name="gamepad"/>
          <a href="#" onClick={this.handleResetControls}>Restore default keyboard controls</a>
        </p>
      </Panel>
    );
  }

}

const mapStateToProps = state => {
  const {controls} = state.settings.values;
  return {controls};
};

export default connect(mapStateToProps)(ControlsPanel);
