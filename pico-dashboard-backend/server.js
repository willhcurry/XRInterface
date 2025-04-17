const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Test route
app.get('/api/v1/test', (req, res) => {
  res.json({ 
    message: 'XR Interface API is running',
    apps: [
      { 
        id: 'beat-saber', 
        name: 'Beat Saber', 
        color: { from: '#E91E63', to: '#9C27B0' }, 
        category: 'Music & Rhythm',
        icon: '🎵',
        users: '5.2M+',
        rating: 4.8
      },
      { 
        id: 'blade-fury', 
        name: 'Blade & Fury', 
        color: { from: '#3F51B5', to: '#2196F3' }, 
        category: 'Action',
        icon: '⚔️',
        users: '2.8M+',
        rating: 4.5
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
