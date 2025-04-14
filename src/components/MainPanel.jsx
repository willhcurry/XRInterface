/**
 * Main Panel Component
 * 
 * Creates the primary curved interface panel displaying featured content
 * and personalized recommendations. Provides the central hub for application
 * discovery and content browsing.
 * 
 * Features:
 * - Curved panel matching the Pico VR home interface aesthetic
 * - "Explore" section with featured applications
 * - "For You" section with personalized recommendations
 * - Interactive cards with visual metadata
 * - Optimized HTML integration within the 3D space
 */
import React, { useMemo } from 'react';
import { Box } from '@react-three/drei';
import { Html } from '@react-three/drei';

// Application data constants - extracted to avoid inline definition on each render
const FEATURED_APPS = [
  { id: 'beat-saber', name: 'Beat Saber', color: '#E91E63', category: 'Music & Rhythm' },
  { id: 'blade-fury', name: 'Blade & Fury', color: '#3F51B5', category: 'Action' },
  { id: 'job-simulator', name: 'Job Simulator', color: '#4CAF50', category: 'Simulation' }
];

const PERSONAL_APPS = [
  { id: 'virtual-desktop', name: 'Virtual Desktop', color: '#2196F3' },
  { id: 'eleven-table', name: 'Eleven Table Tennis', color: '#FF9800' },
  { id: 'superhot', name: 'SuperHOT VR', color: '#F44336' },
  { id: 'all-in-one', name: 'All-in-One Sports VR', color: '#009688' }
];

// Common styles - extracted to avoid duplication
const STYLES = {
  container: {
    width: '100%',
    height: '100%',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    userSelect: 'none',
    padding: '20px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  sectionTitle: {
    margin: '0 0 15px 0',
    fontSize: '24px',
    fontWeight: 'bold'
  },
  cardsContainer: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center'
  }
};

/**
 * Main Panel Component
 * 
 * Creates the primary curved interface panel with featured content and
 * personalized recommendations.
 * 
 * @returns {JSX.Element} The rendered main panel in 3D space
 */
const MainPanel = () => {
  /**
   * Generates a featured application card
   * 
   * @param {Object} app - The application data
   * @returns {JSX.Element} The rendered card element
   */
  const FeaturedAppCard = ({ app }) => (
    <div key={app.id} style={{
      position: 'relative',
      width: '280px',
      height: '150px',
      borderRadius: '10px',
      overflow: 'hidden',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      backgroundColor: app.color
    }}>
      <div style={{
        position: 'absolute',
        bottom: '0', left: '0', right: '0',
        padding: '10px',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))'
      }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{app.name}</div>
        <div style={{ fontSize: '14px', opacity: '0.8' }}>{app.category}</div>
      </div>
    </div>
  );

  /**
   * Generates a personalized recommendation card
   * 
   * @param {Object} app - The application data
   * @returns {JSX.Element} The rendered card element
   */
  const PersonalAppCard = ({ app }) => (
    <div key={app.id} style={{
      position: 'relative',
      width: '200px',
      height: '120px',
      borderRadius: '10px',
      overflow: 'hidden',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      backgroundColor: app.color
    }}>
      <div style={{
        position: 'absolute',
        bottom: '0', left: '0', right: '0',
        padding: '8px',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))'
      }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{app.name}</div>
      </div>
    </div>
  );
  
  // Memoize the HTML content to prevent unnecessary re-renders
  const panelContent = useMemo(() => (
    <div style={STYLES.container}>
      {/* Explore Section */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={STYLES.sectionTitle}>Explore</h2>
        <div style={STYLES.cardsContainer}>
          {FEATURED_APPS.map(app => <FeaturedAppCard key={app.id} app={app} />)}
        </div>
      </div>
      
      {/* For You Section */}
      <div>
        <h2 style={STYLES.sectionTitle}>For You</h2>
        <div style={STYLES.cardsContainer}>
          {PERSONAL_APPS.map(app => <PersonalAppCard key={app.id} app={app} />)}
        </div>
      </div>
    </div>
  ), []); // Empty dependency array since content is static
  
  return (
    <group position={[0, 1.3, -4]}>
      {/* Main curved background panel */}
      <Box 
        args={[6, 2.5, 0.05]} 
        radius={0.2} 
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial 
          color="#202020"
          transparent 
          opacity={0.9}
          roughness={0.2}
          metalness={0.7}
          envMapIntensity={0.8}
        />
      </Box>
      
      {/* Panel content */}
      <Html
        center
        distanceFactor={10}
        position={[0, 0, 0.05]}
        transform
        style={{ width: '900px', height: '450px' }}
      >
        {panelContent}
      </Html>
    </group>
  );
};

export default MainPanel;
