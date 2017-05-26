import {connect} from 'react-redux';
import {setActiveSettingsPanel} from '../../actions';
import {selectSettings} from '../../reducers';

const mapStateToProps = (state, props) => {
  const routePanelId = props.match.params.activePanelId || null;
  const {activePanelId} = selectSettings(state);
  return {routePanelId, activePanelId};
};

const mapDispatchToProps = (dispatch, props) => ({
  onActivePanelChange: id => dispatch(setActiveSettingsPanel(id)),
  onRoutePanelChange: id => props.history.replace(`/settings/${id}`),
});

export default connect(mapStateToProps, mapDispatchToProps);
