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
import React, { useState } from 'react';
import { Box } from '@react-three/drei';
import { Html } from '@react-three/drei';
import { Interactive } from '@react-three/xr';

// Mock friends data
const FRIENDS = [
  { id: 1, name: 'Alex Chen', status: 'Online', avatar: '👨‍💻', lastActive: 'Now' },
  { id: 2, name: 'Sarah Kim', status: 'In Beat Saber', avatar: '👩‍🎤', lastActive: '15m' },
  { id: 3, name: 'Marcus Lee', status: 'Offline', avatar: '🧑‍🚀', lastActive: '2h' },
  { id: 4, name: 'Olivia Wang', status: 'Online', avatar: '👩‍🎨', lastActive: '5m' }
];

const FriendsPanel = () => {
  const [activeTab, setActiveTab] = useState('friends');
  
  // Friend list item component
  const FriendItem = ({ friend }) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      borderRadius: '8px',
      background: 'rgba(255,255,255,0.1)',
      marginBottom: '8px',
      cursor: 'pointer',
      transition: 'background 0.2s ease'
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
    >
      {/* Avatar */}
      <div style={{
        width: '36px',
        height: '36px',
        backgroundColor: '#4285F4',
        borderRadius: '50%',
        marginRight: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '18px',
        position: 'relative'
      }}>
        {friend.avatar}
        
        {/* Status indicator */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          right: '0',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: friend.status === 'Online' ? '#4CAF50' : 
                          friend.status.includes('In') ? '#FFC107' : '#9E9E9E',
          border: '2px solid #202020'
        }} />
      </div>
      
      {/* Friend info */}
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{friend.name}</div>
        <div style={{ fontSize: '12px', opacity: '0.7' }}>{friend.status}</div>
      </div>
      
      {/* Last active */}
      <div style={{ fontSize: '12px', opacity: '0.5' }}>
        {friend.lastActive}
      </div>
    </div>
  );
  
  // Tab button component
  const TabButton = ({ label, id }) => (
    <button
      style={{
        flex: 1,
        padding: '8px',
        background: activeTab === id ? 'rgba(66, 133, 244, 0.3)' : 'transparent',
        border: 'none',
        borderRadius: '6px',
        color: 'white',
        fontSize: '14px',
        fontWeight: activeTab === id ? 'bold' : 'normal',
        cursor: 'pointer',
        transition: 'background 0.2s ease'
      }}
      onClick={() => setActiveTab(id)}
    >
      {label}
    </button>
  );
  
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
              Social
            </h2>
          </div>
          
          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '15px'
          }}>
            <TabButton label="Friends" id="friends" />
            <TabButton label="Requests" id="requests" />
            <TabButton label="Discover" id="discover" />
          </div>
          
          {/* Friends list - only shown when friends tab is active */}
          {activeTab === 'friends' && (
            <>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px',
                fontSize: '14px'
              }}>
                <span>Online Friends</span>
                <span style={{ opacity: '0.7' }}>2/4</span>
              </div>
              
              <div style={{ overflowY: 'auto', flex: 1 }}>
                {FRIENDS.map(friend => (
                  <FriendItem key={friend.id} friend={friend} />
                ))}
              </div>
            </>
          )}
          
          {/* Discover tab content */}
          {activeTab === 'discover' && (
            <div style={{ 
              flex: '1', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <div style={{ 
                width: '150px', 
                height: '150px', 
                backgroundImage: 'linear-gradient(135deg, #4285F4, #34A853)',
                borderRadius: '75px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '60px'
              }}>
                🌎
              </div>
              
              <h3 style={{ 
                margin: '0 0 10px 0', 
                fontSize: '20px', 
                fontWeight: 'bold'
              }}>
                Explore VR Together
              </h3>
              
              <p style={{ 
                margin: '0 0 20px 0', 
                fontSize: '16px',
                opacity: '0.9',
                lineHeight: '1.4' 
              }}>
                Find new friends with similar interests
              </p>
              
              <button style={{
                background: 'linear-gradient(to right, #4285F4, #34A853)',
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
                Open Communities
              </button>
            </div>
          )}
          
          {/* Requests tab content */}
          {activeTab === 'requests' && (
            <div style={{ 
              flex: '1', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              opacity: '0.7'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>📬</div>
              <p>No friend requests at the moment</p>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

export default FriendsPanel;
