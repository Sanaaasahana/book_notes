const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { authenticateJWT } = require('../middleware/auth');

// Basic input validation middleware
const validateInput = (req, res, next) => {
  // Register validation
  if (req.path === '/register') {
    const { username, email, password } = req.body;
    if (!username || username.length < 3 || username.length > 30) {
      return res.status(400).json({ error: 'Username must be 3-30 characters' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Please enter a valid email' });
    }
    if (!password || password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
  }

  // Login validation
  if (req.path === '/login') {
    const { email, password } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Please enter a valid email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
  }

  next();
};

// Routes
router.post('/register', validateInput, authController.register);
router.post('/login', validateInput, authController.login);
router.get('/me', authenticateJWT, authController.getCurrentUser);

// Password reset routes (optional)
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;
