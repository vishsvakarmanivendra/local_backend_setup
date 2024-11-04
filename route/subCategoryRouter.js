import express from "express";
import multer from "multer";
import { subcategoryValidationRules } from "../validations/subCategoryValidation.js";
import { createSubcategory, deleteSubcategory, getAllSubcategories, getSubcategoryById, updateSubcategory } from "../controller/subCategoryController.js";
const router = express.Router();
const upload = multer({dest:"public/subCategories"})

router.post('/subcategories',subcategoryValidationRules,upload.single("subCategoryImage"), createSubcategory);
router.get('/getAllSubCategory', getAllSubcategories);
router.get('/getSubCategoryByCategoryId', getSubcategoryById);
router.put('/updateSubCategories',subcategoryValidationRules,upload.single("subCategoryImage"), updateSubcategory);
router.delete('/deleteSubCategory', deleteSubcategory);

export default router;
