
import Category from "../modal/categoryModal.js";
import { Sequelize } from "sequelize";
import { validations } from "../utils/utility.js";

export const createCategory = async (req, res) => {
  await validations(req)
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    if (error instanceof Sequelize.UniqueConstraintError)
      return res.status(400).json({ message: "The provided name is already in use." });
    res.status(500).json({ error: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.query.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  await validations(req)
  try {
    const category = await Category.findByPk(req.body.id);
    if (category) {
      const { name } = req.body;
      await category.update({ name });
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.query.id);
    console.log(req.query.id)
    if (category) {
      await category.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
