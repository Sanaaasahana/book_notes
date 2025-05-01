const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { authenticateJWT } = require('../middleware/auth');

// Register route
router.post('/register', (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || username.length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters' });
  }
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Please enter a valid email' });
  }
  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  authController.register(req, res, next);
});

// Login route
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Please enter a valid email' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  authController.login(req, res, next);
});

// Protected route
router.get('/me', authenticateJWT, authController.getCurrentUser);

module.exports = router;
