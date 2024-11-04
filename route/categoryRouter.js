import express from "express";
import { categoryValidationRules } from "../validations/categoryValidation.js";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controller/categoryController.js";
const router = express.Router();

router.post('/categories',categoryValidationRules,createCategory);
router.get('/getAllCategories',getAllCategories);
router.get('/getCategoryById',getCategoryById);
router.put('/update',categoryValidationRules,updateCategory);
router.delete('/deleteCategory',deleteCategory);

export default router;