import {connect} from 'react-redux';

import {
  connectEmulator,
  disconnectEmulator,
  fetchAndloadROM,
  clearROMLoadError,
  setControlsVisible,
} from '../../actions';

import {selectEmulator, selectSettingsValues} from '../../reducers';

const mapStateToProps = (state, props) => {
  const routeRomId = props.match.params.romId || null;
  const {romId, loadState, loadError} = selectEmulator(state);
  const {controls, controlsVisible} = selectSettingsValues(state);
  return {romId, routeRomId, loadState, loadError, controls, controlsVisible};
};

const mapDispatchToProps = (dispatch, props) => ({
  onConnect: canvas => dispatch(connectEmulator(canvas)),
  onDisconnect: () => dispatch(disconnectEmulator()),
  onFetchAndLoad: romId => dispatch(fetchAndloadROM(romId)),
  onRouteRedirect: romId => props.history.replace(romId ? `/emulator/${romId}` : '/emulator'),
  onErrorClose: () => dispatch(clearROMLoadError()),
  onControlsClose: () => dispatch(setControlsVisible(false)),
});

export default connect(mapStateToProps, mapDispatchToProps);
