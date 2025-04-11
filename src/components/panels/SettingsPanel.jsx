import React, { useState } from 'react';

const SettingsPanel = () => {
  const [brightness, setBrightness] = useState(70);
  const [volume, setVolume] = useState(50);
  const [notifications, setNotifications] = useState(true);
  
  return (
    <div className="settings-panel">
      <h3>Settings</h3>
      
      <div className="setting-item">
        <label htmlFor="brightness">Brightness: {brightness}%</label>
        <input 
          type="range" 
          id="brightness" 
          min="0" 
          max="100" 
          value={brightness}
          onChange={(e) => setBrightness(parseInt(e.target.value))}
        />
      </div>
      
      <div className="setting-item">
        <label htmlFor="volume">Volume: {volume}%</label>
        <input 
          type="range" 
          id="volume" 
          min="0" 
          max="100" 
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value))}
        />
      </div>
      
      <div className="setting-item checkbox">
        <label>
          <input 
            type="checkbox" 
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          Enable Notifications
        </label>
      </div>
    </div>
  );
};

export default SettingsPanel;
