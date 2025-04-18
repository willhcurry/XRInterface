const express = require('express');
const router = express.Router();

// Test data - we'll move this to a controller and database later
const apps = [
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
  },
  { 
    id: 'job-simulator', 
    name: 'Job Simulator', 
    color: { from: '#4CAF50', to: '#8BC34A' }, 
    category: 'Simulation',
    icon: '🧑‍💼',
    users: '3.4M+',
    rating: 4.7
  }
];

// GET - Get all test apps
router.get('/', (req, res) => {
  res.json({
    message: 'XR Interface API is running',
    apps
  });
});

// GET - Get a specific app by id
router.get('/:id', (req, res) => {
  const app = apps.find(a => a.id === req.params.id);
  
  if (!app) {
    return res.status(404).json({ message: 'App not found' });
  }
  
  res.json(app);
});

module.exports = router;
