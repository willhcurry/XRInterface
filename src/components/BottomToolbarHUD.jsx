/**
 * Bottom Toolbar HUD Component (2D)
 * 
 * Fixed-position toolbar that provides persistent access to primary navigation
 * regardless of the user's position in the 3D environment. Rendered outside the
 * Canvas as a standard DOM element for consistent access and better performance.
 * 
 * Features:
 * - Always visible regardless of 3D camera position
 * - Quick access to primary application sections
 * - Visual consistency with the Pico VR home interface
 * - Interactive feedback with hover effects
 * - Current time display
 */
import React, { useState, useEffect } from 'react';

// Common application sections with their visual styling
const TOOLBAR_APPS = [
  { id: 'home', name: 'Home', icon: '🏠', color: '#4285F4' },
  { id: 'browser', name: 'Browser', icon: '🌐', color: '#EA4335' },
  { id: 'store', name: 'Store', icon: '🛒', color: '#34A853' },
  { id: 'settings', name: 'Settings', icon: '⚙️', color: '#FBBC05' },
  { id: 'gallery', name: 'Gallery', icon: '🖼️', color: '#9C27B0' },
  { id: 'library', name: 'Library', icon: '📚', color: '#FF9800' }
];

// Base styles - extracted to avoid repetition
const STYLES = {
  hud: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '8px 15px',
    background: 'rgba(30, 30, 30, 0.9)',
    borderRadius: '25px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.6)',
    zIndex: 100
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'transform 0.2s, background-color 0.2s',
    fontSize: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
  },
  clock: {
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    marginLeft: '15px',
    fontFamily: 'Arial, sans-serif',
  }
};

/**
 * BottomToolbarHUD Component
 * 
 * Renders a fixed toolbar at the bottom of the screen with navigation icons
 * and a clock display. Designed to mimic the Pico VR home interface.
 * 
 * @returns {JSX.Element} The rendered toolbar HUD
 */
const BottomToolbarHUD = () => {
  // Live clock state
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  );
  
  // Update the clock every minute
  useEffect(() => {
    // Initial time set outside the interval
    setCurrentTime(
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    );
    
    // Reference the function to avoid recreation on each render
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    
    const intervalId = setInterval(updateTime, 60000);
    
    // Critical: Properly clean up on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array ensures this runs only once

  /**
   * Handles toolbar icon click events
   * 
   * @param {string} appName - The name of the clicked application
   */
  const handleIconClick = (appName) => {
    console.log(`Clicked Toolbar HUD: ${appName}`);
    // Future implementation: Navigation or action triggering
  };

  return (
    <div style={STYLES.hud}>
      {TOOLBAR_APPS.map((app) => (
        <div 
          key={app.id} 
          title={app.name}
          style={{ ...STYLES.iconContainer, backgroundColor: app.color }}
          onClick={() => handleIconClick(app.name)}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
        >
          {app.icon}
        </div>
      ))}
      <div style={STYLES.clock}>
        {currentTime}
      </div>
    </div>
  );
};

export default BottomToolbarHUD;
