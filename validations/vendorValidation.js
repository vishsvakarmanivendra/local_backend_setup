import { check } from 'express-validator';

export const vendorValidationRules = [
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

    check('adhar')
        .notEmpty()
        .withMessage('Aadhaar number is required')
        .isString()
        .withMessage('Aadhaar number must be a string'),

    check('currentLocation')
        .notEmpty()
        .withMessage('Current location is required')
        .isString()
        .withMessage('Current location must be a string'),

    check('categories')
        .notEmpty()
        .withMessage('Categories are required')
        .custom((value) => {
            if (!Array.isArray(value)) {
                throw new Error('Categories must be an array');
            }
            if (value.length < 1 || value.length > 3) {
                throw new Error('You must select at least 1 and at most 3 categories');
            }
            return true;
        }),

    check('workExperience')
        .notEmpty()
        .withMessage('Work experience is required')
        .isInt({ min: 0 })
        .withMessage('Work experience must be a non-negative integer'),

    check('description')
        .notEmpty()
        .withMessage('Description is required')
        .isString()
        .withMessage('Description must be a string'),

    check('profilePhoto')
        .notEmpty()
        .withMessage('Profile photo is required')
        .isString()
        .withMessage('Profile photo must be a string (URL or path)'),

    check('serviceArea')
        .notEmpty()
        .withMessage('Service area is required')
        .isString()
        .withMessage('Service area must be a string'),

    check('toolsAvailable')
        .notEmpty()
        .withMessage('Tools available field is required')
        .isBoolean()
        .withMessage('Tools available must be a boolean value'),

    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    check('otp')
        .optional()
        .isString()
        .withMessage('OTP must be a string'),

    check('otpExpiry')
        .optional()
        .isISO8601()
        .withMessage('OTP expiry must be a valid date'),

    check('status')
        .optional()
        .isIn(['pending', 'approved', 'rejected'])
        .withMessage('Status must be either pending, approved, or rejected')
];
