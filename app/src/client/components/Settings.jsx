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

const panelIds = Object.keys(panelComponents);
const defaultPanelId = panelIds[0];

export default class Settings extends React.Component {

  static propTypes = {
    params: React.PropTypes.shape({
      activePanelId: React.PropTypes.string,
    }).isRequired,
    router: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  componentWillMount() {
    const {router, params} = this.props;
    if (!(params.activePanelId in panelComponents)) {
      router.replace(`/settings/${defaultPanelId}`);
    }
  }

  renderPanel(id) {
    const {router, params} = this.props;
    const PanelComponent = panelComponents[id];
    const collapsed = id !== params.activePanelId;
    const onHeaderClick = () => router.push(`/settings/${id}`);
    return <PanelComponent key={id} collapsed={collapsed} onHeaderClick={onHeaderClick}/>;
  }

  render() {
    return (
      <main className="settings">
        <h1>Settings</h1>
        {panelIds.map(id => this.renderPanel(id))}
      </main>
    );
  }

}
