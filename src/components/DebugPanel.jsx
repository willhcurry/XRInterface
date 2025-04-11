import React, { useState } from 'react';

function DebugPanel({ onSettingsChange }) {
  const [settings, setSettings] = useState({
    showGrid: true,
    panelScale: 1.0,
    orbitControlsEnabled: true,
  });

  const handleChange = (setting, value) => {
    const newSettings = { ...settings, [setting]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      background: 'rgba(0,0,0,0.7)',
      padding: '10px',
      borderRadius: '5px',
      color: 'white',
      zIndex: 1000,
      fontFamily: 'monospace',
      fontSize: '12px',
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Debug Controls</h3>
      
      <div>
        <label>
          <input 
            type="checkbox"
            checked={settings.showGrid}
            onChange={(e) => handleChange('showGrid', e.target.checked)}
          />
          Show Grid
        </label>
      </div>
      
      <div style={{ marginTop: '10px' }}>
        <label>
          <input 
            type="checkbox"
            checked={settings.orbitControlsEnabled}
            onChange={(e) => handleChange('orbitControlsEnabled', e.target.checked)}
          />
          Enable Camera Controls
        </label>
      </div>
      
      <div style={{ marginTop: '10px' }}>
        <label>Panel Scale: {settings.panelScale.toFixed(1)}</label>
        <input 
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={settings.panelScale}
          onChange={(e) => handleChange('panelScale', parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>
      
      <div style={{ marginTop: '10px', fontSize: '10px', opacity: 0.8 }}>
        <p>Camera Controls:</p>
        <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
          <li>Left Click + Drag: Rotate</li>
          <li>Right Click + Drag: Pan</li>
          <li>Scroll: Zoom</li>
        </ul>
      </div>
    </div>
  );
}

export default DebugPanel;
