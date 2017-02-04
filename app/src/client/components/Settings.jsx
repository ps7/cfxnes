import React from 'react';
import SettingsSystem from './SettingsSystem';
import SettingsVideo from './SettingsVideo';
import SettingsAudio from './SettingsAudio';
import SettingsControls from './SettingsControls';
import SettingsReset from './SettingsReset';

const panelComponents = {
  system: SettingsSystem,
  video: SettingsVideo,
  audio: SettingsAudio,
  controls: SettingsControls,
  reset: SettingsReset,
};

export default class Settings extends React.Component {

  static propTypes = {
    params: React.PropTypes.shape({
      activePanelId: React.PropTypes.string,
    }).isRequired,
    router: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  componentWillMount() {
    const {activePanelId} = this.props.params;
    if (!(activePanelId in panelComponents)) {
      this.openPanel(Object.keys(panelComponents)[0]);
    }
  }

  openPanel(id) {
    this.props.router.push(`/settings/${id}`);
  }

  renderPanel(id) {
    const open = id === this.props.params.activePanelId;
    const onHeaderClick = () => this.openPanel(id);
    const Component = panelComponents[id];
    return <Component key={id} open={open} onHeaderClick={onHeaderClick}/>;
  }

  render() {
    return (
      <main className="settings">
        <h1>Settings</h1>
        {Object.keys(panelComponents).map(id => this.renderPanel(id))}
      </main>
    );
  }

}
