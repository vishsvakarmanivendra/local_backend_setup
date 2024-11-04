import { check } from 'express-validator';

export const signUpUserValidation = [
    check('firstName')
        .notEmpty()
        .withMessage('First name is required')
        .isString()
        .withMessage('First name must be a string'),
    
    check('lastName')
        .notEmpty()
        .withMessage('Last name is required')
        .isString()
        .withMessage('Last name must be a string'),

    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email'),

    check('phone')
        .notEmpty()
        .withMessage('Phone number is required')
        .isString()
        .withMessage('Phone number must be a string'),

    check('currentLocation')
        .notEmpty()
        .withMessage('Current location is required')
        .isString()
        .withMessage('Current location must be a string'),

    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    check('userImage')
        .optional()
        .isString()
        .withMessage('User image must be a string (URL or path)')
];

export const verifyPhoneValidation = [
    check('phone')
        .notEmpty()
        .withMessage('Phone number is required')
        .isString()
        .withMessage('Phone number must be a string'),
    
    check('otp')
        .notEmpty()
        .withMessage('OTP is required')
        .isString()
        .withMessage('OTP must be a string')
];
