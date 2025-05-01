const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.delete('/:id', categoryController.deleteCategory);

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ 
      error: 'Failed to fetch categories',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router;
