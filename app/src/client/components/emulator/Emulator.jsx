import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
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

import {selectEmulator, selectSettingsValues} from '../../reducers';
import {ActionState} from '../../enums';
import {Message} from '../common';
import EmulatorControls, {controlsPropType} from './EmulatorControls';
import EmulatorOutput from './EmulatorOutput';
import './Emulator.css';

class Emulator extends PureComponent {

  static propTypes = {
    romId: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    loadState: PropTypes.oneOf(ActionState.values).isRequired,
    loadError: PropTypes.string.isRequired,
    controls: controlsPropType.isRequired,
    controlsVisible: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
    history: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
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
    const routeRomId = props.match.params.romId || null;
    const stateRomId = props.romId;

    if (routeRomId !== stateRomId) {
      if (initial && routeRomId) {
        props.dispatch(fetchAndloadROM(routeRomId)); // Will set romId in state
        return false;
      }
      props.history.replace(stateRomId ? `/emulator/${stateRomId}` : '/emulator');
    }

    return true;
  }

  setCanvas = canvas => {
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
        {loadError && <Message className="emulator-error" type="error" onClose={this.handleErrorClose}>{loadError}</Message>}
        <EmulatorOutput loading={loadState === ActionState.STARTED} refCanvas={this.setCanvas}/>
        <input id="emulator-file" type="file" onChange={this.handleFileChange}/>
      </main>
    );
  }

}

const mapStateToProps = state => {
  const {romId, loadState, loadError} = selectEmulator(state);
  const {controls, controlsVisible} = selectSettingsValues(state);
  return {romId, loadState, loadError, controls, controlsVisible};
};

export default connect(mapStateToProps)(Emulator);
