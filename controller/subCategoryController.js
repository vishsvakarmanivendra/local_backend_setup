
import Sequelize from "sequelize";
import Subcategory from "../modal/subCategoryModal.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { validations } from "../utils/utility.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '..', 'public', 'subcategories');

export const createSubcategory = async (req, res) => {
  await validations(req)
  let file = await (req.file) ? req.file.filename : null;
  if (!file)
    return res.status(409).json({ message: "bad request" })
  req.body.subCategoryImage = file;
  try {
    const { name, description, categoryId, subCategoryImage } = req.body;
    const newSubcategory = await Subcategory.create({ name, description, categoryId, subCategoryImage });
    res.status(201).json(newSubcategory);
  } catch (error) {
    if (file) {
      fs.unlink(`${filePath}/${file}`, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting file:", unlinkErr);
        }
      });
    }
    if (error instanceof Sequelize.UniqueConstraintError)
      return res.status(400).json({ message: "The provided name is already in use." });
    res.status(500).json({ error: error.message });
  }
};

export const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.findAll();
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await Subcategory.findOne({ where: { categoryId: req.query.id } });
    if (subcategory) {
      res.status(200).json(subcategory);
    } else {
      res.status(404).json({ message: 'Subcategory not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSubcategory = async (req, res) => {
  await validations(req)
  let newFile = req.file ? req.file.filename : null;
  req.body.subCategoryImage = newFile;
  try {
    const subcategory = await Subcategory.findByPk(req.body.id);
    if (subcategory) {
      fs.unlink(`${filePath}/${subcategory.subCategoryImage}`, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting file:", unlinkErr);
        }
      });
      const { name, description, categoryId, subCategoryImage } = req.body;
      await subcategory.update({ name, description, categoryId, subCategoryImage });
      res.status(200).json(subcategory);
    } else {
      res.status(404).json({ message: 'Subcategory not found' });
    }
  } catch (error) {
    if (file) {
      fs.unlink(`${filePath}/${file}`, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting file:", unlinkErr);
        }
      });
    }
    res.status(500).json({ error: error.message });
  }
};

export const deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByPk(req.query.id);
    if (subcategory) {
      await subcategory.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Subcategory not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
