import React from 'react';
import SystemPanel from './SystemPanel';
import VideoPanel from './VideoPanel';
import AudioPanel from './AudioPanel';
import ControlsPanel from './ControlsPanel';
import ResetPanel from './ResetPanel';

const panelComponents = {
  system: SystemPanel,
  video: VideoPanel,
  audio: AudioPanel,
  controls: ControlsPanel,
  reset: ResetPanel,
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
