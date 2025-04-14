/**
 * ParticleField Component
 * 
 * Creates an ambient field of bubble-like particles that adds depth and visual interest
 * to the 3D environment. The particles move in a gentle, organic pattern with varied
 * sizes and colors from a blue-purple palette.
 * 
 * Features:
 * - Dynamic particle generation with randomized properties
 * - Multiple color variations within a coordinated blue/purple palette
 * - Variable bubble sizes for increased visual interest
 * - Smooth animation using frame-based updates
 * - Realistic bubble-like appearance with transparent physical material
 * - Optimized rendering with instanced meshes for thousands of particles
 * 
 * Performance optimization:
 * - Uses instancedMesh for efficient rendering of many objects
 * - Reuses a single dummy object for matrix calculations
 * - Batches matrix updates to minimize CPU-GPU communication
 * - Can be further tuned by adjusting:
 *   - particle count (fewer particles = higher performance)
 *   - geometry complexity (lower segment counts = higher performance)
 *   - animation speed (slower updates = reduced CPU usage)
 * 
 * This component enhances the visual appeal of the XR interface by creating
 * a sense of depth, atmosphere, and polish in the virtual space.
 */
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * ParticleField Component
 * 
 * @param {Object} props - Component properties
 * @param {number} props.count - Number of particles to generate (default: 1000)
 * @param {number} props.size - Base size of particles (default: 0.1)
 * @param {string} props.color - Base color of particles (default: "#4285F4")
 * @param {number} props.speed - Animation speed factor (default: 0.01)
 */
const ParticleField = ({ 
  count = 1000, 
  size = 0.1, 
  color = "#4285F4", 
  speed = 0.01 
}) => {
  const mesh = useRef();
  
  // Blue-Purple color palette for a cohesive theme while providing variation
  const colorPalette = useMemo(() => [
    new THREE.Color("#4285F4"), // Google Blue
    new THREE.Color("#5C6BC0"), // Indigo
    new THREE.Color("#7986CB"), // Light Indigo
    new THREE.Color("#3F51B5"), // Material Indigo
    new THREE.Color("#9575CD"), // Light Purple
    new THREE.Color("#673AB7"), // Deep Purple
    new THREE.Color("#5E35B1"), // Dark Purple
  ], []);
  
  // Generate initial random positions and properties for all particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const particleSpeed = 0.01 + Math.random() / 200;
      
      // Position each particle in a spherical volume around the center
      const x = Math.random() * 10 - 5;
      const y = Math.random() * 10 - 5;
      const z = Math.random() * 10 - 5;
      
      // Assign random properties for visual variation
      const colorIndex = Math.floor(Math.random() * colorPalette.length);
      const sizeVariation = 0.5 + Math.random() * 1.5; // Size varies between 50% and 150% of base size
      
      temp.push({ 
        time, 
        factor, 
        speed: particleSpeed, 
        x, y, z,
        colorIndex,
        sizeVariation
      });
    }
    return temp;
  }, [count, colorPalette]);

  // Create dummy object for instance manipulation without creating new objects
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Create color attribute array for instancing
  const colorArray = useMemo(() => {
    const array = new Float32Array(count * 3);
    let c = new THREE.Color();
    
    // Set the color for each particle based on its assigned palette index
    for (let i = 0; i < count; i++) {
      c.copy(colorPalette[particles[i].colorIndex]);
      array[i * 3] = c.r;
      array[i * 3 + 1] = c.g;
      array[i * 3 + 2] = c.b;
    }
    
    return array;
  }, [count, particles, colorPalette]);
  
  // Fixed version with frame skipping and better cleanup:
  const frameSkip = useRef(0);

  useFrame((state) => {
    // Skip frames to reduce updates (especially in VR)
    frameSkip.current = (frameSkip.current + 1) % 2;
    if (frameSkip.current !== 0) return;
    
    if (!mesh.current) return;
    
    // Update each particle position
    particles.forEach((particle, i) => {
      let { time, factor, speed: particleSpeed, x, y, z, sizeVariation } = particle;

      // Update particle time
      time = particle.time += speed;
      
      // Calculate new position with subtle movement
      // Scale varies based on time and particle's unique size variation
      const scale = (Math.cos(time) + 2) * sizeVariation * 0.5;
      const s = THREE.MathUtils.lerp(0.4, 1, scale);
      
      // Set position with gentle bobbing movement
      dummy.position.set(
        x + Math.sin(time / 10) * 2,
        y + Math.cos(time / 10) * 2,
        z + Math.sin(time / 10) * 2
      );
      
      // Apply scale to the dummy object
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      
      // Update the instance matrix
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    
    // Notify Three.js that instanced matrices need updating
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  // Create instanced material with color attribute
  const colorAttribute = useMemo(() => new THREE.InstancedBufferAttribute(colorArray, 3), [colorArray]);

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[size, 8, 8]}>
        <instancedBufferAttribute 
          attach="attributes-color" 
          args={[colorArray, 3]} 
        />
      </sphereGeometry>
      <meshPhysicalMaterial 
        vertexColors
        transparent={true}
        opacity={0.2}
        metalness={0.1}
        roughness={0.1}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        envMapIntensity={0.5}
      />
    </instancedMesh>
  );
};

export default ParticleField;
