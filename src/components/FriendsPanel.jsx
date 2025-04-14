/**
 * Friends Panel Component
 * 
 * Creates a vertical panel similar to the Friends section in the Pico VR home interface.
 * 
 * Features:
 * - Displays friends section with avatar profiles
 * - Provides UI for exploring VR world and meeting friends
 * - Includes action buttons for social features
 */
import React from 'react';
import { Box } from '@react-three/drei';
import { Html } from '@react-three/drei';
import { Interactive } from '@react-three/xr';

const FriendsPanel = () => {
  return (
    <group position={[2.5, 1.3, -2.5]} rotation={[0, -0.3, 0]}>
      {/* Main panel background */}
      <Box 
        args={[1.6, 2.5, 0.05]} 
        radius={0.12} 
        smoothness={4}
      >
        <meshStandardMaterial 
          color="#202020"
          transparent 
          opacity={0.9}
          roughness={0.2}
          metalness={0.7}
        />
      </Box>
      
      {/* Panel content */}
      <Html
        center
        distanceFactor={7}
        position={[0, 0, 0.05]}
        transform
      >
        <div style={{ 
          width: '280px',
          height: '500px',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          userSelect: 'none',
          display: 'flex',
          flexDirection: 'column',
          padding: '15px'
        }}>
          {/* Header */}
          <div style={{ 
            textAlign: 'center', 
            margin: '10px 0 20px 0',
            borderBottom: '1px solid rgba(255,255,255,0.2)',
            paddingBottom: '10px'
          }}>
            <h2 style={{ margin: '0', fontSize: '22px', fontWeight: 'bold' }}>
              Friends
            </h2>
          </div>
          
          {/* Main content area */}
          <div style={{ 
            flex: '1', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            {/* Placeholder icon instead of image */}
            <div style={{ 
              width: '150px', 
              height: '150px', 
              backgroundColor: '#4285F4',
              borderRadius: '10px',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '50px'
            }}>
              👥
            </div>
            
            <h3 style={{ 
              margin: '0 0 10px 0', 
              fontSize: '20px', 
              fontWeight: 'bold'
            }}>
              Explore VR World
            </h3>
            
            <p style={{ 
              margin: '0 0 20px 0', 
              fontSize: '16px',
              opacity: '0.9',
              lineHeight: '1.4' 
            }}>
              Meet New Friends
            </p>
            
            <button style={{
              background: '#4285F4',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              width: '180px'
            }}>
              Open Pico Friends
            </button>
          </div>
        </div>
      </Html>
    </group>
  );
};

export default FriendsPanel;
