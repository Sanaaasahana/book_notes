const Note = require('../models/note');

exports.createNote = async (req, res, next) => {
  try {
    const { bookId, content } = req.body;
    const note = await Note.create({
      userId: req.user.id,
      bookId,
      content
    });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

exports.getNotesForBook = async (req, res, next) => {
  try {
    const notes = await Note.findByBook(req.user.id, req.params.bookId);
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

exports.updateNote = async (req, res, next) => {
  try {
    const { content } = req.body;
    const note = await Note.update(req.params.id, req.user.id, content);
    res.json(note);
  } catch (err) {
    next(err);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    await Note.delete(req.params.id, req.user.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};