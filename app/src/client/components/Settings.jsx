import React from 'react';
import {Link} from 'react-router';

const panelIds = ['emulation', 'video', 'audio', 'controls', 'reset'];

export default class Settings extends React.Component {

  static propTypes = {
    params: React.PropTypes.shape({
      activePanelId: React.PropTypes.string,
    }).isRequired,
    router: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  componentWillMount() {
    const {params, router} = this.props;
    const {activePanelId} = params;

    if (panelIds.indexOf(activePanelId) < 0) {
      router.replace('/settings/' + panelIds[0]);
    }
  }

  render() {
    const {activePanelId} = this.props.params;

    const panels = panelIds.map(panelId => {
      return (
        <div key={panelId}>
          <Link to={`/settings/${panelId}`}>{panelId}</Link>
          {panelId === activePanelId && <div>{panelId} content</div>}
        </div>
      );
    });

    return (
      <main className="settings">
        <h1>Settings</h1>
        {panels}
      </main>
    );
  }
}
