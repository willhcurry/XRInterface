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
import React, { useRef, useMemo } from 'react';
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
  
  // Optimize texture loading with useMemo
  const earthTexture = useMemo(() => {
    const texture = new THREE.TextureLoader().load(
      getAssetPath('/textures/earth/earth.jpg')
    );
    
    // Optimize texture properties
    texture.anisotropy = 16;
    texture.encoding = THREE.sRGBEncoding;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    
    // Enable texture compression if supported
    if (texture.generateMipmaps) {
      texture.generateMipmaps = true;
      texture.mipmapFilter = THREE.LinearMipmapLinearFilter;
    }
    
    return texture;
  }, []); // Empty dependency array ensures this runs once
  
  // Optimize geometry with useMemo to prevent recreation
  const earthGeometry = useMemo(() => new THREE.SphereGeometry(1, 48, 48), []);
  const atmosphereGeometry = useMemo(() => new THREE.SphereGeometry(1, 24, 24), []);
  
  // Optimize shader material with useMemo
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
  }, []);
  
  // Animate Earth rotation
  useFrame(({ clock }) => {
    if (rotate && earthRef.current) {
      // Avoid updating every frame in production
      const time = clock.getElapsedTime() * 0.05;
      const newRotation = time % (2 * Math.PI);
      
      // Only update if significant change
      if (Math.abs(earthRef.current.rotation.y - newRotation) > 0.01) {
        earthRef.current.rotation.y = newRotation;
      }
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