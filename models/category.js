const db = require('../config/db');

class Category {
  static async create({ userId, name }) {
    const { rows } = await db.query(
      'INSERT INTO categories (user_id, name) VALUES ($1, $2) RETURNING *',
      [userId, name]
    );
    return rows[0];
  }

  static async findAllByUser(userId) {
    const { rows } = await db.query(
      'SELECT * FROM categories WHERE user_id = $1 ORDER BY name',
      [userId]
    );
    return rows;
  }

  static async delete(userId, categoryId) {
    await db.query(
      'DELETE FROM categories WHERE id = $1 AND user_id = $2',
      [categoryId, userId]
    );
  }
}

module.exports = Category;