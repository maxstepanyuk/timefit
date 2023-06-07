import { body } from 'express-validator';

export const registrationValidation = [
    body('login', 'login must be at least 2 characters').isLength({ min: 2 }),
    body('password', 'password must be at least 8 characters').isLength({ min: 8 }),
    body('email', 'invalid email format').isEmail(),
    body('name').optional(),
];