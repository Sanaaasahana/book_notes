const Category = require('../models/category');

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ userId: req.user.id, name });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAllByUser(req.user.id);
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    await Category.delete(req.user.id, req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};