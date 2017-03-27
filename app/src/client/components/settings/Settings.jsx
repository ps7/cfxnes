import React from 'react';
import {connect} from 'react-redux';
import {setActiveSettingsPanel} from '../../actions';
import {SystemPanel} from './system';
import {VideoPanel} from './video';
import {AudioPanel} from './audio';
import {ControlsPanel} from './controls';
import {ResetPanel} from './reset';

const panelComponents = [SystemPanel, VideoPanel, AudioPanel, ControlsPanel, ResetPanel];
const panelIds = panelComponents.map(Component => Component.id);
const isValidPanelId = id => panelIds.indexOf(id) >= 0;
const defaultPanelId = panelIds[0];

class Settings extends React.Component {

  static propTypes = {
    activePanelId: React.PropTypes.string,
    router: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    dispatch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    activePanelId: null,
  }

  componentWillMount() {
    this.handlePropsChange(this.props);
  }

  componentWillReceiveProps(props) {
    this.handlePropsChange(props);
  }

  handlePropsChange(props) {
    const routePanelId = props.params.activePanelId;
    const statePanelId = props.activePanelId;

    if (isValidPanelId(routePanelId)) {
      if (routePanelId !== statePanelId) {
        this.setActivePanelInState(routePanelId);
      }
    } else if (isValidPanelId(statePanelId)) {
      this.setActivePanelInRoute(statePanelId);
    } else {
      this.setActivePanel(defaultPanelId);
    }
  }

  setActivePanelInRoute(id) {
    this.props.router.replace(`/settings/${id}`);
  }

  setActivePanelInState(id) {
    this.props.dispatch(setActiveSettingsPanel(id));
  }

  setActivePanel(id) {
    this.setActivePanelInRoute(id);
    this.setActivePanelInState(id);
  }

  handlePanelActivation = id => {
    this.setActivePanel(id);
  };

  renderPanel = Component => {
    const {id} = Component;
    const {activePanelId} = this.props;
    const active = id === activePanelId;
    return <Component key={id} active={active} onActivate={this.handlePanelActivation}/>;
  }

  render() {
    return (
      <main className="settings">
        <h1>Settings</h1>
        {panelComponents.map(this.renderPanel)}
      </main>
    );
  }

}

const mapStateToProps = state => ({
  activePanelId: state.settings.activePanelId,
});

export default connect(mapStateToProps)(Settings);
