/**
 * XR Interface Component
 * 
 * Central component that manages the spatial layout of all 3D interface elements.
 * Organizes the panels, floor plane, and visual effects in the VR environment.
 * 
 * Features:
 * - Arranges interface panels in an ergonomic spatial layout
 * - Manages lighting for optimal visibility of UI elements
 * - Handles conditional rendering based on debug settings
 * - Provides visual consistency across the VR environment
 */
import React from "react";
import { Grid } from "@react-three/drei";
import ParticleField from "./ParticleField";
import FloorPlane from './FloorPlane';
import MainPanel from './MainPanel';
import FriendsPanel from './FriendsPanel';
import "./PanelContent.css";

/**
 * Interface Component
 * 
 * Manages the spatial arrangement of 3D interface elements in the XR environment.
 * Renders panels, lighting, floor, and visual effects based on debug settings.
 * 
 * @param {Object} props - Component properties
 * @param {Object} props.debugSettings - Settings controlling visual elements and effects
 * @returns {JSX.Element} The 3D interface structure
 */
export default function Interface({ debugSettings = { showGrid: false, panelScale: 1.0 } }) {
  return (
    <group position={[0, 0, 0]}>
      {/* Lighting system for interface elements */}
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[0, 5, 3]} 
        angle={0.3} 
        penumbra={1} 
        intensity={0.7} 
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <spotLight 
        position={[-3, 4, -2]} 
        angle={0.5} 
        penumbra={0.8} 
        intensity={0.3} 
      />
      
      {/* Environment elements */}
      <FloorPlane position={[0, -0.7, 0]} size={20} receiveShadow />
      
      {/* Debug visualization - conditionally rendered */}
      {debugSettings.showGrid && (
        <Grid 
          position={[0, -0.69, 0]} 
          args={[20, 20]} 
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#6f6f6f"
          sectionSize={2}
          sectionThickness={1}
          sectionColor="#9d4b4b"
        />
      )}
      
      {/* Visual effects - conditionally rendered */}
      {debugSettings.showParticles && 
        <ParticleField 
          count={1500}
          size={0.015}
          color="#4285F4"
          speed={0.005}
        />
      }
      
      {/* Interface panels - scaled based on debug settings */}
      <group scale={debugSettings.panelScale}>
        <MainPanel />
        <FriendsPanel />
      </group>
    </group>
  );
}
