/**
 * FloorPlane Component
 * 
 * Creates a high-quality floor surface using Physically Based Rendering (PBR)
 * materials for realistic light interaction in the VR environment.
 * 
 * Features:
 * - Full PBR material workflow with five texture maps for realism
 * - Dynamic texture tiling based on floor size
 * - Optimized with appropriate mesh subdivision for normal mapping
 * - Properly positioned in 3D space to serve as the environment ground
 * - Shadow receiving for consistent lighting with other scene elements
 * 
 * Technical implementation:
 * - Uses meshStandardMaterial with PBR workflow
 * - Implements proper UV texture coordinate repetition
 * - Uses normal mapping for surface detail without high polygon counts
 * - Integrates ambient occlusion for natural shadowing in crevices
 * - Balances visual quality with performance for VR
 * 
 * PBR texture maps used:
 * - Base Color: Diffuse surface appearance
 * - Normal: Surface detail and bumps
 * - Roughness: Surface smoothness variation
 * - Metalness: Metallic vs. dielectric material properties
 * - Ambient Occlusion: Natural shadowing in recessed areas
 */
import React, { useEffect } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

/**
 * FloorPlane Component
 * 
 * @param {Object} props - Component properties
 * @param {Array} props.position - [x,y,z] position in 3D space
 * @param {number} props.size - Width and depth of the floor plane
 * @returns {JSX.Element} - The rendered floor plane with PBR materials
 */
const FloorPlane = ({ 
  position = [0, -0.7, 0], 
  size = 20
}) => {
  // Load all texture maps for the PBR material workflow
  const textureMaps = useTexture({
    map: '/textures/wood/color.png',          // Base color/albedo texture
    normalMap: '/textures/wood/normal.png',    // Surface detail texture
    roughnessMap: '/textures/wood/roughness.png', // Surface smoothness variation
    metalnessMap: '/textures/wood/metalness.png', // Metallic property variation
    aoMap: '/textures/wood/ao.png',            // Ambient occlusion shadows
  });
  
  // Configure texture repeat for proper tiling based on floor size
  useEffect(() => {
    // Apply consistent settings to all textures
    Object.values(textureMaps).forEach(texture => {
      // Enable texture wrapping for seamless tiling
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      
      // Scale repetition based on floor size (4 tiles across total width)
      texture.repeat.set(size/4, size/4);
      
      // Use high quality texture filtering
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
    });
    
    // Cleanup function for texture disposal if component unmounts
    return () => {
      Object.values(textureMaps).forEach(texture => {
        texture.dispose();
      });
    };
  }, [textureMaps, size]);

  return (
    <mesh 
      position={position}
      rotation={[-Math.PI / 2, 0, 0]} // Rotate to horizontal orientation
      receiveShadow
    >
      {/* Higher segment count for better normal map detail */}
      <planeGeometry args={[size, size, 64, 64]} />
      <meshStandardMaterial 
        {...textureMaps}
        envMapIntensity={0.5} // Reflection intensity
        normalScale={new THREE.Vector2(1, 1)} // Normal map strength
        aoMapIntensity={1.0} // Ambient occlusion strength
        roughness={0.8} // Base roughness multiplier
        metalness={0.1} // Base metalness multiplier
      />
    </mesh>
  );
};

export default FloorPlane; 