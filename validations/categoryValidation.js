import { check } from 'express-validator';

export const categoryValidationRules = [
    check('name')
        .notEmpty()
        .withMessage('Category name is required')
        .isString()
        .withMessage('Category name must be a string')
        .isLength({ min: 3 })
        .withMessage('Category name must be at least 3 characters long')
];
