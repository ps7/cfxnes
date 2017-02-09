import React from 'react';
import SystemPanel from './SystemPanel';
import VideoPanel from './VideoPanel';
import AudioPanel from './AudioPanel';
import ControlsPanel from './ControlsPanel';
import ResetPanel from './ResetPanel';

const panelComponents = [SystemPanel, VideoPanel, AudioPanel, ControlsPanel, ResetPanel];
const panelIds = panelComponents.map(Component => Component.id);
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
    if (panelIds.indexOf(params.activePanelId) < 0) {
      router.replace(`/settings/${defaultPanelId}`);
    }
  }

  renderPanel = Component => {
    const {id} = Component;
    const {params, router} = this.props;
    const onHeaderClick = () => router.push(`/settings/${id}`);
    const collapsed = id !== params.activePanelId;
    return <Component key={id} collapsed={collapsed} onHeaderClick={onHeaderClick}/>;
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
