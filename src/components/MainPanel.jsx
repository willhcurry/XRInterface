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

// Application data constants with more detailed information and app icons
const FEATURED_APPS = [
  { 
    id: 'beat-saber', 
    name: 'Beat Saber', 
    color: 'linear-gradient(135deg, #E91E63, #9C27B0)', 
    category: 'Music & Rhythm',
    icon: '🎵',
    users: '5.2M+',
    rating: 4.8
  },
  { 
    id: 'blade-fury', 
    name: 'Blade & Fury', 
    color: 'linear-gradient(135deg, #3F51B5, #2196F3)', 
    category: 'Action',
    icon: '⚔️',
    users: '2.8M+',
    rating: 4.5
  },
  { 
    id: 'job-simulator', 
    name: 'Job Simulator', 
    color: 'linear-gradient(135deg, #4CAF50, #8BC34A)', 
    category: 'Simulation',
    icon: '🧑‍💼',
    users: '3.4M+',
    rating: 4.7
  }
];

const PERSONAL_APPS = [
  { 
    id: 'virtual-desktop', 
    name: 'Virtual Desktop', 
    color: 'linear-gradient(135deg, #2196F3, #03A9F4)',
    icon: '🖥️',
    lastUsed: '2 days ago'
  },
  { 
    id: 'eleven-table', 
    name: 'Eleven Table Tennis', 
    color: 'linear-gradient(135deg, #FF9800, #FF5722)',
    icon: '🏓',
    lastUsed: 'Yesterday'
  },
  { 
    id: 'superhot', 
    name: 'SuperHOT VR', 
    color: 'linear-gradient(135deg, #F44336, #E91E63)',
    icon: '🔥',
    lastUsed: '3 days ago'
  },
  { 
    id: 'all-in-one', 
    name: 'All-in-One Sports VR', 
    color: 'linear-gradient(135deg, #009688, #4CAF50)',
    icon: '🏀',
    lastUsed: 'Just now'
  }
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
      background: app.color
    }}>
      {/* Top section with app icon */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '40px',
        height: '40px',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px'
      }}>
        {app.icon}
      </div>
      
      {/* Bottom info section */}
      <div style={{
        position: 'absolute',
        bottom: '0', left: '0', right: '0',
        padding: '10px',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))'
      }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{app.name}</div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginTop: '5px'
        }}>
          <div style={{ fontSize: '14px', opacity: '0.8' }}>{app.category}</div>
          <div style={{ fontSize: '14px', opacity: '0.8' }}>
            {'⭐'.repeat(Math.floor(app.rating))} {app.rating}
          </div>
        </div>
        <div style={{ fontSize: '12px', opacity: '0.6', marginTop: '2px' }}>
          {app.users} players
        </div>
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
      background: app.color
    }}>
      {/* App icon */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        width: '32px',
        height: '32px',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '6px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '18px'
      }}>
        {app.icon}
      </div>
      
      {/* App info */}
      <div style={{
        position: 'absolute',
        bottom: '0', left: '0', right: '0',
        padding: '8px',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))'
      }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{app.name}</div>
        <div style={{ fontSize: '12px', opacity: '0.7', marginTop: '2px' }}>
          {app.lastUsed}
        </div>
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
