import React, { useState } from 'react';

const AppPanel = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const apps = [
    { id: 'maps', name: 'Maps', icon: '🗺️' },
    { id: 'photos', name: 'Photos', icon: '📸' },
    { id: 'browser', name: 'Browser', icon: '🌐' },
    { id: 'notes', name: 'Notes', icon: '📝' },
    { id: 'calendar', name: 'Calendar', icon: '📅' },
    { id: 'games', name: 'Games', icon: '🎮' },
  ];
  
  return (
    <div className="app-panel">
      <div className="app-grid">
        {apps.map(app => (
          <div 
            key={app.id}
            className={`app-icon ${selectedApp === app.id ? 'selected' : ''}`}
            onClick={() => setSelectedApp(app.id)}
          >
            <div className="app-icon-graphic">{app.icon}</div>
            <div className="app-name">{app.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppPanel;
