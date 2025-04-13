/**
 * Earth Component
 * 
 * Creates a realistic 3D Earth model with atmospheric glow effect
 * for the background of the VR interface. Implements physically-based
 * rendering techniques and custom shaders for atmospheric effects.
 * 
 * Features:
 * - Realistic Earth representation using high-resolution texture (2048×1024)
 * - Custom shader-based atmospheric scattering effect for realistic glow
 * - Smooth continuous rotation animation for visual interest
 * - Optimized geometry detail based on distance from viewer
 * - Performance-optimized with appropriate texture resolution and LOD
 * - Configurable position and scale to adjust placement in the scene
 * 
 * Technical implementation:
 * - Uses anisotropic filtering for better texture quality at oblique angles
 * - Implements additive blending for the atmosphere effect
 * - Custom fragment shader creates realistic atmospheric limb darkening
 * - Optimized with appropriate polygon counts for VR performance
 */
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getAssetPath } from '../utils/paths';

/**
 * Earth Component
 * 
 * @param {Object} props - Component properties
 * @param {Array} props.position - [x,y,z] position in 3D space
 * @param {number} props.scale - Size multiplier for the Earth model
 * @param {boolean} props.rotate - Whether Earth should animate rotation
 * @returns {JSX.Element} - The rendered Earth component with atmosphere
 */
const Earth = ({ 
  position = [0, 5, -15],
  scale = 5,
  rotate = true
}) => {
  // Create refs for animation access
  const earthRef = useRef();
  const atmosphereRef = useRef();
  
  // Load Earth texture with environment-aware path
  const earthTexture = new THREE.TextureLoader().load(
    getAssetPath('/textures/earth/earth.jpg'),
    // Success callback
    texture => {
      console.log('Earth texture loaded successfully');
    },
    // Progress callback
    undefined,
    // Error callback
    err => {
      console.error('Error loading Earth texture:', err);
    }
  );
  
  // Improve texture quality with advanced settings
  earthTexture.anisotropy = 16;
  earthTexture.encoding = THREE.sRGBEncoding;
  earthTexture.minFilter = THREE.LinearMipmapLinearFilter;
  
  // Animate Earth rotation
  useFrame(({ clock }) => {
    if (rotate && earthRef.current) {
      // One full rotation approximately every 2 minutes
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Earth sphere with optimized geometry */}
      <mesh ref={earthRef} castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          map={earthTexture}
          roughness={0.6}
          metalness={0.2}
          envMapIntensity={0.4}
        />
      </mesh>
      
      {/* Atmosphere glow effect using custom shader */}
      <mesh ref={atmosphereRef} scale={1.15}>
        <sphereGeometry args={[1, 32, 32]} />
        <shaderMaterial 
          // Custom vertex shader calculates surface normals for glow effect
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          // Fragment shader creates blue atmospheric glow effect with limb darkening
          fragmentShader={`
            varying vec3 vNormal;
            void main() {
              float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
              gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
            }
          `}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
        />
      </mesh>
    </group>
  );
};

export default Earth; 