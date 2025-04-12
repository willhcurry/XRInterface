/**
 * Unified Controls Component
 * 
 * Handles all navigation controls for the XR environment, combining both
 * camera rotation (look) and position movement (walk) in a coordinated way.
 * 
 * Features:
 * - Mouse look with orbit controls
 * - WASD movement relative to view direction
 * - Q/E for camera rotation
 * - Space/Shift for vertical movement
 * - Adjustable movement speed
 * - Smooth acceleration and deceleration
 */
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Controls Component
 * 
 * @param {Object} props - Component properties
 * @param {boolean} props.enableOrbit - Enable/disable orbit controls
 * @param {boolean} props.enableMovement - Enable/disable keyboard movement
 * @param {number} props.movementSpeed - Base speed for movement (default: 3)
 * @param {Array} props.target - Initial target position for orbit controls
 */
const Controls = ({ 
  enableOrbit = true, 
  enableMovement = true, 
  movementSpeed = 3,
  target = [0, 1.5, -1]
}) => {
  const orbitRef = useRef();
  const { camera } = useThree();
  
  // Create persistent vectors to avoid garbage collection
  const persistentVectors = useMemo(() => ({
    direction: new THREE.Vector3(),
    velocity: new THREE.Vector3(),
    moveVector: new THREE.Vector3(),
    forward: new THREE.Vector3(),
    right: new THREE.Vector3(),
    targetVec: new THREE.Vector3(),
    targetRelative: new THREE.Vector3()
  }), []);
  
  // Use refs to avoid re-renders
  const keysRef = useRef({
    forward: false,   // W
    backward: false,  // S
    left: false,      // A
    right: false,     // D
    up: false,        // Space
    down: false,      // Shift
    turnLeft: false,  // Q
    turnRight: false, // E
    sprint: false     // Alt
  });
  
  const rotationVelocity = useRef(0);
  const lastFrameTime = useRef(performance.now());
  
  // Setup event listeners for keyboard controls
  useEffect(() => {
    if (!enableMovement) return;
    
    const handleKeyDown = (e) => {
      // Only handle keys if not typing in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      switch (e.code) {
        case 'KeyW':
          keysRef.current.forward = true;
          break;
        case 'KeyS':
          keysRef.current.backward = true;
          break;
        case 'KeyA':
          keysRef.current.left = true;
          break;
        case 'KeyD':
          keysRef.current.right = true;
          break;
        case 'KeyQ':
          keysRef.current.turnLeft = true;
          break;
        case 'KeyE':
          keysRef.current.turnRight = true;
          break;
        case 'Space':
          keysRef.current.up = true;
          e.preventDefault(); // Prevent page scroll
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          keysRef.current.down = true;
          break;
        case 'AltLeft':
        case 'AltRight':
          keysRef.current.sprint = true;
          e.preventDefault(); // Prevent browser actions
          break;
        default:
          break;
      }
    };
    
    const handleKeyUp = (e) => {
      // Only handle keys if not typing in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      switch (e.code) {
        case 'KeyW':
          keysRef.current.forward = false;
          break;
        case 'KeyS':
          keysRef.current.backward = false;
          break;
        case 'KeyA':
          keysRef.current.left = false;
          break;
        case 'KeyD':
          keysRef.current.right = false;
          break;
        case 'KeyQ':
          keysRef.current.turnLeft = false;
          break;
        case 'KeyE':
          keysRef.current.turnRight = false;
          break;
        case 'Space':
          keysRef.current.up = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          keysRef.current.down = false;
          break;
        case 'AltLeft':
        case 'AltRight':
          keysRef.current.sprint = false;
          break;
        default:
          break;
      }
    };
    
    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Clean up event listeners when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [enableMovement]);
  
  // Handle movement and rotation each frame
  useFrame(() => {
    if (!enableMovement || !orbitRef.current) return;
    
    // Calculate delta time to smooth out frame rate variations
    const now = performance.now();
    const deltaTime = Math.min(0.05, (now - lastFrameTime.current) / 1000); // Cap at 50ms to avoid huge jumps
    lastFrameTime.current = now;
    
    const keys = keysRef.current;
    const { 
      direction, velocity, moveVector, forward, right, targetVec, targetRelative 
    } = persistentVectors;
    
    // Calculate movement speed
    const currentSpeed = keys.sprint ? movementSpeed * 2 : movementSpeed;
    
    // Reset direction vector
    direction.set(0, 0, 0);
    
    // Set direction based on keys pressed
    if (keys.forward) direction.z = -1;
    if (keys.backward) direction.z = 1;
    if (keys.left) direction.x = -1;
    if (keys.right) direction.x = 1;
    if (keys.up) direction.y = 1;
    if (keys.down) direction.y = -1;
    
    // Normalize direction if moving in multiple directions
    if (direction.lengthSq() > 0) {
      direction.normalize();
    }
    
    // Calculate rotation velocity for Q/E keys
    let targetRotationVelocity = 0;
    if (keys.turnLeft) targetRotationVelocity = 1;
    if (keys.turnRight) targetRotationVelocity = -1;
    rotationVelocity.current = THREE.MathUtils.lerp(
      rotationVelocity.current, 
      targetRotationVelocity * 1.5, 
      0.05  // Reduced lerp factor for smoother acceleration
    );
    
    // Apply rotation if Q or E are pressed
    if (Math.abs(rotationVelocity.current) > 0.01) {
      const rotationAmount = rotationVelocity.current * deltaTime;
      
      // Get the relative vector from camera to target
      targetVec.copy(orbitRef.current.target);
      targetRelative.subVectors(targetVec, camera.position);
      
      // Create rotation matrix around Y axis
      targetRelative.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotationAmount);
      
      // Calculate new target position
      targetVec.copy(camera.position).add(targetRelative);
      
      // Update orbit controls target - do it smoothly
      orbitRef.current.target.lerp(targetVec, 0.1);
      
      // Only update orbit controls once per frame
      if (!orbitRef.current.autoRotate) {
        orbitRef.current.update();
      }
    }
    
    // Calculate movement velocity with smooth acceleration/deceleration
    // Use smaller lerp factor for smoother movement
    velocity.x = THREE.MathUtils.lerp(velocity.x, direction.x * currentSpeed, 0.05);
    velocity.y = THREE.MathUtils.lerp(velocity.y, direction.y * currentSpeed, 0.05);
    velocity.z = THREE.MathUtils.lerp(velocity.z, direction.z * currentSpeed, 0.05);
    
    // Apply velocity to position if significant
    if (Math.abs(velocity.x) > 0.001 || Math.abs(velocity.y) > 0.001 || Math.abs(velocity.z) > 0.001) {
      // Reset movement vector
      moveVector.set(0, 0, 0);
      
      // Handle horizontal movement (X/Z plane)
      if (Math.abs(velocity.x) > 0.001 || Math.abs(velocity.z) > 0.001) {
        // Get camera's forward and right vectors, but lock Y to 0 for level movement
        forward.set(0, 0, -1).applyQuaternion(camera.quaternion);
        forward.y = 0;
        forward.normalize();
        
        right.set(1, 0, 0).applyQuaternion(camera.quaternion);
        right.y = 0;
        right.normalize();
        
        // Calculate movement vector using camera's orientation
        if (Math.abs(velocity.z) > 0.001) {
          moveVector.addScaledVector(forward, -velocity.z * deltaTime);
        }
        if (Math.abs(velocity.x) > 0.001) {
          moveVector.addScaledVector(right, velocity.x * deltaTime);
        }
      }
      
      // Handle vertical movement (Y axis)
      if (Math.abs(velocity.y) > 0.001) {
        moveVector.y += velocity.y * deltaTime;
      }
      
      // Apply movement to camera
      camera.position.add(moveVector);
      
      // Smoothly update the orbit controls target
      orbitRef.current.target.add(moveVector);
      
      // Ensure orbit controls updates its internal state
      if (!orbitRef.current.autoRotate) {
        orbitRef.current.update();
      }
    }
  });
  
  // Set initial position of the target
  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.target.set(...target);
      orbitRef.current.update();
    }
  }, [target]);
  
  return (
    <>
      {enableOrbit && (
        <OrbitControls
          ref={orbitRef}
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          rotateSpeed={0.5}
          zoomSpeed={0.8}
          minDistance={0.5}
          maxDistance={20}
          enableDamping={true}  // Add damping for smoother camera movement
          dampingFactor={0.1}   // Control the damping amount
          autoRotate={false}    // Disable auto-rotation
        />
      )}
    </>
  );
};

export default Controls; 