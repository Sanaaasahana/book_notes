require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const bookRoutes = require('./routes/books');
const noteRoutes = require('./routes/notes');
const { authenticateJWT } = require('./middleware/auth');

const app = express();

// CORS Configuration
const allowedOrigins = [
  'https://sahanabooknote.netlify.app/', // Your Netlify frontend URL
  'http://localhost:3000',                 // For local development
  // Add other domains if needed (e.g., staging URLs)
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Enable if using cookies/sessions
}));

// Handle preflight requests
app.options('*', cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', authenticateJWT, categoryRoutes);
app.use('/api/books', authenticateJWT, bookRoutes);
app.use('/api/notes', authenticateJWT, noteRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
});

module.exports = app;
