/**
 * Main Application Component
 * 
 * Root component that establishes the WebXR environment and coordinates
 * both 2D and 3D interface elements. Serves as the application's entry point
 * and manages the overall rendering hierarchy and performance.
 * 
 * Architecture:
 * - 3D Content: Rendered within the React Three Fiber Canvas
 * - 2D Overlays: Rendered as fixed position elements outside the Canvas
 * - Debug Tools: Conditionally rendered based on environment
 * 
 * Performance optimizations:
 * - Dynamic code splitting with React.lazy
 * - Adaptive rendering quality based on device performance
 * - Conditional rendering for development tools
 * - Performance monitoring with automatic quality adjustment
 * - VR-specific optimizations for headset rendering
 */
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import { VRButton, XR, Controllers, Hands } from "@react-three/xr";
import { 
  Stars, 
  AdaptiveDpr, 
  AdaptiveEvents, 
  PerformanceMonitor, 
  Stats 
} from "@react-three/drei";
import Controls from "./components/Controls";
import Earth from './components/Earth';
import "./App.css";
import ErrorBoundary from './ErrorBoundary';

// Lazy load components that aren't needed immediately
const Interface = lazy(() => import("./components/Interface"));
const BottomToolbarHUD = lazy(() => import('./components/BottomToolbarHUD'));
const DebugPanel = lazy(() => import("./components/DebugPanel"));

// Default Fallbacks
const DefaultFallback = () => null; // Empty fallback for non-visual components
const LoadingMessage = () => (
  <div style={{ 
    position: 'fixed', 
    top: '50%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)',
    color: 'white',
    background: 'rgba(0,0,0,0.7)',
    padding: '20px',
    borderRadius: '10px'
  }}>
    Loading...
  </div>
);

/**
 * App Component
 * 
 * Coordinates the application's rendering hierarchy, state management,
 * and performance optimization.
 * 
 * @returns {JSX.Element} The complete application structure
 */
export default function App() {
  /**
   * Debug settings for development and testing
   * Controls visual elements and interaction capabilities
   */
  const [debugSettings, setDebugSettings] = useState({
    showGrid: true,
    panelScale: 1.0,
    orbitControlsEnabled: true,
    showParticles: true,
    movementEnabled: true
  });
  
  // Performance and quality management
  const [adaptiveQuality, setAdaptiveQuality] = useState(true);
  const [isInVR, setIsInVR] = useState(false);
  const [frameRate, setFrameRate] = useState(60);
  
  // Determine runtime environment for conditional rendering of development tools
  const isDev = process.env.NODE_ENV === 'development';

  /**
   * Updates debug settings with values from the DebugPanel
   * 
   * @param {Object} newSettings - The updated debug settings object
   */
  const handleSettingsChange = (newSettings) => {
    setDebugSettings(newSettings);
  };
  
  /**
   * Monitor VR session status to optimize rendering for headset
   */
  useEffect(() => {
    // Function to handle XR session changes
    const xrSessionChanged = (event) => {
      const isStarting = event.type === 'sessionstart';
      setIsInVR(isStarting);
      
      // Set higher quality for desktop, more optimized for VR
      if (isStarting) {
        setAdaptiveQuality(true); // Always use adaptive quality in VR
        // Update settings for optimal VR performance
        setDebugSettings(current => ({
          ...current,
          showParticles: false, // Disable particles in VR for better performance
          showGrid: false // Hide grid in VR
        }));
      }
    };
    
    // Listen for XR session events
    document.addEventListener('sessionstart', xrSessionChanged);
    document.addEventListener('sessionend', xrSessionChanged);
    
    return () => {
      document.removeEventListener('sessionstart', xrSessionChanged);
      document.removeEventListener('sessionend', xrSessionChanged);
    };
  }, []);
  
  /**
   * Handles performance changes from the PerformanceMonitor
   * 
   * @param {number} fps - Current frames per second
   */
  const handlePerformanceChange = (fps) => {
    setFrameRate(fps);
    
    // Additional performance tuning could be added here
    // For example, reducing particle count when FPS drops
  };

  return (
    <ErrorBoundary>
      {/* Debug controls - Only visible during development */}
      {isDev && (
        <Suspense fallback={<DefaultFallback />}>
          <DebugPanel 
            onSettingsChange={handleSettingsChange}
            currentFPS={frameRate}
            adaptiveQuality={adaptiveQuality}
            onToggleAdaptiveQuality={() => setAdaptiveQuality(!adaptiveQuality)}
          />
        </Suspense>
      )}
      
      {/* WebXR entry point */}
      <VRButton />
      
      {/* 3D Environment */}
      <Canvas 
        camera={{ position: [0, 1.6, 4] }}
        // Enable preserve drawing buffer for screenshots and better XR compatibility
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        // Create a more detailed shadow map and optimize for XR
        shadows={{ type: 'PCFSoftShadowMap', enabled: true }}
      >
        {/* Performance monitoring and optimization */}
        {isDev && <Stats />}
        <AdaptiveDpr pixelated enabled={adaptiveQuality} />
        <AdaptiveEvents enabled={adaptiveQuality} />
        <PerformanceMonitor 
          onIncline={() => {
            // Prevent redundant updates
            if (!adaptiveQuality) {
              setAdaptiveQuality(false);
              handlePerformanceChange(60);
            }
          }}
          onDecline={(currentFPS) => {
            // Prevent redundant updates
            if (adaptiveQuality === false) {
              setAdaptiveQuality(true);
              handlePerformanceChange(currentFPS);
            }
          }}
          debounce={1000} // Increase debounce time
          iterations={5}   // Require more iterations before triggering
        />
        
        {/* Navigation controls */}
        <Controls 
          enableOrbit={debugSettings.orbitControlsEnabled}
          enableMovement={debugSettings.movementEnabled}
          movementSpeed={3}
          target={[0, 1.5, 0]}
        />
        
        {/* WebXR context */}
        <XR 
          referenceSpace="local-floor"
          frameRate={90} // Target high refresh rate for VR headsets
        >
          <Controllers />
          <Hands 
            modelLeft="https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/hand-left.glb"
            modelRight="https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/hand-right.glb"
          />
          
          {/* Scene environment */}
          <color attach="background" args={['#000']} />
          <fog attach="fog" args={['#000', 15, 30]} />
          
          {/* Stars with performance consideration */}
          <Stars 
            radius={100}
            depth={50}
            count={isInVR ? 3000 : 5000} // Reduce stars count in VR
            factor={4}
            saturation={0.5}
            fade
          />
          
          {/* Decorative elements */}
          <Suspense fallback={<DefaultFallback />}>
            <Earth position={[0, 5, -15]} scale={5} rotate={true} />
          </Suspense>
          
          {/* Scene lighting - optimized for performance */}
          <ambientLight intensity={0.2} />
          <directionalLight 
            position={[0, 5, 5]} 
            intensity={0.5}
            castShadow={!isInVR} // Disable shadow casting in VR
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          
          {/* 3D interface elements */}
          <Suspense fallback={<DefaultFallback />}>
            <Interface 
              debugSettings={{
                ...debugSettings,
                // Scale based on VR mode - smaller interface in VR for better performance
                panelScale: isInVR ? 0.9 * debugSettings.panelScale : debugSettings.panelScale
              }} 
            />
          </Suspense>
        </XR>
      </Canvas>
      
      {/* 2D fixed position interface elements */}
      <Suspense fallback={<LoadingMessage />}>
        <BottomToolbarHUD />
      </Suspense>
    </ErrorBoundary>
  );
}
