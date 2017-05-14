import React, {PureComponent, PropTypes} from 'react';
import {connect} from 'react-redux';

import {
  connectEmulator,
  disconnectEmulator,
  resumeEmulator,
  suspendEmulator,
  fetchAndloadROM,
  loadROM,
  clearROMLoadError,
  setControlsVisible,
} from '../../actions';

import {ActionState} from '../../enums';
import {Message} from '../common';
import EmulatorControls from './EmulatorControls';
import EmulatorOutput from './EmulatorOutput';
import './Emulator.css';

class Emulator extends PureComponent {

  static propTypes = {
    params: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
      romId: PropTypes.string,
    }).isRequired,
    romId: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    loadState: PropTypes.oneOf(ActionState.values).isRequired,
    loadError: PropTypes.string.isRequired,
    controls: EmulatorControls.propTypes.controls, // eslint-disable-line react/require-default-props
    controlsVisible: PropTypes.bool.isRequired,
    router: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    romId: null,
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(connectEmulator(this.canvas));
    if (this.handlePropsChange(this.props, true)) {
      dispatch(resumeEmulator());
    }
  }

  componentWillReceiveProps(props) {
    this.handlePropsChange(props, false);
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch(suspendEmulator());
    dispatch(disconnectEmulator());
  }

  handlePropsChange(props, initial) {
    const routeRomId = props.params.romId || null;
    const stateRomId = props.romId;

    if (routeRomId !== stateRomId) {
      if (initial && routeRomId) {
        props.dispatch(fetchAndloadROM(routeRomId)); // Will set romId in state
        return false;
      }
      props.router.replace(stateRomId ? `/emulator/${stateRomId}` : '/emulator');
    }

    return true;
  }

  handleCanvasChange = canvas => {
    this.canvas = canvas;
  }

  handleErrorClose = () => {
    this.props.dispatch(clearROMLoadError());
  };

  handleControlsClose = () => {
    this.props.dispatch(setControlsVisible(false));
  };

  handleFileChange = event => {
    event.target.blur();
    event.preventDefault();
    event.stopPropagation();

    const file = event.target.files[0];
    if (file) {
      this.props.dispatch(loadROM(file));
    }
  }

  render() {
    const {loadState, loadError, controls, controlsVisible} = this.props;
    return (
      <main className="emulator">
        {controlsVisible && <EmulatorControls controls={controls} onClose={this.handleControlsClose}/>}
        {loadError && <Message type="error" className="emulator-error" onClose={this.handleErrorClose}>{loadError}</Message>}
        <EmulatorOutput loading={loadState === ActionState.STARTED} onCanvasChange={this.handleCanvasChange}/>
        <input id="emulator-file" type="file" onChange={this.handleFileChange}/>
      </main>
    );
  }

}

const mapStateToProps = state => {
  const {romId, loadState, loadError} = state.emulator;
  const {controls, controlsVisible} = state.settings.values;
  return {romId, loadState, loadError, controls, controlsVisible};
};

export default connect(mapStateToProps)(Emulator);
