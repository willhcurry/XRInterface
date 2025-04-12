/**
 * Debug Panel Component
 * 
 * Provides a development-only control panel for adjusting and visualizing
 * the XR interface in real-time. This component is designed to facilitate
 * testing and refinement of 3D interfaces without requiring a VR headset.
 * 
 * Features:
 * - Toggle visibility of spatial reference grid
 * - Enable/disable camera orbit controls for scene exploration
 * - Adjust interface scale to test different size configurations
 * - Toggle visual effects and background particles
 * - Provide instructions for navigation controls
 * 
 * Note: This component is only rendered in development environment
 * and does not appear in production builds.
 */
import React, { useState } from 'react';

/**
 * DebugPanel Component
 * 
 * @param {Object} props - Component properties
 * @param {Function} props.onSettingsChange - Callback when settings are changed
 */
function DebugPanel({ onSettingsChange }) {
  // Initial state for debug settings
  const [settings, setSettings] = useState({
    showGrid: true,
    panelScale: 1.0,
    orbitControlsEnabled: true,
    showParticles: true
  });

  /**
   * Handles changes to individual settings
   * 
   * @param {string} setting - The setting key to update
   * @param {any} value - The new value for the setting
   */
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
      
      {/* Grid visibility toggle */}
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
      
      {/* Camera controls toggle */}
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
      
      {/* Scale slider for panel size adjustment */}
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
      
      {/* Particle toggle */}
      <div style={{ marginTop: '10px' }}>
        <label>
          <input 
            type="checkbox"
            checked={settings.showParticles}
            onChange={(e) => handleChange('showParticles', e.target.checked)}
          />
          Show Particles
        </label>
      </div>
      
      {/* Control instructions */}
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
