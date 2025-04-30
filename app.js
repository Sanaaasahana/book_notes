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

// Middleware
app.use(cors());
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
});

module.exports = app;