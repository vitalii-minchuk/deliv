import { body } from 'express-validator';

export const registerValidation = [
	body('email', 'Incorrect email format').isEmail(),
	body('fullName', 'At least 2 characters').isLength({ min: 2 }),
	body('password', 'At least 5 characters').isLength({ min: 6 }),
	body('avatarUrl', 'Not found').optional().isURL(),
];
