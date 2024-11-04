import { check } from "express-validator"

export const signInValidation = [
    check('email')
        .isEmail()
        .withMessage('Email is required and must be valid')
        .notEmpty(),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
]