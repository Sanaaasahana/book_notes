const db = require('../config/db');

class Book {
  static async create({ userId, categoryId, title, author, status = 'to-read', rating }) {
    const { rows } = await db.query(
      'INSERT INTO books (user_id, category_id, title, author, status, rating) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, categoryId, title, author, status, rating]
    );
    return rows[0];
  }

  static async findAllByUser(userId) {
    const { rows } = await db.query(
      `SELECT b.*, c.name as category_name 
       FROM books b 
       LEFT JOIN categories c ON b.category_id = c.id 
       WHERE b.user_id = $1 
       ORDER BY b.title`,
      [userId]
    );
    return rows;
  }

  static async findByCategory(userId, categoryId) {
    const { rows } = await db.query(
      `SELECT b.*, c.name as category_name 
       FROM books b 
       LEFT JOIN categories c ON b.category_id = c.id 
       WHERE b.user_id = $1 AND b.category_id = $2 
       ORDER BY b.title`,
      [userId, categoryId]
    );
    return rows;
  }

  static async update(bookId, userId, updates) {
    const { categoryId, title, author, status, rating } = updates;
    const { rows } = await db.query(
      `UPDATE books 
       SET category_id = $1, title = $2, author = $3, status = $4, rating = $5 
       WHERE id = $6 AND user_id = $7 
       RETURNING *`,
      [categoryId, title, author, status, rating, bookId, userId]
    );
    return rows[0];
  }

  static async delete(bookId, userId) {
    await db.query(
      'DELETE FROM books WHERE id = $1 AND user_id = $2',
      [bookId, userId]
    );
  }
}

module.exports = Book;