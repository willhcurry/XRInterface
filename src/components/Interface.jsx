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
 */
import React, { useState } from "react";
import Panel from "./Panel";
import { useThree } from "@react-three/fiber";

export default function Interface() {
  // Track which panel is currently active
  const [activePanel, setActivePanel] = useState("app1");
  
  // Access the Three.js viewport for responsive positioning
  const { viewport } = useThree();
  
  /**
   * Handles panel selection events
   * @param {string} panelId - The ID of the selected panel
   */
  const handlePanelClick = (panelId) => {
    setActivePanel(panelId);
  };
  
  return (
    // Position the entire interface at comfortable viewing height and distance
    <group position={[0, 1.5, -1]}>
      {/* Ambient light ensures panels are visible from all angles */}
      <ambientLight intensity={0.5} />
      
      {/* Directional light for creating depth through shadows */}
      <spotLight position={[0, 5, 5]} angle={0.3} penumbra={1} />
      
      {/* Settings Panel - left position */}
      <Panel 
        position={[-2, 0, 0]} 
        label="Settings" 
        id="settings"
        active={activePanel === "settings"}
        onClick={() => handlePanelClick("settings")}
      />
      
      {/* Main App Panel - center position */}
      <Panel 
        position={[0, 0, 0]} 
        label="App 1" 
        id="app1"
        active={activePanel === "app1"}
        onClick={() => handlePanelClick("app1")}
      />
      
      {/* Notifications Panel - right position */}
      <Panel 
        position={[2, 0, 0]} 
        label="Notifications" 
        id="notifications"
        active={activePanel === "notifications"}
        onClick={() => handlePanelClick("notifications")}
      />
    </group>
  );
}
