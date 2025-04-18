const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config/config');
const mongoose = require('mongoose'); // You'll need to install this

// Import routes (we'll create these next)
const testRoutes = require('./routes/test.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Connect to MongoDB (if running locally, make sure MongoDB is installed and running)
if (config.mongoURI) {
  mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));
}

// Use routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'XR Interface API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Server error', 
    message: config.nodeEnv === 'development' ? err.message : 'An unexpected error occurred'
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
