/**
 * Interactive 3D Panel Component
 * 
 * A reusable component that creates interactive UI panels in 3D space
 * for the XR interface. Implements a modern dark aesthetic with rounded corners
 * similar to the Pico home environment.
 * 
 * Features:
 * - Consistent visual styling across all interface panels
 * - Smooth animations for hover and selection feedback
 * - HTML content embedding within 3D space for rich UI capabilities
 * - XR controller interaction support for VR input
 * - Visual state indicators for active/inactive panels
 * - Optimized rendering with refs for animation performance
 * - Curved layout compatibility with automatic rotation
 * 
 * Technical implementation:
 * - Uses drei's Box component with radius for rounded corners
 * - Implements HTML content using drei's Html component
 * - Smooth animation via useFrame and lerp for natural transitions
 * - Interactive component support for XR controller ray interactions
 * - Ref-based animation for better performance
 * - Proper content scaling with distanceFactor for readability
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
 * @param {Array} props.rotation - [x,y,z] rotation of panel in radians
 * @param {string} props.label - Text display on the panel header
 * @param {string} props.id - Unique identifier for the panel
 * @param {boolean} props.active - Whether this panel is currently active/selected
 * @param {Function} props.onClick - Callback function when panel is selected
 * @param {React.ReactNode} props.children - Content to display inside the panel
 * @returns {JSX.Element} - The rendered interactive panel
 */
export default function Panel({ 
  position, 
  rotation = [0, 0, 0], 
  label, 
  id, 
  active, 
  onClick, 
  children 
}) {
  // Reference to the panel group for animations
  const ref = useRef();
  
  // Track hover state for interaction feedback
  const [hovered, setHovered] = useState(false);
  
  /**
   * Smooth animation on hover/active state changes
   * Uses Three.js animation loop to update scale and position
   */
  useFrame(() => {
    if (ref.current) {
      // Horizontal scale animation with smooth interpolation 
      ref.current.scale.x = THREE.MathUtils.lerp(
        ref.current.scale.x,
        active || hovered ? 1.05 : 1,  // Subtle scale effect
        0.1  // Animation speed factor - lower is smoother
      );
      
      // Vertical scale animation
      ref.current.scale.y = THREE.MathUtils.lerp(
        ref.current.scale.y,
        active || hovered ? 1.05 : 1,
        0.1
      );
      
      // Z-position animation for active panels (move forward)
      ref.current.position.z = THREE.MathUtils.lerp(
        ref.current.position.z,
        active ? 0.2 : 0,  // Move active panels forward slightly
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
      <group position={position} rotation={rotation} ref={ref}>
        {/* 3D backdrop for the panel */}
        <Box 
          args={[2.2, 1.6, 0.05]} 
          radius={0.1} 
          smoothness={4}
        >
          <meshStandardMaterial 
            color={active ? "#202020" : "#303030"}  // Darker when active like Pico UI
            transparent 
            opacity={0.9}
            roughness={0.1}
            metalness={0.5}
            envMapIntensity={0.8}
          />
        </Box>
        
        {/* Highlight border when active */}
        {active && (
          <Box 
            args={[2.24, 1.64, 0.02]} 
            radius={0.1} 
            smoothness={4}
            position={[0, 0, 0.011]}
          >
            <meshBasicMaterial 
              color="#4285F4"  // Google blue highlight
              transparent 
              opacity={0.6}
            />
          </Box>
        )}
        
        {/* Header label */}
        <Html 
          center
          distanceFactor={5}  // Adjusts scale based on distance
          position={[0, 0.62, 0.06]}
          transform  // HTML follows object in 3D
        >
          <div style={{ 
            color: 'white', 
            fontSize: '22px',
            fontWeight: '500',
            padding: '8px 16px',
            backgroundColor: active ? 'rgba(30,30,30,0.8)' : 'rgba(40,40,40,0.7)',
            borderRadius: '8px',
            userSelect: 'none',  // Prevent text selection
            width: '100%',
            textAlign: 'center',
            boxShadow: active ? '0 0 10px rgba(66,133,244,0.3)' : 'none'
          }}>
            {label}
          </div>
        </Html>
        
        {/* Panel content - only shown when active */}
        {active && (
          <Html 
            center
            distanceFactor={5}
            position={[0, -0.1, 0.06]}
            transform
          >
            <div style={{ 
              width: '350px',
              maxHeight: '250px',
              overflowY: 'auto',  // Scrollable content
              backgroundColor: 'rgba(25,25,25,0.85)',
              borderRadius: '10px',
              padding: '15px',
              color: 'white',
              fontFamily: 'Arial, sans-serif',
              boxShadow: '0 0 15px rgba(0,0,0,0.5)'
            }}>
              {children}
            </div>
          </Html>
        )}
      </group>
    </Interactive>
  );
}
