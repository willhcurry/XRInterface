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
import React, { useEffect, useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { getAssetPath } from '../utils/paths';

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
  // Optimize texture loading with useMemo
  const textureMaps = useMemo(() => {
    const maps = useTexture({
      map: getAssetPath('/textures/wood/color.png'),
      normalMap: getAssetPath('/textures/wood/normal.png'),
      roughnessMap: getAssetPath('/textures/wood/roughness.png'),
      metalnessMap: getAssetPath('/textures/wood/metalness.png'),
      aoMap: getAssetPath('/textures/wood/ao.png'),
    });
    
    // Apply settings to all textures
    Object.values(maps).forEach(texture => {
      // Enable texture wrapping for seamless tiling
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      // Scale repetition based on floor size (4 tiles across total width)
      texture.repeat.set(size/4, size/4);
      // Enable mipmapping for better performance at different distances
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      // Apply texture anisotropy for better appearance at shallow angles
      texture.anisotropy = 16;
    });
    
    return maps;
  }, [size]); // Only recalculate when size changes

  return (
    <mesh 
      position={position}
      rotation={[-Math.PI / 2, 0, 0]} // Rotate to horizontal orientation
      receiveShadow
    >
      {/* Optimize the floor geometry - reduce segments */}
      <planeGeometry args={[size, size, 16, 16]} /> {/* Reduced from 64, 64 */}
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