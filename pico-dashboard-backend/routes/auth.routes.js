const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// POST /api/v1/auth/register - Register a new user
router.post('/register', authController.register);

// POST /api/v1/auth/login - Login user
router.post('/login', authController.login);

// GET /api/v1/auth/me - Get current user (protected route)
router.get('/me', authMiddleware, authController.getCurrentUser);

module.exports = router;
