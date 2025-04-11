import React, { useState } from 'react';

const DebugControls = () => {
  const [debugSettings, setDebugSettings] = useState({
    showHelpers: false,
    simulateControllers: false,
    slowMotion: false,
  });

  const toggleSetting = (setting) => {
    setDebugSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    // Apply debug settings
    if (setting === 'slowMotion') {
      if (!debugSettings.slowMotion) {
        // Enable slow motion for animations
        window.xrSlowMotion = 0.3;
      } else {
        // Disable slow motion
        window.xrSlowMotion = 1;
      }
    }
    
    // You could implement other debug features here
  };

  return (
    <div className="debug-panel">
      <h3>XR Debug Controls</h3>
      <div className="debug-options">
        <label>
          <input 
            type="checkbox" 
            checked={debugSettings.showHelpers}
            onChange={() => toggleSetting('showHelpers')}
          />
          Show Spatial Helpers
        </label>
        
        <label>
          <input 
            type="checkbox" 
            checked={debugSettings.simulateControllers}
            onChange={() => toggleSetting('simulateControllers')}
          />
          Simulate Controllers
        </label>
        
        <label>
          <input 
            type="checkbox" 
            checked={debugSettings.slowMotion}
            onChange={() => toggleSetting('slowMotion')}
          />
          Slow Motion (for testing animations)
        </label>
      </div>
      
      <div className="debug-info">
        <p>Active Panel: App1</p>
        <p>Frame Rate: 60fps</p>
        <p>Mouse Position: Simulate XR pointer</p>
      </div>
    </div>
  );
};

export default DebugControls;
