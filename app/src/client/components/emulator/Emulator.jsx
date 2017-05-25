import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {ActionState} from '../../enums';
import {Message} from '../common';
import EmulatorControls, {controlsPropType} from './EmulatorControls';
import EmulatorOutput from './EmulatorOutput';
import connect from './connect';
import './Emulator.css';

class Emulator extends PureComponent {

  static propTypes = {
    romId: PropTypes.string,
    routeRomId: PropTypes.string,
    loadState: PropTypes.oneOf(ActionState.values).isRequired,
    loadError: PropTypes.string.isRequired,
    controls: controlsPropType.isRequired,
    controlsVisible: PropTypes.bool.isRequired,
    onConnect: PropTypes.func.isRequired,
    onDisconnect: PropTypes.func.isRequired,
    onFetchAndLoad: PropTypes.func.isRequired,
    onRouteRedirect: PropTypes.func.isRequired,
    onErrorClose: PropTypes.func.isRequired,
    onControlsClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    romId: null,
    routeRomId: null,
  };

  componentDidMount() {
    const {romId, routeRomId, onConnect, onFetchAndLoad, onRouteRedirect} = this.props;
    onConnect(this.canvas);

    if (romId !== routeRomId) {
      if (routeRomId) {
        onFetchAndLoad(routeRomId);
      } else {
        onRouteRedirect(romId);
      }
    }
  }

  componentWillReceiveProps(props) {
    const {romId, routeRomId, onRouteRedirect} = props;
    if (romId !== routeRomId) {
      onRouteRedirect(romId);
    }
  }

  componentWillUnmount() {
    this.props.onDisconnect();
  }

  setCanvas = canvas => {
    this.canvas = canvas;
  }

  renderControls() {
    const {controls, onControlsClose} = this.props;
    return <EmulatorControls controls={controls} onClose={onControlsClose}/>;
  }

  renderErrorMessage() {
    const {loadError, onErrorClose} = this.props;
    return <Message type="error" className="emulator-error"
                    onClose={onErrorClose}>{loadError}</Message>;
  }

  renderOutput() {
    const {loadState} = this.props;
    return <EmulatorOutput loading={loadState === ActionState.STARTED}
                           refCanvas={this.setCanvas}/>;
  }

  render() {
    const {loadError, controlsVisible} = this.props;
    return (
      <main className="emulator">
        {controlsVisible && this.renderControls()}
        {loadError && this.renderErrorMessage()}
        {this.renderOutput()}
      </main>
    );
  }

}

export default connect(Emulator);
