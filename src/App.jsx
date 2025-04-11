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
 */
import React from 'react';
import { Canvas } from "@react-three/fiber";
import { VRButton, XR, Controllers, Hands } from "@react-three/xr";
import { Environment } from "@react-three/drei";
import Interface from "./components/Interface";
import "./App.css";

export default function App() {
  return (
    <>
      {/* VR entry button - appears when a compatible headset is detected */}
      <VRButton />
      
      {/* 3D Canvas with camera positioned at standing eye height */}
      <Canvas camera={{ position: [0, 1.6, 3] }}>
        {/* XR context provider - enables WebXR API integration */}
        <XR>
          {/* Makes XR controllers visible and interactive in the scene */}
          <Controllers />
          
          {/* Enables hand tracking visualization when supported */}
          <Hands />
          
          {/* Provides ambient lighting and skybox */}
          <Environment preset="sunset" />
          
          {/* Main UI interface containing all interactive panels */}
          <Interface />
        </XR>
      </Canvas>
    </>
  );
}
