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

export default function Interface({ debugSettings = { showGrid: false, panelScale: 1.0 } }) {
  // Track which panel is currently active
  const [activePanel, setActivePanel] = useState("app1");
  
  // Track panel positions for smooth animations
  const [panelPositions, setPanelPositions] = useState({
    settings: new THREE.Vector3(-2, 0, 0),
    app1: new THREE.Vector3(0, 0, 0),
    notifications: new THREE.Vector3(2, 0, 0)
  });
  
  // Access the Three.js viewport for responsive positioning
  const { viewport } = useThree();
  
  /**
   * Handles panel selection events and rearranges panels
   * @param {string} panelId - The ID of the selected panel
   */
  const handlePanelClick = (panelId) => {
    // If already active, do nothing
    if (activePanel === panelId) return;
    
    // Set the new active panel
    setActivePanel(panelId);
    
    // Create new positions based on the selected panel
    const newPositions = { ...panelPositions };
    
    // Arrange panels based on which one was selected
    if (panelId === "settings") {
      newPositions.settings = new THREE.Vector3(0, 0, 0);
      newPositions.app1 = new THREE.Vector3(2, 0, 0);
      newPositions.notifications = new THREE.Vector3(4, 0, 0);
    } else if (panelId === "app1") {
      newPositions.settings = new THREE.Vector3(-2, 0, 0);
      newPositions.app1 = new THREE.Vector3(0, 0, 0);
      newPositions.notifications = new THREE.Vector3(2, 0, 0);
    } else if (panelId === "notifications") {
      newPositions.settings = new THREE.Vector3(-4, 0, 0);
      newPositions.app1 = new THREE.Vector3(-2, 0, 0);
      newPositions.notifications = new THREE.Vector3(0, 0, 0);
    }
    
    // Update the positions
    setPanelPositions(newPositions);
  };
  
  return (
    // Position the entire interface at comfortable viewing height and distance
    <group position={[0, 1.5, -1]}>
      {/* Ambient light ensures panels are visible from all angles */}
      <ambientLight intensity={0.5} />
      
      {/* Directional light for creating depth through shadows */}
      <spotLight position={[0, 5, 5]} angle={0.3} penumbra={1} />
      
      {/* Debug visualizations */}
      {debugSettings.showGrid && <Grid infiniteGrid position={[0, 0, 0]} cellSize={0.5} cellThickness={0.5} sectionSize={1} sectionThickness={1} />}
      
      {/* Settings Panel - left position */}
      <Panel 
        position={[panelPositions.settings.x, panelPositions.settings.y, panelPositions.settings.z]} 
        label="Settings" 
        id="settings"
        active={activePanel === "settings"}
        onClick={() => handlePanelClick("settings")}
      >
        <SettingsPanel />
      </Panel>
      
      {/* Main App Panel - center position */}
      <Panel 
        position={[panelPositions.app1.x, panelPositions.app1.y, panelPositions.app1.z]} 
        label="Applications" 
        id="app1"
        active={activePanel === "app1"}
        onClick={() => handlePanelClick("app1")}
      >
        <AppPanel />
      </Panel>
      
      {/* Notifications Panel - right position */}
      <Panel 
        position={[panelPositions.notifications.x, panelPositions.notifications.y, panelPositions.notifications.z]} 
        label="Notifications" 
        id="notifications"
        active={activePanel === "notifications"}
        onClick={() => handlePanelClick("notifications")}
      >
        <NotificationsPanel />
      </Panel>
      
      {/* Your panels with debuggable scale */}
      <group scale={debugSettings.panelScale}>
        {/* Your existing panels */}
      </group>
    </group>
  );
}
