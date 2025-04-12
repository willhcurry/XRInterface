/**
 * Main Application Component
 * 
 * This is the root component of our XR application that sets up the 3D environment
 * and VR capabilities. It manages the WebXR context and provides the canvas for
 * all 3D rendering.
 * 
 * Key features:
 * - Sets up the React Three Fiber Canvas for 3D rendering
 * - Configures WebXR context with controller and hand tracking
 * - Renders the main UI interface within the 3D space
 * - Includes environmental lighting for realistic rendering
 * - Provides debug controls for development and testing
 * - Implements camera controls for non-VR exploration
 * 
 * Performance considerations:
 * - Browser environments typically cap at 60fps due to requestAnimationFrame
 * - VR mode targets the headset's native refresh rate (90Hz+)
 * - Performance optimizations include:
 *   - Instanced mesh rendering for particles
 *   - Conditional rendering of visual elements
 *   - Optimized geometry complexity
 *   - Debug controls to toggle visual features
 */
import React, { useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { VRButton, XR, Controllers, Hands } from "@react-three/xr";
import { Environment, OrbitControls } from "@react-three/drei";
import Interface from "./components/Interface";
import DebugPanel from "./components/DebugPanel";
import "./App.css";

/**
 * App Component
 * 
 * The main application wrapper that sets up the 3D canvas,
 * XR environment, and debugging tools.
 */
export default function App() {
  /**
   * State for debug settings
   * Controls various aspects of the development environment
   * These settings affect the visual presentation and interaction
   * including grid, controls, scale, and ambient particles
   */
  const [debugSettings, setDebugSettings] = useState({
    showGrid: true,
    panelScale: 1.0,
    orbitControlsEnabled: true,
    showParticles: true
  });
  
  // Determine if we're in development environment
  const isDev = process.env.NODE_ENV === 'development';

  /**
   * Updates debug settings from the debug panel
   * @param {Object} newSettings - The updated settings object
   */
  const handleSettingsChange = (newSettings) => {
    setDebugSettings(newSettings);
  };

  return (
    <>
      {/* Debug controls panel - only visible in development */}
      {isDev && <DebugPanel onSettingsChange={handleSettingsChange} />}
      
      {/* VR entry button - appears when a compatible headset is detected */}
      <VRButton />
      
      {/* 3D Canvas with camera positioned at standing eye height */}
      <Canvas camera={{ position: [0, 1.6, 3] }}>
        {/* OrbitControls for non-VR camera movement - configurable via debug panel */}
        {debugSettings.orbitControlsEnabled && (
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            target={[0, 1.5, -1]} // Target the center of the interface
          />
        )}
        
        {/* XR context provider - enables WebXR API integration */}
        <XR>
          {/* Makes XR controllers visible and interactive in the scene */}
          <Controllers />
          
          {/* Enables hand tracking visualization when supported */}
          <Hands />
          
          {/* Provides ambient lighting and skybox */}
          <Environment preset="sunset" />
          
          {/* Main UI interface containing all interactive panels */}
          <Interface debugSettings={debugSettings} />
        </XR>
      </Canvas>
    </>
  );
}
