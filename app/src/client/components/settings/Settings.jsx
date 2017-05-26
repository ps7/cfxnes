import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setActiveSettingsPanel} from '../../actions';
import {selectSettings} from '../../reducers';
import {panelIds, panels, isValidPanelId, defaultPanelId} from './panels';

class Settings extends PureComponent {

  static propTypes = {
    activePanelId: PropTypes.string,
    match: PropTypes.object.isRequired,  // eslint-disable-line react/no-unused-prop-types
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    activePanelId: null,
  };

  componentWillMount() {
    this.handlePropsChange(this.props);
  }

  componentWillReceiveProps(props) {
    this.handlePropsChange(props);
  }

  handlePropsChange(props) {
    const routePanelId = props.match.params.activePanelId;
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
    this.props.history.replace(`/settings/${id}`);
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

  renderPanel = id => {
    const {activePanelId} = this.props;
    const active = id === activePanelId;
    const Panel = panels[id];
    return <Panel key={id} active={active} onActivate={this.handlePanelActivation}/>;
  }

  render() {
    return (
      <main className="settings">
        <h1>Settings</h1>
        {panelIds.map(this.renderPanel)}
      </main>
    );
  }

}

const mapStateToProps = state => ({
  activePanelId: selectSettings(state).activePanelId,
});

export default connect(mapStateToProps)(Settings);
