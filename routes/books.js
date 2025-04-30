const express = require('express');
const router = express.Router();
const bookController = require('../controllers/books');

router.post('/', bookController.createBook);
router.get('/', bookController.getBooks);
router.get('/category/:categoryId', bookController.getBooksByCategory);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;