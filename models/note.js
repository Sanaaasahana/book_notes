const db = require('../config/db');

class Note {
  static async create({ userId, bookId, content }) {
    const { rows } = await db.query(
      'INSERT INTO notes (user_id, book_id, content) VALUES ($1, $2, $3) RETURNING *',
      [userId, bookId, content]
    );
    return rows[0];
  }

  static async findByBook(userId, bookId) {
    const { rows } = await db.query(
      'SELECT * FROM notes WHERE user_id = $1 AND book_id = $2 ORDER BY created_at DESC',
      [userId, bookId]
    );
    return rows;
  }

  static async update(noteId, userId, content) {
    const { rows } = await db.query(
      `UPDATE notes 
       SET content = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 AND user_id = $3 
       RETURNING *`,
      [content, noteId, userId]
    );
    return rows[0];
  }

  static async delete(noteId, userId) {
    await db.query(
      'DELETE FROM notes WHERE id = $1 AND user_id = $2',
      [noteId, userId]
    );
  }
}

module.exports = Note;