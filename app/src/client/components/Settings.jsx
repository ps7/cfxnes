import React from 'react';
import {Link} from 'react-router';

export default function({params, router}) {
  const {activePanelId} = params;
  const panelIds = ['emulation', 'video', 'audio', 'controls', 'reset'];

  if (panelIds.indexOf(activePanelId) < 0) {
    router.replace('/settings/' + panelIds[0]);
    return null;
  }

  const panels = panelIds.map(panelId => {
    return (
      <div>
        <Link to={`/settings/${panelId}`}>{panelId}</Link>
        {panelId === activePanelId &&
          <div>{panelId} content</div>
        }
      </div>
    );
  })

  return (
    <main className="settings">
      <h1>Settings</h1>
      {panels}
    </main>
  );
}
