/**
 * XR Interface Component
 * 
 * This component manages the spatial layout of interactive panels in 3D space.
 * It handles the state for active panels and coordinates the layout of UI elements
 * within the XR environment.
 * 
 * Features:
 * - Manages active panel state
 * - Provides consistent lighting for UI elements
 * - Organizes panels in an ergonomic spatial arrangement
 * - Handles panel selection and state changes
 * - Implements smooth transitions between panels
 * - Includes ambient particle field for visual depth
 * - Supports debug visualization for development
 */
import React, { useState, useEffect } from "react";
import Panel from "./Panel";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SettingsPanel from "./panels/SettingsPanel";
import AppPanel from "./panels/AppPanel";
import NotificationsPanel from "./panels/NotificationsPanel";
import "./PanelContent.css";
import { Grid } from "@react-three/drei";
import ParticleField from "./ParticleField";
import { useTexture } from "@react-three/drei";
import FloorPlane from './FloorPlane';

/**
 * Interface Component
 * 
 * The main spatial UI component that manages and arranges
 * all interactive panels in 3D space.
 * 
 * @param {Object} props - Component properties
 * @param {Object} props.debugSettings - Settings for debug visualization
 */
export default function Interface({ debugSettings = { showGrid: false, panelScale: 1.0 } }) {
  // Track which panel is currently active
  const [activePanel, setActivePanel] = useState("app1");
  
  // Calculate positions along a curve
  const calculateCurvedPosition = (index, totalItems, radius = 4, angleSpread = Math.PI / 2) => {
    const angle = (index / (totalItems - 1)) * angleSpread - (angleSpread / 2);
    const x = Math.sin(angle) * radius;
    const z = -Math.cos(angle) * radius + radius;
    return new THREE.Vector3(x, 0, z);
  };

  // Create curved panel positions instead of linear positioning
  const [panelPositions, setPanelPositions] = useState({
    settings: calculateCurvedPosition(0, 3),
    app1: calculateCurvedPosition(1, 3),
    notifications: calculateCurvedPosition(2, 3)
  });
  
  // Access the Three.js viewport for responsive positioning
  const { viewport } = useThree();
  
  /**
   * Handles panel selection events and rearranges panels
   * @param {string} panelId - The ID of the selected panel
   */
  const handlePanelClick = (panelId) => {
    if (activePanel === panelId) return;
    
    setActivePanel(panelId);
    
    const totalPanels = 3;
    const newPositions = { ...panelPositions };
    
    // Position panels along the curve based on which is active
    if (panelId === "settings") {
      newPositions.settings = calculateCurvedPosition(1, totalPanels);
      newPositions.app1 = calculateCurvedPosition(2, totalPanels);
      newPositions.notifications = calculateCurvedPosition(0, totalPanels);
    } else if (panelId === "app1") {
      newPositions.settings = calculateCurvedPosition(0, totalPanels);
      newPositions.app1 = calculateCurvedPosition(1, totalPanels);
      newPositions.notifications = calculateCurvedPosition(2, totalPanels);
    } else if (panelId === "notifications") {
      newPositions.settings = calculateCurvedPosition(2, totalPanels);
      newPositions.app1 = calculateCurvedPosition(0, totalPanels);
      newPositions.notifications = calculateCurvedPosition(1, totalPanels);
    }
    
    setPanelPositions(newPositions);
  };
  
  // Rotate each panel to face the center
  const getPanelRotation = (position) => {
    // Calculate the angle to face the center point (0, 0, 0)
    const angle = Math.atan2(position.x, position.z);
    return [0, -angle, 0]; // Rotate around Y axis
  };
  
  return (
    <group position={[0, 1.2, 0]}>
      {/* Ambient light ensures panels are visible from all angles */}
      <ambientLight intensity={0.5} />
      
      {/* Directional light for creating depth through shadows */}
      <spotLight position={[0, 5, 3]} angle={0.3} penumbra={1} />
      
      {/* Add a high-quality floor */}
      <FloorPlane position={[0, -0.7, 0]} size={20} />
      
      {/* Debug grid visualization - only shown when enabled in debug settings */}
      {debugSettings.showGrid && (
        <Grid 
          position={[0, -0.69, 0]} // Slightly above floor 
          args={[20, 20]} 
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#6f6f6f"
          sectionSize={2}
          sectionThickness={1}
          sectionColor="#9d4b4b"
        />
      )}
      
      {/* Ambient particle field for visual depth - only when enabled */}
      {debugSettings.showParticles && 
        <ParticleField 
          count={2000}
          size={0.015}
          color="#4285F4"
          speed={0.005}
        />
      }
      
      {/* Interface element container with debug-configurable scale */}
      <group scale={debugSettings.panelScale}>
        {/* Settings Panel - left position with rotation to face center */}
        <Panel 
          position={[panelPositions.settings.x, panelPositions.settings.y, panelPositions.settings.z]} 
          rotation={getPanelRotation(panelPositions.settings)}
          label="Settings" 
          id="settings"
          active={activePanel === "settings"}
          onClick={() => handlePanelClick("settings")}
        >
          <SettingsPanel />
        </Panel>
        
        {/* Main App Panel - center position with rotation to face center */}
        <Panel 
          position={[panelPositions.app1.x, panelPositions.app1.y, panelPositions.app1.z]} 
          rotation={getPanelRotation(panelPositions.app1)}
          label="Applications" 
          id="app1"
          active={activePanel === "app1"}
          onClick={() => handlePanelClick("app1")}
        >
          <AppPanel />
        </Panel>
        
        {/* Notifications Panel - right position with rotation to face center */}
        <Panel 
          position={[panelPositions.notifications.x, panelPositions.notifications.y, panelPositions.notifications.z]} 
          rotation={getPanelRotation(panelPositions.notifications)}
          label="Notifications" 
          id="notifications"
          active={activePanel === "notifications"}
          onClick={() => handlePanelClick("notifications")}
        >
          <NotificationsPanel />
        </Panel>
      </group>
    </group>
  );
}
