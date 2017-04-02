import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {setActiveSettingsPanel} from '../../actions';
import {panels, isValidPanelId, defaultPanelId} from './panels';
import './Settings.css';

class Settings extends Component {

  static propTypes = {
    activePanelId: PropTypes.string,
    router: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    dispatch: PropTypes.func.isRequired,
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

  renderPanel = Panel => {
    const {id} = Panel;
    const {activePanelId} = this.props;
    const active = id === activePanelId;
    return <Panel key={id} active={active} onActivate={this.handlePanelActivation}/>;
  }

  render() {
    return (
      <main className="settings">
        <h1>Settings</h1>
        {panels.map(this.renderPanel)}
      </main>
    );
  }

}

const mapStateToProps = state => ({
  activePanelId: state.settings.activePanelId,
});

export default connect(mapStateToProps)(Settings);
