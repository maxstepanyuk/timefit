import { body } from 'express-validator';

export const workoutValidation = [
    body('workoutName', 'workoutName must be string').optional().isString(),
    body('grups', 'grups must be a non-empty array').isArray({ min: 1 }),
    body('grups.*.timeGroup.numSets', 'numSets must be an integer greater than or equal to 1').isInt({ min: 1 }),
    body('grups.*.timeGroup.exercises', 'exercises must be a non-empty array').isArray({ min: 1 }),
    body('grups.*.timeGroup.exercises.*.exerciseName', 'exerciseName must be non-empty').notEmpty(),
    body('grups.*.timeGroup.exercises.*.time', 'time must be an number').optional().isNumeric(),
];
