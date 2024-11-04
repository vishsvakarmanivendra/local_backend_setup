import { check } from 'express-validator';

export const subcategoryValidationRules = [
    check('name')
        .notEmpty()
        .withMessage('Subcategory name is required')
        .isString()
        .withMessage('Subcategory name must be a string')
        .isLength({ min: 3 })
        .withMessage('Subcategory name must be at least 3 characters long'),

    check('description')
        .optional()
        .isString()
        .withMessage('Description must be a string'),

    check('categoryId')
        .notEmpty()
        .withMessage('Category ID is required')
        .isInt()
        .withMessage('Category ID must be an integer'),

    check('subCategoryImage')
        .optional()
        .isString()
        .withMessage('Subcategory image must be a string')
];
