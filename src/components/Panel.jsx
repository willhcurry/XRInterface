/**
 * Interactive 3D Panel Component
 * 
 * A reusable component for creating interactive panels in 3D space.
 * Each panel combines 3D geometry with HTML content and handles XR interactions
 * including hover effects, selection, and visual feedback.
 * 
 * Features:
 * - Smooth animations for interaction feedback
 * - HTML content embedded in 3D space
 * - XR controller interaction support
 * - Visual state indicators (active, hover)
 * - Optimized rendering with refs
 */
import React, { useState, useRef } from "react";
import { Html, Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Interactive } from "@react-three/xr";
import * as THREE from "three";

/**
 * Panel Component
 * 
 * @param {Object} props - Component properties
 * @param {Array} props.position - [x,y,z] position of panel in 3D space
 * @param {string} props.label - Text display on the panel
 * @param {string} props.id - Unique identifier for the panel
 * @param {boolean} props.active - Whether this panel is currently active
 * @param {Function} props.onClick - Callback function when panel is selected
 */
export default function Panel({ position, label, id, active, onClick }) {
  // Reference to the panel group for animations
  const ref = useRef();
  
  // Track hover state for interaction feedback
  const [hovered, setHovered] = useState(false);
  
  /**
   * Smooth animation on hover/active state changes
   * Uses Three.js animation loop to update scale
   */
  useFrame(() => {
    if (ref.current) {
      // Horizontal scale animation 
      ref.current.scale.x = THREE.MathUtils.lerp(
        ref.current.scale.x,
        active || hovered ? 1.1 : 1,  // Scale up when active or hovered
        0.1  // Animation speed factor
      );
      
      // Vertical scale animation
      ref.current.scale.y = THREE.MathUtils.lerp(
        ref.current.scale.y,
        active || hovered ? 1.1 : 1,
        0.1
      );
    }
  });
  
  return (
    // Interactive wrapper for XR controller events
    <Interactive 
      onSelect={onClick}  // Triggered on controller selection
      onHover={() => setHovered(true)}  // On raycast hover enter
      onBlur={() => setHovered(false)}  // On raycast hover exit
    >
      <group position={position} ref={ref}>
        {/* 3D backdrop for the panel */}
        <Box args={[2, 1, 0.1]}>
          <meshStandardMaterial 
            color={active ? "#4285F4" : "#3399ff"}  // Blue when active, lighter blue when inactive
            transparent 
            opacity={0.7}  // Partial transparency for depth cues
            emissive={hovered ? "#ffffff" : "#000000"}  // Glow effect on hover
            emissiveIntensity={hovered ? 0.2 : 0}  // Intensity of glow effect
          />
        </Box>
        
        {/* HTML content rendered in 3D space */}
        <Html 
          center  // Center align the HTML content
          distanceFactor={5}  // Scale adjustment based on distance
          position={[0, 0, 0.06]}  // Slightly in front of the box
          transform  // Enable 3D transformations
        >
          <div style={{ 
            color: 'white', 
            fontSize: '24px',
            fontWeight: active ? 'bold' : 'normal',  // Bold when active
            padding: '10px 20px',
            backgroundColor: 'rgba(0,0,0,0.5)',  // Semi-transparent background
            borderRadius: '5px',
            userSelect: 'none'  // Prevent text selection
          }}>
            {label}
          </div>
        </Html>
      </group>
    </Interactive>
  );
}
