const Book = require('../models/book');

exports.createBook = async (req, res, next) => {
  try {
    const { categoryId, title, author, status, rating } = req.body;
    const book = await Book.create({
      userId: req.user.id,
      categoryId,
      title,
      author,
      status,
      rating
    });
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.findAllByUser(req.user.id);
    res.json(books);
  } catch (err) {
    next(err);
  }
};

exports.getBooksByCategory = async (req, res, next) => {
  try {
    const books = await Book.findByCategory(req.user.id, req.params.categoryId);
    res.json(books);
  } catch (err) {
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.update(req.params.id, req.user.id, req.body);
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    await Book.delete(req.params.id, req.user.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
