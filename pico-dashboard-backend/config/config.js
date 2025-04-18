require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/xr-interface',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-for-development',
  jwtExpiration: process.env.JWT_EXPIRATION || '1h',
  nodeEnv: process.env.NODE_ENV || 'development'
};
